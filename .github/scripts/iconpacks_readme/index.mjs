import { readFile, writeFile } from "fs/promises";
import { format } from "prettier";
import { join } from "path";

console.time("Done");

const template = await readFile(
  join("iconpacks_readme", "template.md"),
  "utf8"
);
const { list } = JSON.parse(
  await readFile(join("../../", "iconpacks", "list.json"), "utf8")
);

const columns = 2;
const rows = [];

for (let i = 0; i < list.length; i += columns) {
  const packs = list.slice(i, i + columns);
  rows.push(
    `<tr>${packs
      .map(
        (pack) =>
          `<td>${[
            ["Name", pack.id],
            ["Description", pack.description],
            [
              "Authors",
              pack.credits.authors
                .map((a) =>
                  a.id
                    ? `<a href="https://discord.com/users/${a.id}">${a.name}</a>`
                    : a.name
                )
                .join(", "),
            ],
          ]
            .map(([key, val]) => `<b>${key}</b>: ${val}`)
            .join(
              "\n<br/>\n"
            )}\n<details>\n<summary>\nDeveloper Stuff\n</summary>\n${[
            ["Root URL", pack.load],
            ["Icon Suffix", pack.suffix],
          ]
            .map(([key, val]) => `<b>${key}</b>: ${val}`)
            .join("\n<br/>\n")}\n</details></td>`
      )
      .join("\n")}</tr>`
  );
}

await writeFile(
  join("../../../", "wiki", "Iconpacks.md"),
  await format(
    template.replace(
      /{{}}/g,
      await format(`<table>${rows.join("\n")}</table>`, {
        parser: "html",
      })
    ),
    {
      parser: "markdown",
    }
  )
);

console.timeEnd("Done");
