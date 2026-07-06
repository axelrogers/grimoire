import { useState } from "react";
import { THEME, FONTS, seg, makeStyles } from "./theme.js";
import TodayView from "./screens/TodayView.jsx";
import BrowseView from "./screens/BrowseView.jsx";
import CovenView from "./screens/CovenView.jsx";
import YouView from "./screens/YouView.jsx";

// ── APP SHELL ── owns theme + viewer + tab state, draws the phone frame and
// the persistent tab bar, and renders the active view. Screens live in
// src/screens/; shared cast components in src/components/.
const TABS = [
  { id: "today", label: "Today", glyph: "✦" },
  { id: "browse", label: "Browse", glyph: "⌕" },
  { id: "coven", label: "Coven", glyph: "◎" },
  { id: "you", label: "You", glyph: "☉" },
];

export default function App() {
  const [mode, setMode] = useState("day");
  const [isMember, setIsMember] = useState(true);
  const [tab, setTab] = useState("today");
  const C = THEME[mode];
  const S = makeStyles(C, mode);

  return (
    <div style={S.frame}>
      <style>{FONTS}</style>

      {/* Dev switcher — not part of the product UI */}
      <div style={S.switcher}>
        <span style={S.switcherLabel}>Viewer</span>
        <button style={seg(isMember, C)} onClick={() => setIsMember(true)}>
          Member
        </button>
        <button style={seg(!isMember, C)} onClick={() => setIsMember(false)}>
          Logged out
        </button>
      </div>

      <div style={S.phone}>
        <div style={S.viewport}>
          {tab === "today" && (
            <TodayView
              mode={mode}
              setMode={setMode}
              isMember={isMember}
              setIsMember={setIsMember}
              C={C}
              S={S}
            />
          )}
          {tab === "browse" && <BrowseView C={C} S={S} />}
          {tab === "coven" && <CovenView C={C} S={S} />}
          {tab === "you" && <YouView C={C} S={S} />}
        </div>

        {/* Persistent tab bar */}
        <div style={S.tabBar}>
          {TABS.map((t) => {
            const active = t.id === tab;
            return (
              <button
                key={t.id}
                style={S.tabBtn}
                onClick={() => setTab(t.id)}
              >
                <span
                  style={{
                    ...S.tabGlyph,
                    color: active ? C.gold : C.inkSoft,
                  }}
                >
                  {t.glyph}
                </span>
                <span
                  style={{
                    ...S.tabLabel,
                    color: active ? C.ink : C.inkSoft,
                    fontWeight: active ? 700 : 500,
                  }}
                >
                  {t.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
