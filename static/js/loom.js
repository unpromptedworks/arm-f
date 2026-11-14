import { weave, thread, STRUCTURES } from "./weave.js";

const p = JSON.parse(document.getElementById("piece").textContent);
const cloth = document.querySelector(".cloth");
const cells = [...cloth.children];
const reading = document.querySelector(".reading");
const note = document.querySelector(".note.about");
let idle = reading.innerHTML;
let structure = p.structure;
let back = false;
let lifted = null;

let woven = weave(p, structure, back);

function draw() {
  woven = weave(p, structure, back);
  woven.forEach((cell, i) => {
    cells[i].textContent = cell.ch;
    cells[i].className = (cell.warp ? "" : "f") + (cell.meet ? " m" : "");
  });
  if (lifted) lift(...lifted);
}

function esc(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;");
}

// Raise one thread: show every character it carries, the hidden ones too.
function lift(kind, i) {
  lifted = [kind, i];
  const t = thread(p, structure, back, kind, i);
  cloth.classList.add("lifting");
  cells.forEach((el) => el.classList.remove("on", "under"));
  t.forEach((x, k) => {
    const idx = kind === "warp" ? k * p.W + i : i * p.W + k;
    const el = cells[idx];
    el.classList.add("on");
    if (!x.shown) {
      el.classList.add("under");
      el.textContent = x.ch;
      el.className = (kind === "warp" ? "" : "f") + (el.classList.contains("m") ? " m" : "") + " on under";
    }
  });
  const shown = t.filter((x) => x.shown).length;
  const label = kind === "warp"
    ? `Warp thread ${i + 1} of ${p.W} · ${p.warpLabel}`
    : `Weft pick ${i + 1} of ${p.H} · ${p.weftLabel}`;
  const text = t.map((x) => (x.shown ? esc(x.ch) : `<s>${esc(x.ch)}</s>`)).join("");
  reading.innerHTML =
    `<span class="which">${label} · ${shown} of ${t.length} on this face</span>` +
    `<span class="text">${text.replace(/ /g, "&nbsp;")}</span>`;
}

function drop() {
  if (!lifted) return;
  lifted = null;
  cloth.classList.remove("lifting");
  draw();
  reading.innerHTML = idle;
}

// The thread on top at the crossing under the pointer.
function at(e) {
  const el = e.target.closest(".cloth i");
  if (!el) return null;
  const i = cells.indexOf(el);
  return woven[i].warp ? ["warp", i % p.W] : ["weft", Math.floor(i / p.W)];
}

function same(a, b) {
  return a && b && a[0] === b[0] && a[1] === b[1];
}

cloth.addEventListener("pointermove", (e) => {
  if (e.pointerType !== "mouse") return;
  const t = at(e);
  if (!t || same(t, lifted)) return;
  // Moving along the lifted thread keeps it lifted.
  if (lifted && e.target.classList.contains("on")) return;
  lifted = null;
  draw();
  lift(...t);
});
cloth.addEventListener("pointerleave", (e) => {
  if (e.pointerType === "mouse") drop();
});
cloth.addEventListener("click", (e) => {
  const t = at(e);
  if (!t) return;
  if (lifted && e.target.classList.contains("on") && e.pointerType !== "mouse") return drop();
  lifted = null;
  draw();
  lift(...t);
});

document.querySelectorAll("[data-structure]").forEach((b) => {
  b.addEventListener("click", () => {
    structure = b.dataset.structure;
    document.querySelectorAll("[data-structure]").forEach((x) =>
      x.setAttribute("aria-pressed", String(x === b)));
    note.textContent = STRUCTURES[structure].note;
    draw();
  });
});

const turn = document.querySelector(".turn");
turn.addEventListener("click", () => {
  const flip = () => {
    back = !back;
    turn.setAttribute("aria-pressed", String(back));
    turn.textContent = back ? "Turn to the front" : "Turn it over";
    document.querySelector(".face").textContent = back ? "Back, mirrored so it reads" : "Front";
    draw();
  };
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return flip();
  cloth.classList.add("turning");
  setTimeout(() => { flip(); cloth.classList.remove("turning"); }, 260);
});

// Two viewing distances: close to, the letters; stepped back, the pattern.
const loom = document.querySelector(".loom.piece");
const distance = document.querySelector(".distance");
const HINT = {
  far: "Stepped back: only the two colours show. Press Step back again to come close and read the letters.",
  near: "Step back to see the pattern the two colours make.",
};
distance.addEventListener("click", () => {
  const far = loom.classList.toggle("far");
  loom.classList.toggle("near", !far);
  distance.setAttribute("aria-pressed", String(far));
  idle = idle.replace(/<span class="hint">[^<]*<\/span>/, `<span class="hint">${far ? HINT.far : HINT.near}</span>`);
  if (!lifted) reading.innerHTML = idle;
  setTimeout(edge, 500);
});

// Keys: left and right lift warp threads, up and down lift weft picks.
let at_warp = -1;
let at_weft = -1;
const beam = document.querySelector(".beam");
// Fade the right edge while more cloth lies beyond it.
function edge() {
  beam.classList.toggle("more", beam.scrollLeft + beam.clientWidth < beam.scrollWidth - 2);
}
beam.addEventListener("scroll", edge, { passive: true });
addEventListener("resize", edge);
edge();
cloth.addEventListener("keydown", (e) => {
  const step = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -1, ArrowDown: 1 }[e.key];
  if (e.key === "Escape") { drop(); return; }
  if (!step) return;
  e.preventDefault();
  let t;
  if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
    at_warp = lifted && lifted[0] === "warp" ? (lifted[1] + step + p.W) % p.W : at_warp < 0 ? 0 : at_warp;
    t = ["warp", at_warp];
  } else {
    at_weft = lifted && lifted[0] === "weft" ? (lifted[1] + step + p.H) % p.H : at_weft < 0 ? 0 : at_weft;
    t = ["weft", at_weft];
  }
  lifted = null;
  draw();
  lift(...t);
  if (t[0] === "warp") {
    const el = cells[t[1]];
    const x = el.offsetLeft - cloth.offsetLeft;
    if (x < beam.scrollLeft || x + el.offsetWidth > beam.scrollLeft + beam.clientWidth)
      beam.scrollLeft = x - beam.clientWidth / 2;
  }
});
