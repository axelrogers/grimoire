import { useState } from "react";
import { PROFILE, HISTORY } from "../data.js";

// ── YOU ── progression up top (rank, journey, Grimoins), practice below
// (cast history with the "did it work?" verdict). Pending casts are live —
// marking one feeds the success data that drives the whole trust mechanic.
export default function YouView({ S }) {
  const [history, setHistory] = useState(HISTORY);

  const verdict = (id, worked) =>
    setHistory((h) => h.map((c) => (c.id === id ? { ...c, worked } : c)));

  const resolved = history.filter((c) => c.worked !== null);
  const workedCount = resolved.filter((c) => c.worked).length;
  const successRate = resolved.length
    ? Math.round((workedCount / resolved.length) * 100)
    : null;

  return (
    <>
      <div style={S.todayHead}>
        <div style={S.eyebrow}>Your practice</div>
        <div style={S.todayTitle}>You</div>
      </div>

      {/* PROGRESSION */}
      <div style={S.youCrest}>
        <span style={{ ...S.youNumeral, color: "var(--p-accent)" }}>
          {PROFILE.rankNumeral}
        </span>
        <div style={S.youRankName}>{PROFILE.rank}</div>
        <div style={S.youProgressTrack}>
          <div
            style={{
              ...S.youProgressFill,
              width: `${Math.round(PROFILE.progress * 100)}%`,
              background: "var(--p-accent)",
            }}
          />
        </div>
        <div style={S.youNext}>
          {Math.round((1 - PROFILE.progress) * 100)}% to {PROFILE.nextRank}
        </div>
      </div>

      {/* Stat row */}
      <div style={S.youStats}>
        <div style={S.youStat}>
          <div style={{ ...S.youStatNum, color: "var(--p-accent)" }}>
            ◉ {PROFILE.grimoins}
          </div>
          <div style={S.youStatLabel}>Grimoins</div>
          <button style={{ ...S.topUpBtn, color: "var(--p-litDeep)", borderColor: "var(--p-hair)" }}>
            Top up
          </button>
        </div>
        <div style={S.youStat}>
          <div style={{ ...S.youStatNum, color: "var(--p-accent)" }}>
            {successRate !== null ? `${successRate}%` : "—"}
          </div>
          <div style={S.youStatLabel}>Worked</div>
          <div style={S.youStatSub}>{resolved.length} resolved</div>
        </div>
      </div>

      {/* PRACTICE — cast history */}
      <div style={S.covenLabel}>
        <span style={S.moduleEyebrow}>Cast history</span>
      </div>
      <div style={S.covenList}>
        {history.map((c) => (
          <div key={c.id} style={S.histRow}>
            <span style={{ ...S.covenGlyph, color: "var(--p-accent)" }}>{c.glyph}</span>
            <div style={S.covenMid}>
              <div style={S.covenName}>{c.title}</div>
              <div style={S.covenLast}>{c.when}</div>
            </div>
            {c.worked === null ? (
              <div style={S.verdictBtns}>
                <button
                  style={{ ...S.verdictYes, borderColor: "var(--p-accent)", color: "var(--p-accent)" }}
                  onClick={() => verdict(c.id, true)}
                >
                  Worked
                </button>
                <button
                  style={{ ...S.verdictNo, borderColor: "var(--p-hair)", color: "var(--p-textSoft)" }}
                  onClick={() => verdict(c.id, false)}
                >
                  Not yet
                </button>
              </div>
            ) : c.worked ? (
              <span style={{ ...S.verdictTag, color: "var(--p-accent)" }}>✓ Worked</span>
            ) : (
              <span style={{ ...S.verdictTag, color: "var(--p-textSoft)" }}>Didn't</span>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
