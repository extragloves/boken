# CLAUDE.md

Project notes for coding agents working in this repository.

## Project Type

- Static site generated from source fragments and templates.
- Deployment target: GitHub Pages.

## Core Commands

- Install deps: `npm install` (if needed)
- Build site: `npm run build`

## Source of Truth

- Page content: `src/content/*.html`
- Shared shells: `src/templates/home.seed.html`, `src/templates/inner.seed.html`
- Build logic: `scripts/build.mjs`
- Assets: `assets/`

Generated route files (`index.html`, `*/index.html`) are outputs.

## Editing Rules

- Prefer editing `src/content` or `src/templates`, then rebuild.
- Keep URLs/paths stable (`/sten/`, `/birgitta/`, etc.).
- Preserve `CNAME`.
- Keep external links opening in new tab (`target="_blank"`, `rel="noopener noreferrer"`). This is currently enforced by build logic.

## Navigation / UI

- Desktop submenu behavior depends on CSS in `assets/css/site.css` and JS in `assets/js/site.js`.
- Mobile nav behavior is implemented in `assets/js/site.js`.

## Pre-commit Hook (optional local)

- Enable once per clone: `git config core.hooksPath .githooks`
- Hook runs build and stages generated route files.
