import { readFile, readdir, unlink, writeFile } from "fs/promises";
import { join } from "path";

console.time("Done");

const repo = process.env.github_repository ?? "Gabe616/VendettaThemesPlus";

const { list } = JSON.parse(
  await readFile(join("../../", "iconpacks", "list.json"), "utf8")
);

for (const f of (
  await readdir(join("../../../", "trees"), {
    withFileTypes: true,
  })
).filter((x) => x.isFile() && x.name.endsWith(".txt")))
  await unlink(join("../../../", "trees", f.name));

for (const ic of list) {
  console.log(`Parsing tree for '${ic.id}'`);

  const load = ic.load && (!ic.load.endsWith("/") ? ic.load + "/" : ic.load);

  let user, path;
  if (load) {
    const split = load.split("/");
    user = split.slice(3, 5).join("/");
    path = split.slice(6, -1);
  } else {
    user = repo;
    path = ["assets", ic.id];
  }

  try {
    const paths = (
      await (
        await fetch(
          `https://api.github.com/repos/${user}/git/trees/master?recursive=1`
        )
      ).json()
    ).tree
      .filter((x) => x.path.startsWith(path.join("/")))
      .map((x) => x.path.split("/").slice(path.length).join("/"))
      .filter((x) => x.length > 0);

    await writeFile(
      join("../../../", "trees", `${ic.id}.txt`),
      paths.join("\n")
    );
  } catch (e) {
    console.log(`Failed to parse tree for '${ic.id}'!`);
    continue;
  }
}

console.timeEnd("Done");
