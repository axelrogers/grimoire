import { hasBody } from "../data.js";

// ─── Grimoire · Cast funnel pieces ────────────────────────────────────────
// The shared beats of the three-tap cast: Apple Pay confirm, the held beat,
// and the success state. Used identically by Today's hero card and CastSheet.

// Apple Pay sheet — Face ID stands in for the system auth; confirm is the tap.
export function ApplePaySheet({ price, title, onConfirm, onCancel, S }) {
  return (
    <div style={S.paySheet}>
      <div style={S.payTop}>
        <span style={S.payMark}> Pay</span>
        <button style={S.payClose} onClick={onCancel}>
          ✕
        </button>
      </div>
      <div style={S.payRow}>
        <span style={S.payLabel}>Grimoire</span>
        <span style={S.payVal}>{title}</span>
      </div>
      <div style={S.payRow}>
        <span style={S.payLabel}>Total</span>
        <span style={S.payTotal}>${price}.00</span>
      </div>
      <button style={S.payConfirm} onClick={onConfirm}>
        Confirm with Face ID
      </button>
      <div style={S.payHint}>Double-click the side button</div>
    </div>
  );
}

// The held beat. hold = stillness, the glyph breathing; send = it releases
// upward and dissolves. Drained of UI chrome on purpose — this is the ritual.
export function CastingBeat({ phase, accent, glyph, S, glow, mode }) {
  const night = mode === "night";
  // By night the glyph carries a halo and the rings emit light.
  const glyphGlow = night
    ? { textShadow: `0 0 18px ${accent}, 0 0 36px ${glow}` }
    : {};
  const ringGlow = night
    ? { boxShadow: `0 0 14px ${accent}`, borderColor: accent }
    : { borderColor: accent };
  return (
    <div style={S.beat}>
      <div style={S.beatGlyphWrap}>
        {/* concentric rings that pulse outward on send */}
        <span
          style={{
            ...S.ring,
            ...ringGlow,
            ...(phase === "send" ? S.ringSend : {}),
          }}
        />
        <span
          style={{
            ...S.ring,
            ...S.ring2,
            ...ringGlow,
            ...(phase === "send" ? S.ringSend2 : {}),
          }}
        />
        <span
          style={{
            ...S.beatGlyph,
            color: accent,
            ...glyphGlow,
            ...(phase === "hold" ? S.beatGlyphHold : {}),
            ...(phase === "send" ? S.beatGlyphSend : {}),
          }}
        >
          {glyph}
        </span>
      </div>
      <div style={S.beatWord}>
        {phase === "send" ? "Released" : "Casting"}
      </div>
    </div>
  );
}

// The payoff. Under the hybrid model this is where the caster receives their
// half of the working. The prototype's form is deliberately lean: one line of
// what Grimoire does, one concrete thing the caster does, and a voice from the
// margin. No materials list, no numbered steps — restraint is what makes it
// read as a practice rather than a recipe. A spell with no body yet falls back
// to the short form.
export function SuccessState({ hero, accent, onDone, S }) {
  if (!hasBody(hero)) {
    return (
      <div style={S.success}>
        <div style={{ ...S.successGlyph, color: accent }}>{hero.glyph}</div>
        <div style={S.successKicker}>It&apos;s done</div>
        <div style={S.successSub}>
          {hero.title} is in motion. We&apos;ll ask how it landed.
        </div>
        <button style={S.ghostBtn} onClick={onDone}>
          Back to Today
        </button>
      </div>
    );
  }

  return (
    <div style={S.success}>
      <div style={{ ...S.successGlyph, color: accent }}>{hero.glyph}</div>
      <div style={S.successKicker}>It&apos;s done</div>

      {/* What the working is. */}
      <div style={S.workingText}>{hero.working}</div>

      {/* Grimoire's half, then theirs. */}
      <div style={{ ...S.halfBlock, borderLeftColor: accent }}>
        <div style={S.halfLabel}>Ours</div>
        <div style={S.halfText}>{hero.theirs}</div>
      </div>
      <div style={{ ...S.halfBlock, borderLeftColor: accent }}>
        <div style={S.halfLabel}>Yours</div>
        <div style={S.halfText}>{hero.yours}</div>
      </div>

      {/* A voice from the margin — the trust layer, in the book's own idiom. */}
      {hero.quote && (
        <div style={S.margin}>
          <div style={S.marginQuote}>{hero.quote}</div>
          <div style={S.marginBy}>{hero.quoteBy}</div>
        </div>
      )}

      <button style={S.ghostBtn} onClick={onDone}>
        Back to Today
      </button>
    </div>
  );
}

