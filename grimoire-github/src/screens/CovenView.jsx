import { useState } from "react";
import { COVEN, TESTIMONY, CATALOGUE } from "../data.js";
import CastSheet from "../components/CastSheet.jsx";

// ── COVEN ── your circle. Members and practitioners; practitioners carry a
// success rate and a "cast with them" affordance. Testimony from the circle
// is woven in — where community meets the trust mechanic. Plus a way to grow.
export default function CovenView({ C, S }) {
  const [castWith, setCastWith] = useState(null); // practitioner → their spell

  // a practitioner's "cast with" routes into the same three-tap cast,
  // pre-filled with a representative spell from their craft.
  const openCast = (p) => {
    const spell = CATALOGUE.find((s) => p.craft && p.craft.toLowerCase().includes(s.cat))
      || { id: p.id, cat: "protection", title: `Work with ${p.name.split(" ")[0]}`, sub: p.craft, price: 14, rate: p.rate, glyph: p.glyph };
    setCastWith(spell);
  };

  return (
    <>
      <div style={S.todayHead}>
        <div style={S.headRow}>
          <div>
            <div style={S.eyebrow}>Your circle</div>
            <div style={S.todayTitle}>Coven</div>
          </div>
          <button style={S.inviteBtn}>+ Gather</button>
        </div>
      </div>

      {/* Testimony from the circle */}
      {TESTIMONY.length > 0 && (
        <div style={S.testimonyWrap}>
          <div style={S.moduleEyebrow}>Worked, lately</div>
          {TESTIMONY.map((t) => (
            <div key={t.id} style={S.testimony}>
              <div style={S.testimonyNote}>"{t.note}"</div>
              <div style={S.testimonyMeta}>
                <strong style={S.testimonyWho}>{t.who}</strong> · {t.spell} ·{" "}
                {t.when}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* The circle */}
      <div style={S.covenLabel}>
        <span style={S.moduleEyebrow}>Your coven · {COVEN.length}</span>
      </div>
      <div style={S.covenList}>
        {COVEN.map((p) => (
          <div key={p.id} style={S.covenRow}>
            <span style={{ ...S.covenGlyph, color: C.gold }}>{p.glyph}</span>
            <div style={S.covenMid}>
              <div style={S.covenNameRow}>
                <span style={S.covenName}>{p.name}</span>
                {p.practitioner && (
                  <span style={{ ...S.covenBadge, color: C.sage, borderColor: C.hair }}>
                    {p.rate}%
                  </span>
                )}
              </div>
              <div style={S.covenLast}>
                <span style={{ ...S.covenNumeral, color: C.goldDeep }}>
                  {p.numeral}
                </span>{" "}
                {p.practitioner ? p.craft : p.last} · {p.when}
              </div>
            </div>
            {p.practitioner ? (
              <button
                style={{ ...S.castWithBtn, borderColor: C.ink, color: C.ink }}
                onClick={() => openCast(p)}
              >
                Cast
              </button>
            ) : (
              <span style={{ ...S.covenRank, color: C.inkSoft }}>{p.rank}</span>
            )}
          </div>
        ))}
      </div>

      {/* Grow the circle */}
      <button style={S.findMore}>Find practitioners to gather →</button>

      {castWith && (
        <CastSheet
          spell={castWith}
          C={C}
          S={S}
          onClose={() => setCastWith(null)}
        />
      )}
    </>
  );
}
