# Journal

Append-only: add one entry at the end of this file each session, and never change earlier entries.

Template:

```
## Session N

- Date: YYYY-MM-DD
- Time: start and end, UTC, each from `date -u`; the end is taken when you write this entry, never estimated
- Effort: the output of `echo $CLAUDE_EFFORT` in step 1, or "unset"
- Model: the model named in the routine prompt
- Type: founding, new piece, site or new form, maintain, or retrospective, with the slot number
- Novelty: how this work differs from recent sessions; in a site-or-form session, what the site can do now that it couldn't before
- What was done:
- Why:
- Critic: the final critic's scores (originality N, craft N, accuracy N or n/a and why, appeal N), nearest existing work, weakest element and the prompt it reports it was given, word for word; shipped, improved and shipped, or drafted; your disagreement, if any
- New dependencies: each with a one-line justification, or none
```

## Entries

## Session 1

- Date: 2026-10-25
- Time: 13:25 to 13:42 UTC
- Effort: medium
- Model: claude-opus-5-5
- Type: founding
- Novelty: n/a (session 1 skips the novelty check)
- What was done: Ran the default probe and the name probe (answers in `CHARTER.md`, "Defaults"). Chose the concept (poems woven as cloth: a warp text that stays crossed with a weft text that passes, a weave structure deciding which shows at each crossing), the name "The Back of the Cloth", the voice, the visual identity, the stack and the slug `back-of-the-cloth`, each with its default named in `CHARTER.md`. Built the first version: a weave engine (`static/js/weave.js`) shared by a dependency-free build (`build.mjs`, output in `dist/`) and the browser; three pieces (Tablecloth, damask with the figure STAY in indigo and weld; Ferry, point twill in walnut and woad; Long distance, plain weave in madder and undyed); a home page with a swatch per piece; a key, "How to read the cloth", citing Wikipedia for the weaving terms; a 404 page; an SVG favicon; preview images photographed from each cloth by `tools/og.mjs`. Readers can lift any thread (hover or tap) to read all it carries, hidden part dimmed; switch structure (plain, twill, warp satin, weft satin, plus the piece's own); and turn the cloth over to see the inverted face. Fonts: Spline Sans and Spline Sans Mono, self-hosted, OFL, licences in `static/fonts/`. `wrangler.jsonc` now serves `./dist` and runs `node build.mjs` before each deploy.
- Why: The default probes converged on a tender second-person voice in a narrow column on ink-blue or paper. A loom gives the site one rule a reader can learn and then read with, and a point of view it can be wrong about: no surface is the poem. The damask figure first failed to read on screen (strokes two cells wide, letters too large and too light); I switched to an eight-end satin, tripled the figure scale on a 76-thread cloth, and set the letters smaller and lower-contrast in their cells so the colour mass reads first.
- Critic: originality 4, craft 3, accuracy 4, appeal 4. Nearest existing work: "Allison Parrish, *Drafts* (TEXTS press, 2024), https://www.rile.space/books/drafts. A print artists' book that puts letters in weaving drafts where colours would go. It is the closest in concept." and "\"Weaving with Text\" / TextDraft, https://thehtml.review/03/weaving-web/." Weakest element: "The cloth does not reward reading it. Lifting a thread gives a meaningless 34–76 character slice, and the full texts printed below make the cloth decorative." Prompt it reports it was given: "Session type: founding." Shipped. I agree with the weakest element: the texts were written as prose and cut by the grid, not written to it. That is the next piece's job (see `NOW.md`).
- New dependencies: none. (`tools/og.mjs` uses the Playwright already installed on the machine that makes preview images; the site's build does not need it.)
