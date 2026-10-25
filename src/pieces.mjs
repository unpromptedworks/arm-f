// The pieces, newest last. Each crosses a warp text (what stays: set up
// first, held under tension) with a weft text (what passes through).
// W and H are the cloth's threads and picks; dyes are named for the plants
// and insects that gave them.

export const DYES = {
  indigo: { name: "indigo", bg: "#25356a", fg: "#a3b0dc" },
  weld: { name: "weld", bg: "#dcba45", fg: "#6e5410" },
  madder: { name: "madder", bg: "#9c2f24", fg: "#f6ded6" },
  greige: { name: "undyed", bg: "#e3dccb", fg: "#3b352a" },
  walnut: { name: "walnut", bg: "#5a4130", fg: "#efe2d2" },
  logwood: { name: "logwood", bg: "#4b2f5c", fg: "#ece0f2" },
  woad: { name: "woad", bg: "#7d93ab", fg: "#14202d" },
};

export const PIECES = [
  {
    slug: "tablecloth",
    title: "Tablecloth",
    blurb: "Damask. The table stays; the meals pass over it. The cloth says what it was for.",
    W: 76,
    H: 37,
    structure: "damask",
    figure: "STAY",
    scale: 3,
    dyes: ["indigo", "weld"],
    warpLabel: "the table",
    weftLabel: "what was served on it",
    warp: `Oak, four leaves, one of them warped. A burn ring on the window side
      where the pan went down. A knife line where the bread was always cut.
      The drawer that sticks in August. It was in this kitchen before the
      kitchen was a kitchen. It will be carried out sideways.`,
    weft: `Sunday the soup. Monday whatever was left. A birthday with the
      wrong number of candles because we ran out. The will, read aloud, and
      the shouting after. Fractions, homework, a child in tears over
      sevenths. Eleven years the dog under it. Then no dog. Bread, always.`,
    afterword:
      "Damask is figured by contrast: the same two yarns, bound warp-up in the figure and weft-up in the ground. Turn the cloth over and the word is still there, in negative.",
  },
  {
    slug: "ferry",
    title: "Ferry",
    blurb: "Point twill. A pier, and the crossings it does not make.",
    W: 42,
    H: 28,
    structure: "point",
    dyes: ["walnut", "woad"],
    warpLabel: "the pier",
    weftLabel: "the crossings",
    warp: `The pier at the low town. Bollard, bell, tide board, a gull that
      owns the third post. Salt in the rail. The pier goes nowhere. That is
      the whole of its work and it does it every day.`,
    weft: `The seven ten with the nurses coming off nights. The eight forty
      with the school bags. The noon boat nearly empty. The last boat with
      the band, their drums in coats. Then the dark water doing the
      crossing by itself.`,
    afterword:
      "In a point twill the diagonal turns back on itself, so the cloth zigzags like a wake. Lift a pick to read one crossing; lift a thread to read the pier.",
  },
  {
    slug: "long-distance",
    title: "Long distance",
    blurb: "Plain weave. Two halves of a phone call; each side of the cloth hears half.",
    W: 34,
    H: 22,
    structure: "plain",
    dyes: ["madder", "greige"],
    warpLabel: "the one who stayed",
    weftLabel: "the one who left",
    warp: `The roses came back. The gate still wants your shoulder. Your
      room is as you left it, which means I go in and dust round the shape
      of you and come out again.`,
    weft: `The flat is small and the shop does not know my name yet. I walk
      home the long way so I have something to tell you. It is raining here
      too. I think it is the same rain.`,
    afterword:
      "Plain weave is the strictest structure: over one, under one. Neither voice is heard whole on either face. What the front drops, the back keeps.",
  },
];
