import { readFile, writeFile } from "fs/promises";
import { format } from "prettier";
import { join } from "path";

console.time("Done");

const template = await readFile(
  join(".github/scripts/list_iconpacks", "template.md"),
  "utf8"
);
const { list } = JSON.parse(
  await readFile(join("iconpacks", "list.json"), "utf8")
);

const packs = [];
for (const pack of list) {
  const authors = pack.credits.authors.map((a) =>
    a.id ? `[@${a.name}](https://discord.com/users/${a.id})` : a.name
  );

  packs.push(
    [
      `## ${pack.name} <img src="${pack.load}images/native/main_tabs/Messages${pack.suffix}.png" alt="${pack.name} preview" width=25 height=25 />`,
      `${pack.description}  `,
      `Created by: ${
        authors.length > 1
          ? `${authors.slice(0, -1).join(", ")} and ${
              authors[authors.length - 1]
            }`
          : authors.join(", ")
      }  `,
      `Assets from: [${pack.credits.source}](${pack.credits.source})  `,
    ].join("\n")
  );
}

await writeFile(
  join("docs", "ICONPACKS.md"),
  await format(template.replace(/{{}}/g, packs.join("\n\n")), {
    parser: "markdown",
  })
);

console.timeEnd("Done");
