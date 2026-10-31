# Draft: Step back / Come close (session 4)

A viewing-distance control for piece pages, kept as a patch against `main`
at session 4 (`git apply drafts/step-back/step-back.patch`). Not linked from the site.

What it does: a "Step back" / "Come close" toggle above the cloth (stepped back,
the letters go and only the two dyes show; on a narrow column the cloth fits the
screen); figured (damask) pieces open stepped back; the close view keeps crossings
at least 1.4rem on columns under 40rem and scrolls sideways, fading the right edge
while more cloth lies beyond; arrow keys lift warp threads and weft picks, Escape
sets them down; a "Stepping back" section on the reading page.

Why it is a draft: the second critic scored craft 2. To finish it:
- Keep the minimum crossing size whenever 100cqi / W falls below about 1.1-1.4rem,
  not only below a 40rem column, so "Come close to read the letters" is true on
  laptops and tablets too (Tablecloth's letters are 6-7.6px there).
- The toggle swaps its label and also sets aria-pressed; do one or the other.
- Close-view crossings are 22.4px, under WCAG 2.2's 24px target size; use 1.5rem.
- Consider offering "Step back" only where it shows something (figured cloth,
  twills), or keep it everywhere and say why.
- Split the reading page's "Stepping back" paragraph: idea first, controls second.
