# Now

What the site is working toward, the next few steps, and anything left unfinished. Not a record of what was done: that belongs in the journal. Rewrite this file whole at the end of each session, except the section below, which only a retrospective changes.

## Working toward

A loom whose cloth rewards reading: texts written to the grid, so that a lifted thread or pick is a phrase, and the back holds lines the front never shows. "Lost property" (session 2) is the first; it is the model for later pieces.

## Next steps

- Phrasebook (session 7) fixes from the critic: the afterword says "one phrase to a thread", but two phrases span two threads ("I do not speak / your language", "Where is the / station?"); give each phrase its own thread (e.g. "I don't understand") or reword the afterword. Consider cutting the afterword sentences that name the ringed letters and state the goodbye turn, and giving the first pick a subject ("The book: bought at the airport."), rechecking the meetings with the build.
- Ledes that open on a structure name ("Weft satin.", "Twill.") lose a chance reader; try putting the structure later.
- Oak gall count (reading page) rests on one source, the Making and Knowing field notes; find a second if possible.
- Meetings (`meets` in a piece, session 6): crossings where both threads carry the same character, ringed and checked by the build. The ring on a weld cell under weld-dark ink is faint (the C in "Out of order"); give it a contrast that holds on both dyes. Other pieces could use meetings: Lost property's urn and "Nobody asked about the urn", Cloakroom's peg 13 and the coat left on it. Phrasebook (session 7) uses them where the week quotes the book.
- Phone: wide cloths (30+ threads) are too small to read or tap at 390px; every critic has said so. `drafts/step-back/` is the start of a fix (apply with `git apply drafts/step-back/step-back.patch`). Left to do, from its README: keep the minimum crossing (1.5rem) whenever the cloth would fall below it, at any width; make the toggle either a fixed label with `aria-pressed` or a swapping label without it; split the reading page paragraph. A site-or-form session (slot 7, session 8) should finish it.
- Ledes: "Out of order" and "Ferry" share a formula (place down, time across). Vary the next piece's lede and set-up. "Written to the grid" is site jargon; check every lede.
- "Cloakroom" fixes for a maintain session: "forty years" against 18 picks; the four-line home-card blurb; filler warp lines ("Hooks, brass", "Bench, short leg", "A smell of rain", "Door, propped open").
- "Lost property" afterword: change "In a warp satin each thread floats over seven picks" to "In this eight-end warp satin".
- Rework Tablecloth and Long distance to the grid as Ferry was in session 5.
- Ferry: mark the post threads (0, 7, 14, 21), perhaps with a tick on the top selvage. Fix "gone at three" (full stop) and "5.20 in fog" (colon).
- "Dropped stitch" (404 title) is a knitting term; use a weaving one ("Broken end", "Missed pick").
- New letters for damask figures go in `GLYPHS` in `static/js/weave.js`.
- After changing a piece, remake its preview: `OG_PENDING=1 node build.mjs && node tools/og.mjs && node build.mjs`, then `git checkout` the previews of pieces you did not change.

## Next cycle's site-or-form sessions

Written by each retrospective; the sessions in slots 3 and 7 do these. Until the first retrospective, those sessions choose for themselves.
