"use client";

import { useState, useMemo, useRef, useCallback } from "react";
import { RECIPES } from "@/data/recipes";
import { RW_STATS } from "@/data/runeword-stats";

function parseRecipe(recipe: string) {
  const tier = recipe.charAt(0);
  const name = recipe.substring(2, 22).trim();
  const sockets = recipe.substring(22, 25).trim();
  const type = recipe.substring(25, 57).trim();
  const runesStr = recipe.substring(57, 97).trim();
  const lev = recipe.substring(97, 101).trim();
  const version = recipe.substring(101).trim();
  return { tier, name, sockets, type, runesStr, lev, version };
}

// Pre-parse all recipes once
const PARSED = RECIPES.map(parseRecipe);

interface TooltipState {
  name: string;
  type: string;
  runesStr: string;
  stats: string[];
  x: number;
  y: number;
}

function RunewordTooltip({ tip }: { tip: TooltipState }) {
  return (
    <div
      className="pointer-events-none fixed z-50 text-xs"
      style={{
        left: tip.x + 12,
        top: tip.y + 8,
        maxWidth: 320,
        background: "var(--bg-overlay)",
        border: "1px solid var(--border-default)",
        borderRadius: 6,
        padding: "10px 12px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
      }}
    >
      {/* Name */}
      <div
        className="font-bold text-sm mb-1"
        style={{ color: "var(--col-unq)" }}
      >
        {tip.name}
      </div>
      {/* Rune order */}
      <div className="mb-1" style={{ color: "var(--col-rune)" }}>
        {tip.runesStr}
      </div>
      {/* Type */}
      <div className="mb-2" style={{ color: "var(--text-secondary)" }}>
        {tip.type}
      </div>
      {/* Divider */}
      <div style={{ borderTop: "1px solid var(--border-subtle)", marginBottom: 6 }} />
      {/* Stats */}
      {tip.stats.length > 0 ? (
        <ul className="space-y-0.5">
          {tip.stats.map((line, i) => (
            <li key={i} style={{ color: "var(--col-magic)" }}>
              {line}
            </li>
          ))}
        </ul>
      ) : (
        <span style={{ color: "var(--text-muted)" }}>No stats available</span>
      )}
    </div>
  );
}

export function RunewordsTab() {
  const [search, setSearch] = useState("");
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);
  const rafRef = useRef<number | null>(null);

  const q = search.trim().toLowerCase();

  const filtered = useMemo(() => {
    if (!q) return PARSED;
    return PARSED.filter(r =>
      r.name.toLowerCase().includes(q) ||
      r.type.toLowerCase().includes(q) ||
      r.runesStr.toLowerCase().includes(q)
    );
  }, [q]);

  const handleMouseMove = useCallback((e: React.MouseEvent, r: typeof PARSED[0]) => {
    const x = e.clientX;
    const y = e.clientY;
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const key = r.name.toLowerCase();
      const stats = RW_STATS[key] ?? [];
      setTooltip({ name: r.name, type: r.type, runesStr: r.runesStr, stats, x, y });
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    setTooltip(null);
  }, []);

  return (
    <div className="space-y-3">
      {tooltip && <RunewordTooltip tip={tooltip} />}

      {/* Controls */}
      <div className="flex flex-wrap gap-2 items-center text-xs">
        <input
          type="text"
          placeholder="Search name, type or runes…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="rounded px-2 py-1 w-56 focus:outline-none"
          style={{
            background: "var(--bg-raised)",
            border: "1px solid var(--border-default)",
            color: "var(--text-primary)",
          }}
        />
        <span style={{ color: "var(--text-muted)" }}>
          {filtered.length} / {PARSED.length}
        </span>
        <span style={{ color: "var(--text-muted)" }}>· Hover a row to see item stats</span>
      </div>

      <div className="overflow-x-auto">
        <table className="head w-full border-collapse text-sm">
          <thead>
            <tr className="bt bb">
              <th className="text-left p-2">S</th>
              <th className="text-left p-2">Name</th>
              <th className="text-left p-2">Sock</th>
              <th className="text-left p-2">Type</th>
              <th className="text-left p-2">Runes</th>
              <th className="text-left p-2">Lev</th>
              <th className="text-left p-2">Ver</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-4 text-center" style={{ color: "var(--text-muted)" }}>
                  No runewords match your search.
                </td>
              </tr>
            ) : filtered.map((r, i) => (
              <tr
                key={i}
                className={i % 2 === 0 ? "b11" : "b22"}
                style={{ cursor: "default" }}
                onMouseMove={e => handleMouseMove(e, r)}
                onMouseLeave={handleMouseLeave}
              >
                <td className="p-2">{r.tier === "*" ? "★" : ""}</td>
                <td className="p-2 font-medium">{r.name}</td>
                <td className="p-2">{r.sockets}</td>
                <td className="p-2" style={{ color: "var(--text-secondary)" }}>{r.type}</td>
                <td className="p-2" style={{ color: "var(--col-rune)" }}>{r.runesStr}</td>
                <td className="p-2">{r.lev}</td>
                <td className="p-2" style={{ color: "var(--text-muted)" }}>{r.version}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
