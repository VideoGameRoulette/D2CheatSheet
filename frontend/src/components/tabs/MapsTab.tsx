"use client";

import { useState } from "react";
import { ALVL85_ZONES, COW_CANT_DROP, type AlvlZone } from "@/data/farming";

const ACT_COLORS = ["", "b", "g", "k", "r", "b"] as const;

// ─── Full area level tables ───────────────────────────────────────────────────
type Area = {
  wp?: boolean;
  tz?: boolean;
  name: string;
  indent?: number;
  norm: number | null;
  nm: number | null;
  hell: number | string;
  layout?: string;
  note?: string;
};

const AREAS: { act: number; title: string; cls: string; hdr: string; areas: Area[] }[] = [
  { act:1, title:"Act I — Rogue Encampment", cls:"b", hdr:"bt bb", areas:[
    { tz:true,  name:"Blood Moor",             norm:1,  nm:36, hell:67,   layout:"Follow path" },
    { tz:true,  name:"Den of Evil",            norm:1,  nm:36, hell:79,   indent:1 },
    { wp:true, tz:true, name:"Cold Plains",   norm:2,  nm:36, hell:68,   layout:"Follow path" },
    { tz:true,  name:"The Cave Level 1",       norm:2,  nm:36, hell:77,   indent:1 },
    { tz:true,  name:"The Cave Level 2",       norm:2,  nm:37, hell:78,   indent:1 },
    { tz:true,  name:"Burial Grounds",         norm:3,  nm:36, hell:80,   indent:0 },
    { tz:true,  name:"The Crypt",              norm:3,  nm:37, hell:"83", indent:1 },
    { tz:true,  name:"The Mausoleum",          norm:3,  nm:37, hell:"85", indent:1 },
    { wp:true, tz:true, name:"Stony Field",    norm:4,  nm:37, hell:68,   layout:"Follow path" },
    { tz:true,  name:"Tristram",               norm:6,  nm:39, hell:76,   indent:1, layout:"Cairn by path" },
    { tz:true,  name:"Underground Passage 1",  norm:4,  nm:37, hell:69,   indent:1, layout:"Right" },
    { tz:true,  name:"Underground Passage 2",  norm:4,  nm:38, hell:"85", indent:1 },
    { wp:true, tz:true, name:"Dark Wood",      norm:5,  nm:38, hell:68,   layout:"Follow path" },
    { wp:true, tz:true, name:"Black Marsh",    norm:6,  nm:38, hell:69,   layout:"Follow path" },
    { tz:true,  name:"Tower Cellar 1",         norm:7,  nm:38, hell:75,   indent:1, layout:"Left" },
    { tz:true,  name:"Tower Cellar 2",         norm:7,  nm:39, hell:76,   indent:2, layout:"Left" },
    { tz:true,  name:"Tower Cellar 3",         norm:7,  nm:40, hell:77,   indent:2, layout:"Left" },
    { tz:true,  name:"Tower Cellar 4",         norm:7,  nm:41, hell:78,   indent:2, layout:"Left" },
    { tz:true,  name:"Tower Cellar 5",         norm:7,  nm:42, hell:79,   indent:2 },
    { tz:true,  name:"The Hole Level 1",       norm:5,  nm:38, hell:80,   indent:1 },
    { tz:true,  name:"The Hole Level 2",       norm:5,  nm:39, hell:81,   indent:2 },
    {            name:"Tamoe Highland",         norm:8,  nm:39, hell:69,   layout:"Follow path" },
    { tz:true,  name:"The Pit Level 1",        norm:7,  nm:39, hell:"85", indent:1 },
    { tz:true,  name:"The Pit Level 2",        norm:7,  nm:40, hell:"85", indent:1 },
    {            name:"Monastery Gate",         norm:8,  nm:40, hell:70 },
    { wp:true,  name:"Outer Cloister",         norm:9,  nm:40, hell:70 },
    { tz:true,  name:"Barracks",               norm:9,  nm:40, hell:70,   layout:"Left or S" },
    { wp:true, tz:true, name:"Jail Level 1",   norm:10, nm:41, hell:71,   indent:1, layout:"Straight" },
    { tz:true,  name:"Jail Level 2",           norm:10, nm:41, hell:71,   indent:1, layout:"Straight" },
    { tz:true,  name:"Jail Level 3",           norm:10, nm:41, hell:71,   indent:1, layout:"Left" },
    { wp:true,  name:"Inner Cloister",         norm:10, nm:41, hell:72,   layout:"Left" },
    { tz:true,  name:"Cathedral",              norm:11, nm:42, hell:72,   layout:"Right" },
    { tz:true,  name:"Catacombs Level 1",      norm:11, nm:42, hell:72,   indent:1 },
    { wp:true, tz:true, name:"Catacombs Level 2", norm:11, nm:42, hell:73, indent:1, layout:"wp→Right" },
    { tz:true,  name:"Catacombs Level 3",      norm:12, nm:43, hell:73,   indent:1 },
    { tz:true,  name:"Catacombs Level 4",      norm:12, nm:43, hell:73,   indent:1 },
    { tz:true,  name:"Moo Moo Farm",           norm:28, nm:64, hell:81 },
  ]},
  { act:2, title:"Act II — Lut Gholein", cls:"y", hdr:"yt yb", areas:[
    { tz:true,  name:"Sewers Level 1",         norm:13, nm:43, hell:74,   indent:1, layout:"Chest→Right" },
    { wp:true, tz:true, name:"Sewers Level 2", norm:13, nm:43, hell:74,   indent:1, layout:"wp→L / S" },
    { tz:true,  name:"Sewers Level 3",         norm:14, nm:44, hell:75,   indent:1, layout:"Left" },
    { tz:true,  name:"Rocky Waste",            norm:14, nm:43, hell:75 },
    { tz:true,  name:"Stony Tomb Level 1",     norm:12, nm:44, hell:"85", indent:1, layout:"Left" },
    { tz:true,  name:"Stony Tomb Level 2",     norm:12, nm:44, hell:"85", indent:1, layout:"Chest/Boss" },
    { wp:true, tz:true, name:"Dry Hills",      norm:15, nm:44, hell:76 },
    { tz:true,  name:"Halls of the Dead 1",    norm:12, nm:44, hell:79,   indent:1, layout:"Left" },
    { wp:true, tz:true, name:"Halls of the Dead 2", norm:13, nm:45, hell:81, indent:2, layout:"Left/wp" },
    { tz:true,  name:"Halls of the Dead 3",    norm:13, nm:45, hell:82,   indent:2, layout:"Left" },
    { wp:true, tz:true, name:"Far Oasis",      norm:16, nm:45, hell:76 },
    {            name:"Maggot Lair Level 1",   norm:17, nm:45, hell:"84", indent:1, layout:"Right" },
    {            name:"Maggot Lair Level 2",   norm:17, nm:45, hell:"84", indent:2, layout:"Right" },
    {            name:"Maggot Lair Level 3",   norm:17, nm:46, hell:"85", indent:2, layout:"Straight" },
    { wp:true, tz:true, name:"Lost City",      norm:17, nm:46, hell:77 },
    { tz:true,  name:"Ancient Tunnels",        norm:17, nm:46, hell:"85", indent:1, layout:"Chest" },
    { tz:true,  name:"Valley of Snakes",       norm:18, nm:46, hell:77 },
    { tz:true,  name:"Claw Viper Temple 1",    norm:14, nm:47, hell:82,   indent:1, layout:"Left" },
    { tz:true,  name:"Claw Viper Temple 2",    norm:14, nm:47, hell:"83", indent:1 },
    {            name:"Harem Level 2",          norm:13, nm:47, hell:78 },
    { wp:true,  name:"Palace Cellar 1",        norm:13, nm:47, hell:78,   indent:1 },
    {            name:"Palace Cellar 2",        norm:13, nm:47, hell:78,   indent:1 },
    {            name:"Palace Cellar 3",        norm:13, nm:48, hell:78,   indent:1 },
    { wp:true, tz:true, name:"Arcane Sanctuary",norm:14,nm:48, hell:79,   layout:"RNG" },
    { wp:true,  name:"Canyon of the Magi",     norm:16, nm:48, hell:79 },
    { tz:true,  name:"Tal Rasha's Tomb",       norm:17, nm:49, hell:80,   layout:"Orifice" },
    {            name:"Tal Rasha's Chamber",    norm:17, nm:49, hell:80 },
  ]},
  { act:3, title:"Act III — Kurast Docks", cls:"g", hdr:"gt gb", areas:[
    { wp:true, tz:true, name:"Spider Forest", norm:21, nm:49, hell:79 },
    {            name:"Arachnid Lair",          norm:21, nm:50, hell:"85", indent:1 },
    { tz:true,  name:"Spider Cavern",          norm:21, nm:50, hell:79,   indent:1 },
    { wp:true, tz:true, name:"Great Marsh",    norm:21, nm:50, hell:80 },
    { wp:true, tz:true, name:"Flayer Jungle",  norm:22, nm:50, hell:80 },
    {            name:"Swampy Pit Level 1",     norm:21, nm:51, hell:"85", indent:1, layout:"Left" },
    {            name:"Swampy Pit Level 2",     norm:21, nm:51, hell:"85", indent:2, layout:"Left" },
    {            name:"Swampy Pit Level 3",     norm:21, nm:51, hell:"85", indent:2 },
    { tz:true,  name:"Flayer Dungeon 1",       norm:22, nm:51, hell:81,   indent:1, layout:"Left" },
    { tz:true,  name:"Flayer Dungeon 2",       norm:22, nm:51, hell:82,   indent:2, layout:"Left" },
    { tz:true,  name:"Flayer Dungeon 3",       norm:22, nm:51, hell:"83", indent:2 },
    { wp:true,  name:"Lower Kurast",           norm:22, nm:52, hell:80 },
    { wp:true, tz:true, name:"Kurast Bazaar",  norm:22, nm:52, hell:81 },
    { tz:true,  name:"Disused Fane",           norm:23, nm:53, hell:"85", indent:1 },
    { tz:true,  name:"Ruined Temple",          norm:23, nm:53, hell:"85", indent:1 },
    {            name:"Sewers Level 1",         norm:23, nm:52, hell:"85", indent:1, layout:"chest→Right" },
    {            name:"Sewers Level 2",         norm:24, nm:53, hell:"85", indent:2 },
    { wp:true,  name:"Upper Kurast",           norm:23, nm:52, hell:81 },
    {            name:"Forgotten Temple",       norm:24, nm:54, hell:"85", indent:1 },
    {            name:"Forgotten Reliquary",    norm:23, nm:53, hell:"85", indent:1 },
    {            name:"Kurast Causeway",        norm:24, nm:53, hell:81 },
    {            name:"Disused Reliquary",      norm:24, nm:54, hell:"85", indent:1 },
    {            name:"Ruined Fane",            norm:24, nm:54, hell:"85", indent:1 },
    { wp:true, tz:true, name:"Travincal",      norm:24, nm:54, hell:82 },
    { tz:true,  name:"Durance of Hate 1",      norm:25, nm:55, hell:"83", indent:1, layout:"Left" },
    { wp:true, tz:true, name:"Durance of Hate 2", norm:25, nm:55, hell:"83", indent:1, layout:"wp/S" },
    { tz:true,  name:"Durance of Hate 3",      norm:25, nm:55, hell:"83", indent:1 },
  ]},
  { act:4, title:"Act IV — Pandemonium Fortress", cls:"r", hdr:"rt rb", areas:[
    { tz:true,  name:"Outer Steppes",          norm:26, nm:56, hell:82 },
    { tz:true,  name:"Plains of Despair",      norm:26, nm:56, hell:"83" },
    { wp:true, tz:true, name:"City of the Damned", norm:27, nm:57, hell:"84" },
    { wp:true, tz:true, name:"River of Flame", norm:27, nm:57, hell:"85", layout:"Straight" },
    { tz:true,  name:"Chaos Sanctuary",        norm:28, nm:58, hell:"85" },
  ]},
  { act:5, title:"Act V — Harrogath", cls:"k", hdr:"kt kb", areas:[
    { tz:true,  name:"Bloody Foothills",       norm:24, nm:58, hell:80 },
    { wp:true, tz:true, name:"Frigid Highlands",norm:25, nm:59, hell:81 },
    { tz:true,  name:"Abaddon",                norm:39, nm:60, hell:"85", indent:1 },
    { wp:true, tz:true, name:"Arreat Plateau", norm:26, nm:60, hell:81 },
    { tz:true,  name:"Pit of Acheron",         norm:39, nm:61, hell:"85", indent:1 },
    { wp:true, tz:true, name:"Crystalline Passage", norm:29, nm:61, hell:82, layout:"Left / S→FR" },
    { tz:true,  name:"Frozen River",           norm:29, nm:61, hell:"83", indent:1 },
    { tz:true,  name:"Nihlathak's Temple",     norm:32, nm:63, hell:"83" },
    { tz:true,  name:"Halls of Anguish",       norm:33, nm:63, hell:"83", indent:1, layout:"2 red eyes" },
    { wp:true, tz:true, name:"Halls of Pain",  norm:34, nm:64, hell:"84", indent:1, layout:"2 red eyes" },
    { tz:true,  name:"Halls of Vaught",        norm:36, nm:64, hell:"84", indent:1, layout:"2 red eyes" },
    { wp:true, tz:true, name:"Glacial Trail",  norm:29, nm:61, hell:"83", layout:"Left / wp" },
    { tz:true,  name:"Drifter Cavern",         norm:29, nm:61, hell:"85", indent:1 },
    { wp:true,  name:"Frozen Tundra",          norm:27, nm:60, hell:81 },
    {            name:"Infernal Pit",           norm:39, nm:62, hell:"85", indent:1 },
    { wp:true, tz:true, name:"The Ancients' Way", norm:29, nm:62, hell:82, layout:"Left" },
    { tz:true,  name:"Icy Cellar",             norm:29, nm:62, hell:"85", indent:1 },
    {            name:"Arreat Summit",          norm:37, nm:68, hell:87 },
    { tz:true,  name:"The Worldstone Keep 1",  norm:39, nm:65, hell:"85", indent:1 },
    { wp:true, tz:true, name:"The Worldstone Keep 2", norm:40, nm:65, hell:"85", indent:1, layout:"wp→Right" },
    { tz:true,  name:"The Worldstone Keep 3",  norm:42, nm:66, hell:"85", indent:1 },
    { tz:true,  name:"Throne of Destruction",  norm:43, nm:66, hell:"85" },
    { tz:true,  name:"Worldstone Chamber",     norm:43, nm:66, hell:"85", indent:1 },
    {            name:"Forgotten Sands (Über)", norm:null, nm:null, hell:"83" },
    {            name:"Furnace of Pain (Über)", norm:null, nm:null, hell:"83" },
    {            name:"Matron's Den (Über)",    norm:null, nm:null, hell:"83" },
    {            name:"Über Tristram",          norm:null, nm:null, hell:"83" },
  ]},
];

const ACT_HDR_COLORS: Record<string, string> = { b:"bt bb", y:"yt yb", g:"gt gb", r:"rt rb", k:"kt kb" };

function alvlColor(h: number | string): string {
  if (h === "85") return "alvl85-col font-bold";
  if (h === "84") return "alvl84-col";
  if (h === "83") return "alvl83-col";
  return "text-secondary-d";
}

function AlvlActTable({ act }: { act: typeof AREAS[number] }) {
  const rows = act.areas;
  return (
    <div className="overflow-x-auto">
      <table className="head border-collapse text-xs font-mono whitespace-nowrap w-full">
        <thead>
          <tr className={`${ACT_HDR_COLORS[act.cls]}`}>
            <th className="p-0.5 px-1 w-4 text-center" title="Waypoint">wp</th>
            <th className="p-0.5 px-1 w-4 text-center" title="Terror Zone">TZ</th>
            <th className="p-0.5 px-1 text-left">{act.title}</th>
            <th className="p-0.5 px-1 text-center">N</th>
            <th className="p-0.5 px-1 text-center">nm</th>
            <th className="p-0.5 px-1 text-center">H</th>
            <th className="p-0.5 px-1 text-left text-secondary-d">layout</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((a, i) => {
            const cls = `${act.cls}${i % 2 === 0 ? "11" : "22"}`;
            const indent = a.indent ? "\u00a0\u00a0".repeat(a.indent) : "";
            return (
              <tr key={i} className={`${cls} hover:brightness-150 cursor-default`}>
                <td className="p-0.5 px-1 text-center">{a.wp ? <span style={{ color: "var(--accent-bright)" }}>●</span> : ""}</td>
                <td className="p-0.5 px-1 text-center">{a.tz ? <span style={{ color: "var(--col-magic)" }}>●</span> : ""}</td>
                <td className="p-0.5 px-1">{indent}{a.name}</td>
                <td className="p-0.5 px-1 text-center text-muted-d">{a.norm ?? "—"}</td>
                <td className="p-0.5 px-1 text-center text-muted-d">{a.nm ?? "—"}</td>
                <td className={`p-0.5 px-1 text-center ${alvlColor(a.hell)}`}>{a.hell}</td>
                <td className="p-0.5 px-1 text-muted-d">{a.layout ?? ""}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function ImmBadge({ active, label, cls }: { active: boolean; label: string; cls: string }) {
  if (!active) return <span className="text-gray-700 px-0.5">·</span>;
  return <span className={`${cls} px-0.5 font-bold`}>{label}</span>;
}

function Alvl85Table({ zones }: { zones: AlvlZone[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="head w-full border-collapse text-xs font-mono whitespace-nowrap">
        <thead>
          <tr className="gt gb">
            <th className="p-1 text-left">Act</th>
            <th className="p-1 text-left">Nearest WP</th>
            <th className="p-1 text-left">Zone</th>
            <th className="p-1 text-left">
              <a
                href="https://diablo2.diablowiki.net/Guide:Level_85_Magic_Find_Areas_v1.10"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
                style={{ color: "var(--accent-bright)" }}
              >
                Farm Zone (alvl 85, TC87*)
              </a>
            </th>
            <th className="p-1 text-center">#Packs</th>
            <th className="p-1 text-center" title="Immunities"><span className="resf">F</span><span className="resc">C</span><span className="resl">L</span><span className="resp">P</span><span className="resh">p</span><span className="resm">m</span></th>
          </tr>
        </thead>
        <tbody>
          {zones.map((z, i) => {
            const rowCls = `${ACT_COLORS[z.act]}${i % 2 === 0 ? "11" : "22"}`;
            return (
              <tr key={i} className={`${rowCls} hover:brightness-150 cursor-default`}>
                <td className="p-1 pl-2">{z.act}</td>
                <td className="p-1">{z.wp}</td>
                <td className="p-1" style={{ color: "var(--text-secondary)" }}>{z.zone}</td>
                <td className="p-1 font-semibold" style={{ color: "var(--text-primary)" }}>{z.farmZone}</td>
                <td className="p-1 text-center">{z.packs}</td>
                <td className="p-1 text-center">
                  <ImmBadge active={z.F}  label="F" cls="resf" />
                  <ImmBadge active={z.C}  label="C" cls="resc" />
                  <ImmBadge active={z.L}  label="L" cls="resl" />
                  <ImmBadge active={z.P}  label="P" cls="resp" />
                  <ImmBadge active={z.ph} label="p" cls="resh" />
                  <ImmBadge active={z.m}  label="m" cls="resm" />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

// ─── Act tab config ───────────────────────────────────────────────────────────
type ActTab =
  | { kind: "act"; act: number; cls: string }
  | { kind: "alvl85" };

const ACT_TAB_COLORS: Record<string, { active: string; border: string }> = {
  b: { active: "var(--hdr-b)", border: "var(--hdr-b)" },
  y: { active: "var(--hdr-y)", border: "var(--hdr-y)" },
  g: { active: "var(--hdr-g)", border: "var(--hdr-g)" },
  r: { active: "var(--hdr-r)", border: "var(--hdr-r)" },
  k: { active: "var(--hdr-k)", border: "var(--hdr-k)" },
};

const ALVL85_TAB_COLOR = { active: "var(--col-set)", border: "var(--col-set)" };

function AlvlSection() {
  const [activeTab, setActiveTab] = useState<ActTab>({ kind: "act", act: 1 });

  const isAlvl85 = activeTab.kind === "alvl85";
  const actData  = activeTab.kind === "act" ? AREAS.find(a => a.act === activeTab.act)! : null;

  function tabStyle(isActive: boolean, colors: { active: string; border: string }) {
    return isActive
      ? {
          background:   "var(--bg-overlay)",
          color:         colors.active,
          borderTop:    `2px solid ${colors.border}`,
          borderLeft:   "1px solid var(--border-default)",
          borderRight:  "1px solid var(--border-default)",
          borderBottom: "1px solid var(--bg-overlay)",
          marginBottom: "-1px",
        }
      : {
          background: "transparent",
          color:      "var(--text-secondary)",
          border:     "1px solid transparent",
        };
  }

  return (
    <section>
      <h3 className="font-semibold text-sm pb-1 mb-3" style={{ color: "var(--col-tc)", borderBottom: "1px solid var(--border-muted)" }}>
        Area Levels — All Acts (Normal / Nightmare / Hell)
      </h3>

      {/* Legend — shown only for act tabs */}
      {!isAlvl85 && (
        <div className="text-xs mb-3 flex flex-wrap gap-4" style={{ color: "var(--text-muted)" }}>
          <span><span style={{ color: "var(--accent-bright)" }}>●</span> = Waypoint</span>
          <span><span style={{ color: "var(--col-magic)" }}>●</span> = Terror Zone eligible</span>
          <span><span className={alvlColor("85")} style={{ fontWeight: 700 }}>85</span> = alvl 85 (TC87)</span>
          <span><span className={alvlColor("84")} style={{ fontWeight: 700 }}>84</span> = alvl 84</span>
          <span><span className={alvlColor("83")} style={{ fontWeight: 700 }}>83</span> = alvl 83</span>
        </div>
      )}

      {/* Tab strip */}
      <div className="flex flex-wrap gap-1 mb-3" style={{ borderBottom: "1px solid var(--border-subtle)" }}>
        {AREAS.map(a => {
          const isActive = activeTab.kind === "act" && activeTab.act === a.act;
          return (
            <button
              key={a.act}
              onClick={() => setActiveTab({ kind: "act", act: a.act })}
              className="px-4 py-1.5 text-xs font-semibold rounded-t transition-all"
              style={tabStyle(isActive, ACT_TAB_COLORS[a.cls])}
            >
              Act {a.act}
            </button>
          );
        })}
        {/* alvl 85 Farming tab */}
        <button
          onClick={() => setActiveTab({ kind: "alvl85" })}
          className="px-4 py-1.5 text-xs font-semibold rounded-t transition-all"
          style={tabStyle(isAlvl85, ALVL85_TAB_COLOR)}
        >
          alvl 85 Farming
        </button>
      </div>

      {/* Tab content */}
      {actData && (
        <>
          <AlvlActTable act={actData} />
          <div className="mt-4 rounded p-3 text-xs" style={{ background: "var(--bg-surface)", border: "1px solid var(--border-subtle)" }}>
            <div className="font-semibold mb-2" style={{ color: "var(--text-primary)" }}>alvl → Champion / Unique mlvl / TC87 eligibility</div>
            <table className="head border-collapse">
              <thead>
                <tr className="gt gb">
                  <th className="p-0.5 px-2">alvl</th>
                  <th className="p-0.5 px-2">Champions mlvl</th>
                  <th className="p-0.5 px-2">Uniques mlvl</th>
                  <th className="p-0.5 px-2">TC87</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["g11","83","85+","86+","no"],
                  ["b22","84","86", "88", "yes"],
                  ["r11","85","87", "88", "yes"],
                ].map(([cls, alvl, champ, uniq, tc87]) => (
                  <tr key={alvl} className={`${cls} hover:brightness-150`}>
                    <td className={`p-0.5 px-2 font-bold ${alvlColor(alvl)}`}>{alvl}</td>
                    <td className="p-0.5 px-2 text-center">{champ}</td>
                    <td className="p-0.5 px-2 text-center">{uniq}</td>
                    <td className="p-0.5 px-2 text-center">{tc87}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {isAlvl85 && (
        <>
          {/* Immunity legend */}
          <div className="flex flex-wrap gap-x-6 gap-y-1 text-xs rounded p-3 mb-3" style={{ background: "var(--bg-surface)", border: "1px solid var(--border-subtle)" }}>
            <div className="font-semibold w-full mb-1" style={{ color: "var(--text-secondary)" }}>Immunity Legend</div>
            <span><span className="resf">F</span> = Fire Immune</span>
            <span><span className="resc">C</span> = Cold Immune</span>
            <span><span className="resl">L</span> = Lightning Immune</span>
            <span><span className="resp">P</span> = Poison Immune</span>
            <span><span className="resh">p</span> = Physical Immune</span>
            <span><span className="resm">m</span> = Magic Immune</span>
            <div className="w-full mt-1" style={{ color: "var(--text-muted)" }}>* Champion, Unique, Super Unique monsters have a higher mlvl (better drop rate)</div>
          </div>
          <Alvl85Table zones={ALVL85_ZONES} />
        </>
      )}
    </section>
  );
}

export function MapsTab() {
  return (
    <div className="space-y-6">

      {/* Area levels + alvl85 farming — tabbed */}
      <AlvlSection />

      {/* Hell Cows note */}
      <section>
        <h3 className="font-semibold text-sm pb-1 mb-2" style={{ color: "var(--accent-bright)", borderBottom: "1px solid var(--border-muted)" }}>
          Hell Cows (mlvl 81) — Uniques that do NOT drop
        </h3>
        <table className="head border-collapse text-xs">
          <thead>
            <tr className="bt bb">
              <th className="p-1 pl-2 text-left">Req. mlvl</th>
              <th className="p-1 text-left">Unique</th>
              <th className="p-1 text-left">Base Type</th>
            </tr>
          </thead>
          <tbody>
            {COW_CANT_DROP.map((row, i) => (
              <tr key={i} className={i % 2 === 0 ? "b11" : "b22"}>
                <td className="p-1 pl-2" style={{ color: "var(--accent-bright)" }}>{row.mlvl}</td>
                <td className="p-1"><span className="unq">{row.unique}</span></td>
                <td className="p-1 text-secondary-d">{row.base}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Power Leveling */}
      <section>
        <h3 className="font-semibold text-sm pb-1 mb-2" style={{ color: "var(--res-fire)", borderBottom: "1px solid var(--border-muted)" }}>
          Power Leveling
        </h3>
        <div className="flex flex-wrap gap-6">
          <table className="head border-collapse text-xs">
            <thead><tr className="rt rb"><th className="p-1 px-3 text-left">Levels</th><th className="p-1 px-3 text-left">Zone</th></tr></thead>
            <tbody>
              {[
                ["b11", "1–15",  "Tristram runs"],
                ["b22", "15–24", "Tombs (Cows 21–24)"],
                ["b11", "24",    "Ancients"],
                ["b22", "25–40", "Sanctuary/Baal"],
                ["g11", "40",    "Ancients NM"],
                ["g22", "41–60", "Sanctuary/Baal NM"],
                ["r11", "60",    "Ancients Hell"],
                ["r22", "61–99", "Baal Hell"],
              ].map(([cls, lvl, zone], i) => (
                <tr key={i} className={`${cls} hover:brightness-150 cursor-default`}>
                  <td className="p-1 pl-3" style={{ color: "var(--accent-bright)" }}>{lvl}</td>
                  <td className="p-1 pr-3">{zone}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <table className="head border-collapse text-xs">
            <thead><tr className="gt gb"><th className="p-1 px-2 text-left">XP</th><th className="p-1 px-2 text-center">I</th><th className="p-1 px-2 text-center">II</th><th className="p-1 px-2 text-center">III</th><th className="p-1 px-2 text-center">IV</th><th className="p-1 px-2 text-center">V</th></tr></thead>
            <tbody>
              {[
                ["b22", "Normal", "1–11", "12–18", "19–23", "24–31", "32–36"],
                ["g22", "NM",    "37–43", "44–48", "49–52", "53–62", "skip"],
                ["r22", "Hell",  "63–73", "74–80", "81–83", "83–94", "95–99"],
              ].map(([cls, diff, ...acts], i) => (
                <tr key={i} className={`${cls} hover:brightness-150 cursor-default`}>
                  <td className="p-1 pl-2" style={{ color: "var(--accent-bright)" }}>{diff}</td>
                  {acts.map((a, j) => <td key={j} className="p-1 px-2 text-center">{a}</td>)}
                </tr>
              ))}
            </tbody>
          </table>

          <table className="head border-collapse text-xs">
            <thead><tr className="bt bb"><th className="p-1 px-3 text-left">4os Sword Bases (ilvl 26–40)</th></tr></thead>
            <tbody>
              {[
                ["b11", "Normal Act 5"],
                ["b22", "Normal Cows   (Crystal, Broad, Long, etc.)"],
                ["b11", "Nightmare Act 1"],
              ].map(([cls, text], i) => (
                <tr key={i} className={`${cls} hover:brightness-150 cursor-default`}>
                  <td className="p-1 px-3">{text}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Useful links */}
      <section>
        <h3 className="font-semibold text-sm pb-1 mb-2" style={{ color: "var(--text-secondary)", borderBottom: "1px solid var(--border-muted)" }}>Links</h3>
        <ul className="text-xs space-y-1">
          {[
            ["https://maxroll.gg/d2/resources/map-reading", "Map reading guide — Maxroll"],
            ["https://nightfallx2.wixsite.com/d2speedruns/map-layouts", "Map layout guide — speedruns"],
            ["https://www.youtube.com/watch?v=iaAmrldC3c4", "MrLlamaSC map reading guide (YouTube)"],
            ["https://d2runewizard.com/terror-zone-tracker", "Terror Zone Tracker — d2runewizard"],
            ["https://diablo.fandom.com/wiki/Area_Level", "Area Level table — Fandom"],
            ["https://maxroll.gg/d2/meta/worldstone-keep-and-baal-farming-guide", "Baal farming guide"],
            ["https://www.almarsguides.com/Computer/Games/Diablo2/Farming/Locations/Act1/ThePit/", "Pit farming guide"],
          ].map(([href, label]) => (
            <li key={href}>
              <a href={href} target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: "var(--accent-bright)" }}>{label}</a>
            </li>
          ))}
        </ul>
      </section>

    </div>
  );
}
