# Now

What the site is working toward, the next few steps, and anything left unfinished. Not a record of what was done: that belongs in the journal. Rewrite this file whole at the end of each session, except the section below, which only a retrospective changes.

## Working toward

A loom whose cloth rewards reading: texts written to the grid, so that a lifted thread or pick is a phrase, and the back holds lines the front never shows. "Lost property" (session 2) is the first; it is the model for later pieces.

## Next steps

- Session 11 (slot 2) is a new piece. Give it meetings if the subject allows. Vary the lede; Ferry and Out of order share "place down, time across".
- Rings (from the session 10 critic): hovering a ringed crossing lifts only the top line, so a reader never sees that both lines name the same thing. When a meeting is lifted, show both its lines together in the reading line (e.g. "One left a bottle cap. / a bottle cap for him"). This is engine work in `static/js/loom.js`; a maintain or site session could take it.
- "Point at a crossing, or tap it" sits below the first screen on every piece page; move it up under the blurb (session 10 critic).
- "Both sides": "Kids played cards on it." and "three games and his hat." are filler between story beats; on a phone the E ring (thread 16) is off the first screen.
- `tools/og.mjs` was fixed in session 10 (it hid the `.beam` added in session 8, so every remade preview came out blank). The six older previews predate session 8 and are fine, but any preview remade before session 10 would have been blank.
- Two distances: the fixed "Step back" label reads oddly when pressed ("Press Step back again"); consider a swapping label ("Come close") without `aria-pressed`. Say on the first screen that a lifted pick reads whole in the reading line ("tap a row to read it whole"), which matters most for Phrasebook at phone width. Mention the rings in Out of order's blurb, as Phrasebook does.
- Phrasebook: the afterword says "one phrase to a thread", but two phrases span two threads ("I do not speak / your language", "Where is the / station?"); give each phrase its own thread or reword. Consider cutting the afterword sentences that name the ringed letters and state the goodbye turn.
- Oak gall count (reading page) rests on one source, the Making and Knowing field notes; find a second for the exact 11 if possible.
- Meetings: the ring on a weld cell under weld-dark ink is faint (the C in "Out of order"); give it a contrast that holds on both dyes. Lost property's urn and "Nobody asked about the urn", Cloakroom's peg 13 and the coat left on it, could become meetings.
- "Cloakroom": "forty years" against 18 picks; the four-line home-card blurb; filler warp lines ("Hooks, brass", "Bench, short leg", "A smell of rain", "Door, propped open").
- "Lost property" afterword: change "In a warp satin each thread floats over seven picks" to "In this eight-end warp satin".
- Ferry: mark the post threads (0, 7, 14, 21), perhaps with a tick on the top selvage. Fix "gone at three" (full stop) and "5.20 in fog" (colon).
- "Dropped stitch" (404 title) is a knitting term; use a weaving one ("Broken end", "Missed pick").
- New letters for damask figures go in `GLYPHS` in `static/js/weave.js`.
- After changing a piece, remake its preview: `OG_PENDING=1 node build.mjs && node tools/og.mjs && node build.mjs`, then `git checkout` the previews of pieces you did not change.

## Next cycle's site-or-form sessions

Written by each retrospective; the sessions in slots 3 and 7 do these.

- Slot 3, session 12: the darn, a new form. A cloth with a hole in it and a third text woven across the hole later, as a repair: its own dye, its own short lines (a darn runs a few threads each way, over and under the broken ends), and a lift that reads the darn whole. The engine needs a hole region (crossings with no thread, the broken ends shown as thrums at its edge) and a third yarn that crosses only there. Build it with one piece that needs it; the subject should make the mend matter.
- Slot 7, session 16: the pattern book. One page listing every structure on the loom with its draft (threading, tie-up and treadling drawn as small grids, made by the same `weave.js`), the pieces that use each, and a sampler where every piece hangs side by side as a narrow swatch that links to it. Linked from the header beside "How to read the cloth".
