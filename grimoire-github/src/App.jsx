import { useState } from "react";
import { PALETTE_KEYS, tokensFor, paletteMeta, FONTS, seg, makeStyles } from "./theme.js";
import "./tokens.css";
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
  const [palette, setPalette] = useState("amber");
  const [isMember, setIsMember] = useState(true);
  const [tab, setTab] = useState("today");

  // The semantic layer. Setting the tokens on the frame (rather than :root)
  // scopes the whole design system to the app subtree — nothing leaks, and
  // two palettes could render side by side if we ever wanted to compare them.
  const tokens = tokensFor(palette, mode);
  const C = paletteMeta(palette, mode);
  const S = makeStyles(mode);

  return (
    <div style={{ ...S.frame, ...tokens }}>
      <style>{FONTS}</style>

      {/* Dev switcher — not part of the product UI */}
      <div style={S.switcher}>
        <span style={S.switcherLabel}>Viewer</span>
        <button style={seg(isMember)} onClick={() => setIsMember(true)}>
          Member
        </button>
        <button style={seg(!isMember)} onClick={() => setIsMember(false)}>
          Logged out
        </button>
        <span style={S.switcherLabel}>Palette</span>
        {PALETTE_KEYS.map((k) => (
          <button key={k} style={seg(palette === k)} onClick={() => setPalette(k)}>
            {k[0].toUpperCase() + k.slice(1)}
          </button>
        ))}
      </div>

      <div style={S.phone}>
        {/* Ambient glow, behind everything */}
        <div style={S.glowA} />
        <div style={S.glowB} />

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
          {tab === "you" && <YouView S={S} />}
        </div>

        {/* Persistent tab bar */}
        <div style={S.tabBar}>
          {TABS.map((t) => {
            const active = t.id === tab;
            return (
              <button
                key={t.id}
                style={{ ...S.tabBtn, ...(active ? S.tabBtnActive : {}) }}
                onClick={() => setTab(t.id)}
              >
                <span
                  style={{
                    ...S.tabGlyph,
                    color: active ? "var(--p-accent)" : "var(--p-textSoft)",
                  }}
                >
                  {t.glyph}
                </span>
                <span
                  style={{
                    ...S.tabLabel,
                    color: active ? "var(--p-text)" : "var(--p-textSoft)",
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
