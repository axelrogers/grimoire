import { useState, useEffect, useRef } from "react";
import { PALETTE_KEYS, tokensFor, paletteMeta, FONTS, seg, makeStyles } from "./theme.js";
import "./tokens.css";
import TodayView from "./screens/TodayView.jsx";
import BrowseView from "./screens/BrowseView.jsx";
import CovenView from "./screens/CovenView.jsx";
import YouView from "./screens/YouView.jsx";
import CastSheet from "./components/CastSheet.jsx";
import { CATALOGUE } from "./data.js";
import { usePractice } from "./store/usePractice.js";
import { paidClaim, heldClaim, holdClaim, releaseClaim } from "./payment.js";

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
  const [palette, setPalette] = useState("amethyst"); // default (Axel, 2026-08-03)
  const [isMember, setIsMember] = useState(true);
  const [tab, setTab] = useState("today");

  // Coming back from a Stripe payment link. The claim is read once at module
  // load (paidClaim memoises it), so this is safe during render; the cast then
  // resumes at the held beat in the sheet the caster would have seen had they
  // never left.
  const { session, backend, cast: recordCast } = usePractice();
  const [paidSpell, setPaidSpell] = useState(() => {
    const claim = paidClaim();
    if (!claim) return null;
    const spell = CATALOGUE.find((s) => s.id === claim.spellId);
    if (!spell) {
      console.warn("[grimoire] paid for an unknown spell:", claim.spellId);
      return null;
    }
    // They paid: they get the working now, session or no session. If it can't
    // be recorded yet, hold it — CastSheet's own record attempt will fail and
    // the effect below picks it up when they sign in.
    holdClaim(claim);
    return spell;
  });

  // The held cast, honoured. Runs when a session appears (including the
  // magic-link round trip landing back on the app).
  const honouring = useRef(false);
  useEffect(() => {
    const held = heldClaim();
    if (!held || honouring.current) return;
    if (backend === "supabase" && !session) return; // wait for the signature
    const spell = CATALOGUE.find((s) => s.id === held.spellId);
    if (!spell) return releaseClaim();
    honouring.current = true; // one write per page, whatever re-renders happen
    recordCast(spell)
      .then(releaseClaim)
      .catch((e) => {
        honouring.current = false; // let a later session try again
        console.error("[grimoire] held cast still not recorded:", e);
      });
  }, [session, backend, recordCast]);

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

          {/* Returned from Stripe: the working they paid for, resuming. */}
          {paidSpell && (
            <CastSheet
              spell={paidSpell}
              C={C}
              S={S}
              startAt="casting"
              onClose={() => setPaidSpell(null)}
            />
          )}
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
