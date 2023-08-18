import { readFile, writeFile } from "fs/promises";
import { format } from "prettier";
import { join } from "path";

console.time("Done");

const times = {
  until: null,
  after: null,
};

const lines = (await readFile(join("../../", "README.md"), "utf8")).split("\n");

for (let i = 0; i < lines.length; i++) {
  const l = lines[i];
  if (l.startsWith("## Examples")) times.until = i + 1;
  else if (times.until && !times.after && l.startsWith("## ")) times.after = i;
}

if (!times.until || !times.after)
  throw new Error("times.until or times.after missing");

const data = (await readFile(join("../../examples.tsv"), "utf8"))
  .replace(/\r/g, "")
  .split("\n")
  .slice(1)
  .map((x) => x.split("\t"))
  .map((x) => ({
    name: x[0],
    channel: x[1],
    link: x[2],
  }));

await writeFile(
  join("../../README.md"),
  [
    lines.slice(0, times.until).join("\n"),
    data
      .map(
        (x) =>
          `- [${x.name}](https://discord.com/channels/1015931589865246730/${x.channel}) — [\\[copy theme link\\]](${x.link})`
      )
      .join("\n"),
    lines.slice(times.after).join("\n"),
  ].join("\n\n")
);

console.timeEnd("Done");
