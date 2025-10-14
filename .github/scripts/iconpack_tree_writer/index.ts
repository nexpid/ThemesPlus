import { readdir, rm } from "node:fs/promises";
import { join } from "node:path";
import { fetchRepoContents } from "./api";

const base = "../trees";
const processStart = performance.now();

console.log("Starting...");

interface Iconpacks {
    list: {
        id: string;
        load: string;
        suffix: string;
    }[]
}

const hashes: Record<string, { hash: string; size: number; }> = {};
const { list } = (await Bun.file(join("iconpacks", "list.json")).json()) as Iconpacks;

await Promise.allSettled(list.map((async ({ id, load, suffix }) => {
    try {
        const start = performance.now();

        const tree = await fetchRepoContents(load, {
            suffix
        });
        hashes[id] = {
            hash: tree.hash,
            size: tree.size
        };
        
        await Bun.write(
            join(base, `${id}.txt`),
            tree.files.map((x) => x.path).join("\n"),
        );
    
        console.log(
            `Parsed "${id}" — ${tree.files.length} file(s) [${(performance.now() - start).toFixed(1)}ms]`,
        );
    } catch (error) {
        console.error(`[!!] FAILED on iconpack "${id}"`, error);
    }
})));

for (const file of await readdir(base, { withFileTypes: true })) {
    if (file.isFile() && !list.find((x) => file.name === `${x.id}.txt`)) {
        await rm(join(base, file.name));
    }
}
await Bun.write(join(base, "_hashes.txt"), JSON.stringify(hashes));

console.log(`\nDone [${(performance.now() - processStart).toFixed(1)}ms]`);
