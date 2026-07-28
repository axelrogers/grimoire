import { useState, useEffect } from "react";
import { HEROES, selectStrategy, PROFILE, DAILY_CARD, COMMUNITY, FEATURED } from "../data.js";
import { ApplePaySheet, CastingBeat, SuccessState } from "../components/CastFunnel.jsx";

export default function TodayView({ mode, setMode, isMember, setIsMember, C, S }) {
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
    setTaps((t) => t + 1);
    setStep(next);
  };

  const reset = () => {
    setStep("idle");
    setPhase(null);
    setTaps(0);
  };

  return (
    <>
      {/* Today header */}
      <div style={S.todayHead}>
        <div style={S.headRow}>
          <div>
            <div style={S.eyebrow}>Thursday · 18 June</div>
            <div style={S.todayTitle}>Today</div>
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
            <div style={S.cardEyebrow}>{hero.eyebrow}</div>

            {step !== "casting" && step !== "done" && (
              <div style={S.glyphWrap}>
                <span style={{ ...S.glyph, color: accent }}>
                  {hero.glyph}
                </span>
              </div>
            )}

            <div style={S.cardTitle}>{hero.title}</div>
            {step !== "done" && <div style={S.cardSub}>{hero.sub}</div>}
            {step === "idle" && (
              <div style={S.rationale}>{hero.rationale}</div>
            )}
          </div>

          {/* ── FUNNEL ────────────────────────────── */}
          {step === "idle" && (
            // TAP 1 — select the pre-chosen hero
            <button style={S.castBtn} onClick={() => tap("pay")}>
              <span>Cast tonight</span>
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
  return (
    <button style={S.strip}>
      <div style={S.stripRank}>
        <span style={{ ...S.stripNumeral, color: "var(--p-accent)" }}>
          {PROFILE.rankNumeral}
        </span>
        <div style={S.stripRankText}>
          <div style={S.stripRankName}>{PROFILE.rank}</div>
          <div style={S.stripProgressTrack}>
            <div
              style={{
                ...S.stripProgressFill,
                width: `${Math.round(PROFILE.progress * 100)}%`,
                background: "var(--p-accent)",
              }}
            />
          </div>
          <div style={S.stripNext}>
            {Math.round((1 - PROFILE.progress) * 100)}% to {PROFILE.nextRank}
          </div>
        </div>
      </div>
      <div style={S.stripCoins}>
        <span style={{ ...S.coinGlyph, color: "var(--p-accent)" }}>◉</span>
        <span style={S.coinAmount}>{PROFILE.grimoins}</span>
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
            <div style={{ ...S.featRate, color: "var(--p-accent)" }}>{p.rate}% worked</div>
          </button>
        ))}
      </div>
    </div>
  );
}
