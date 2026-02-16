# boken

Static website for GitHub Pages (`www.bokenmitthjarta.se`).

## Requirements

- Node.js 18+

## Build

```bash
npm run build
```

Build output is written to:

- `index.html`
- `sten/index.html`
- `birgitta/index.html`
- `medicin/index.html`
- `lasarkommentarer/index.html`
- `lasarservice/index.html`
- `kop/index.html`
- `kontakt/index.html`
- `robots.txt`
- `sitemap.xml`

## Folder Purpose

- `assets/`: static assets used by generated pages.
- `assets/css/`: site styles and third-party CSS.
- `assets/js/`: site JavaScript.
- `assets/fonts/`: webfont files used by CSS.
- `assets/img/`: site images.
- `src/`: source content and templates for generation.
- `src/content/`: per-page main content fragments.
- `src/templates/`: shared page shells used by the build script.
- `scripts/`: build scripts.
- `scripts/build.mjs`: static generator.
- `.githooks/`: optional local Git hooks.
- `.githooks/pre-commit`: runs build before commit and stages generated pages.
- `index.html`, `sten/`, `birgitta/`, `medicin/`, `lasarkommentarer/`, `lasarservice/`, `kop/`, `kontakt/`: generated deployable pages.
- `CNAME`: GitHub Pages custom domain mapping.
- `.claude/`: local tool settings (ignored by Git).

## Workflow

1. Edit content in `src/content/` and shared layout in `src/templates/`.
2. Run `npm run build`.
3. Review generated page diffs.
4. Commit and push.

## Optional Hook Setup

```bash
git config core.hooksPath .githooks
```
