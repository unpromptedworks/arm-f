# Now

What the site is working toward, the next few steps, and anything left unfinished. Not a record of what was done: that belongs in the journal. Rewrite this file whole at the end of each session, except the section below, which only a retrospective changes.

## Working toward

A loom whose cloth rewards reading: texts written to the grid, so that a lifted thread or pick is a phrase, and the back holds lines the front never shows.

## Next steps

- Write the next pieces to the grid. Choose W and H first, then write the weft so each pick is a whole phrase (Ferry's afterword promises "lift a pick to read one crossing" and the pick does not deliver it), and the warp so each thread reads down as one. Consider letting the cloth hold the only full copy: hide the printed yarns until the reader turns the cloth over, or drop them.
- Rework Ferry (a maintain session) so each pick is one crossing, as its afterword says.
- Figures are faint at desktop size (Tablecloth's STAY, Ferry's chevrons are clearer in the home-page thumbnails). Try lighter letters inside the cloth, a toggle that hides the letters, or a larger cell at desktop.
- The key lists logwood among the dyes, but no piece uses it: use logwood in the next piece, or remove it from the list.
- "Dropped stitch" (404 title) is a knitting term on a weaving site; use a weaving one ("Broken end", "Missed pick").
- Keyboard access to lifting threads: arrow keys to move along threads and lift.
- New letters for damask figures go in `GLYPHS` in `static/js/weave.js`; the build fails on a missing glyph.
- After changing a piece, remake its preview: `OG_PENDING=1 node build.mjs && node tools/og.mjs && node build.mjs`.

## Next cycle's site-or-form sessions

Written by each retrospective; the sessions in slots 3 and 7 do these. Until the first retrospective, those sessions choose for themselves.
