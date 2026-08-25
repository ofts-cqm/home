# Welcome to OFTS-CQM (Sam Chen)'s Homepage!

This Vue site presents Markdown documents in a Visual Studio Code-inspired interface.

## Adding content

Add a Markdown file to `src/assets/content`. Every document must begin with:

```md
---
route: /story
label: Story.md
order: 50
---
```

`route` becomes the public URL, `label` appears in the file explorer, and `order` controls explorer ordering. Routes and labels must be unique. Raw HTML is intentionally disabled.

Images belong in `src/assets/pictures` (PNG, JPG, or JPEG) or `src/assets/svgs` (SVG) and use paths relative to the Markdown file:

```md
![Description](../pictures/image.png)
```

### Two columns

```md
:::: columns flex="4 6"
::: column
Left-side Markdown
:::

::: column
Right-side Markdown
:::
::::
```

`flex` defaults to `1 1`. The columns stack when either would be narrower than 300px.

### Grid

```md
:::: grid columns=3
::: item
First item
:::

::: item
Second item
:::
::::
```

`columns` is required. The grid reduces its column count whenever a track would be narrower than 300px.

### Accordion

```md
::: accordion title="Click to see..." open=false
Content shown inside the accordion.
:::
```

`open` is optional and defaults to `false`.

### Flip card

```md
::: flip-card title="Project name" image="../pictures/project.png" alt="Project screenshot" languages="Vue, TypeScript"
Markdown shown on the back of the card.
:::
```

Flip cards support hover, click or tap, Enter/Space, and Escape.
