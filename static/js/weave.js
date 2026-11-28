// The loom. Shared by the build (which weaves every page ahead of time) and
// the browser (which reweaves when a reader changes the structure or turns
// the cloth over). A cloth is W warp threads by H weft picks; at each
// crossing exactly one thread lies on top.

// Clean a text into yarn: uppercase, one space between words.
export function yarn(text) {
  return text.toUpperCase().replace(/\s+/g, " ").trim() + " ";
}

// A text written to the grid is an array of lines: one per warp thread (each
// at most H characters) or one per weft pick (at most W), padded with spaces
// so that every thread carries exactly one line.
export function spin(p, kind) {
  const text = kind === "warp" ? p.warp : p.weft;
  if (!Array.isArray(text)) return yarn(text);
  const n = kind === "warp" ? p.H : p.W;
  return text
    .map((line) => {
      const l = line.toUpperCase();
      if (l.length > n) throw new Error(`${kind} line longer than ${n}: ${line}`);
      return l.padEnd(n, " ");
    })
    .join("");
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

// A darn: a hole in the cloth, mended later with a third yarn. The original
// threads are lost inside it. The darner first lays strands down across the
// hole (one per lost warp thread), then weaves passes across them, over one,
// under one. It is one length of yarn, so one text: the laid strands' lines
// first (each at most d.h long), then the passes' (each at most d.w).
export function inDarn(p, r, c) {
  const d = p.darn;
  return !!d && r >= d.r && r < d.r + d.h && c >= d.c && c < d.c + d.w;
}

export function darnLines(d) {
  return d.lines.map((l, i) => {
    const n = i < d.w ? d.h : d.w;
    const u = l.toUpperCase();
    if (u.length > n) throw new Error(`darn line longer than ${n}: ${l}`);
    return u.padEnd(n, " ");
  });
}

// At a crossing inside the darn: is the laid strand on top, and what shows?
function darnCell(p, r, c, back) {
  const d = p.darn;
  const L = darnLines(d);
  const j = c - d.c, i = r - d.r;
  const laid = ((i + j) % 2 === 0) !== back;
  return { laid, ch: laid ? L[j][i] : L[d.w + i][j] };
}

// The whole darn, line by line, with which characters show on this face.
export function darn(p, back = false) {
  const d = p.darn;
  const L = darnLines(d);
  return L.map((line, n) =>
    [...line].map((ch, k) => {
      const [j, i] = n < d.w ? [n, k] : [k, n - d.w];
      return { ch, shown: (((i + j) % 2 === 0) !== back) === n < d.w };
    }));
}

// Weave a piece. Returns a flat array of cells, row by row. On the back the
// structure is inverted: every crossing that shows warp on the front shows
// weft behind. (The back is drawn as if seen in a mirror, so it reads.)
// With torn set, the darn is unpicked: the hole shows, and the broken ends
// (thrums) hang into it from the cloth round its edge.
export function weave(p, structure, back = false, torn = false) {
  const w = spin(p, "warp");
  const f = spin(p, "weft");
  const up = STRUCTURES[structure].up(p);
  const meets = new Set((p.meets || []).map(([r, c]) => r * p.W + c));
  const cells = [];
  for (let r = 0; r < p.H; r++) {
    for (let c = 0; c < p.W; c++) {
      if (inDarn(p, r, c)) {
        const d = p.darn;
        if (torn) {
          cells.push({ hole: true, ch: " ", thrums: [r === d.r && r > 0 ? "n" : "", r === d.r + d.h - 1 && r < p.H - 1 ? "s" : "", c === d.c && c > 0 ? "w" : "", c === d.c + d.w - 1 && c < p.W - 1 ? "e" : ""].join("") });
        } else {
          const x = darnCell(p, r, c, back);
          cells.push({ darn: true, laid: x.laid, ch: x.ch });
        }
        continue;
      }
      const warpOnTop = up(r, c) !== back;
      cells.push({
        warp: warpOnTop,
        ch: warpOnTop ? warpChar(w, p.H, r, c) : weftChar(f, p.W, r, c),
        meet: meets.has(r * p.W + c),
      });
    }
  }
  return cells;
}

// Everything a thread carries, and which of its characters are on top.
// Inside a darn the thread is gone: those characters are lost.
export function thread(p, structure, back, kind, i) {
  const w = spin(p, "warp");
  const f = spin(p, "weft");
  const up = STRUCTURES[structure].up(p);
  const out = [];
  const n = kind === "warp" ? p.H : p.W;
  for (let k = 0; k < n; k++) {
    const r = kind === "warp" ? k : i;
    const c = kind === "warp" ? i : k;
    if (inDarn(p, r, c)) {
      out.push({ ch: "·", shown: false, lost: true });
      continue;
    }
    const warpOnTop = up(r, c) !== back;
    out.push({
      ch: kind === "warp" ? warpChar(w, p.H, r, c) : weftChar(f, p.W, r, c),
      shown: kind === "warp" ? warpOnTop : !warpOnTop,
    });
  }
  return out;
}

// The classes a crossing wears: weft on top (f), a meeting (m), the darn (d,
// with x where its pass is on top), or the hole and its thrums (h, t-n...).
export function cls(cell) {
  if (cell.hole) return ["h", ...[...cell.thrums].map((t) => "t" + t)].join(" ");
  if (cell.darn) return cell.laid ? "d" : "d x";
  return [cell.warp ? "" : "f", cell.meet ? "m" : ""].filter(Boolean).join(" ");
}
