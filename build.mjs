// Build: weave every page ahead of time into dist/. No dependencies.
import { mkdirSync, rmSync, writeFileSync, cpSync, existsSync } from "node:fs";
import { weave, spin, STRUCTURES } from "./static/js/weave.js";
import { PIECES, DYES } from "./src/pieces.mjs";

const SITE = "The Back of the Cloth";
const ORIGIN = "https://back-of-the-cloth.unpromptedworks.com";
const OUT = "dist";

const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function page({ path, title, description, image, body, script = "" }) {
  const full = title === SITE ? SITE : `${title} · ${SITE}`;
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>${esc(full)}</title>
<meta name="description" content="${esc(description)}">
<meta property="og:type" content="website">
<meta property="og:title" content="${esc(full)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:image" content="${ORIGIN}/og/${image}.png">
<meta property="og:url" content="${ORIGIN}${path}">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="preload" href="/fonts/spline-sans-mono.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/css/site.css">
</head>
<body>
<div class="frame">
<header class="selvage"><a class="site" href="/">${SITE}</a><nav><a href="/reading/">How to read the cloth</a></nav></header>
${body}
<footer class="selvage"><span>Woven in the browser from two texts at a time</span><a href="https://unpromptedworks.com/#about">An AI made this site</a></footer>
</div>
${script}
</body>
</html>
`;
}

function dyeVars(p) {
  const [a, b] = p.dyes.map((d) => DYES[d]);
  const cell = p.cell ? `;--cell:${p.cell}rem` : "";
  return `--W:${p.W};--a:${a.bg};--af:${a.fg};--b:${b.bg};--bf:${b.fg}${cell}`;
}

function cloth(p, structure = p.structure, attrs = "") {
  const cells = weave(p, structure)
    .map((c) => (c.warp ? `<i>${esc(c.ch)}</i>` : `<i class="f">${esc(c.ch)}</i>`))
    .join("");
  return `<div class="cloth" style="${dyeVars(p)}"${attrs}>${cells}</div>`;
}

// The two texts unwoven. A text written to the grid is listed thread by
// thread and folded away, so the cloth is read first.
function yarns(p, a, b) {
  const text = (t) =>
    Array.isArray(t) ? `<ol>${t.map((l) => `<li>${esc(l)}</li>`).join("")}</ol>` : `<p>${esc(t.replace(/\s+/g, " ").trim())}</p>`;
  const inner = `<section class="yarns">
<div><h2><span class="chip" style="background:${a.bg}"></span>Warp, in ${a.name}: ${esc(p.warpLabel)}</h2>${text(p.warp)}</div>
<div><h2><span class="chip" style="background:${b.bg}"></span>Weft, in ${b.name}: ${esc(p.weftLabel)}</h2>${text(p.weft)}</div>
</section>`;
  return Array.isArray(p.warp) ? `<details class="unwoven"><summary>Unweave it: both texts, thread by thread</summary>${inner}</details>` : inner;
}

function piecePage(p, n) {
  const [a, b] = p.dyes.map((d) => DYES[d]);
  const choices = [p.structure, ...["plain", "twill", "warpsatin", "weftsatin"].filter((s) => s !== p.structure)];
  const buttons = choices
    .map((s) => `<button type="button" data-structure="${s}" aria-pressed="${s === p.structure}">${STRUCTURES[s].name}</button>`)
    .join("");
  const data = { ...p, warp: p.warp, weft: p.weft };
  const prev = PIECES[n - 1];
  const next = PIECES[n + 1];
  const body = `
<main>
<h1>${esc(p.title)}</h1>
<p class="lede">${esc(p.blurb)}</p>
<div class="loom">
<p class="note face" aria-live="polite">Front</p>
${cloth(p, p.structure, ' aria-label="The woven cloth: two texts crossed. Both texts are given in full below."')}
<p class="reading" aria-live="polite"><span class="which">${p.W} warp threads, ${p.H} weft picks</span>Point at a crossing, or tap it, to lift the thread on top and read everything it carries, the hidden part too.</p>
</div>
<div class="controls" role="group" aria-label="Structure">${buttons}<button type="button" class="turn" aria-pressed="false">Turn it over</button></div>
<p class="note about" aria-live="polite">${esc(STRUCTURES[p.structure].note)}</p>
${yarns(p, a, b)}
<section class="after"><h2>On the structure</h2><p>${esc(p.afterword)}</p></section>
<p class="selvage" style="border:0;margin-top:2rem">${prev ? `<a href="/pieces/${prev.slug}/">← ${esc(prev.title)}</a>` : "<span></span>"}${next ? `<a href="/pieces/${next.slug}/">${esc(next.title)} →</a>` : "<span></span>"}</p>
</main>`;
  const script = `<script type="application/json" id="piece">${JSON.stringify(data).replace(/</g, "\\u003c")}</script>
<script type="module" src="/js/loom.js"></script>`;
  return page({ path: `/pieces/${p.slug}/`, title: p.title, description: p.blurb, image: p.slug, body, script });
}

function indexPage() {
  const items = PIECES.map(
    (p) => `<li><a href="/pieces/${p.slug}/"><div class="loom">${cloth(p, p.structure, ' aria-hidden="true"')}</div><span class="t">${esc(p.title)}</span><span class="b">${esc(p.blurb)}</span></a></li>`
  ).join("\n");
  const body = `
<main>
<h1>Every surface hides the other text.</h1>
<p class="lede">Each piece here is cloth woven from two texts. The warp is what stays, strung first and held under tension. The weft is what passes through it. At every crossing one of them is on top, and the one underneath shows on the back. Neither face is the poem. Lift a thread to read it whole; turn the cloth over to read what the front kept back.</p>
<ul class="pieces">
${items}
</ul>
</main>`;
  return page({
    path: "/",
    title: SITE,
    description: "Poems woven as cloth: two texts crossed through a weave structure, readable thread by thread and from both sides.",
    image: PIECES[0].slug,
    body,
  });
}

function readingPage() {
  const demo = {
    W: 12, H: 8, dyes: ["indigo", "weld"],
    warp: "down", weft: "across",
  };
  const ex = (s) => `<div class="loom demo">${cloth({ ...demo, figure: "", scale: 1 }, s, ' aria-hidden="true"')}</div>`;
  const body = `
<main class="prose">
<h1>How to read the cloth</h1>
<p class="lede">A short key to the pieces. Nothing here is needed to read them, but it helps to know which way the threads run.</p>
<h2>Warp and weft</h2>
<p>On a loom the warp threads are strung first, lengthwise, and held still under tension; the weft is drawn across through them, over and under. Here the warp text runs down the cloth, one column per thread, and the weft text runs across it, one row per pick. When a text runs out it is wound round again, as yarn is.</p>
${ex("plain")}
<p>Above, in plain weave, the warp is indigo and the weft is weld. Every crossing shows one letter, from whichever thread is on top.</p>
<h2>Lifting a thread</h2>
<p>Point at a crossing (or tap it) and the thread on top there is lifted out of the cloth: the reading line under the cloth gives every character it carries, the hidden ones dimmed and ringed. On a phone, tap the lifted thread again to set it down.</p>
<h2>Structures</h2>
<p>A structure is the rule for which thread is on top at each crossing. Plain weave goes over one, under one. Twill goes over two, under two, and steps along each pick, which draws diagonals.</p>
${ex("twill")}
<p>Satin lets one set of threads float over several of the other (seven, here) before it is bound down, so one text covers nearly the whole face: a warp satin reads down, a weft satin reads across.</p>
${ex("weftsatin")}
<p>Damask uses both satins in one cloth: warp-faced in the figure and weft-faced in the ground, so a large shape appears made of the two texts' contrast. It is reversible; on the back the figure is still there, in negative.</p>
<h2>The back</h2>
<p>Wherever the front shows the warp, the back shows the weft, and the other way round. Front and back together carry both texts complete. The back is drawn as if seen in a mirror, so its letters read left to right.</p>
<h2>Dyes</h2>
<p>Each piece is dyed in two colours named for historical dyestuffs: indigo, woad, weld, madder, logwood, walnut, and undyed cloth. The screen colours are approximations, not measurements of dyed fibre.</p>
<p class="src">Sources for the weaving terms: Wikipedia, <a href="https://en.wikipedia.org/wiki/Warp_and_weft">Warp and weft</a>, <a href="https://en.wikipedia.org/wiki/Satin_weave">Satin weave</a> and <a href="https://en.wikipedia.org/wiki/Damask">Damask</a> (CC BY-SA 4.0), read October 2026. Type: Spline Sans and Spline Sans Mono by the Spline Sans Project Authors, SIL Open Font License 1.1 (<a href="/fonts/OFL-spline-sans.txt">licence</a>, <a href="/fonts/OFL-spline-sans-mono.txt">licence</a>).</p>
</main>`;
  return page({
    path: "/reading/",
    title: "How to read the cloth",
    description: "A key to the woven pieces: warp and weft, lifting a thread, weave structures, and the back of the cloth.",
    image: PIECES[0].slug,
    body,
  });
}

function notFound() {
  return page({
    path: "/404.html",
    title: "Dropped stitch",
    description: "This page is not on the loom.",
    image: PIECES[0].slug,
    body: `<main><h1>Dropped stitch.</h1><p class="lede">Nothing is woven at this address. <a href="/">Back to the pieces.</a></p></main>`,
  });
}

// Favicon: a four-by-four twill in indigo and weld.
function favicon() {
  let rects = "";
  for (let r = 0; r < 4; r++)
    for (let c = 0; c < 4; c++)
      rects += `<rect x="${c * 8}" y="${r * 8}" width="8" height="8" fill="${(((c - r) % 4) + 4) % 4 < 2 ? DYES.indigo.bg : DYES.weld.bg}"/>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">${rects}</svg>`;
}

// Checks: a page with a missing structure or dye, or a figure letter the
// loom has no glyph for, fails the build rather than weaving nonsense.
for (const p of PIECES) {
  if (!STRUCTURES[p.structure]) throw new Error(`${p.slug}: unknown structure ${p.structure}`);
  for (const d of p.dyes) if (!DYES[d]) throw new Error(`${p.slug}: unknown dye ${d}`);
  if (!spin(p, "warp").trim() || !spin(p, "weft").trim()) throw new Error(`${p.slug}: empty yarn`);
  if (Array.isArray(p.warp) && p.warp.length !== p.W) throw new Error(`${p.slug}: ${p.warp.length} warp lines for ${p.W} threads`);
  if (Array.isArray(p.weft) && p.weft.length !== p.H) throw new Error(`${p.slug}: ${p.weft.length} weft lines for ${p.H} picks`);
  weave(p, p.structure);
}

rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });
cpSync("static", OUT, { recursive: true });
const write = (path, s) => {
  mkdirSync(`${OUT}/${path}`.replace(/\/[^/]*$/, ""), { recursive: true });
  writeFileSync(`${OUT}/${path}`, s);
};
write("index.html", indexPage());
write("reading/index.html", readingPage());
write("404.html", notFound());
write("favicon.svg", favicon());
PIECES.forEach((p, n) => write(`pieces/${p.slug}/index.html`, piecePage(p, n)));
if (!process.env.OG_PENDING)
  for (const p of PIECES)
    if (!existsSync(`${OUT}/og/${p.slug}.png`)) throw new Error(`missing preview image og/${p.slug}.png (run node tools/og.mjs)`);
console.log(`built ${PIECES.length} pieces into ${OUT}/`);
