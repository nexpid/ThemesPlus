import { readFile, writeFile } from "fs/promises";
import { format } from "prettier";
import { join } from "path";

console.time("Done");

const template = await readFile(join("iconpack_readme", "template.md"), "utf8");
const { list } = JSON.parse(
  await readFile(join("../../", "iconpack", "list.json"), "utf8")
);

const columns = 2;
const rows = [];

const parseAuthor = (x) => {
  const splat = x.split(" <");
  if (splat[1]) return [splat[0], splat[1].slice(0, -1)];
  else return [splat[0]];
};

for (let i = 0; i < list.length; i += columns) {
  const packs = list.slice(i, i + columns);
  rows.push(
    `<tr>${packs
      .map(
        (pack) =>
          `\t\t<td>\n${[
            ["Name", pack.id],
            ["Description", pack.description],
            [
              "Authors",
              pack.credits.authors
                .map((a) => {
                  const [name, discord] = parseAuthor(a);
                  return discord
                    ? `<a href="https://discord.com/users/${discord}">${name}</a>`
                    : name;
                })
                .join(", "),
            ],
          ]
            .map(([key, val]) => `<b>${key}</b> ${val}`)
            .join("\n<br/>\n")}</td>`
      )
      .join("\n")}</tr>`
  );
}

await writeFile(
  join("../../", "iconpack", "README.md"),
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
