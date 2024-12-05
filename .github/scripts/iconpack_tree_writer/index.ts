import { join } from "node:path";
import { readdir, rm } from "node:fs/promises";

console.log("Starting...");

const processStart = performance.now();

const { list } = (await Bun.file(join("iconpacks", "list.json")).json()) as {
	list: {
		id: string;
		load: string;
		suffix: string;
	}[];
};
const hashes: Record<
	string,
	{
		hash: string;
		size: number;
	}
> = {};

for (const ic of list) {
	const start = performance.now();
	const [user, repo, branch, ...path] = (ic.load as string).split("/").slice(3);

	const raw = await fetch(
		`https://api.github.com/repos/${user}/${repo}/git/trees/${branch}?recursive=1`,
	).then((x) => x.json());

	const files = (raw.tree as any[])
		.filter((x) => x.type === "blob")
		.filter(
			(x) =>
				x.path.startsWith(path.join("/")) &&
				["png", "jpg", "webm", "lottie"].some((ext) =>
					x.path.endsWith(`${ic.suffix}.${ext}`),
				),
		)
		.map((x) => ({
			size: x.size,
			path: x.path
				.split("/")
				.slice(path.length - 1)
				.join("/"),
		}))
		.filter((x) => x.path.length > 0);

	hashes[ic.id] = {
		hash: raw.sha,
		size: files.reduce((a, b) => a + b.size, 0),
	};
	await Bun.write(
		join("../trees", `${ic.id}.txt`),
		files.map((x) => x.path).join("\n"),
	);

	console.log(
		`Parsed "${ic.id}" — ${files.length} file(s) [${(performance.now() - start).toFixed(1)}ms]`,
	);
}

for (const f of (
	await readdir("../trees", {
		withFileTypes: true,
	})
).filter((x) => x.isFile() && !list.some((y) => x.name === `${y.id}.txt`)))
	await rm(join("../trees", f.name));

await Bun.write(join("../trees", "_hashes.txt"), JSON.stringify(hashes));

console.log(`\nDone [${(performance.now() - processStart).toFixed(1)}ms]`);
