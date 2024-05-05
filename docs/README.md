# Themes+ Documentation

Welcome to the Themes+ documentation! Here you will find how to set up Themes+ in your theme and how to configure its features!

## Plus Object

If you want Themes+ to work with your theme, you need to add this plus object to your JSON:

```diff
 {
   "name": "Theme",
   "description": "My first theme",
   "authors": [],
   "spec": 2,
+  "plus": {
+    "version": 0
+  }
 }
```

The `version` property is an integer that is used for compability. The latest version is **`0`**.
Here's documentation for all current available versions:

- [Version 0](./PLUS-VERSION-0.md)

## Iconpacks

A list of iconpacks is available [here](./ICONPACKS.md)
