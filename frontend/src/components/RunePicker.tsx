"use client";

import { useState, useEffect } from "react";
import { RUNES, SORTED, RUNE_LEVS } from "@/data/runes";

const STORAGE_KEY = "d2_availableRunes";

export function useOwnedRunes() {
  const [ownedRunes, setOwnedRunes] = useState<boolean[]>(() => {
    if (typeof window === "undefined") return RUNES.map(() => true);
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const arr = JSON.parse(saved);
        if (Array.isArray(arr) && arr.length === RUNES.length) return arr;
      }
    } catch {}
    return RUNES.map(() => true);
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(ownedRunes));
    }
  }, [ownedRunes]);

  const toggleRune = (index: number) =>
    setOwnedRunes(prev => { const n = [...prev]; n[index] = !n[index]; return n; });

  const setAllRunes = (value: boolean) =>
    setOwnedRunes(RUNES.map(() => value));

  return { ownedRunes, toggleRune, setAllRunes };
}

export function RunePicker({
  ownedRunes,
  toggleRune,
  setAllRunes,
}: {
  ownedRunes: boolean[];
  toggleRune: (i: number) => void;
  setAllRunes: (v: boolean) => void;
}) {
  const [collapsed, setCollapsed] = useState(false);

  const ownedCount = ownedRunes.filter(Boolean).length;

  return (
    <div className="rounded p-3" style={{ background: "var(--bg-surface)", border: "1px solid var(--border-subtle)" }}>
      {/* Header row */}
      <div className="flex items-center justify-between mb-2">
        <button
          onClick={() => setCollapsed(c => !c)}
          className="flex items-center gap-2 text-sm font-semibold"
          style={{ color: "var(--text-heading)", background: "none", border: "none", cursor: "pointer", padding: 0 }}
        >
          <span>{collapsed ? "▶" : "▼"}</span>
          Runes Owned
          <span className="text-xs font-normal ml-1" style={{ color: "var(--text-muted)" }}>
            {ownedCount}/{RUNES.length}
          </span>
        </button>
        {!collapsed && (
          <div className="flex gap-1">
            <button
              onClick={() => setAllRunes(false)}
              className="px-2 py-0.5 text-xs rounded transition-colors"
              style={{ background: "var(--bg-overlay)", color: "var(--text-secondary)", border: "1px solid var(--border-muted)" }}
            >
              None
            </button>
            <button
              onClick={() => setAllRunes(true)}
              className="px-2 py-0.5 text-xs rounded transition-colors"
              style={{ background: "var(--bg-overlay)", color: "var(--text-secondary)", border: "1px solid var(--border-muted)" }}
            >
              All
            </button>
          </div>
        )}
      </div>

      {!collapsed && (
        <div className="flex flex-wrap gap-1">
          {SORTED.map((runeIdx) => {
            const name = RUNES[runeIdx].trim().toLowerCase();
            return (
              <button
                key={runeIdx}
                onClick={() => toggleRune(runeIdx)}
                className={`relative ${!ownedRunes[runeIdx] ? "opacity-40 grayscale" : ""}`}
                title={`${RUNES[runeIdx].trim()} (clvl ${RUNE_LEVS[runeIdx]})`}
                style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/runes/${name}.png`}
                  alt={RUNES[runeIdx].trim()}
                  className="w-8 h-8 object-contain"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
