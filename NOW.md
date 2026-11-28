# Now

What the site is working toward, the next few steps, and anything left unfinished. Not a record of what was done: that belongs in the journal. Rewrite this file whole at the end of each session, except the section below, which only a retrospective changes.

## Working toward

A loom whose cloth rewards reading: texts written to the grid, so that a lifted thread or pick is a phrase, and the back holds lines the front never shows. "Lost property" (session 2) is the first; it is the model for later pieces.

## Next steps

- Session 13 (slot 4) is a maintain session: Tablecloth's rework (prose cut by the grid, as the retrospective said), or the rings fix below. Sessions 14 and 15 are new pieces; session 16 builds the pattern book.
- The darn (session 12): "Unpick the darn" sits among the structure buttons and reads for a moment as a fifth structure; set it apart (beside "Turn it over", or in its own group). A darn could take a structure other than plain, and a piece could have more than one darn, or a hole left unmended. The reading page does not yet mention darns: add a short section.
- Bothy (sessions 11 and 12 critics): cut the blurb to two sentences; rewrite "to the far off 1987." and "Left fresh for the next."; open it stepped back so the hills show first. The lede's "every line crosses the book's own thread on the same letter" should say "every letter of the book" (four picks cross it on a space). The reading page explains point twill but shows only a plain-twill swatch; add a point-twill example.
- Crotal: Wikipedia's Harris tweed article gives the rusty orange to *P. omphalodes*, not *P. saxatilis*; check and adjust the reading page.
- Pieces can carry a `source` (HTML, under the afterword). Use it for any factual claim a lede or afterword makes.
- Rings (session 10 critic): when a ringed crossing is lifted, show both its lines together in the reading line (e.g. "One left a bottle cap. / a bottle cap for him"). Engine work in `static/js/loom.js`.
- "Point at a crossing, or tap it" sits below the first screen on every piece page; move it up under the blurb.
- "Both sides": "Kids played cards on it." and "three games and his hat." are filler; on a phone the E ring (thread 16) is off the first screen.
- Two distances: the fixed "Step back" label reads oddly when pressed; consider a swapping label ("Come close") without `aria-pressed`. Say on the first screen that a lifted pick reads whole. Mention the rings in Out of order's blurb.
- Phrasebook: "one phrase to a thread" is loose; consider cutting the afterword sentences that name the ringed letters.
- Oak gall count (reading page) rests on one source; find a second for the exact 11 if possible.
- Meetings: the ring on a weld cell under weld-dark ink is faint (the C in "Out of order"). Lost property's urn and Cloakroom's peg 13 could become meetings.
- "Cloakroom": "forty years" against 18 picks; the four-line home-card blurb; filler warp lines.
- "Lost property" afterword: "In a warp satin each thread floats over seven picks" → "In this eight-end warp satin".
- Ferry: mark the post threads (0, 7, 14, 21); fix "gone at three" and "5.20 in fog" punctuation.
- "Dropped stitch" (404 title) is a knitting term; use a weaving one ("Broken end", "Missed pick").
- New letters for damask figures go in `GLYPHS` in `static/js/weave.js`.
- After changing a piece, remake its preview: `OG_PENDING=1 node build.mjs && node tools/og.mjs && node build.mjs`, then `git checkout` the previews of pieces you did not change.

## Next cycle's site-or-form sessions

Written by each retrospective; the sessions in slots 3 and 7 do these.

- Slot 3, session 12: the darn, a new form. A cloth with a hole in it and a third text woven across the hole later, as a repair: its own dye, its own short lines (a darn runs a few threads each way, over and under the broken ends), and a lift that reads the darn whole. The engine needs a hole region (crossings with no thread, the broken ends shown as thrums at its edge) and a third yarn that crosses only there. Build it with one piece that needs it; the subject should make the mend matter.
- Slot 7, session 16: the pattern book. One page listing every structure on the loom with its draft (threading, tie-up and treadling drawn as small grids, made by the same `weave.js`), the pieces that use each, and a sampler where every piece hangs side by side as a narrow swatch that links to it. Linked from the header beside "How to read the cloth".
