"use client";

import { useState, useEffect, useCallback } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────

interface TZGroup {
  act: 1 | 2 | 3 | 4 | 5;
  /** All zone names belonging to this TZ group */
  zones: string[];
  /** alvl in Hell when TZ'd */
  alvl: number;
  tier?: "S" | "A" | "B";
}

interface LiveTZ {
  zone: string;
  act: string;
}

interface LiveTZData {
  current: LiveTZ | null;
  next: LiveTZ | null;
  error: string | null;
  loading: boolean;
  lastFetched: Date | null;
}

// ─── TZ Rotation data ────────────────────────────────────────────────────────
// Each group matches the zone strings returned by the d2runewizard API
// so we can highlight the matching row in the reference table.

const TZ_ROTATION: TZGroup[] = [
  // Act I
  { act: 1, zones: ["Moo Moo Farm", "Secret Cow Level"],                                                         alvl: 81, tier: "A" },
  { act: 1, zones: ["Inner Cloister", "Cathedral", "Catacombs"],                                                  alvl: 85, tier: "A" },
  { act: 1, zones: ["Tamoe Highland", "The Pit", "Outer Cloister"],                                               alvl: 85, tier: "S" },
  { act: 1, zones: ["Jail", "Barracks"],                                                                          alvl: 85, tier: "B" },
  { act: 1, zones: ["Black Marsh", "The Hole", "Forgotten Tower"],                                                alvl: 85, tier: "B" },
  { act: 1, zones: ["Dark Wood", "Underground Passage"],                                                          alvl: 85, tier: "B" },
  { act: 1, zones: ["Stony Field", "Tristram"],                                                                   alvl: 85, tier: "B" },
  { act: 1, zones: ["Burial Grounds", "The Crypt", "The Mausoleum"],                                              alvl: 85, tier: "A" },
  { act: 1, zones: ["Cold Plains", "The Cave"],                                                                   alvl: 85, tier: "B" },

  // Act II
  { act: 2, zones: ["Canyon of the Magi", "Tal Rasha's Tombs"],                                                  alvl: 85, tier: "A" },
  { act: 2, zones: ["Harem", "Palace Cellar", "Arcane Sanctuary"],                                               alvl: 85, tier: "A" },
  { act: 2, zones: ["Lost City", "Valley of Snakes", "Claw Viper Temple", "Ancient Tunnels"],                    alvl: 85, tier: "S" },
  { act: 2, zones: ["Far Oasis", "Maggot Lair"],                                                                  alvl: 85, tier: "B" },
  { act: 2, zones: ["Dry Hills", "Halls of the Dead"],                                                           alvl: 85, tier: "B" },
  { act: 2, zones: ["Rocky Waste", "Stony Tomb"],                                                                 alvl: 85, tier: "B" },
  { act: 2, zones: ["Lut Gholein Sewers", "Sewers"],                                                             alvl: 85, tier: "B" },

  // Act III
  { act: 3, zones: ["Durance of Hate"],                                                                           alvl: 85, tier: "S" },
  { act: 3, zones: ["Travincal"],                                                                                  alvl: 85, tier: "A" },
  { act: 3, zones: ["Kurast Bazaar", "Ruined Temple", "Disused Fane", "Lower Kurast", "Upper Kurast", "Forgotten Temple", "Forgotten Reliquary", "Disused Reliquary"], alvl: 85, tier: "A" },
  { act: 3, zones: ["Flayer Jungle", "Flayer Dungeon", "Swampy Pit"],                                            alvl: 85, tier: "B" },
  { act: 3, zones: ["Great Marsh"],                                                                                alvl: 85, tier: "B" },
  { act: 3, zones: ["Spider Forest", "Spider Cavern", "Arachnid Lair"],                                          alvl: 85, tier: "B" },

  // Act IV
  { act: 4, zones: ["Chaos Sanctuary"],                                                                           alvl: 85, tier: "S" },
  { act: 4, zones: ["River of Flame", "City of the Damned"],                                                     alvl: 85, tier: "A" },
  { act: 4, zones: ["Outer Steppes", "Plains of Despair"],                                                       alvl: 85, tier: "B" },

  // Act V
  { act: 5, zones: ["Worldstone Keep", "Throne of Destruction", "Worldstone Chamber"],                           alvl: 85, tier: "S" },
  { act: 5, zones: ["Ancients' Way", "Icy Cellar"],                                                              alvl: 85, tier: "A" },
  { act: 5, zones: ["Nihlathak's Temple", "Halls of Anguish", "Halls of Pain", "Halls of Vaught"],               alvl: 85, tier: "A" },
  { act: 5, zones: ["Arreat Plateau", "Pit of Acheron"],                                                          alvl: 85, tier: "A" },
  { act: 5, zones: ["Frozen Tundra", "Infernal Pit"],                                                             alvl: 85, tier: "B" },
  { act: 5, zones: ["Crystalline Passage", "Frozen River"],                                                      alvl: 85, tier: "B" },
  { act: 5, zones: ["Glacial Trail", "Drifter Cavern"],                                                           alvl: 85, tier: "B" },
  { act: 5, zones: ["Bloody Foothills", "Frigid Highlands", "Abaddon"],                                          alvl: 85, tier: "B" },
];

// ─── Immunity badge config ───────────────────────────────────────────────────

interface ImmunityInfo {
  label: string;
  bg: string;
  fg: string;
}

const IMMUNITY_MAP: Record<string, ImmunityInfo> = {
  Fire:     { label: "FI", bg: "var(--res-fire)", fg: "#fff" },
  Cold:     { label: "CI", bg: "var(--res-cold)", fg: "#fff" },
  Lightning:{ label: "LI", bg: "var(--res-ltng)", fg: "#000" },
  Poison:   { label: "PI", bg: "var(--res-psn)",  fg: "#fff" },
  Magic:    { label: "MI", bg: "var(--col-magic)", fg: "#fff" },
  Physical: { label: "PI", bg: "var(--res-phys)", fg: "#fff" },
};

// ─── Sundered Charms ─────────────────────────────────────────────────────────

const SUNDERED_CHARMS = [
  { name: "Flame Rift",           playerEffect: "Fire Resistance lowered",      monsterEffect: "Fire Immunity Sundered",      res: "Fire"      },
  { name: "Cold Rupture",         playerEffect: "Cold Resistance lowered",      monsterEffect: "Cold Immunity Sundered",      res: "Cold"      },
  { name: "Crack of the Heavens", playerEffect: "Lightning Resistance lowered", monsterEffect: "Lightning Immunity Sundered", res: "Lightning" },
  { name: "Rotting Fissure",      playerEffect: "Poison Resistance lowered",    monsterEffect: "Poison Immunity Sundered",    res: "Poison"    },
  { name: "Black Cleft",          playerEffect: "Magic Resistance lowered",     monsterEffect: "Magic Immunity Sundered",     res: "Magic"     },
  { name: "Bone Break",           playerEffect: "Physical Damage Received ↑",  monsterEffect: "Physical Immunity Sundered",  res: "Physical"  },
];

// ─── Styling constants ───────────────────────────────────────────────────────

const TIER_COLORS: Record<string, string> = {
  S: "var(--col-unq)",
  A: "var(--col-set)",
  B: "var(--text-secondary)",
};

const ACT_LABELS: Record<number, string> = {
  1: "Act I — Rogue Encampment",
  2: "Act II — Lut Gholein",
  3: "Act III — Kurast Docks",
  4: "Act IV — Pandemonium Fortress",
  5: "Act V — Harrogath",
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Return the TZ group whose zones overlap with the API zone string */
function matchGroup(apiZone: string): TZGroup | undefined {
  if (!apiZone) return undefined;
  const lower = apiZone.toLowerCase();
  return TZ_ROTATION.find(g =>
    g.zones.some(z => lower.includes(z.toLowerCase()) || z.toLowerCase().includes(lower))
  );
}

function ImmBadge({ label, info }: { label: string; info: ImmunityInfo }) {
  return (
    <span
      className="inline-block text-xs font-bold rounded px-1 py-0.5"
      style={{ background: info.bg, color: info.fg, fontSize: 10 }}
      title={label + " Immune"}
    >
      {info.label}
    </span>
  );
}

// ─── Live TZ Card ─────────────────────────────────────────────────────────────

function TZCard({
  label,
  tz,
  accent,
}: {
  label: string;
  tz: LiveTZ | null;
  accent: string;
}) {
  const group = tz ? matchGroup(tz.zone) : undefined;
  const tier  = group?.tier ?? null;

  return (
    <div
      className="flex-1 rounded-lg p-4 min-w-0"
      style={{
        background: "var(--bg-surface)",
        border: `2px solid ${accent}`,
      }}
    >
      <div className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: accent }}>
        {label}
      </div>

      {tz ? (
        <>
          <div className="font-bold text-base leading-tight mb-1" style={{ color: "var(--text-primary)" }}>
            {tz.zone}
          </div>
          <div className="text-xs mb-2" style={{ color: "var(--text-muted)" }}>
            {tz.act.replace("act", "Act ").replace("act", "Act ").replace(/act(\d)/i, "Act $1")}
          </div>
          {group && tier && (
            <div className="flex items-center gap-2 flex-wrap">
              <span
                className="text-xs font-bold px-1.5 py-0.5 rounded"
                style={{
                  color: TIER_COLORS[tier],
                  border: `1px solid ${TIER_COLORS[tier]}`,
                  background: "transparent",
                }}
              >
                Tier {tier}
              </span>
              <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                alvl {group.alvl}
              </span>
            </div>
          )}
        </>
      ) : (
        <div className="text-sm" style={{ color: "var(--text-muted)" }}>—</div>
      )}
    </div>
  );
}

// ─── Timer hook ──────────────────────────────────────────────────────────────

function useTimer() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const totalSeconds = Math.floor(now.getTime() / 1000);
  const windowSecs   = 30 * 60;
  const elapsed      = totalSeconds % windowSecs;
  const remaining    = windowSecs - elapsed;
  const mins = Math.floor(remaining / 60).toString().padStart(2, "0");
  const secs = (remaining % 60).toString().padStart(2, "0");
  const progress = elapsed / windowSecs;

  return { remaining, mins, secs, progress };
}

// ─── Live TZ fetch hook ───────────────────────────────────────────────────────

// Proxied through our own Next.js API route to avoid CORS issues
const TZ_API = "/api/terror-zone";

function useLiveTZ(): LiveTZData & { refetch: () => void } {
  const [data, setData] = useState<LiveTZData>({
    current: null, next: null, error: null, loading: true, lastFetched: null,
  });

  const fetch_ = useCallback(() => {
    setData(d => ({ ...d, loading: true, error: null }));
    fetch(TZ_API)
      .then(r => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((json) => {
        setData({
          current:     json.currentTerrorZone  ?? null,
          next:        json.nextTerrorZone      ?? null,
          error:       null,
          loading:     false,
          lastFetched: new Date(),
        });
      })
      .catch(e => {
        setData(d => ({ ...d, loading: false, error: String(e) }));
      });
  }, []);

  // initial fetch
  useEffect(() => { fetch_(); }, [fetch_]);

  // auto-refresh every 30 s
  useEffect(() => {
    const id = setInterval(fetch_, 30_000);
    return () => clearInterval(id);
  }, [fetch_]);

  return { ...data, refetch: fetch_ };
}

// ─── Main component ───────────────────────────────────────────────────────────

type ActFilter  = "all" | 1 | 2 | 3 | 4 | 5;
type TierFilter = "all" | "S" | "A" | "B";

export function TerrorZoneTab() {
  const live = useLiveTZ();
  const { remaining, mins, secs, progress } = useTimer();

  const [actFilter,  setActFilter]  = useState<ActFilter>("all");
  const [tierFilter, setTierFilter] = useState<TierFilter>("all");
  const [search, setSearch]         = useState("");

  const urgent = remaining < 5 * 60;
  const soon   = remaining < 10 * 60;
  const timerColor = urgent ? "var(--res-fire)" : soon ? "var(--accent-bright)" : "var(--col-set)";

  const q = search.trim().toLowerCase();

  // Current/next matched groups (to highlight in table)
  const currentGroup = live.current ? matchGroup(live.current.zone) : undefined;
  const nextGroup    = live.next    ? matchGroup(live.next.zone)    : undefined;

  const filtered = TZ_ROTATION.filter(g => {
    if (actFilter  !== "all" && g.act  !== actFilter)  return false;
    if (tierFilter !== "all" && g.tier !== tierFilter) return false;
    if (q && !g.zones.some(z => z.toLowerCase().includes(q))) return false;
    return true;
  });

  const grouped = ([1, 2, 3, 4, 5] as const)
    .map(act => ({ act, rows: filtered.filter(g => g.act === act) }))
    .filter(g => g.rows.length > 0);

  const btnBase: React.CSSProperties = {
    padding: "3px 10px", borderRadius: 4, fontSize: 11, fontWeight: 600,
    cursor: "pointer", border: "1px solid var(--border-default)", transition: "all 0.1s",
  };

  function actBtn(id: ActFilter, label: string) {
    const active = actFilter === id;
    return (
      <button key={String(id)} onClick={() => setActFilter(id)}
        style={{ ...btnBase, background: active ? "var(--bg-overlay)" : "transparent", color: active ? "var(--text-primary)" : "var(--text-muted)" }}>
        {label}
      </button>
    );
  }

  function tierBtn(id: TierFilter, label: string, color?: string) {
    const active = tierFilter === id;
    return (
      <button key={String(id)} onClick={() => setTierFilter(id)}
        style={{ ...btnBase, background: active ? "var(--bg-overlay)" : "transparent", color: active ? (color ?? "var(--text-primary)") : "var(--text-muted)", borderColor: active && color ? color : "var(--border-default)" }}>
        {label}
      </button>
    );
  }

  return (
    <div className="space-y-6">

      {/* ── Live current / next cards + timer ── */}
      <div
        className="rounded-lg p-4 space-y-4"
        style={{ background: "var(--bg-surface)", border: "1px solid var(--border-subtle)" }}
      >
        {/* Cards row */}
        <div className="flex flex-col sm:flex-row gap-3">
          <TZCard label="Current Terror Zone" tz={live.current} accent="var(--col-magic)" />
          <TZCard label="Next Terror Zone"    tz={live.next}    accent="var(--accent)"    />
        </div>

        {/* Status / error */}
        {live.error && (
          <div className="text-xs rounded px-3 py-2" style={{ background: "rgba(192,67,58,0.15)", color: "var(--res-fire)", border: "1px solid var(--res-fire)" }}>
            Could not fetch live data: {live.error}. Showing rotation reference only.
          </div>
        )}

        {/* Timer row */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>
                Next rotation in{" "}
              </span>
              <span className="font-mono font-bold text-base" style={{ color: timerColor }}>
                {mins}:{secs}
              </span>
            </div>
            <div className="flex items-center gap-3 text-xs" style={{ color: "var(--text-muted)" }}>
              {live.lastFetched && (
                <span>Updated {live.lastFetched.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })}</span>
              )}
              <button
                onClick={live.refetch}
                disabled={live.loading}
                className="rounded px-2 py-0.5 text-xs"
                style={{
                  background: "var(--bg-raised)",
                  border: "1px solid var(--border-default)",
                  color: live.loading ? "var(--text-muted)" : "var(--text-primary)",
                  cursor: live.loading ? "default" : "pointer",
                }}
              >
                {live.loading ? "Loading…" : "↻ Refresh"}
              </button>
            </div>
          </div>
          {/* Progress bar: fills as window elapses */}
          <div className="w-full rounded-full overflow-hidden" style={{ height: 5, background: "var(--bg-raised)" }}>
            <div className="h-full rounded-full" style={{ width: `${progress * 100}%`, background: timerColor, transition: "width 1s linear" }} />
          </div>
          <div className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
            Rotates every 30 min aligned to the UTC half-hour · data via{" "}
            <a href="https://d2runewizard.com/terror-zone-tracker" target="_blank" rel="noopener noreferrer"
              style={{ color: "var(--text-secondary)" }} className="hover:underline">
              d2runewizard.com
            </a>
          </div>
        </div>
      </div>

      {/* ── TZ Rotation reference table ── */}
      <div>
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <h2 className="text-sm font-semibold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
            TZ Rotation Reference
          </h2>
          <input
            type="text" placeholder="Search zones…" value={search}
            onChange={e => setSearch(e.target.value)}
            className="rounded px-2 py-1 text-xs w-44 focus:outline-none"
            style={{ background: "var(--bg-raised)", border: "1px solid var(--border-default)", color: "var(--text-primary)" }}
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-3">
          <div className="flex flex-wrap gap-1 items-center">
            <span className="text-xs mr-1" style={{ color: "var(--text-muted)" }}>Act:</span>
            {actBtn("all","All")} {actBtn(1,"I")} {actBtn(2,"II")} {actBtn(3,"III")} {actBtn(4,"IV")} {actBtn(5,"V")}
          </div>
          <div className="flex flex-wrap gap-1 items-center">
            <span className="text-xs mr-1" style={{ color: "var(--text-muted)" }}>Tier:</span>
            {tierBtn("all","All")} {tierBtn("S","S",TIER_COLORS.S)} {tierBtn("A","A",TIER_COLORS.A)} {tierBtn("B","B")}
          </div>
        </div>

        {/* Tier legend */}
        <div className="flex flex-wrap gap-4 mb-4 text-xs" style={{ color: "var(--text-muted)" }}>
          <span><span style={{ color: TIER_COLORS.S, fontWeight: 700 }}>S</span> — Best farming (dense packs, alvl 85)</span>
          <span><span style={{ color: TIER_COLORS.A, fontWeight: 700 }}>A</span> — Great farming (alvl 85)</span>
          <span><span style={{ color: TIER_COLORS.B, fontWeight: 700 }}>B</span> — Viable (alvl 85, lower density)</span>
          <span>
            <span
              className="inline-block w-2 h-2 rounded-sm mr-1"
              style={{ background: "rgba(96,128,255,0.18)", border: "1px solid var(--col-magic)", display: "inline-block" }}
            />
            Current TZ
          </span>
          <span>
            <span
              className="inline-block w-2 h-2 rounded-sm mr-1"
              style={{ background: "rgba(200,146,42,0.18)", border: "1px solid var(--accent)", display: "inline-block" }}
            />
            Next TZ
          </span>
        </div>

        {filtered.length === 0 ? (
          <div className="text-sm py-6 text-center" style={{ color: "var(--text-muted)" }}>No zones match your filter.</div>
        ) : (
          <div className="space-y-5">
            {grouped.map(({ act, rows }) => (
              <div key={act}>
                <div
                  className="text-xs font-bold uppercase tracking-widest px-2 py-1 mb-2 rounded"
                  style={{ background: "var(--bg-overlay)", color: "var(--accent-bright)" }}
                >
                  {ACT_LABELS[act]}
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-sm">
                    <thead>
                      <tr style={{ borderBottom: "1px solid var(--border-subtle)" }}>
                        <th className="text-left p-2 text-xs font-semibold" style={{ color: "var(--text-muted)", width: 40 }}>Tier</th>
                        <th className="text-left p-2 text-xs font-semibold" style={{ color: "var(--text-muted)" }}>Zones</th>
                        <th className="text-right p-2 text-xs font-semibold" style={{ color: "var(--text-muted)", width: 64 }}>alvl</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rows.map((g, i) => {
                        const tier      = g.tier ?? "B";
                        const isCurrent = g === currentGroup;
                        const isNext    = g === nextGroup;
                        let rowBg = i % 2 === 0 ? "var(--bg-surface)" : "var(--bg-raised)";
                        let rowBorder = "1px solid var(--border-subtle)";
                        if (isCurrent) { rowBg = "rgba(96,128,255,0.14)"; rowBorder = "1px solid var(--col-magic)"; }
                        else if (isNext) { rowBg = "rgba(200,146,42,0.12)"; rowBorder = "1px solid var(--accent)"; }

                        return (
                          <tr key={i} style={{ background: rowBg, borderBottom: rowBorder }}>
                            <td className="p-2 text-center font-bold text-xs" style={{ color: TIER_COLORS[tier] }}>
                              {tier}
                              {isCurrent && <span className="ml-1" style={{ color: "var(--col-magic)" }}>●</span>}
                              {isNext    && <span className="ml-1" style={{ color: "var(--accent)" }}>●</span>}
                            </td>
                            <td className="p-2">
                              <div className="flex flex-wrap gap-x-1 gap-y-0.5">
                                {g.zones.map((z, j) => (
                                  <span key={j} className="text-xs">
                                    {j > 0 && <span style={{ color: "var(--border-default)" }} className="mr-1">·</span>}
                                    <span style={{ color: j === 0 ? "var(--text-primary)" : "var(--text-secondary)" }}>{z}</span>
                                  </span>
                                ))}
                              </div>
                            </td>
                            <td className="p-2 text-right font-mono text-xs" style={{ color: "var(--col-magic)" }}>
                              {g.alvl}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Sundered Charms ── */}
      <div>
        <h2 className="text-sm font-semibold mb-3 uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
          Sundered Charms — TZ-Only Drops
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {SUNDERED_CHARMS.map((c) => {
            const imm = IMMUNITY_MAP[c.res];
            return (
              <div
                key={c.name}
                className="rounded p-3 text-xs"
                style={{
                  background: "var(--bg-surface)",
                  border: "1px solid var(--border-subtle)",
                  borderLeftWidth: 3,
                  borderLeftColor: imm?.bg ?? "var(--border-default)",
                }}
              >
                <div className="flex items-center gap-2 mb-1">
                  {imm && <ImmBadge label={c.res} info={imm} />}
                  <span className="font-bold" style={{ color: imm?.bg ?? "var(--text-primary)" }}>{c.name}</span>
                </div>
                <div style={{ color: "var(--col-magic)" }}>+ {c.monsterEffect}</div>
                <div style={{ color: "var(--res-fire)" }}>− {c.playerEffect}</div>
              </div>
            );
          })}
        </div>
        <p className="text-xs mt-2" style={{ color: "var(--text-muted)" }}>
          Drops from Champions &amp; Unique monsters inside Terror Zones only.
          Collect 5 terrorized boss statues → Horadric Cube → summon Colossal Ancients.
        </p>
      </div>

      {/* ── Monster scaling ── */}
      <div>
        <h2 className="text-sm font-semibold mb-3 uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
          Monster Scaling in Terror Zones
        </h2>
        <div className="overflow-x-auto">
          <table className="border-collapse text-sm">
            <thead>
              <tr style={{ background: "var(--bg-overlay)", borderBottom: "1px solid var(--border-default)" }}>
                {["Type", "Normal", "Nightmare", "Hell", "Level Cap (H/NM/N)"].map(h => (
                  <th key={h} className="p-2 text-xs text-left font-semibold" style={{ color: "var(--text-muted)" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { type: "Standard", n: "+2", nm: "+2", h: "+2", cap: "96 / 71 / 45" },
                { type: "Champion", n: "+4", nm: "+4", h: "+4", cap: "98 / 73 / 47" },
                { type: "Unique",   n: "+5", nm: "+5", h: "+5", cap: "99 / 74 / 48" },
              ].map((row, i) => (
                <tr key={row.type} style={{ background: i % 2 === 0 ? "var(--bg-surface)" : "var(--bg-raised)", borderBottom: "1px solid var(--border-subtle)" }}>
                  <td className="p-2 text-xs font-medium">{row.type}</td>
                  <td className="p-2 text-xs" style={{ color: "var(--text-secondary)" }}>{row.n} plvl</td>
                  <td className="p-2 text-xs" style={{ color: "var(--text-secondary)" }}>{row.nm} plvl</td>
                  <td className="p-2 text-xs font-bold" style={{ color: "var(--col-magic)" }}>{row.h} plvl</td>
                  <td className="p-2 text-xs font-mono" style={{ color: "var(--text-muted)" }}>{row.cap}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
