import { join } from "node:path";

const processStart = performance.now();

const template = await Bun.file(
	join(".github/scripts/list_iconpacks", "template.md"),
).text();
const { list } = (await Bun.file(join("iconpacks", "list.json")).json()) as {
	list: {
		name: string;
		description: string;
		credits: {
			authors: { id: string; name: string }[];
			sources: string[];
		};
		load: string;
		suffix: string;
	}[];
};

const packs: string[] = [];
for (const pack of list) {
	const authors = pack.credits.authors.map((a) =>
		a.id ? `[@${a.name}](https://discord.com/users/${a.id})` : `**${a.name}**`,
	);
	const sources = pack.credits.sources.map((x) => `[${x}](${x})`);

	packs.push(
		[
			`### ${pack.name} <img src="${pack.load}design/components/Icon/native/redesign/generated/images/BellIcon${pack.suffix}.png" alt="Preview for ${pack.name}" width=24 height=24 />\n`,
			`${pack.description}  `,
			`Created by: ${
				authors.length > 1
					? `${authors.slice(0, -1).join(", ")} and ${
							authors[authors.length - 1]
						}`
					: authors.join(", ")
			}  `,
			sources.length === 1
				? `Assets from: ${sources[0]}  `
				: sources.length > 1
					? `Assets from:\n\n${sources.map((x) => `- ${x}`).join("\n")}  `
					: "",
		].join("\n"),
	);
}

await Bun.write(
	join("docs", "ICONPACKS.md"),
	template.replace(/{{}}/g, packs.join("\n\n")),
);

console.log(`\nDone [${(performance.now() - processStart).toFixed(1)}ms]`);
