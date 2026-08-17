import { useState, useEffect } from "react";
import { CATEGORIES } from "../data.js";
import { ApplePaySheet, CastingBeat, SuccessState } from "./CastFunnel.jsx";
import { usePractice } from "../store/usePractice.js";
import { beginPayment, isPaidLive } from "../payment.js";

// ── CAST SHEET ── opened from Browse. Runs the identical three-tap cast:
// Cast → Apple Pay → Cast now → held beat → success. Same promise everywhere.
export default function CastSheet({ spell, C, S, onClose, startAt = "idle" }) {
  const { cast: recordCast, session, backend } = usePractice();
  const [needsSign, setNeedsSign] = useState(false);
  const mustSign = backend === "supabase" && !session;
  const accent = "var(--p-accent)";
  // `startAt` is how a caster returning from Stripe re-enters: App hands the
  // sheet back already paid, at the held beat, so the ritual resumes rather
  // than asking for money a second time.
  const [step, setStep] = useState(startAt);
  const [phase, setPhase] = useState(null);
  const [taps, setTaps] = useState(0);

  useEffect(() => {
    if (step !== "casting") return;
    setPhase("hold");
    const t1 = setTimeout(() => setPhase("send"), 2200);
    const t2 = setTimeout(() => {
      setStep("done");
      setPhase(null);
    }, 3600);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [step]);

  // NOTE: a cast resumed from payment (startAt === "casting") is recorded by
  // App, not here — it holds the claim and can retry once a session exists.
  // Recording it here as well would write the cast twice.

  const tap = (next) => {
    if (next === "pay" && mustSign) {
      setNeedsSign(true);
      return;
    }
    // Stripe is live for this spell: leave for the payment link. The caster
    // returns to ?paid=<id> and App resumes the sheet at the held beat.
    // Without a link we fall back to the simulated sheet, so the app stays
    // demoable with no Stripe account at all.
    if (next === "pay" && isPaidLive(spell) && beginPayment(spell)) return;
    setTaps((t) => t + 1);
    if (next === "casting") {
      recordCast(spell).catch((e) => console.error("[grimoire] cast not recorded:", e));
    }
    setStep(next);
  };

  return (
    <div style={S.sheetScrim} onClick={step === "idle" ? onClose : undefined}>
      <div style={S.sheet} onClick={(e) => e.stopPropagation()}>
        <div style={S.sheetGrip} />
        <div
          style={{
            ...S.card,
            borderTopColor: accent,
            marginTop: 6,
            ...(step === "casting" ? S.cardCasting : {}),
          }}
        >
          <div
            style={{
              ...S.cardBody,
              ...(step === "casting" || step === "done" ? S.cardBodyMuted : {}),
            }}
          >
            <div style={S.cardEyebrow}>
              {CATEGORIES.find((c) => c.id === spell.cat)?.label}
            </div>
            {step !== "casting" && step !== "done" && (
              <div style={S.glyphWrap}>
                <span style={{ ...S.glyph, color: accent }}>{spell.glyph}</span>
              </div>
            )}
            <div style={S.cardTitle}>{spell.title}</div>
            {step !== "done" && <div style={S.cardSub}>{spell.sub}</div>}
            {step === "idle" && (
              <div style={S.rationale}>
                {needsSign
                  ? "The book keeps casts to a hand. Sign your record on the You page first."
                  : spell.rate == null
                    ? "No verdicts yet — this spell has not been rated."
                    : `${spell.rate}% of casters marked this one worked.`}
              </div>
            )}
          </div>

          {step === "idle" && (
            <button style={S.castBtn} onClick={() => tap("pay")}>
              <span>Cast tonight</span>
            </button>
          )}
          {step === "pay" && (
            <ApplePaySheet
              price={spell.price}
              title={spell.title}
              onConfirm={() => tap("cast")}
              onCancel={() => setStep("idle")}
              S={S}
            />
          )}
          {step === "cast" && (
            <button
              style={{ ...S.castBtn, background: accent }}
              onClick={() => tap("casting")}
            >
              <span>Cast now</span>
            </button>
          )}
          {step === "casting" && (
            <CastingBeat
              phase={phase}
              accent={accent}
              glyph={spell.glyph}
              S={S}
              glow={C.glow}
              mode={C.night ? "night" : "day"}
            />
          )}
          {step === "done" && (
            <SuccessState
              hero={spell}
              accent={accent}
              onDone={onClose}
              S={S}
            />
          )}
        </div>
      </div>
    </div>
  );
}
