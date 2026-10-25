// The loom. Shared by the build (which weaves every page ahead of time) and
// the browser (which reweaves when a reader changes the structure or turns
// the cloth over). A cloth is W warp threads by H weft picks; at each
// crossing exactly one thread lies on top.

// Clean a text into yarn: uppercase, one space between words.
export function yarn(text) {
  return text.toUpperCase().replace(/\s+/g, " ").trim() + " ";
}

// Warp threads run down: thread c carries characters c*H .. c*H+H-1 of the
// warp yarn, wound round again when the yarn runs out.
export function warpChar(w, H, r, c) {
  return w[(c * H + r) % w.length];
}

// Weft picks run across: pick r carries characters r*W .. r*W+W-1.
export function weftChar(f, W, r, c) {
  return f[(r * W + c) % f.length];
}

const mod = (a, n) => ((a % n) + n) % n;

// 5x7 letters for figured cloth (damask). Add letters as pieces need them.
const GLYPHS = {
  A: ["01110", "10001", "10001", "11111", "10001", "10001", "10001"],
  E: ["11111", "10000", "10000", "11110", "10000", "10000", "11111"],
  H: ["10001", "10001", "10001", "11111", "10001", "10001", "10001"],
  O: ["01110", "10001", "10001", "10001", "10001", "10001", "01110"],
  M: ["10001", "11011", "10101", "10101", "10001", "10001", "10001"],
  S: ["01111", "10000", "10000", "01110", "00001", "00001", "11110"],
  T: ["11111", "00100", "00100", "00100", "00100", "00100", "00100"],
  Y: ["10001", "10001", "01010", "00100", "00100", "00100", "00100"],
};

// A figure mask: the word drawn in large letters, centred on the cloth.
export function figure(word, W, H, scale) {
  const gap = scale;
  const gw = 5 * scale;
  const total = word.length * gw + (word.length - 1) * gap;
  const x0 = Math.floor((W - total) / 2);
  const y0 = Math.floor((H - 7 * scale) / 2);
  return (r, c) => {
    const y = Math.floor((r - y0) / scale);
    if (r < y0 || y >= 7) return false;
    const x = c - x0;
    if (x < 0) return false;
    const i = Math.floor(x / (gw + gap));
    const xi = x - i * (gw + gap);
    if (i >= word.length || xi >= gw) return false;
    return GLYPHS[word[i]][y][Math.floor(xi / scale)] === "1";
  };
}

// Eight-end satin, counter 3: one binding point in every eight, never adjacent,
// so each float passes over seven threads.
const satinBind = (r, c) => mod(c * 3 - r, 8) === 0;

// Each structure answers one question: at this crossing, is the warp on top?
export const STRUCTURES = {
  plain: {
    name: "Plain",
    note: "Over one, under one. Each text shows exactly half of itself.",
    up: () => (r, c) => (r + c) % 2 === 0,
  },
  twill: {
    name: "Twill",
    note: "Over two, under two, stepping one each pick: diagonals.",
    up: () => (r, c) => mod(c - r, 4) < 2,
  },
  point: {
    name: "Point twill",
    note: "A twill that reverses direction every seven threads: chevrons.",
    up: () => (r, c) => {
      const k = mod(c, 14);
      const cc = k < 7 ? k : 14 - k;
      return mod(cc - r, 4) < 2;
    },
  },
  warpsatin: {
    name: "Warp satin",
    note: "The warp floats over seven picks at a time. Read down.",
    up: () => (r, c) => !satinBind(r, c),
  },
  weftsatin: {
    name: "Weft satin",
    note: "The weft floats over seven threads at a time. Read across.",
    up: () => (r, c) => satinBind(r, c),
  },
  damask: {
    name: "Damask",
    note: "Warp satin for the figure, weft satin for the ground.",
    up: (p) => {
      const fig = figure(p.figure, p.W, p.H, p.scale);
      return (r, c) => (fig(r, c) ? !satinBind(r, c) : satinBind(r, c));
    },
  },
};

// Weave a piece. Returns a flat array of cells, row by row. On the back the
// structure is inverted: every crossing that shows warp on the front shows
// weft behind. (The back is drawn as if seen in a mirror, so it reads.)
export function weave(p, structure, back = false) {
  const w = yarn(p.warp);
  const f = yarn(p.weft);
  const up = STRUCTURES[structure].up(p);
  const cells = [];
  for (let r = 0; r < p.H; r++) {
    for (let c = 0; c < p.W; c++) {
      const warpOnTop = up(r, c) !== back;
      cells.push({
        warp: warpOnTop,
        ch: warpOnTop ? warpChar(w, p.H, r, c) : weftChar(f, p.W, r, c),
      });
    }
  }
  return cells;
}

// Everything a thread carries, and which of its characters are on top.
export function thread(p, structure, back, kind, i) {
  const w = yarn(p.warp);
  const f = yarn(p.weft);
  const up = STRUCTURES[structure].up(p);
  const out = [];
  const n = kind === "warp" ? p.H : p.W;
  for (let k = 0; k < n; k++) {
    const r = kind === "warp" ? k : i;
    const c = kind === "warp" ? i : k;
    const warpOnTop = up(r, c) !== back;
    out.push({
      ch: kind === "warp" ? warpChar(w, p.H, r, c) : weftChar(f, p.W, r, c),
      shown: kind === "warp" ? warpOnTop : !warpOnTop,
    });
  }
  return out;
}
