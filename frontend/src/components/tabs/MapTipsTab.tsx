"use client";

import Image from "next/image";

// ─── Canyon of the Magi tomb symbols ─────────────────────────────────────────
// The correct tomb is indicated by the symbol in Canyon of the Magi.
// Tal Rasha's Tomb entrance shows one of these 7 symbols; the other 6 are decoys.
const TOMB_SYMBOLS = [
  { symbol: "O",   desc: "Circle" },
  { symbol: ")",   desc: "Crescent" },
  { symbol: "[]",  desc: "Square" },
  { symbol: "*",   desc: "Star" },
  { symbol: "v",   desc: "Chevron / Down" },
  { symbol: "/\\", desc: "Triangle / Up" },
  { symbol: "O)",  desc: "Circled Crescent" },
];

// ─── Layout reading guide ─────────────────────────────────────────────────────
const LAYOUT_RULES = [
  { cls: "l", label: "Left",      desc: "Go left / CW from entrance for next area" },
  { cls: "c", label: "Straight",  desc: "Go straight from entrance for next area" },
  { cls: "c", label: "S→FR",      desc: "Go Straight from entrance to reach Frozen River" },
  { cls: "r", label: "Right",     desc: "Go right / CCW from entrance for next area" },
  { cls: "l", label: "wp→Left",   desc: "As you leave the waypoint tile, go Left to next area" },
  { cls: "r", label: "wp→Right",  desc: "As you leave the waypoint tile, go Right to next area" },
  { cls: "r", label: "chest→R",   desc: "From the chest, go Right to reach level 2" },
  { cls: "",  label: "Chest",     desc: "Direction leads to a chest" },
  { cls: "",  label: "Boss",      desc: "Direction leads to a mini-boss" },
];

// ─── Act II mercs ─────────────────────────────────────────────────────────────
const ACT2_MERCS = [
  { type: "Combat",  norm: "Prayer",      nm: "Thorns" },
  { type: "Defense", norm: "Defiance",    nm: "Holy Freeze" },
  { type: "Offense", norm: "Blessed Aim", nm: "Might" },
];

// ─── General tips ─────────────────────────────────────────────────────────────
const GENERAL_TIPS = [
  { heading: "Single-Player difficulty", body: "Use /players # to scale monster difficulty and XP/drops. 1 = quest speed, 3 = MF farming, 8 = levelling." },
  { heading: "Map seed (D2:R)", body: "The map layout is fixed per character in D2:R. Resetting maps requires respeccing or creating a new game. Use a map seed tool to cache your layout." },
  { heading: "Waypoint shorthand", body: "Activate WPs in every act before doing anything else — they let you reset farm runs instantly." },
  { heading: "Terror Zones (D2:R Ladder)", body: "Every hour a new Terror Zone raises monster alvl to match the player's level (up to 85). Check the tracker before your run." },
  { heading: "Area Level vs Item Level", body: "ilvl of a dropped item = mlvl of the monster that dropped it. Champions +2, Uniques +3 over the base alvl. You need mlvl ≥ 87 to drop TC87 items." },
  { heading: "MF cap", body: "Magic Find has diminishing returns. Effective MF ≈ raw MF / (raw MF + 100) × 100. Most players target 300–500% raw MF." },
];

export function MapTipsTab() {
  return (
    <div className="space-y-8 text-xs">

      {/* Tomb Symbols */}
      <section>
        <h3 className="font-semibold text-sm pb-1 mb-3" style={{ color: "var(--col-tc)", borderBottom: "1px solid var(--border-muted)" }}>
          Canyon of the Magi — Tal Rasha&apos;s Tomb Symbols
        </h3>
        <p className="mb-3" style={{ color: "var(--text-secondary)" }}>
          The entrance to Canyon of the Magi shows a symbol that matches the correct Tal Rasha&apos;s Tomb.
          The other six tombs are decoys. Find the matching symbol to go straight to the right tomb.
        </p>

        <div className="flex flex-col lg:flex-row gap-6 items-start">
          {/* Symbol reference table */}
          <div>
            <table className="head border-collapse">
              <thead>
                <tr className="yt yb">
                  <th className="p-1 px-3 text-left">Symbol</th>
                  <th className="p-1 px-3 text-left">Name</th>
                </tr>
              </thead>
              <tbody>
                {TOMB_SYMBOLS.map(({ symbol, desc }, i) => (
                  <tr key={i} className={i % 2 === 0 ? "y11 hover:brightness-150" : "y22 hover:brightness-150"}>
                    <td className="p-1 px-3 font-mono font-bold text-base" style={{ color: "var(--col-tc)" }}>{symbol}</td>
                    <td className="p-1 px-3" style={{ color: "var(--text-secondary)" }}>{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-2" style={{ color: "var(--text-muted)" }}>
              The symbol displayed at the Canyon entrance = the correct tomb entrance.
            </div>
          </div>

          {/* Tomb symbols image */}
          <div className="rounded overflow-hidden" style={{ border: "1px solid var(--border-subtle)" }}>
            <Image
              src="/pics/tomb_symbols.png"
              alt="Tal Rasha's Tomb symbols: O ) [] * v /\ O)"
              width={450}
              height={200}
              style={{ maxWidth: "100%", height: "auto", display: "block" }}
              unoptimized
            />
          </div>
        </div>
      </section>

      {/* Map Layout Reading */}
      <section>
        <h3 className="font-semibold text-sm pb-1 mb-3" style={{ color: "var(--text-heading)", borderBottom: "1px solid var(--border-muted)" }}>
          Map Layout Reading
        </h3>
        <p className="mb-3" style={{ color: "var(--text-secondary)" }}>
          Layout hints in the area level tables are always relative to the <strong style={{ color: "var(--text-primary)" }}>ENTRANCE</strong> of the zone, unless otherwise specified.
        </p>
        <table className="head border-collapse">
          <thead>
            <tr className="bt bb">
              <th className="p-1 px-3 text-left">Hint</th>
              <th className="p-1 px-3 text-left">Meaning</th>
            </tr>
          </thead>
          <tbody>
            {LAYOUT_RULES.map(({ cls, label, desc }, i) => (
              <tr key={i} className={i % 2 === 0 ? "b11 hover:brightness-150" : "b22 hover:brightness-150"}>
                <td className="p-1 px-3 font-mono font-semibold">
                  <span className={cls || undefined}>{label}</span>
                </td>
                <td className="p-1 px-3" style={{ color: "var(--text-secondary)" }}>{desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Act II Mercs + Players setting */}
      <div className="flex flex-wrap gap-6">
        <section>
          <h3 className="font-semibold text-sm pb-1 mb-3" style={{ color: "var(--hdr-y)", borderBottom: "1px solid var(--border-muted)" }}>
            Act II Mercenaries
          </h3>
          <table className="head border-collapse">
            <thead>
              <tr className="yt yb">
                <th className="p-1 px-3 text-left">Type</th>
                <th className="p-1 px-3 text-left">Normal / Hell</th>
                <th className="p-1 px-3 text-left">Nightmare</th>
              </tr>
            </thead>
            <tbody>
              {ACT2_MERCS.map(({ type, norm, nm }, i) => (
                <tr key={i} className={i % 2 === 0 ? "y11 hover:brightness-150" : "y22 hover:brightness-150"}>
                  <td className="p-1 px-3 font-semibold" style={{ color: "var(--text-primary)" }}>{type}</td>
                  <td className="p-1 px-3" style={{ color: "var(--text-secondary)" }}>{norm}</td>
                  <td className="p-1 px-3" style={{ color: "var(--text-secondary)" }}>{nm}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-2 rounded px-3 py-2" style={{ background: "var(--bg-surface)", border: "1px solid var(--border-subtle)", color: "var(--text-muted)" }}>
            <span className="set font-semibold">Single-Player Difficulty:</span>{" "}
            <span className="k22 font-mono">/players #</span>
            <div className="mt-1 g11 rounded px-2 py-0.5 inline-block ml-2">
              <strong>1</strong> = Quest &nbsp;·&nbsp; <strong>3</strong> = MF Farm &nbsp;·&nbsp; <strong>8</strong> = Levels
            </div>
          </div>
        </section>
      </div>

      {/* General Tips */}
      <section>
        <h3 className="font-semibold text-sm pb-1 mb-3" style={{ color: "var(--text-heading)", borderBottom: "1px solid var(--border-muted)" }}>
          General Tips
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {GENERAL_TIPS.map(({ heading, body }, i) => (
            <div key={i} className="rounded p-3" style={{ background: "var(--bg-surface)", border: "1px solid var(--border-subtle)" }}>
              <div className="font-semibold mb-1" style={{ color: "var(--accent-bright)" }}>{heading}</div>
              <div style={{ color: "var(--text-secondary)" }}>{body}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Links */}
      <section>
        <h3 className="font-semibold text-sm pb-1 mb-2" style={{ color: "var(--text-secondary)", borderBottom: "1px solid var(--border-muted)" }}>
          External Resources
        </h3>
        <ul className="space-y-1">
          {[
            ["https://maxroll.gg/d2/resources/map-reading",              "Map reading guide — Maxroll"],
            ["https://nightfallx2.wixsite.com/d2speedruns/map-layouts",  "Map layout guide — D2 Speedruns"],
            ["https://www.youtube.com/watch?v=iaAmrldC3c4",              "MrLlamaSC map reading guide (YouTube)"],
            ["https://d2runewizard.com/terror-zone-tracker",             "Terror Zone Tracker — d2runewizard"],
            ["https://diablo2.diablowiki.net/Guide:Level_85_Magic_Find_Areas_v1.10", "Level 85 MF areas guide — Diablowiki"],
          ].map(([href, label]) => (
            <li key={href}>
              <a href={href} target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: "var(--accent-bright)" }}>
                {label}
              </a>
            </li>
          ))}
        </ul>
      </section>

    </div>
  );
}
