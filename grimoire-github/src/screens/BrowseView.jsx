import { useState } from "react";
import { CATEGORIES, CATALOGUE, isSlot, hasBody } from "../data.js";
import CastSheet from "../components/CastSheet.jsx";

// ── BROWSE · THE GRAND INDEX ──────────────────────────────────────────────
// Ported from the prototype's index screen: Browse is a table of contents,
// not a product grid. Two levels — the index (chapters as an index page with
// dotted leaders, counts and page numbers) and a chapter (its workings as
// ledger rows, with a voice from the margin). Tapping a working opens the
// same CastSheet as everywhere else.
//
// Every number shown is computed from the catalogue — counts, hands, pages.
// Nothing here is allowed to claim more book than exists.

const CHAPTERS = CATEGORIES.filter((c) => c.id !== "all").map((c) => {
  const spells = CATALOGUE.filter((s) => s.cat === c.id);
  // "Ch. II — Severance" → "II". Parsed, not duplicated by hand.
  const numeral = spells[0]?.chapter?.match(/Ch\.\s*([IVX]+)/)?.[1] || "·";
  const pages = spells
    .map((s) => parseInt((s.page || "").replace(/[^0-9]/g, ""), 10))
    .filter((n) => !isNaN(n));
  return {
    ...c,
    numeral,
    spells,
    pageFrom: pages.length ? Math.min(...pages) : null,
    pageTo: pages.length ? Math.max(...pages) : null,
  };
});

// The one authored epigraph, ported verbatim from the prototype. The others
// are Axel's to write — absence renders as nothing, never as filler.
const EPIGRAPHS = {
  severance: "What you do not end will end you, slowly.",
};

const KEEPERS = new Set(CATALOGUE.map((s) => s.keeper).filter(Boolean)).size;
const WRITTEN = CATALOGUE.filter(hasBody).length;

export default function BrowseView({ C, S }) {
  const [chapter, setChapter] = useState(null); // a CHAPTERS entry, or null
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(null); // the spell being cast, or null

  const q = query.trim().toLowerCase();
  const hits = q
    ? CATALOGUE.filter((s) =>
        `${s.title} ${s.sub || ""} ${s.chapter || ""} ${s.keeper || ""}`
          .toLowerCase()
          .includes(q),
      )
    : null;

  const spellRow = (s) => (
    <button key={s.id} style={S.ledgerRow} onClick={() => setOpen(s)}>
      <div style={S.ledgerTop}>
        <span style={isSlot(s.title) ? { ...S.ledgerTitle, ...S.slot } : S.ledgerTitle}>
          {s.title}
        </span>
        {s.price > 0 && <span style={S.ledgerPrice}>${s.price}</span>}
      </div>
      {s.kept && <div style={S.ledgerKept}>{s.kept}</div>}
      <div style={S.ledgerMeta}>
        {s.rate == null ? "Not yet rated" : `${s.rate}% worked`}
        {s.page ? ` · p. ${s.page.replace(/[^0-9]/g, "")}` : ""}
      </div>
    </button>
  );

  // ── Search results override either level ──
  if (hits) {
    return (
      <>
        <IndexHead S={S} query={query} setQuery={setQuery} />
        <div style={S.volCard}>
          <div style={S.volLabel}>
            {hits.length
              ? `The concordance finds ${hits.length} ${hits.length === 1 ? "entry" : "entries"}`
              : "The concordance finds nothing by that name"}
          </div>
          {hits.map(spellRow)}
        </div>
        {open && <CastSheet spell={open} C={C} S={S} onClose={() => setOpen(null)} />}
      </>
    );
  }

  // ── Chapter level ──
  if (chapter) {
    const epigraph = EPIGRAPHS[chapter.id];
    const voiced = chapter.spells.find((s) => s.quote);
    return (
      <>
        <button style={S.backLink} onClick={() => setChapter(null)}>
          ‹ The Grand Index
        </button>
        <div style={S.chapterHead}>
          <div style={S.chapterEyebrow}>Chapter {chapter.numeral}</div>
          <div style={S.chapterTitle}>{chapter.label}</div>
          {epigraph && <div style={S.chapterEpigraph}>{epigraph}</div>}
          <div style={S.chapterMeta}>
            {chapter.spells.length} working{chapter.spells.length === 1 ? "" : "s"}
            {chapter.pageFrom ? ` · pp. ${chapter.pageFrom}–${chapter.pageTo}` : ""}
          </div>
        </div>
        <div style={S.volCard}>{chapter.spells.map(spellRow)}</div>

        {/* A voice from the margin — the chapter's own testimony. */}
        {voiced && (
          <div style={{ ...S.margin, margin: "20px 8px 0" }}>
            <div style={S.marginQuote}>{voiced.quote}</div>
            <div style={S.marginBy}>{voiced.quoteBy}</div>
          </div>
        )}

        {open && <CastSheet spell={open} C={C} S={S} onClose={() => setOpen(null)} />}
      </>
    );
  }

  // ── Index level ──
  return (
    <>
      <IndexHead S={S} query={query} setQuery={setQuery} />

      <div style={S.volCard}>
        <div style={S.volLabel}>Vol. I — The Workings</div>
        {CHAPTERS.map((c) => (
          <button key={c.id} style={S.tocRow} onClick={() => setChapter(c)}>
            <span style={S.tocNumeral}>{c.numeral}</span>
            <span style={S.tocName}>{c.label}</span>
            <span style={S.tocLeader} />
            <span style={S.tocCount}>{c.spells.length}</span>
            <span style={S.tocPage}>{c.pageFrom ? `p. ${c.pageFrom}` : "—"}</span>
          </button>
        ))}
      </div>

      {WRITTEN < CATALOGUE.length && (
        <div style={S.indexFoot}>
          {CATALOGUE.length - WRITTEN} pages await their workings.
        </div>
      )}

      {open && <CastSheet spell={open} C={C} S={S} onClose={() => setOpen(null)} />}
    </>
  );
}

// The index masthead: centred, ruled, and honest about the book's size.
function IndexHead({ S, query, setQuery }) {
  return (
    <>
      <div style={S.indexEyebrowRow}>
        <span style={S.indexRule} />
        <span style={S.indexEyebrow}>The Grand Index</span>
        <span style={S.indexRule} />
      </div>
      <div style={S.indexTitle}>The Grand Grimoire</div>
      <div style={S.indexSub}>
        {CATALOGUE.length} workings, kept by {KEEPERS}{" "}
        {KEEPERS === 1 ? "hand" : "hands"}.
      </div>
      <div style={S.concordWrap}>
        <input
          style={S.concordInput}
          placeholder="Consult the concordance…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
    </>
  );
}
