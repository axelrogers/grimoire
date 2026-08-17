import { useState } from "react";
import { usePractice, when } from "../store/usePractice.js";
import { COVEN } from "../data.js";

// ── YOU · YOUR RECORD ─────────────────────────────────────────────────────
// Ported to the prototype's composition (2026-08-17). The record reads as a
// page of the book: ruled masthead, the rank worn as a disc, then the casts
// themselves as ledger rows with dotted leaders, exactly as Browse and Coven
// set them.
//
// What changed beyond composition:
//
// The "Grimoins ◉ 248 / Top up" tile is gone. DECISIONS.md recorded on 3 Aug
// that Grimoins were cut — the read being that engagement scaffolding is what
// is costing Astrea its users — but the label survived the edit and was
// sitting on top of the real cast count, calling it a currency. One number,
// two meanings, neither true.
//
// There is no invented identity here. The prototype shows a name, initials
// and "keeping since July 2026"; the store knows none of those, so the disc
// carries the rank numeral the practice actually earned, and the record dates
// itself from the first cast or says nothing at all.

const MONTHS = ["January","February","March","April","May","June","July",
  "August","September","October","November","December"];

export default function YouView({ S }) {
  const { casts, profile, rank, answer, session, signIn, signOut, signInPending } =
    usePractice();
  const [email, setEmail] = useState("");
  const [signError, setSignError] = useState(null);

  const begin = async () => {
    const addr = email.trim();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(addr)) {
      setSignError("The book needs a reachable address.");
      return;
    }
    setSignError(null);
    try {
      await signIn(addr);
    } catch (e) {
      console.error("[grimoire] sign-in failed:", e);
      setSignError("The book could not reach that address. Try again.");
    }
  };

  const answered = casts.filter((c) => c.worked !== null).length;
  const worked = casts.filter((c) => c.worked === true).length;

  // Dated from the practice, not from an account creation date we don't have.
  const first = casts.length ? new Date(Math.min(...casts.map((c) => c.castAt))) : null;
  const since = first ? `keeping since ${MONTHS[first.getMonth()]} ${first.getFullYear()}` : null;

  return (
    <>
      <div style={S.indexEyebrowRow}>
        <span style={S.indexRule} />
        <span style={S.indexEyebrow}>Your Record</span>
        <span style={S.indexRule} />
      </div>

      {/* THE RECORD — sign in. Copy is the prototype's onboarding voice. */}
      {!session && !signInPending && (
        <div style={S.signCard}>
          <div style={S.signTitle}>Your record</div>
          <div style={S.signSub}>
            Every hand keeps its own book. Sign yours to keep it across
            devices.
          </div>
          <div style={S.signLabel}>Where the book may reach you</div>
          <input
            style={S.signInput}
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="name@somewhere.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && begin()}
          />
          {signError && <div style={S.signError}>{signError}</div>}
          <button style={S.signBtn} onClick={begin}>
            Begin your record
          </button>
          <div style={S.signHint}>
            Kept for the book alone — never sold, never shown.
          </div>
        </div>
      )}
      {!session && signInPending && (
        <div style={S.signCard}>
          <div style={S.signTitle}>The book has written to you</div>
          <div style={S.signSub}>
            A signing link is on its way to {signInPending}. Open it and the
            record is yours.
          </div>
        </div>
      )}

      {/* The crest: rank, and what the practice actually amounts to. */}
      <div style={S.recordHead}>
        <div style={S.recordDisc}>{rank.numeral}</div>
        <div style={S.recordName}>{rank.name}</div>
        {since && <div style={S.recordSince}>{since}</div>}
        <div style={S.recordTally}>
          {profile.castCount} cast
          {answered > 0 && ` · ${worked} of ${answered} worked`}
        </div>
        {rank.next && (
          <>
            <div style={S.recordTrack}>
              <div
                style={{
                  ...S.recordFill,
                  width: `${Math.round(rank.progress * 100)}%`,
                  background: "var(--p-accent)",
                }}
              />
            </div>
            <div style={S.recordNext}>{rank.toNext} more to {rank.next}</div>
          </>
        )}
      </div>

      {session && !session.anonymous && (
        <div style={S.signedRow}>
          <span style={S.signedAs}>The record is signed.</span>
          <button style={S.signOutBtn} onClick={signOut}>
            Close the book
          </button>
        </div>
      )}

      {/* THE RECORD ITSELF — every cast, and the book asking how it landed. */}
      <div style={{ ...S.volCard, marginTop: 18 }}>
        {/* "The record", not "Your record" — the masthead and the sign-in
            card already say that, and three of them in one column reads as a
            template rather than a page. */}
        <div style={S.volLabel}>The record</div>
        {casts.length === 0 ? (
          <div style={S.recordEmpty}>Nothing cast yet. The book is patient.</div>
        ) : (
          casts.map((c) => (
            <div key={c.id} style={S.recordRow}>
              <span style={S.recordTitle}>{c.title}</span>
              <span style={S.recordWhen}>{when(c.castAt)}</span>
              <span style={S.tocLeader} />
              {c.worked === null ? (
                <div style={S.verdictBtns}>
                  <button
                    style={{
                      ...S.verdictYes,
                      borderColor: "var(--p-accent)",
                      color: "var(--p-accent)",
                    }}
                    onClick={() => answer(c.id, true)}
                  >
                    Worked
                  </button>
                  <button
                    style={{
                      ...S.verdictNo,
                      borderColor: "var(--p-hair)",
                      color: "var(--p-textSoft)",
                    }}
                    onClick={() => answer(c.id, false)}
                  >
                    Not yet
                  </button>
                </div>
              ) : c.worked ? (
                <span style={{ ...S.verdictTag, color: "var(--p-accent)" }}>✓ Worked</span>
              ) : (
                <span style={{ ...S.verdictTag, color: "var(--p-textSoft)" }}>Didn&apos;t</span>
              )}
            </div>
          ))
        )}
      </div>

      {/* Hands you keep — the circle, from the record's side of the book. */}
      {COVEN.length > 0 && (
        <div style={{ ...S.volCard, marginTop: 14 }}>
          <div style={S.volLabel}>Hands you keep</div>
          {COVEN.slice(0, 3).map((p) => (
            <div key={p.id} style={S.handRow}>
              <span style={S.handName}>{p.name}</span>
              <span style={S.tocLeader} />
              <span style={S.handCraft}>{p.practitioner ? p.craft : p.rank}</span>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
