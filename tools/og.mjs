// Make the preview images: a photograph of each piece's cloth, 1200x630.
// Run after changing a piece; the images are committed under static/og/.
//   OG_PENDING=1 node build.mjs && node tools/og.mjs && node build.mjs
import { createServer } from "node:http";
import { readFileSync, mkdirSync, existsSync, statSync } from "node:fs";
import { extname, join } from "node:path";
import { createRequire } from "node:module";
import { PIECES } from "../src/pieces.mjs";
// Playwright is preinstalled on the machine that makes the images, not a
// dependency of the site, so it is required from wherever it lives.
const { chromium } = createRequire(import.meta.url)("playwright");

const TYPES = { ".html": "text/html", ".css": "text/css", ".js": "text/javascript", ".woff2": "font/woff2", ".svg": "image/svg+xml" };
const server = createServer((req, res) => {
  let f = join("dist", decodeURIComponent(req.url.split("?")[0]));
  if (existsSync(f) && statSync(f).isDirectory()) f = join(f, "index.html");
  if (!existsSync(f)) return res.writeHead(404).end();
  res.writeHead(200, { "content-type": TYPES[extname(f)] || "application/octet-stream" }).end(readFileSync(f));
}).listen(0);
const base = `http://127.0.0.1:${server.address().port}`;
mkdirSync("static/og", { recursive: true });
const browser = await chromium.launch();
const pg = await browser.newPage({ viewport: { width: 1200, height: 630 } });
for (const p of PIECES) {
  await pg.goto(`${base}/pieces/${p.slug}/`);
  await pg.evaluate(() => document.fonts.ready);
  // Fill the frame with cloth, cropping the edges as a photograph of a bolt would.
  await pg.addStyleTag({ content: `
    body { margin: 0; overflow: hidden; }
    .frame > *:not(main), main > *:not(.loom), .loom > *:not(.cloth) { display: none !important; }
    .frame { padding: 0; max-width: none; }
    .loom { position: fixed; inset: 0; container-type: normal; }
    .cloth { width: 1300px !important; font-size: ${Math.round((1300 / p.W) * 0.72)}px !important; position: absolute; left: -50px; top: 50%; transform: translateY(-50%); box-shadow: none; transition: none !important; }
  ` });
  await pg.screenshot({ path: `static/og/${p.slug}.png` });
  console.log(`og/${p.slug}.png`);
}
await browser.close();
server.close();
