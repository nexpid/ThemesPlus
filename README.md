<div align="center">
	<a href="https://github.com/Gabe616/VendettaThemesPlus/stargazers">
		<img alt="GitHub stars" src="https://img.shields.io/github/stars/Gabe616/VendettaThemesPlus?style=for-the-badge&color=b4befe&labelColor=1e1e2e&logo=starship&logoColor=fff">
	</a>
	<a href="https://github.com/Gabe616/VendettaThemesPlus/issues">
		<img alt="GitHub stars" src="https://img.shields.io/github/issues/Gabe616/VendettaThemesPlus?style=for-the-badge&color=74c7ec&labelColor=1e1e2e&logo=gitbook&logoColor=fff">
	</a>
	<a href="https://github.com/Gabe616/VendettaThemesPlus/issues">
		<img alt="GitHub stars" src="https://img.shields.io/github/issues-pr/Gabe616/VendettaThemesPlus?style=for-the-badge&color=a6e3a1&labelColor=1e1e2e&logo=saucelabs&logoColor=fff">
	</a>
	<a href="https://discord.gg/n9QQ4XhhJP">
		<img alt="GitHub stars" src="https://img.shields.io/discord/1015931589865246730?style=for-the-badge&color=eba0ac&labelColor=1e1e2e&logo=discord&logoColor=fff">
	</a>
</div>
<div align="center">
    <h1>🎨 Vendetta Themes+</h1>
</div>

> **Warning**
> You've stumbled upon an unfinished repo, nothing in this README works yet!

## Table of Contents

- [Vendetta Themes+](#-vendetta-themes)
  - [Table of Contents](#table-of-contents)
  - [Info](#info)
  - [Using Vendetta Themes+](#using-vendetta-themes)
  - [Custom Icon Colors](#custom-icon-colors)

## Info

The latest structure version of Vendetta Themes+ is `N/A`

Vendetta Themes+ is a plugin that adds more customizability to themes.

Users must install this [**plugin**](https://github.com/Gabe616/VendettaPlugins/tree/main/plugins/themes-plus) in order to see Vendetta Themes+ in action.  
It's recommended to include this message (or something similiar to it) wherever you're promoting your themes:

> This theme uses Themes+, install it here: [**Themes+**](https://discord.com/channels/1015931589865246730/1033532783659847710/1093646560128151643)

## Using Vendetta Themes+

Using Vendetta Themes+ is as easy as adding this property to your theme.  
Structure:

- `plus` — object, contains everything
  - version — string, used for backwards compability

Example:

```json
"plus": {
	"version": "N/A"
}
```

### Custom Icon Colors

Currently the one and only feature of Vendetta Themes+ is the ability to recolor icons.  
Structure:

- `icons` — object, contains all the icons
  - key — string, codename of an asset
  - value — string array, hex colors of this icon for each theme in this order: dark, light, amoled, darker (only one color is required)

Example:

```json
"icons": {
	"ic_new_pins": [
		"#FAA",
		"#AFA",
		"#AAF",
		"#FAF"
	],
	"emoji": [
		"#AFF"
	]
}
```

Would look like:

| Original                                     | Dark                                     | Light                                     | Amoled                                     | Darker                                     |
| -------------------------------------------- | ---------------------------------------- | ----------------------------------------- | ------------------------------------------ | ------------------------------------------ |
| ![](./assets/icons/ic_new_pins/original.png) | ![](./assets/icons/ic_new_pins/dark.png) | ![](./assets/icons/ic_new_pins/light.png) | ![](./assets/icons/ic_new_pins/amoled.png) | ![](./assets/icons/ic_new_pins/darker.png) |
| ![](./assets/icons/emoji/original.png)       | ![](./assets/icons/emoji/dark.png)       | ![](./assets/icons/emoji/original.png)    | ![](./assets/icons/emoji/dark.png)         | ![](./assets/icons/emoji/dark.png)         |
