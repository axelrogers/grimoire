import { useState } from "react";
import { CATEGORIES, CATALOGUE } from "../data.js";
import CastSheet from "../components/CastSheet.jsx";

// ── BROWSE ── search, category chips, filtered grid. Tapping a spell opens
// the CastSheet, which routes into the same three-tap cast as Today.
export default function BrowseView({ C, S }) {
  const [cat, setCat] = useState("all");
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(null); // the spell being cast, or null

  const results = CATALOGUE.filter((s) => {
    const inCat = cat === "all" || s.cat === cat;
    const q = query.trim().toLowerCase();
    const inQuery =
      !q || s.title.toLowerCase().includes(q) || s.sub.toLowerCase().includes(q);
    return inCat && inQuery;
  });

  return (
    <>
      <div style={S.todayHead}>
        <div style={S.eyebrow}>Find your spell</div>
        <div style={S.todayTitle}>Browse</div>
      </div>

      {/* Search */}
      <div style={S.searchWrap}>
        <span style={S.searchGlyph}>⌕</span>
        <input
          style={S.searchInput}
          placeholder="Search spells…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {/* Category chips */}
      <div style={S.chipRow}>
        {CATEGORIES.map((c) => {
          const active = c.id === cat;
          return (
            <button
              key={c.id}
              style={{
                ...S.chip,
                ...(active
                  ? { background: "var(--p-text)", color: "var(--p-ground)", borderColor: "var(--p-text)" }
                  : {}),
              }}
              onClick={() => setCat(c.id)}
            >
              <span style={{ ...S.chipGlyph, color: active ? "var(--p-accent)" : "var(--p-litDeep)" }}>
                {c.glyph}
              </span>
              {c.label}
            </button>
          );
        })}
      </div>

      {/* Grid */}
      {results.length === 0 ? (
        <div style={S.emptyState}>
          <div style={{ ...S.emptyGlyph, color: "var(--p-litDeep)" }}>☽</div>
          <div style={S.emptyText}>No spells here yet. Try another category.</div>
        </div>
      ) : (
        <div style={S.grid}>
          {results.map((s) => (
            <button key={s.id} style={S.gridCard} onClick={() => setOpen(s)}>
              <span style={{ ...S.gridGlyph, color: "var(--p-accent)" }}>
                {s.glyph}
              </span>
              <div style={S.gridTitle}>{s.title}</div>
              <div style={S.gridSub}>{s.sub}</div>
              <div style={S.gridFoot}>
                <span style={{ ...S.gridRate, color: "var(--p-accent)" }}>
                  {s.rate}% worked
                </span>
                <span style={S.gridPrice}>${s.price}</span>
              </div>
            </button>
          ))}
        </div>
      )}

      {open && (
        <CastSheet
          spell={open}
          C={C}
          S={S}
          onClose={() => setOpen(null)}
        />
      )}
    </>
  );
}
