import { isSlot, hasBody } from "../data.js";

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

// An unwritten slot, rendered as a visible gap rather than quietly hidden.
// Seeing the hole is the point — it's how the writing debt stays legible.
function Slot({ text, S }) {
  return <span style={S.slot}>{text}</span>;
}

// Renders authored text, or the gap where it isn't written yet.
function Line({ value, S, style }) {
  if (!value) return null;
  return <div style={style}>{isSlot(value) ? <Slot text={value} S={S} /> : value}</div>;
}

// The payoff. Under the hybrid model this is not a receipt and not a "wait and
// see" — it's where the caster receives their half of the working. Grimoire's
// part is stated, then theirs: what to gather, what to do, what to say, what
// to hold, and when we'll ask. A spell with no body yet falls back to the
// short form rather than rendering an empty ritual.
export function SuccessState({ hero, accent, onDone, S }) {
  if (!hasBody(hero)) {
    return (
      <div style={S.success}>
        <div style={{ ...S.successGlyph, color: accent }}>{hero.glyph}</div>
        <div style={S.successKicker}>It's done</div>
        <div style={S.successSub}>
          {hero.title} is in motion. We'll ask how it landed.
        </div>
        <button style={S.ghostBtn} onClick={onDone}>
          Back to Today
        </button>
      </div>
    );
  }

  const { performed, materials = [], preparation, rite = [], after, hold, verdict } = hero;

  return (
    <div style={S.success}>
      <div style={{ ...S.successGlyph, color: accent }}>{hero.glyph}</div>
      <div style={S.successKicker}>It's done</div>

      {/* Grimoire's half — stated plainly, never as marketing. */}
      {performed?.text && (
        <div style={{ ...S.performed, borderLeftColor: accent }}>
          <div style={S.performedLabel}>Cast at {performed.at}</div>
          <Line value={performed.text} S={S} style={S.performedText} />
        </div>
      )}

      {/* The caster's half. */}
      <div style={S.partLabel}>Your part</div>

      {materials.length > 0 && (
        <div style={S.block}>
          <div style={S.blockHead}>Gather</div>
          <ul style={S.matList}>
            {materials.map((m, i) => (
              <li key={i} style={S.matItem}>
                <span style={S.matName}>
                  {isSlot(m.item) ? <Slot text={m.item} S={S} /> : m.item}
                  {m.optional && <span style={S.matOpt}> · optional</span>}
                </span>
                {m.note && (
                  <span style={S.matNote}>
                    {isSlot(m.note) ? <Slot text={m.note} S={S} /> : m.note}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {preparation && (
        <div style={S.block}>
          <div style={S.blockHead}>Before you begin</div>
          <Line value={preparation} S={S} style={S.blockBody} />
        </div>
      )}

      {rite.length > 0 && (
        <div style={S.block}>
          <div style={S.blockHead}>The rite</div>
          {rite.map((r) => (
            <div key={r.step} style={S.riteStep}>
              <span style={{ ...S.riteNum, color: accent, borderColor: accent }}>
                {r.step}
              </span>
              <div style={S.riteBody}>
                <Line value={r.text} S={S} style={S.riteText} />
                {r.spoken && (
                  <div style={{ ...S.spoken, borderLeftColor: accent }}>
                    {isSlot(r.spoken) ? (
                      <Slot text={r.spoken} S={S} />
                    ) : (
                      <>&ldquo;{r.spoken}&rdquo;</>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {after && (
        <div style={S.block}>
          <div style={S.blockHead}>After</div>
          <Line value={after} S={S} style={S.blockBody} />
        </div>
      )}

      {/* The hold is the retention mechanic hiding inside the ritual — it's
          what keeps them in relationship with the working until the verdict. */}
      {hold && (
        <div style={{ ...S.hold, borderColor: accent }}>
          <div style={S.holdLabel}>Hold</div>
          <Line value={hold} S={S} style={S.holdText} />
        </div>
      )}

      {verdict?.prompt && (
        <div style={S.verdictNote}>
          In {durationToWords(verdict.askAfter)} we'll ask:{" "}
          {isSlot(verdict.prompt) ? (
            <Slot text={verdict.prompt} S={S} />
          ) : (
            <span style={S.verdictQ}>{verdict.prompt}</span>
          )}
        </div>
      )}

      <button style={S.ghostBtn} onClick={onDone}>
        Back to Today
      </button>
    </div>
  );
}

// "P3D" → "three days". Keeps ISO durations out of the caster's face.
function durationToWords(iso) {
  const m = /^P(?:(\d+)D|T(\d+)H)$/.exec(iso || "");
  if (!m) return "a few days";
  const words = ["zero", "one", "two", "three", "four", "five", "six", "seven"];
  if (m[1]) {
    const n = +m[1];
    return n === 1 ? "a day" : `${words[n] || n} days`;
  }
  const n = +m[2];
  return n === 1 ? "an hour" : `${words[n] || n} hours`;
}
