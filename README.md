# boken

Static site for GitHub Pages.

## Requirements

- Node.js 18+

## Build

```bash
npm run build
```

Generates:

- `index.html`
- `sten/index.html`
- `birgitta/index.html`
- `medicin/index.html`
- `lasarkommentarer/index.html`
- `lasarservice/index.html`
- `kop/index.html`
- `kontakt/index.html`

## Source

- Templates: `src/templates/`
- Page content: `src/content/`
- Assets: `assets/`
- Build script: `scripts/build.mjs`

## Git Hook (optional)

```bash
git config core.hooksPath .githooks
```
