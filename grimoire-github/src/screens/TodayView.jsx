import { useState, useEffect } from "react";
import { HEROES, selectStrategy, DAILY_CARD, COMMUNITY, FEATURED } from "../data.js";
import { ApplePaySheet, CastingBeat, SuccessState } from "../components/CastFunnel.jsx";
import { usePractice, when } from "../store/usePractice.js";
import { beginPayment, isPaidLive } from "../payment.js";

// "Tonight" reads wrong mid-sentence; the ask row wants "last night".
const whenLower = (ts) => {
  const w = when(ts);
  return w === "Tonight" ? "last night" : w.charAt(0).toLowerCase() + w.slice(1);
};

export default function TodayView({ mode, setMode, isMember, setIsMember, C, S }) {
  const { cast: recordCast, session, backend, asks, answer } = usePractice();
  const [needsSign, setNeedsSign] = useState(false);
  const mustSign = backend === "supabase" && !session;
  // Funnel state. idle → pay → cast(tap3) → casting[hold→send] → done
  const [step, setStep] = useState("idle");
  const [phase, setPhase] = useState(null); // hold | send  (within "casting")
  const [taps, setTaps] = useState(0);

  // The held beat. Tap 3 sets step→casting; this drives the timed sequence:
  // stillness (hold) → release (send) → resolve into the success state.
  useEffect(() => {
    if (step !== "casting") return;
    setPhase("hold");
    const t1 = setTimeout(() => setPhase("send"), 2200); // hold, then release
    const t2 = setTimeout(() => {
      setStep("done");
      setPhase(null);
    }, 3600); // send completes → success
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [step]);

  const strategy = selectStrategy({
    isMember,
    hasChart: !isMember,
    hasTransits: true,
  });
  const hero = HEROES[strategy];
  const accent = "var(--p-accent)"; // one accent per palette (DESIGN.md §1)

  const tap = (next) => {
    if (next === "pay" && mustSign) {
      setNeedsSign(true);
      return;
    }
    // Stripe is live for this spell: leave for the payment link rather than
    // the simulated sheet. The caster returns to ?paid=<id> and App resumes
    // the cast. A spell with no link keeps the demo flow.
    if (next === "pay" && isPaidLive(hero) && beginPayment(hero)) return;
    setTaps((t) => t + 1);
    // The cast is recorded as the held beat begins — the point of commitment.
    // Failing to record must not break the ritual, so it's fire-and-forget
    // with a logged error rather than an await that could stall the animation.
    if (next === "casting") {
      recordCast(hero).catch((e) => console.error("[grimoire] cast not recorded:", e));
    }
    setStep(next);
  };

  const reset = () => {
    setStep("idle");
    setPhase(null);
    setTaps(0);
  };

  return (
    <>
      {/* Today header — the display line dominates, everything else recedes */}
      <div style={S.todayHead}>
        <div style={S.headRow}>
          <div>
            <div style={S.todayTitle}>Today</div>
            <div style={S.greeting}>Good evening, Axel.</div>
            <div style={S.eyebrow}>Waning moon in Sagittarius · Mercury retrograde</div>
          </div>
          <button
            style={S.themeToggle}
            onClick={() => setMode(mode === "day" ? "night" : "day")}
            aria-label={mode === "day" ? "Switch to Night" : "Switch to Day"}
          >
            {mode === "day" ? "☾" : "☀"}
          </button>
        </div>
      </div>

      {/* HERO CARD */}
      <div
        style={{
          ...S.card,
          borderTopColor: accent,
          ...(step === "casting" ? S.cardCasting : {}),
        }}
      >
        {/* Card content — dims and recedes while the spell is cast */}
        <div
          style={{
              ...S.cardBody,
              ...(step === "casting" || step === "done"
                ? S.cardBodyMuted
                : {}),
            }}
          >
            {step !== "casting" && step !== "done" && (
              <>
                <div style={S.folioWell}>
                  <span style={S.folioWellGlyph}>{hero.glyph}</span>
                </div>
                <div style={S.folioMetaRow}>
                  <span style={S.cardEyebrow}>{hero.eyebrow}</span>
                  <span style={S.folioLink}>Open the folio ›</span>
                </div>
              </>
            )}

            <div style={S.cardInner}>
              <div style={S.cardTitle}>{hero.title}</div>
              {step !== "done" && <div style={S.cardSub}>{hero.sub}</div>}
              {step === "idle" && (
                <div style={S.rationale}>
                  {needsSign
                    ? "The book keeps casts to a hand. Sign your record on the You page first."
                    : hero.rationale}
                </div>
              )}
            </div>
          </div>

          {/* ── FUNNEL ────────────────────────────── */}
          {step === "idle" && (
            // TAP 1 — select the pre-chosen hero
            <button style={S.castBtn} onClick={() => tap("pay")}>
              <span>Cast tonight · ${hero.price}</span>
            </button>
          )}

          {step === "pay" && (
            <ApplePaySheet
              price={hero.price}
              title={hero.title}
              onConfirm={() => tap("cast")} // TAP 2
              onCancel={reset}
              S={S}
            />
          )}

          {step === "cast" && (
            // TAP 3 — the deliberate act. No price, no checkout language.
            <button
              style={{ ...S.castBtn, background: accent }}
              onClick={() => tap("casting")}
            >
              <span>Cast now</span>
            </button>
          )}

          {/* THE HELD BEAT — stillness, then send. Auto-advances. */}
          {step === "casting" && (
            <CastingBeat
              phase={phase}
              accent={accent}
              glyph={hero.glyph}
              S={S}
              glow={C.glow}
              mode={mode}
            />
          )}

          {step === "done" && (
            <SuccessState hero={hero} accent={accent} onDone={reset} S={S} />
          )}
        </div>

        {/* ── SUPPORTING MODULES ───────────────────────────────
            Glanceable summaries that tap through to their full screen.
            They recede while a cast is in progress so the ritual holds
            the screen, but stay in place (no scroll, no disappearance). */}
        <div
          style={{
            ...S.modules,
            ...(step === "idle" || step === "done" ? {} : S.modulesMuted),
          }}
        >
        {/* THE BOOK ASKS — verdicts held overnight, surfaced first. This is
            the loop the trust layer feeds on: cast, hold, answer. */}
        {asks.length > 0 && (
          <div style={S.module}>
            <div style={S.moduleHead}>
              <span style={S.moduleEyebrow}>The book asks</span>
            </div>
            {asks.map((c) => (
              <div key={c.id} style={S.askRow}>
                <span style={{ ...S.askGlyph, color: "var(--p-accent)" }}>
                  {c.glyph}
                </span>
                <div style={S.askMid}>
                  <div style={S.askTitle}>{c.title}</div>
                  <div style={S.askWhen}>Cast {whenLower(c.castAt)} — how did it land?</div>
                </div>
                <div style={S.verdictBtns}>
                  <button
                    style={{ ...S.verdictYes, borderColor: "var(--p-accent)", color: "var(--p-accent)" }}
                    onClick={() => answer(c.id, true)}
                  >
                    Worked
                  </button>
                  <button
                    style={{ ...S.verdictNo, borderColor: "var(--p-hair)", color: "var(--p-textSoft)" }}
                    onClick={() => answer(c.id, false)}
                  >
                    Not yet
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <PersonalStrip S={S} />
        <DailyCard S={S} />
        <CommunityPeek S={S} />
        <FeaturedStrip S={S} />
      </div>
    </>
  );
}

// ── PERSONAL STRIP ── rank progress + Grimoins, a thin glanceable bar.
function PersonalStrip({ S }) {
  const { rank, profile } = usePractice();
  return (
    <button style={S.strip}>
      <div style={S.stripRank}>
        <span style={{ ...S.stripNumeral, color: "var(--p-accent)" }}>
          {rank.numeral}
        </span>
        <div style={S.stripRankText}>
          <div style={S.stripRankName}>{rank.name}</div>
          <div style={S.stripProgressTrack}>
            <div
              style={{
                ...S.stripProgressFill,
                width: `${Math.round(rank.progress * 100)}%`,
                background: "var(--p-accent)",
              }}
            />
          </div>
          <div style={S.stripNext}>
            {rank.next ? `${rank.toNext} more to ${rank.next}` : "The last rank"}
          </div>
        </div>
      </div>
      <div style={S.stripCoins}>
        <span style={{ ...S.coinGlyph, color: "var(--p-accent)" }}>◉</span>
        <span style={S.coinAmount}>{profile.castCount}</span>
      </div>
    </button>
  );
}

// ── DAILY CARD ── the free daily ritual draw. No Grimoins cost.
function DailyCard({ S }) {
  return (
    <button style={S.module}>
      <div style={S.moduleHead}>
        <span style={S.moduleEyebrow}>Daily draw</span>
        <span style={S.moduleFree}>Free</span>
      </div>
      {DAILY_CARD.drawn ? (
        <div style={S.cardDrawn}>
          <span style={{ ...S.tarotGlyph, color: "var(--p-accent)" }}>✦</span>
          <div>
            <div style={S.tarotName}>{DAILY_CARD.name}</div>
            <div style={S.tarotMeaning}>{DAILY_CARD.meaning}</div>
          </div>
        </div>
      ) : (
        <div style={S.cardUndrawn}>
          <div style={{ ...S.cardBack, borderColor: "var(--p-accent)" }}>
            <span style={{ color: "var(--p-accent)" }}>✦</span>
          </div>
          <div style={S.undrawnText}>Pull today's card</div>
        </div>
      )}
    </button>
  );
}

// ── COMMUNITY PEEK ── three recent acts; taps through to the full feed.
function CommunityPeek({ S }) {
  return (
    <div style={S.module}>
      <div style={S.moduleHead}>
        <span style={S.moduleEyebrow}>The coven</span>
        <span style={S.moduleLink}>All activity →</span>
      </div>
      <div style={S.feedList}>
        {COMMUNITY.map((item, i) => (
          <div key={i} style={S.feedRow}>
            <span style={{ ...S.feedDot, background: "var(--p-accent)" }} />
            <span style={S.feedText}>
              <strong style={S.feedWho}>{item.who}</strong> {item.did}
            </span>
            <span style={S.feedWhen}>{item.when}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── FEATURED STRIP ── trusted practitioners; taps through to Browse.
function FeaturedStrip({ S }) {
  return (
    <div style={S.module}>
      <div style={S.moduleHead}>
        <span style={S.moduleEyebrow}>Trusted practitioners</span>
        <span style={S.moduleLink}>Browse →</span>
      </div>
      <div style={S.featRow}>
        {FEATURED.map((p, i) => (
          <button key={i} style={S.featCard}>
            <span style={{ ...S.featGlyph, color: "var(--p-accent)" }}>{p.glyph}</span>
            <div style={S.featName}>{p.name}</div>
            <div style={S.featCraft}>{p.craft}</div>
            <div style={{ ...S.featRate, color: "var(--p-accent)" }}>{p.rate == null ? "Not yet rated" : `${p.rate}% worked`}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
