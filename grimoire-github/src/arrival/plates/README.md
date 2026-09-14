# Arrival plates

Drop a final painting here named for its slot and the arrival uses it at the
next build. No code change. Until a file exists, the slot draws its labelled
stand-in (`../standins.jsx`).

| slot | what | notes |
|---|---|---|
| `sky` | the sky behind the house | full frame, opaque |
| `moon` | a **full** disc, square | the phase is cut in code; placed by phase |
| `approach-front-day` / `-night` | the path up to the cottage door, tower and lamp | transparent above the skyline |
| `table-day` / `-night` | inside: the table where the book waits | opaque; the book itself is drawn in code |
| `lamplight` | light in the lamp room, doorway, windows | transparent overlay |
| `rain` / `mist` | weather overlays | transparent; rain also plays on the table plate's glass |

**Framing.** Portrait, painted to a 390 × 844 frame (paint at 3×: 1170 × 2532)
and cropped to fill, so keep anything important inside the middle ~80% of
height. Registration the code relies on: the door at (175, 530) — the
draw-in zooms to it — and the lamp room at (270, 222).

**Colour.** Paint neutral. The palette (amethyst / amber) is a grade applied
in code over the plates; day and night are separate plates.

Formats: `.webp` preferred, `.png`, `.jpg`, `.avif` also picked up.
Rules for making them: `docs/ARRIVAL.md` decision 5.
