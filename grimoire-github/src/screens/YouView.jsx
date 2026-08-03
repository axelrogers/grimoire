import { usePractice, when } from "../store/usePractice.js";

// ── YOU ── progression up top (rank, journey, Grimoins), practice below
// (cast history with the "did it work?" verdict). Pending casts are live —
// marking one feeds the success data that drives the whole trust mechanic.
export default function YouView({ S }) {
  // Real practice, from the store. Nothing here is sample data any more.
  const { casts, profile, rank, answer } = usePractice();
  const history = casts;
  const successRate = profile.rate;
  const answered = casts.filter((c) => c.worked !== null).length;
  const verdict = (id, worked) => answer(id, worked);

  return (
    <>
      <div style={S.todayHead}>
        <div style={S.eyebrow}>Your practice</div>
        <div style={S.todayTitle}>You</div>
      </div>

      {/* PROGRESSION */}
      <div style={S.youCrest}>
        <span style={{ ...S.youNumeral, color: "var(--p-accent)" }}>
          {rank.numeral}
        </span>
        <div style={S.youRankName}>{rank.name}</div>
        <div style={S.youProgressTrack}>
          <div
            style={{
              ...S.youProgressFill,
              width: `${Math.round(rank.progress * 100)}%`,
              background: "var(--p-accent)",
            }}
          />
        </div>
        <div style={S.youNext}>
          {rank.next ? `${rank.toNext} more to ${rank.next}` : "The last rank"}
        </div>
      </div>

      {/* Stat row */}
      <div style={S.youStats}>
        <div style={S.youStat}>
          <div style={{ ...S.youStatNum, color: "var(--p-accent)" }}>
            ◉ {profile.castCount}
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
          <div style={S.youStatSub}>
            {answered} of {casts.length} answered
          </div>
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
              <div style={S.covenLast}>{when(c.castAt)}</div>
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
