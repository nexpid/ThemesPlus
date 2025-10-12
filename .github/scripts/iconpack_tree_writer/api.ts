import { Octokit } from "octokit";

function clean(path: string[]) {
	return path.filter((x) => x.length > 0).join("/");
}

const exts = ["png", "jpg", "webm", "lottie"];

interface GitFile {
	path: string;
	size: number;
	hash: string;
}
interface GitInfo {
	owner: string;
	repo: string;
	branch: string;
	path: string;
}
interface IconpackInfo {
	suffix: string;
}

async function fetchTreesCompatible(
	{ owner, repo, branch, path }: GitInfo,
	{ suffix }: IconpackInfo,
	baseUrl?: string,
): Promise<GitFile[]> {
	const data = await new Octokit({
		baseUrl,
	})
		.request("GET /repos/{owner}/{repo}/git/trees/{tree_sha}", {
			owner,
			repo,
			tree_sha: branch,
			recursive: "true",
		})
		.then((x) => x.data);
	const files = data.tree.filter(
		(x) =>
			x.type === "blob" &&
			x.path.startsWith(path) &&
			exts.some((ext) => x.path.endsWith(`${suffix}.${ext}`)),
	);

	return files.map((x) => ({
		path: x.path.slice(path.length + 1),
		size: x.size || 0,
		hash: x.sha,
	}));
}

export async function fetchRepoContents(url: string, iconpack: IconpackInfo) {
	const { hostname, pathname } = new URL(url);
	const path = pathname.split("/").slice(1);

	let files: GitFile[] = [];
	if (hostname === "raw.githubusercontent.com" && path[2]) {
		const branchI = path[2] === "refs" && path[3] === "heads" ? 4 : 2;
		files = await fetchTreesCompatible(
			{
				owner: path[0],
				repo: path[1],
				branch: path[branchI],
				path: clean(path.slice(branchI + 1)),
			},
			iconpack,
		);
	} else if (hostname === "codeberg.org" && path[2] === "raw") {
		files = await fetchTreesCompatible(
			{
				owner: path[0],
				repo: path[1],
				branch: path[4],
				path: clean(path.slice(5)),
			},
			iconpack,
			"https://codeberg.org/api/v1",
		);
	} else throw new Error(`Unsupported git platform ${hostname} at ${url}`);

	const hash = Bun.sha(files.map((x) => x.hash).join()).toHex();
	return {
		files,
		hash,
		size: files.reduce((a, b) => a + b.size, 0),
	};
}
