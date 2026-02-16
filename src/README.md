# src

Source files used by `scripts/build.mjs`.

## Structure

- `src/content/home.html`: content for `/`
- `src/content/sten.html`: content for `/sten/`
- `src/content/birgitta.html`: content for `/birgitta/`
- `src/content/medicin.html`: content for `/medicin/`
- `src/content/lasarkommentarer.html`: content for `/lasarkommentarer/`
- `src/content/lasarservice.html`: content for `/lasarservice/`
- `src/content/kop.html`: content for `/kop/`
- `src/content/kontakt.html`: content for `/kontakt/`
- `src/templates/home.seed.html`: shared shell for homepage output
- `src/templates/inner.seed.html`: shared shell for inner pages

## Usage

1. Edit files in `src/content/` and/or `src/templates/`.
2. Run `npm run build`.
3. Verify generated files at repo root and route folders.

## Notes

- Generated files are overwritten on each build.
- Do not edit generated route files directly unless you intend to keep those edits in source too.

