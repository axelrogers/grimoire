// ─── Grimoire · Palettes ──────────────────────────────────────────────────
// Two modes — Day and Night. Locked brand language, NOT system dark-mode.
// Night is not an inversion: surfaces go to deep ink-blue, text to warm
// parchment, but the accents stay *lit*. Candlelight in a dark room.


// Two modes — Day and Night (locked brand language, not system dark-mode).
// Night is not an inversion: surfaces go to deep ink-blue, text to warm
// parchment, but the accents stay *lit* — gold glows, oxblood/sage deepen.
// Candlelight in a dark room, not a greyscale flip.
export const THEME = {
  day: {
    bgFrame: "#2A2622",
    parchment: "#F4EFE4",
    parchmentDeep: "#EBE3D3",
    ink: "#1B1714",
    inkSoft: "#4A423A",
    gold: "#B08544",
    goldDeep: "#8A6630",
    oxblood: "#6E2A2A",
    sage: "#5B6650",
    hair: "#D8CDB8",
    glow: "transparent", // no halo by day
  },
  night: {
    bgFrame: "#08060B",
    parchment: "#15131C", // card/base surface
    parchmentDeep: "#1E1B27", // raised surface
    ink: "#EDE6D6", // primary text (warm parchment)
    inkSoft: "#9C93A8", // secondary text (muted lilac-grey)
    gold: "#E0B868", // lifted, luminous
    goldDeep: "#C99B4A",
    oxblood: "#B65555", // deepened but still lit against dark
    sage: "#8AA07E",
    hair: "#2C2838",
    glow: "rgba(224,184,104,0.35)", // accent halo by night
  },
};
