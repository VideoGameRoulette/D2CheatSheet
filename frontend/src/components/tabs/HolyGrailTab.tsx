"use client";

import { useState, useEffect, useMemo } from "react";
import { HG_ROWS, type HGCategory } from "@/data/holygrail";
import { RunePicker, useOwnedRunes } from "@/components/RunePicker";

const STORAGE_SETS = "holygrailSets";
const STORAGE_UNQS = "holygrailUnqs";
const STORAGE_MISC = "holygrailMisc";

const NUM_ROWS = HG_ROWS.length;

type SubTab = "sets" | "unqs" | "misc";
type SortKey = "tc" | "base" | "name" | "own";
type SortDir = "asc" | "desc";

function pct(owned: number, total: number) {
  if (total === 0) return "0.00";
  return ((100 * owned) / total).toFixed(2);
}

// One item entry for display in a flat list
type FlatItem = {
  rowIdx: number;       // index into HG_ROWS
  tc: string;
  base: string;
  qlvl: number;
  name: string;         // set / unq / norm name
  kind: HGCategory;
};

function buildFlat(kind: SubTab): FlatItem[] {
  const items: FlatItem[] = [];
  for (let i = 0; i < HG_ROWS.length; i++) {
    const r = HG_ROWS[i];
    if (kind === "sets" && r.setName) {
      items.push({ rowIdx: i, tc: r.tc, base: r.base, qlvl: r.setQ, name: r.setName, kind: "sets" });
    } else if (kind === "unqs" && !r.setName && r.unqName) {
      items.push({ rowIdx: i, tc: r.tc, base: r.base, qlvl: r.unqQ, name: r.unqName, kind: "unqs" });
    } else if (kind === "misc" && r.category === "misc" && r.normName) {
      items.push({ rowIdx: i, tc: r.tc, base: r.base, qlvl: 0, name: r.normName, kind: "misc" });
    }
  }
  return items;
}

// Sub-tab item list — sets and unqs each get one entry per item
// Rows that have BOTH a set and a unique show in Sets tab under the set name,
// and the unique is shown in Unqs only if the row has no set
const SETS_ITEMS = buildFlat("sets");
// Every unique gets its own entry (including those that share a row with a set):
const ALL_UNQS: FlatItem[] = [];
for (let i = 0; i < HG_ROWS.length; i++) {
  const r = HG_ROWS[i];
  if (r.unqName) {
    ALL_UNQS.push({ rowIdx: i, tc: r.tc, base: r.base, qlvl: r.unqQ, name: r.unqName, kind: "unqs" });
  }
}
const MISC_ITEMS = buildFlat("misc");

function ItemTable({
  items,
  owned,
  onToggle,
  sortKey,
  sortDir,
  onSort,
  search,
  filter,
  accentCls,
}: {
  items: FlatItem[];
  owned: boolean[];
  onToggle: (rowIdx: number) => void;
  sortKey: SortKey;
  sortDir: SortDir;
  onSort: (k: SortKey) => void;
  search: string;
  filter: "all" | "owned" | "missing";
  accentCls: string;
}) {
  const visible = useMemo(() => {
    let rows = items;
    if (search.trim()) {
      const q = search.toLowerCase();
      rows = rows.filter(r => r.name.toLowerCase().includes(q) || r.base.toLowerCase().includes(q));
    }
    if (filter === "owned") rows = rows.filter(r => owned[r.rowIdx]);
    if (filter === "missing") rows = rows.filter(r => !owned[r.rowIdx]);

    return [...rows].sort((a, b) => {
      let va: string | number = "";
      let vb: string | number = "";
      switch (sortKey) {
        case "tc":   va = a.tc; vb = b.tc; break;
        case "base": va = a.base; vb = b.base; break;
        case "name": va = a.name; vb = b.name; break;
        case "own":  va = owned[a.rowIdx] ? 1 : 0; vb = owned[b.rowIdx] ? 1 : 0; break;
      }
      if (va < vb) return sortDir === "asc" ? -1 : 1;
      if (va > vb) return sortDir === "asc" ? 1 : -1;
      return 0;
    });
  }, [items, owned, search, filter, sortKey, sortDir]);

  const SortTh = ({ label, sk }: { label: string; sk: SortKey }) => (
    <th
      className="p-1 px-2 text-left cursor-pointer select-none whitespace-nowrap"
      style={{ color: sortKey === sk ? "var(--accent-bright)" : "var(--text-heading)" }}
      onClick={() => onSort(sk)}
    >
      {label}
      {sortKey === sk && <span className="ml-1">{sortDir === "asc" ? "▲" : "▼"}</span>}
    </th>
  );

  return (
    <>
      <div className="text-xs mb-1" style={{ color: "var(--text-muted)" }}>{visible.length} items</div>
      <div className="overflow-x-auto">
        <table className="head w-full border-collapse text-xs font-mono">
          <thead>
            <tr className="yt yb b11">
              <SortTh label="Own"  sk="own" />
              <SortTh label="Name" sk="name" />
              <th className="p-1 px-2 text-left" style={{ color: "var(--text-secondary)" }}>q</th>
              <SortTh label="Base" sk="base" />
              <SortTh label="TC"   sk="tc" />
            </tr>
          </thead>
          <tbody>
            {visible.map((item, i) => {
              const isOwned = owned[item.rowIdx];
              return (
                <tr key={`${item.rowIdx}-${item.name}`} className={`${i % 2 === 0 ? "b11" : "b22"} hover:brightness-150 cursor-default`}>
                  <td className="p-1 pl-2 text-center">
                    <button
                      onClick={() => onToggle(item.rowIdx)}
                      className="w-5 h-5 rounded border text-xs font-bold transition-colors"
                      style={isOwned ? {
                        background: accentCls.includes("amber") ? "var(--col-unq)" : accentCls.includes("green") ? "var(--col-set)" : "var(--col-tc)",
                        borderColor: "transparent",
                        color: "#000",
                      } : {
                        background: "var(--bg-overlay)",
                        borderColor: "var(--border-default)",
                        color: "var(--text-muted)",
                      }}
                      title={isOwned ? "Mark missing" : "Mark owned"}
                    >
                      {isOwned ? "✓" : ""}
                    </button>
                  </td>
                  <td className="p-1" style={isOwned ? { textDecoration: "line-through", color: "var(--text-muted)" } : {}}>
                    <span className={item.kind === "sets" ? "set" : item.kind === "unqs" ? "unq" : ""} style={item.kind === "misc" ? { color: "var(--text-primary)" } : {}}>
                      {item.name}
                    </span>
                  </td>
                  <td className="p-1" style={{ color: "var(--text-muted)" }}>{item.qlvl || ""}</td>
                  <td className="p-1" style={{ color: "var(--text-secondary)" }}>{item.base}</td>
                  <td className="p-1" style={{ color: "var(--accent-bright)" }}>{item.tc}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export function HolyGrailTab() {
  const { ownedRunes, toggleRune, setAllRunes } = useOwnedRunes();
  const [ownedSets, setOwnedSets] = useState<boolean[]>(() => new Array(NUM_ROWS).fill(false));
  const [ownedUnqs, setOwnedUnqs] = useState<boolean[]>(() => new Array(NUM_ROWS).fill(false));
  const [ownedMisc, setOwnedMisc] = useState<boolean[]>(() => new Array(NUM_ROWS).fill(false));

  const [subTab, setSubTab] = useState<SubTab>("unqs");
  const [sortKey, setSortKey] = useState<SortKey>("name");
  const [sortDir, setSortDir] = useState<SortDir>("asc");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "owned" | "missing">("all");

  // Load from localStorage
  useEffect(() => {
    try {
      const load = (key: string, len: number, set: (v: boolean[]) => void) => {
        const raw = localStorage.getItem(key);
        if (raw) {
          const parsed: boolean[] = JSON.parse(raw);
          if (parsed.length === len) set(parsed);
        }
      };
      load(STORAGE_SETS, NUM_ROWS, setOwnedSets);
      load(STORAGE_UNQS, NUM_ROWS, setOwnedUnqs);
      load(STORAGE_MISC, NUM_ROWS, setOwnedMisc);
    } catch {}
  }, []);

  useEffect(() => { localStorage.setItem(STORAGE_SETS, JSON.stringify(ownedSets)); }, [ownedSets]);
  useEffect(() => { localStorage.setItem(STORAGE_UNQS, JSON.stringify(ownedUnqs)); }, [ownedUnqs]);
  useEffect(() => { localStorage.setItem(STORAGE_MISC, JSON.stringify(ownedMisc)); }, [ownedMisc]);

  const toggle = (kind: SubTab, rowIdx: number) => {
    const setter = kind === "sets" ? setOwnedSets : kind === "unqs" ? setOwnedUnqs : setOwnedMisc;
    setter(prev => { const n = [...prev]; n[rowIdx] = !n[rowIdx]; return n; });
  };

  const handleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortKey(key); setSortDir("asc"); }
  };

  // Progress
  const setsOwned = useMemo(() => SETS_ITEMS.filter(i => ownedSets[i.rowIdx]).length, [ownedSets]);
  const unqsOwned = useMemo(() => ALL_UNQS.filter(i => ownedUnqs[i.rowIdx]).length, [ownedUnqs]);
  const miscOwned = useMemo(() => MISC_ITEMS.filter(i => ownedMisc[i.rowIdx]).length, [ownedMisc]);
  const totalOwned = setsOwned + unqsOwned + miscOwned;
  const totalItems = SETS_ITEMS.length + ALL_UNQS.length + MISC_ITEMS.length;

  const resetAll = () => {
    setOwnedSets(new Array(NUM_ROWS).fill(false));
    setOwnedUnqs(new Array(NUM_ROWS).fill(false));
    setOwnedMisc(new Array(NUM_ROWS).fill(false));
  };

  const subTabConfig: { id: SubTab; label: string; count: number; owned: number; accentCls: string }[] = [
    { id: "unqs",  label: `Uniques (${ALL_UNQS.length})`,   count: ALL_UNQS.length,   owned: unqsOwned, accentCls: "bg-amber-600 border-amber-500" },
    { id: "sets",  label: `Sets (${SETS_ITEMS.length})`,    count: SETS_ITEMS.length,  owned: setsOwned, accentCls: "bg-green-700 border-green-600" },
    { id: "misc",  label: `Misc (${MISC_ITEMS.length})`,    count: MISC_ITEMS.length,  owned: miscOwned, accentCls: "bg-blue-700 border-blue-600" },
  ];

  const currentItems  = subTab === "sets" ? SETS_ITEMS : subTab === "unqs" ? ALL_UNQS : MISC_ITEMS;
  const currentOwned  = subTab === "sets" ? ownedSets  : subTab === "unqs" ? ownedUnqs : ownedMisc;
  const currentToggle = (rowIdx: number) => toggle(subTab, rowIdx);
  const currentAccent = subTabConfig.find(t => t.id === subTab)!.accentCls;

  return (
    <div className="space-y-4">

      {/* Rune picker — shared with Runewords tab via localStorage */}
      <RunePicker ownedRunes={ownedRunes} toggleRune={toggleRune} setAllRunes={setAllRunes} />

      {/* Progress */}
      <div className="rounded p-3 text-xs space-y-2" style={{ background: "var(--bg-surface)", border: "1px solid var(--border-subtle)" }}>
        <div className="flex items-center justify-between mb-1">
          <span className="font-semibold text-sm" style={{ color: "var(--text-primary)" }}>Holy Grail Progress</span>
          <button
            onClick={resetAll}
            className="rounded px-2 py-0.5 text-xs transition-colors"
            style={{ color: "var(--res-fire)", border: "1px solid var(--res-fire)", background: "transparent" }}
          >
            Reset All
          </button>
        </div>
        <div className="grid grid-cols-2 gap-x-8 gap-y-1 sm:grid-cols-4">
          <div><span className="unq">Uniques: </span><span style={{ color: "var(--accent-bright)" }}>{unqsOwned}</span><span style={{ color: "var(--text-muted)" }}>/{ALL_UNQS.length}</span><span className="ml-1" style={{ color: "var(--text-secondary)" }}>({pct(unqsOwned, ALL_UNQS.length)}%)</span></div>
          <div><span className="set">Sets: </span><span style={{ color: "var(--accent-bright)" }}>{setsOwned}</span><span style={{ color: "var(--text-muted)" }}>/{SETS_ITEMS.length}</span><span className="ml-1" style={{ color: "var(--text-secondary)" }}>({pct(setsOwned, SETS_ITEMS.length)}%)</span></div>
          <div><span style={{ color: "var(--col-tc)" }}>Misc: </span><span style={{ color: "var(--accent-bright)" }}>{miscOwned}</span><span style={{ color: "var(--text-muted)" }}>/{MISC_ITEMS.length}</span><span className="ml-1" style={{ color: "var(--text-secondary)" }}>({pct(miscOwned, MISC_ITEMS.length)}%)</span></div>
          <div><span style={{ color: "var(--text-primary)" }}>Total: </span><span style={{ color: "var(--accent-bright)" }}>{totalOwned}</span><span style={{ color: "var(--text-muted)" }}>/{totalItems}</span><span className="ml-1" style={{ color: "var(--text-secondary)" }}>({pct(totalOwned, totalItems)}%)</span></div>
        </div>
        <div className="space-y-1 mt-1">
          {[
            { label: "Uniques", owned: unqsOwned, total: ALL_UNQS.length,  barColor: "var(--col-unq)" },
            { label: "Sets",    owned: setsOwned, total: SETS_ITEMS.length, barColor: "var(--col-set)" },
            { label: "Misc",    owned: miscOwned, total: MISC_ITEMS.length, barColor: "var(--col-tc)" },
            { label: "Total",   owned: totalOwned, total: totalItems,       barColor: "var(--text-secondary)" },
          ].map(bar => (
            <div key={bar.label} className="flex items-center gap-2">
              <span className="w-14" style={{ color: "var(--text-secondary)" }}>{bar.label}</span>
              <div className="flex-1 rounded-full h-2" style={{ background: "var(--bg-overlay)" }}>
                <div className="h-2 rounded-full transition-all" style={{ width: `${(bar.owned / Math.max(bar.total, 1)) * 100}%`, background: bar.barColor }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sub-tabs */}
      <div className="flex gap-1 pb-0" style={{ borderBottom: "1px solid var(--border-subtle)" }}>
        {subTabConfig.map(t => (
          <button
            key={t.id}
            onClick={() => { setSubTab(t.id); setSearch(""); setFilter("all"); setSortKey("name"); setSortDir("asc"); }}
            className="px-3 py-1.5 text-xs font-medium rounded-t border-t border-l border-r transition-colors"
            style={subTab === t.id ? {
              background: "var(--bg-overlay)",
              borderColor: "var(--border-default)",
              color: "var(--text-primary)",
            } : {
              background: "transparent",
              borderColor: "transparent",
              color: "var(--text-secondary)",
            }}
          >
            {t.label}
            <span className="ml-1.5 text-xs" style={{ color: t.owned > 0 ? "var(--col-set)" : "var(--text-muted)" }}>
              {t.owned}/{t.count}
            </span>
          </button>
        ))}
      </div>

      {/* Controls */}
      <div className="flex flex-wrap gap-2 items-center text-xs">
        <input
          type="text"
          placeholder="Search name or base..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="rounded px-2 py-1 w-52 focus:outline-none"
          style={{
            background: "var(--bg-raised)",
            border: "1px solid var(--border-default)",
            color: "var(--text-primary)",
          }}
        />
        <div className="flex gap-1">
          {(["all", "owned", "missing"] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="px-2 py-1 rounded border capitalize transition-colors"
              style={filter === f ? {
                background: "var(--accent)",
                borderColor: "var(--accent-bright)",
                color: "#fff",
              } : {
                background: "var(--bg-raised)",
                borderColor: "var(--border-muted)",
                color: "var(--text-secondary)",
              }}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Item table */}
      <ItemTable
        items={currentItems}
        owned={currentOwned}
        onToggle={currentToggle}
        sortKey={sortKey}
        sortDir={sortDir}
        onSort={handleSort}
        search={search}
        filter={filter}
        accentCls={currentAccent}
      />
    </div>
  );
}
