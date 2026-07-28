// ─── Grimoire · Style composer ────────────────────────────────────────────
// makeStyles builds the flat style object the whole app consumes as `S`.
// The slices live in sibling files, one per surface, and are merged here.
// Keys are flat and global — if you add one, make sure it's unique.

import { shellStyles } from "./shell.js";
import { castingStyles } from "./casting.js";
import { modulesStyles } from "./modules.js";
import { browseStyles } from "./browse.js";
import { castSheetStyles } from "./castSheet.js";
import { covenStyles } from "./coven.js";
import { youStyles } from "./you.js";

export const makeStyles = (mode = "day") => {
  // The Apple Pay sheet is system UI — it renders dark in dark mode.
  const n = mode === "night";
  const sheet = {
    bg: n ? "#1C1C1E" : "#fff",
    text: n ? "#fff" : "#111",
    textDim: n ? "#8E8E93" : "#888",
    hair: n ? "#2C2C2E" : "#EEE",
    close: n ? "#2C2C2E" : "#EFEFEF",
    closeText: n ? "#aaa" : "#555",
    btnBg: n ? "#fff" : "#000",
    btnText: n ? "#000" : "#fff",
    hint: n ? "#7C7C82" : "#999",
  };
  return {
    ...shellStyles(sheet),
    ...castingStyles(),
    ...modulesStyles(),
    ...browseStyles(),
    ...castSheetStyles(),
    ...covenStyles(),
    ...youStyles(),
  };
};
