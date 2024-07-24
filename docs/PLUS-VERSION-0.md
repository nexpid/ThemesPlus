# Plus Version 0

## Custom Icon Colors

Allows you to recolor icons, or their layers if [custom icon overlays](#custom-icon-overlays) is enabled  
Structure:

- `icons` — an object containing all the icon recolors
  - key — name of an icon
  - value — a [color](#the-color-system)

Example:

```json
"plus": {
    "version": 0,
    "icons": {
        "GlobeEarthIcon": [
            "#f00",
            "#0f0",
            "#00f"
        ],
        "AppsIcon": [
            "#0ff"
        ],
        "HubIcon": "#f0f"
    }
}
```

Would look like:

| Original                                                | Dark                                            | Light                                             | Midnight                                                |
| ------------------------------------------------------- | ----------------------------------------------- | ------------------------------------------------- | ------------------------------------------------------- |
| ![original](./assets/icons/GlobeEarthIcon/original.png) | ![dark](./assets/icons/GlobeEarthIcon/dark.png) | ![light](./assets/icons/GlobeEarthIcon/light.png) | ![midnight](./assets/icons/GlobeEarthIcon/midnight.png) |
| ![original](./assets/icons/AppsIcon/original.png)       | ![dark](./assets/icons/AppsIcon/dark.png)       | ![light](./assets/icons/AppsIcon/original.png)    | ![midnight](./assets/icons/AppsIcon/dark.png)           |
| ![original](./assets/icons/HubIcon/original.png)        | ![dark](./assets/icons/HubIcon/all.png)         | ![light](./assets/icons/HubIcon/all.png)          | ![midnight](./assets/icons/HubIcon/all.png)             |

## Unread Badge Color

> [!WARNING]
> This is deprecated and will be removed in version 1. Use raw color `RED_400` instead

Changes the color of the unread badge  
Structure:

- `unreadBadgeColor` — a [color](#the-color-system)

Example:

```json
"plus": {
    "version": 0,
    "unreadBadgeColor": "#00f"
}
```

Would look like:

| Original                                              | Recolored                                               |
| ----------------------------------------------------- | ------------------------------------------------------- |
| ![original](./assets/unread-badge-color/original.png) | ![recolored](./assets/unread-badge-color/recolored.png) |

## Custom Icon Overlays

> [!NOTE]
> Incompatible with iconpacks

Adds more layers to icons to allow futher recoloring. You can find the full list [here](./CUSTOM-ICON-OVERLAYS.md)  
Structure:

- `customOverlays` — a boolean

Example:

```json
"plus": {
    "version": 0,
    "icons": {
        "ic_radio_square_checked_24px": ["#f00", "#f0f"],
        "ic_radio_square_checked_24px__overlay": ["#faa", "#faf"],
        "ic_radio_circle_checked_green": ["#aa0", "#0aa"],
        "ic_radio_circle_checked_green__overlay": ["#ffa", "#aff"],
    },
    "customOverlays": true
}
```

Would look like:

| Original                                                                   | Dark                                                               | Light                                                                |
| -------------------------------------------------------------------------- | ------------------------------------------------------------------ | -------------------------------------------------------------------- |
| ![original](./assets/custom-overlays/ic_radio_square_checked/original.png) | ![dark](./assets/custom-overlays/ic_radio_square_checked/dark.png) | ![light](./assets/custom-overlays/ic_radio_square_checked/light.png) |
| ![original](./assets/custom-overlays/greenies/original.png)                | ![dark](./assets/custom-overlays/greenies/dark.png)                | ![light](./assets/custom-overlays/greenies/light.png)                |

## Mention Line Color

Recolors the line next to a message where you were mentioned

Structure:

- `mentionLineColor` — a [color](#the-color-system)

Example:

```json
"plus": {
    "version": 0,
    "mentionLineColor": "#f00"
}
```

Would look like:

| Original                                              | Recolored                                               |
| ----------------------------------------------------- | ------------------------------------------------------- |
| ![original](./assets/mention-line-color/original.png) | ![recolored](./assets/mention-line-color/recolored.png) |

## Iconpack

Changes how icons look. You can find the full list of iconpacks [here](./ICONPACKS.md)

Structure:

- `iconpack` — the ID of the iconpack

Example:

```json
"plus": {
    "version": 0,
    "iconpack": "solar"
}
```

Would look like:

| Original Icons                                                                                                                                                                | MD3                                                                                                                                                     | Solar                                                                                                                                                                                         |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ![Original super reaction icon](https://raw.githubusercontent.com/nexpid/Themelings/data/icons/design/components/Icon/native/redesign/generated/images/SuperReactionIcon.png) | ![MD3 super reaction icon](https://raw.githubusercontent.com/Panniku/vd-iconpacks/master/Packs/MaterialDesign3/images/native/ic_add_super_reaction.png) | ![Solar super reaction icon](https://raw.githubusercontent.com/Moodzz1/discord-iconpacks/master/Packs/Solar/design/components/Icon/native/redesign/generated/images/SuperReactionIcon.png) |
| ![Original webhook icon](https://raw.githubusercontent.com/nexpid/Themelings/data/icons/design/components/Icon/native/redesign/generated/images/WebhookIcon.png)              | ![MD3 webhook icon](https://raw.githubusercontent.com/Panniku/vd-iconpacks/master/Packs/MaterialDesign3/images/native/icons/ic_webhook_24px.png)        | ![Solar webhook icon](https://raw.githubusercontent.com/Moodzz1/discord-iconpacks/master/Packs/Solar/design/components/Icon/native/redesign/generated/images/WebhookIcon.png)              |
| ![Original keyboard icon](https://raw.githubusercontent.com/nexpid/Themelings/data/icons/design/components/Icon/native/redesign/generated/images/KeyboardIcon.png)            | ![MD3 keyboard icon](https://raw.githubusercontent.com/Panniku/vd-iconpacks/master/Packs/MaterialDesign3/images/native/emoji/ic_keyboard_24px.png)      | ![Solar keyboard icon](https://raw.githubusercontent.com/Moodzz1/discord-iconpacks/master/Packs/Solar/design/components/Icon/native/redesign/generated/images/KeyboardIcon.png)             |

## The Color System

A color value can either be:

- An array of strings, each entry recoloring a theme in this order:

  - dark/darker **(required)**
  - light
  - midnight

- A string, a **#HEX** color for every theme

Example:

| Color                      | Dark                                | Light                                 | Midnight                            |
| -------------------------- | ----------------------------------- | ------------------------------------- | ----------------------------------- |
| `["#f00", "#0f0", "#00f"]` | ![red](./assets/colors/red.svg)     | ![green](./assets/colors/green.svg)   | ![blue](./assets/colors/blue.svg)   |
| `["#f0f", "#ff0"]`         | ![pink](./assets/colors/pink.svg)   | ![yellow](./assets/colors/yellow.svg) | ![pink](./assets/colors/pink.svg)   |
| `["#0ff"]`                 | ![cyan](./assets/colors/cyan.svg)   | **unchanged**                         | ![cyan](./assets/colors/cyan.svg)   |
| `"#fff"`                   | ![white](./assets/colors/white.svg) | ![white](./assets/colors/white.svg)   | ![white](./assets/colors/white.svg) |
