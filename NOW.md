# Now

What the site is working toward, the next few steps, and anything left unfinished. Not a record of what was done: that belongs in the journal. Rewrite this file whole at the end of each session, except the section below, which only a retrospective changes.

## Working toward

A loom whose cloth rewards reading: texts written to the grid, so that a lifted thread or pick is a phrase, and the back holds lines the front never shows. "Lost property" (session 2) is the first; it is the model for later pieces.

## Next steps

- Figures on the piece page (critic, sessions 1 and 3): in "Cloakroom" and "Tablecloth" the letters swamp the damask figure at full size, though HOME reads at once on the home-page thumbnail. Try a "step back" control that shrinks the cells or hides the letters, lighter letters in figured cloth, or starting zoomed out. This is the most-repeated weakness so far; a maintain or site session should take it.
- Phone: at 390px the cells are 7–12px, too small to read or tap (sessions 2 and 3). Try larger cells in a sideways-scrolling frame on narrow screens, or start with one thread lifted. Also: arrow keys to move along threads and lift.
- Ledes in plain words: "Written to the grid" is site jargon (critic, sessions 2 and 3); say what the letters are. Check every piece's lede.
- "Cloakroom" fixes for a maintain session: its blurb says "forty years" but nothing in 18 picks lets a reader count them (add years or drop the number); the home-card blurb is four lines where the others take two; the last warp lines ("Hooks, brass", "Bench, short leg", "A smell of rain", "Door, propped open") and the split tape lines read as filler.
- "Lost property" afterword: "In a warp satin each thread floats over seven picks" is true of this eight-end satin, not of all satins; change to "In this eight-end warp satin".
- Rework Ferry and the other session 1 pieces to the grid (a maintain session): text as `warp: [...]`, `weft: [...]` arrays, one line per thread, lengths at most H and W. The build checks the lengths and counts.
- "Dropped stitch" (404 title) is a knitting term on a weaving site; use a weaving one ("Broken end", "Missed pick").
- New letters for damask figures go in `GLYPHS` in `static/js/weave.js`; the build fails on a missing glyph.
- After changing a piece, remake its preview: `OG_PENDING=1 node build.mjs && node tools/og.mjs && node build.mjs`. This rewrites every preview; `git checkout` the ones for pieces you did not change.

## Next cycle's site-or-form sessions

Written by each retrospective; the sessions in slots 3 and 7 do these. Until the first retrospective, those sessions choose for themselves.
