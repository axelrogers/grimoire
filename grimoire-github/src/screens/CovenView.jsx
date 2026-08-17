import { useState } from "react";
import { COVEN, TESTIMONY, CATALOGUE } from "../data.js";
import CastSheet from "../components/CastSheet.jsx";

// ── COVEN · VOL. III — THE COVEN RECORD ───────────────────────────────────
// Ported to the prototype's composition (2026-08-17), following Browse: a
// ruled masthead, a volume card, rows with dotted leaders. The coven is a
// section of the same book, not a social feed bolted to the side of it.
//
// Two things from the prototype are deliberately NOT here.
//
// The trust numbers ("12,048 hands · 1,204 cast today", "341 gathered") are
// invented, and invented numbers were removed from this product on 3 Aug and
// do not come back through a composition port. Every figure below is counted
// from the data actually present.
//
// "Tonight's circle" — the dark CTA for a scheduled group casting — describes
// a feature that does not exist. Rendering it would be a promise the app can't
// keep. It comes back when circles do; the composition is in the prototype at
// the `isCovenCircle` branch, ready to port.

// A margin entry needs a real note in a real hand. Testimony carries both.
const MARGIN = TESTIMONY.filter((t) => t.note && t.who);

// The rank a hand carries, for the margin line — matched from the circle so
// the two surfaces never disagree about who someone is.
const rankOf = (name) => COVEN.find((c) => c.name === name)?.rank ?? null;

// The working a testimony refers to, so the margin can point back into the
// book at the page it was written on.
const pageOf = (title) => {
  const s = CATALOGUE.find((c) => c.title === title);
  return s?.page ? `p. ${s.page.replace(/[^0-9]/g, "")}` : null;
};

const PRACTITIONERS = COVEN.filter((c) => c.practitioner).length;

export default function CovenView({ C, S }) {
  const [castWith, setCastWith] = useState(null); // practitioner → their spell

  // A practitioner's "cast" routes into the same three-tap cast as everywhere
  // else, on a real working from their craft. The old code invented a $14
  // spell when nothing matched — a product that does not exist, at a price
  // nobody set. Now: no working, no button.
  const workingFor = (p) =>
    CATALOGUE.find(
      (s) => p.craft && p.craft.toLowerCase().includes(s.cat) && s.price > 0,
    ) || null;

  return (
    <>
      <div style={S.indexEyebrowRow}>
        <span style={S.indexRule} />
        <span style={S.indexEyebrow}>Vol. III — The Coven Record</span>
        <span style={S.indexRule} />
      </div>

      <div style={S.covenHead}>
        <div style={S.indexTitle}>The Coven</div>
        <div style={S.indexSub}>No one keeps a book alone.</div>
        <div style={S.covenCount}>
          {COVEN.length} {COVEN.length === 1 ? "hand" : "hands"} in your circle
          {PRACTITIONERS > 0 && ` · ${PRACTITIONERS} keeping workings`}
        </div>
      </div>

      {/* The margin — what the circle has written lately, in their words. */}
      {MARGIN.length > 0 && (
        <div style={{ ...S.volCard, marginTop: 18 }}>
          <div style={S.volLabel}>The margin</div>
          {MARGIN.map((t) => {
            const rank = rankOf(t.who);
            const page = pageOf(t.spell);
            return (
              <div key={t.id} style={S.marginRow}>
                <div style={S.marginTop}>
                  <span style={S.marginName}>{t.who}</span>
                  {rank && <span style={S.marginRank}>{rank}</span>}
                  <span style={S.marginWhen}>{t.when}</span>
                </div>
                <div style={S.marginNote}>&ldquo;{t.note}&rdquo;</div>
                <div style={S.marginRef}>
                  <span style={S.marginRefName}>{t.spell}</span>
                  {/* The leader only earns its place when it leads somewhere.
                      Not every testimony names a working that has a page yet. */}
                  {page && <span style={S.tocLeader} />}
                  {page && <span style={S.marginRefPage}>{page}</span>}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* The circle itself, as an index of hands. */}
      <div style={{ ...S.volCard, marginTop: 14 }}>
        <div style={S.volLabel}>The hands you keep</div>
        {COVEN.map((p) => {
          const working = p.practitioner ? workingFor(p) : null;
          return (
            <div key={p.id} style={S.handRow}>
              <span style={{ ...S.handGlyph, color: "var(--p-accent)" }}>{p.glyph}</span>
              <span style={S.handName}>{p.name}</span>
              <span style={S.tocLeader} />
              <span style={S.handCraft}>{p.practitioner ? p.craft : p.rank}</span>
              {working && (
                <button
                  style={{
                    ...S.castWithBtn,
                    borderColor: "var(--p-text)",
                    color: "var(--p-text)",
                  }}
                  onClick={() => setCastWith(working)}
                >
                  Cast
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Honest about its own size, the way the Grand Index is. */}
      <div style={S.covenFoot}>
        {MARGIN.length === 0
          ? "The margin is empty. It fills as the circle records what held."
          : `${MARGIN.length} ${MARGIN.length === 1 ? "entry" : "entries"} in the margin.`}
      </div>

      <button style={S.findMore}>Find practitioners to gather →</button>

      {castWith && (
        <CastSheet spell={castWith} C={C} S={S} onClose={() => setCastWith(null)} />
      )}
    </>
  );
}
