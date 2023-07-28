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

## Table of Contents

- [Vendetta Themes+](#-vendetta-themes)
  - [Table of Contents](#table-of-contents)
  - [Info](#info)
  - [Links](#links)
  - [Using Vendetta Themes+](#using-vendetta-themes)
    - [Custom Icon Colors](#custom-icon-colors)
    - [Unread Badge Color](#unread-badge-color)
  - [Custom Icon Overlays](#custom-icon-overlays)

## Info

The latest structure version of Vendetta Themes+ is `0`

Vendetta Themes+ is a plugin that adds more customizability to themes.

Users must install this [**plugin**](https://github.com/Gabe616/VendettaPlugins/tree/main/plugins/themes-plus) in order to see Vendetta Themes+ in action.  
It's recommended to include this message (or something similiar to it) wherever you're promoting your themes:

> This theme uses Themes+, install it here: [**Themes+**](https://discord.com/channels/1015931589865246730/1033532783659847710/1093646560128151643)

## Links

- [This repository](https://github.com/Gabe616/VendettaThemesPlus)
- [Plugins channel link](https://canary.discord.com/channels/1015931589865246730/1015931590741872712) (doesn't exist yet)
- [Plugin link](https://gabe616.github.io/VendettaPlugins/themes-plus)
- [Plugin source code](https://github.com/Gabe616/VendettaPlugins/tree/main/plugins/themes-plus)

## Using Vendetta Themes+

Using Vendetta Themes+ is as easy as adding this property to your theme.  
Structure:

- `plus` — object, contains everything
  - version — number, used for backwards compability

Example:

```json
"plus": {
	"version": 0
}
```

### Custom Icon Colors

Recolors icons. (this changes the color of the icon _completely_!)  
Structure:

- `icons` — object, contains all the icons
  - key — string, codename of an asset (or a [custom icon overlay](#custom-icon-overlays))
  - value
    - string array, hex colors of this icon for each theme[^1] (only one color is required)
    - string, applies to all themes

Example:

```json
"plus": {
	"version": 0,
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
}
```

Would look like:

| Original                                     | Dark                                     | Light                                     | Amoled                                     | Darker                                     |
| -------------------------------------------- | ---------------------------------------- | ----------------------------------------- | ------------------------------------------ | ------------------------------------------ |
| ![](./assets/icons/ic_new_pins/original.png) | ![](./assets/icons/ic_new_pins/dark.png) | ![](./assets/icons/ic_new_pins/light.png) | ![](./assets/icons/ic_new_pins/amoled.png) | ![](./assets/icons/ic_new_pins/darker.png) |
| ![](./assets/icons/emoji/original.png)       | ![](./assets/icons/emoji/dark.png)       | ![](./assets/icons/emoji/original.png)    | ![](./assets/icons/emoji/dark.png)         | ![](./assets/icons/emoji/dark.png)         |

### Unread Badge Color

Changes the color of the unread badge indicator.
Structure:

- `unreadBadgeColor`
  - string array, hex colors of this icon for each theme[^1] (only one color is required)
  - string, applies to all themes

Example:

```json
"plus": {
	"version": 0,
	"unreadBadgeColor": "#FFA"
}
```

Would look like:

| Original                                      | Recolored                                      |
| --------------------------------------------- | ---------------------------------------------- |
| ![](./assets/unread-badge-color/original.png) | ![](./assets/unread-badge-color/recolored.png) |

### Custom Icon Overlays

Adds extra customizable layers to icons. [**Here's the full list**](./CUSTOM_ICON_OVERLAYS.md)

Structure:

- `customOverlays` — boolean, whether custom icon overlays are enabled

Example:

```json
"plus": {
	"version": 0,
	"unreadBadgeColor": "#FAF",
	"icons": {
		"ic_radio_square_checked__overlay": "#FFA"
	},
	"customOverlays": true
}
```

Would look like:

| Original                                                          | Recolored                                                          |
| ----------------------------------------------------------------- | ------------------------------------------------------------------ |
| ![](./assets/custom-overlay/ic_new_pins/original.png)             | ![](./assets/custom-overlay/ic_new_pins/recolored.png)             |
| ![](./assets/custom-overlay/ic_radio_square_checked/original.png) | ![](./assets/custom-overlay/ic_radio_square_checked/recolored.png) |

[^1]: Themes go in this order: _dark, light, amoled, darker_
