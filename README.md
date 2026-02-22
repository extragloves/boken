# Boken "Mitt Hjärta"

Wordpress site converted to static and published on GitHub Pages (`www.bokenmitthjarta.se`).

## Requirements

- Node.js 18+

## Workflow

1. Edit content in `src/content/` and shared layout in `src/templates/`.
2. Review your source changes.
3. Commit (the pre-commit hook runs `npm run build` and stages regenerated route files and sitemap).
4. Push.

## Git Hook (Configured)

```bash
git config --get core.hooksPath
# .githooks
```

This repository is configured to use `.githooks/pre-commit` on commit:

- Runs `npm run build`
- Stages regenerated route files (`index.html`, `sten/index.html`, `birgitta/index.html`, etc.) before the commit completes
