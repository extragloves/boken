# Static Build Source

- Edit page content in `src/content/*.html`.
- Keep shared shell/layout in:
  - `src/templates/home.seed.html`
  - `src/templates/inner.seed.html`
- Rebuild output pages with `npm run build`.
- A pre-commit hook is included at `.githooks/pre-commit` to run the build automatically.

Generated output files:

- `index.html`
- `sten/index.html`
- `birgitta/index.html`
- `medicin/index.html`
- `lasarkommentarer/index.html`
- `lasarservice/index.html`
- `kop/index.html`
- `kontakt/index.html`

To enable hooks in this repo:

- `git config core.hooksPath .githooks`
