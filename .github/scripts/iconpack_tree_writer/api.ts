import { Octokit } from "octokit";
import type { components } from "@octokit/openapi-types";

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
    const tree: components["schemas"]["git-tree"]["tree"] = [];

    let page = 1;
    while (page < 10) {
        const data = await new Octokit({
            baseUrl,
        })
            .request("GET /repos/{owner}/{repo}/git/trees/{tree_sha}", {
                owner,
                repo,
                tree_sha: branch,
                recursive: "true",
                page: page++,
            })
            .then((x) => x.data);
        for (const f of data.tree) tree.push(f);

        if (!data.truncated) break;
        if ("total_count" in data && typeof data.total_count === "number" && data.total_count <= tree.length) break;
    }

    const chunks = path.split("/").length
	const files = tree.filter(
		(x) =>
			x.type === "blob" &&
			x.path.split("/").slice(0, chunks).join("/") === path &&
			exts.some((ext) => x.path.endsWith(`${suffix}.${ext}`)),
	);

	return files.map((x) => ({
		path: x.path.slice(path.length + 1),
		size: x.size || 0,
		hash: x.sha,
	}));
}

export async function fetchRepoContents(url: string, iconpack: IconpackInfo) {
	const { hostname, pathname } = new URL(url.replace(/\/$/, ""));
	const path = pathname.split("/").slice(1);

	let files: GitFile[] = [];
	if (hostname === "raw.githubusercontent.com" && path[2]) {
		const branchI = path[2] === "refs" && path[3] === "heads" ? 4 : 2;
		files = await fetchTreesCompatible(
			{
				owner: path[0],
				repo: path[1],
				branch: path[branchI],
				path: path.slice(branchI + 1).join("/"),
			},
			iconpack,
		);
	} else if (hostname === "codeberg.org" && path[2] === "raw") {
		files = await fetchTreesCompatible(
			{
				owner: path[0],
				repo: path[1],
				branch: path[4],
				path: path.slice(5).join("/"),
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
