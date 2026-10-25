import { weave, thread, STRUCTURES } from "./weave.js";

const p = JSON.parse(document.getElementById("piece").textContent);
const cloth = document.querySelector(".cloth");
const cells = [...cloth.children];
const reading = document.querySelector(".reading");
const note = document.querySelector(".note.about");
const idle = reading.innerHTML;
let structure = p.structure;
let back = false;
let lifted = null;

let woven = weave(p, structure, back);

function draw() {
  woven = weave(p, structure, back);
  woven.forEach((cell, i) => {
    cells[i].textContent = cell.ch;
    cells[i].className = cell.warp ? "" : "f";
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
      el.className = (kind === "warp" ? "" : "f") + " on under";
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
