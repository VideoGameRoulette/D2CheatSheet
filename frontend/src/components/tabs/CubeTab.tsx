"use client";


function Section({ title, children }: { title: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="space-y-1">
      <h3 className="text-sm font-semibold pb-1" style={{ color: "var(--text-primary)", borderBottom: "1px solid var(--border-muted)" }}>{title}</h3>
      {children}
    </div>
  );
}

function SimpleTable({ headerCls, header, rows }: { headerCls: string; header: string; rows: { cls: string; text: React.ReactNode }[] }) {
  return (
    <table className="head w-full border-collapse text-xs">
      <thead>
        <tr className={headerCls}>
          <th className="text-left p-2">{header}</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r, i) => (
          <tr key={i} className={`${r.cls} hover:brightness-150 cursor-default`}>
            <td className="p-1 pl-2">{r.text}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function CraftTable({
  titleCls,
  name,
  href,
  gem,
  guarantee,
  rows,
}: {
  titleCls: string;
  name: string;
  href: string;
  gem: string;
  guarantee: string;
  rows: { cls: string; sTier: boolean; slot: string; rune: string; base: string; affix1: string; affix2: string }[];
}) {
  return (
    <table className="head w-full border-collapse text-xs">
      <thead>
        <tr className={`${titleCls}t ${titleCls}b`}>
          <th className="text-left p-2" colSpan={6}>
            <a href={href} target="_blank" rel="noopener noreferrer" className="hover:underline font-semibold" style={{ color: "var(--accent-bright)" }}>{name}</a>
            {" "}
            <span className="font-normal" style={{ color: "var(--text-primary)" }}>
              <span className="rune">Rune</span> + <span className="magic">Magic Item</span> + {gem} + Jewel → <span className="guarantee">{guarantee}</span>
            </span>
          </th>
        </tr>
        <tr className={`${titleCls}t ${titleCls}b`}>
          <th className="p-1 pl-2 text-left w-4">S</th>
          <th className="p-1 text-left">Slot</th>
          <th className="p-1 text-left">Rune</th>
          <th className="p-1 text-left">Base Item</th>
          <th className="p-1 text-left">Affix 1</th>
          <th className="p-1 text-left">Affix 2</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r, i) => (
          <tr key={i} className={`${r.cls} hover:brightness-150 cursor-default`}>
            <td className="p-1 pl-2">{r.sTier ? "★" : ""}</td>
            <td className="p-1 font-medium">{r.slot}</td>
            <td className="p-1 rune">{r.rune}</td>
            <td className="p-1" style={{ color: "var(--text-secondary)" }}>{r.base}</td>
            <td className="p-1">{r.affix1}</td>
            <td className="p-1" style={{ color: "var(--text-secondary)" }}>{r.affix2}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function CubeTab() {
  return (
    <div className="space-y-6 max-w-5xl">

      {/* Rerolling */}
      <Section title={<a href="http://classic.battle.net/diablo2exp/items/cube.shtml" target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: "var(--res-fire)" }}>Rerolling Magic / Rare Items</a>}>
        <SimpleTable
          headerCls="rt rb"
          header=""
          rows={[
            { cls: "k11", text: <>3 Perfect Gems + <span className="magic">Magic</span> Item → New Random <span className="magic">Magic</span> Item of same type &nbsp;<span style={{ color: "var(--text-muted)" }}>(Grand Charms: Skillers ilvl 50; with +41-45 Life ilvl 94 — Hell Baal/Diablo/Nihlathak)</span></> },
            { cls: "k22", text: <>6 Perfect Skulls + <span className="rare">Rare</span> Item → Random Low Quality <span className="rare">Rare</span> Item of same type &nbsp;<span style={{ color: "var(--text-muted)" }}>(Diadems)</span></> },
          ]}
        />
      </Section>

      {/* Socketing */}
      <Section title={<><span style={{ color: "var(--col-set)" }}>Socketing</span> <span className="font-normal" style={{ color: "var(--text-secondary)" }}>(Act 5 Larzuk, Cube, or Ebug)</span></>}>
        <SimpleTable
          headerCls="gt gb"
          header=""
          rows={[
            { cls: "k11", text: <>Normal drops = max 3<span className="note">*</span> sockets &nbsp;<span style={{ color: "var(--text-muted)" }}>(*Cows = 4 socket, Larzuk # sockets = ilvl ← mlvl ← alvl)</span></> },
            { cls: "k22", text: <>Nightmare drops = max 4 sockets &nbsp;<span style={{ color: "var(--text-muted)" }}>(0 MF is best for finding bases)</span></> },
            { cls: "k11", text: "Hell drops = max 6 sockets" },
            { cls: "k22", text: "Larzuk = max 1 socket to uniques, 1–6 sockets to white bases depending on ilvl and type" },
            { cls: "k11", text: <><span className="rune">Tal</span> + <span className="rune">Thul</span> + Perfect Topaz + Normal Body Armor → Socketed Body Armor of same type</> },
            { cls: "k22", text: <><span className="rune">Ral</span> + <span className="rune">Amn</span> + Perfect Amethyst + Normal Weapon → Socketed Weapon of same type</> },
            { cls: "k11", text: <><span className="rune">Ral</span> + <span className="rune">Thul</span> + Perfect Sapphire + Normal Helm → Socketed Helm of same type</> },
            { cls: "k22", text: <><span className="rune">Tal</span> + <span className="rune">Amn</span> + Perfect Ruby + Normal Shield → Socketed Shield of same type</> },
            { cls: "k11", text: <><span className="rune">Hel</span> + Scroll of Town Portal + Any Socketed Item → Remove gems, runes, or jewels from sockets</> },
          ]}
        />
      </Section>

      {/* Repair */}
      <Section title={<><span style={{ color: "var(--col-tc)" }}>Repair</span> <span className="font-normal" style={{ color: "var(--text-secondary)" }}>(Note: cannot repair Ethereal items)</span></>}>
        <SimpleTable
          headerCls="bt bb"
          header=""
          rows={[
            { cls: "k11", text: <><span className="rune">Ort</span> Rune + Weapon → Fully Repaired Weapon</> },
            { cls: "k11", text: <><span className="rune">Ral</span> Rune + Armor → Fully Repaired Armor</> },
            { cls: "y22", text: <><span className="rune">Ort</span> Rune + Chipped Gem + Weapon → Fully Repaired and Recharged Weapon &nbsp;<span className="text-muted-d">(useful for recharging Teleport staff)</span></> },
            { cls: "y11", text: <><span className="rune">Ral</span> Rune + Flawed Gem + Armor → Fully Repaired and Recharged Armor</> },
          ]}
        />
      </Section>

      {/* Misc Cube */}
      <Section title={<a href="http://classic.battle.net/diablo2exp/items/cube.shtml" target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: "var(--res-fire)" }}>Misc. Cube</a>}>
        <SimpleTable
          headerCls="rt rb"
          header=""
          rows={[
            { cls: "r11", text: "3× Rejuvenation Potions → Full Rejuvenation Potion" },
            { cls: "r22", text: "Staff + Kris + Belt + Diamond → Savage Polearm Class Weapon (66–80% Enhanced Damage)" },
            { cls: "r11", text: <>3× <span className="magic">Magic</span> Amulets → 1× Random Ring &nbsp;<span style={{ color: "var(--text-muted)" }}>ilvl = int(0.75 × clvl)</span></> },
            { cls: "r22", text: <>3× <span className="magic">Magic</span> Rings → 1× Random Amulet &nbsp;<span style={{ color: "var(--text-muted)" }}>ilvl = int(0.75 × clvl)</span></> },
          ]}
        />
      </Section>

      {/* Crafting */}
      <Section title={<a href="http://classic.battle.net/diablo2exp/items/crafteditems.shtml" target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: "var(--accent-bright)" }}>Crafted Items</a>}>
        <div className="rounded p-3 text-xs mb-3" style={{ background: "var(--bg-raised)", border: "1px solid var(--border-subtle)" }}>
          <div className="font-semibold mb-1" style={{ color: "var(--text-primary)" }}>Crafted ilvl = int(clvl/2) + int(ilvl/2)</div>
          <table className="border-collapse">
            <thead>
              <tr className="bt bb">
                <th className="p-1 text-left">ilvl</th>
                <th className="p-1 text-center">4 affixes</th>
                <th className="p-1 text-center">3 affixes</th>
                <th className="p-1 text-center">2 affixes</th>
                <th className="p-1 text-center">1 affix</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["1–30",  "20%","20%","20%","40%"],
                ["31–50", "20%","20%","60%","—"],
                ["51–70", "20%","80%","—",  "—"],
                ["71+",  "100%","—",  "—",  "—"],
              ].map(([ilvl, a4, a3, a2, a1], i) => (
                <tr key={i} className={i % 2 === 0 ? "b11" : "b22"}>
                  <td className="p-1 pr-4">{ilvl}</td>
                  <td className="p-1 text-center">{a4}</td>
                  <td className="p-1 text-center">{a3}</td>
                  <td className="p-1 text-center">{a2}</td>
                  <td className="p-1 text-center">{a1}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="space-y-3">
          <CraftTable
            titleCls="r"
            name="Blood"
            href="http://classic.battle.net/diablo2exp/items/crafted/blood.shtml"
            gem="Perfect Ruby"
            guarantee="+(10–20) To Life + 2 random affixes"
            rows={[
              { cls:"r11", sTier:true,  slot:"Amulet", rune:"Amn",  base:"Amulet",                                          affix1:"5–10% Faster Run/Walk",          affix2:"(1–4)% Life Stolen Per Hit" },
              { cls:"r22", sTier:false, slot:"Belt",   rune:"Tal",  base:"Belt/Mesh/Mithril Coil",                           affix1:"Open Wounds (5–10)%",            affix2:"(1–3)% Life Stolen Per Hit" },
              { cls:"r11", sTier:false, slot:"Body",   rune:"Thul", base:"Plate Mail/Templar Coat/Hellforge Plate",          affix1:"+(1–3) Life Per Demon Kill",     affix2:"(1–3)% Life Stolen Per Hit" },
              { cls:"r22", sTier:false, slot:"Boots",  rune:"Eth",  base:"Lt Plated Boots/Battle Boots/Mirrored Boots",      affix1:"Replenish Life +(5–10)",         affix2:"(1–3)% Life Stolen Per Hit" },
              { cls:"r11", sTier:true,  slot:"Gloves", rune:"Nef",  base:"Heavy Gloves/Sharkskin Gloves/Vampirebone Gloves", affix1:"Crushing Blow (5–10)%",          affix2:"(1–3)% Life Stolen Per Hit" },
              { cls:"r22", sTier:false, slot:"Helm",   rune:"Ral",  base:"Helm/Casquet/Armet",                               affix1:"5–10% Deadly Strike",           affix2:"(1–3)% Life Stolen Per Hit" },
              { cls:"r11", sTier:true,  slot:"Ring",   rune:"Sol",  base:"Ring",                                             affix1:"+(1–5) To Strength",             affix2:"(1–3)% Life Stolen Per Hit" },
              { cls:"r22", sTier:false, slot:"Shield", rune:"Ith",  base:"Spiked Shield/Barbed Shield/Blade Barrier",        affix1:"Attacker Takes Damage of (4–7)", affix2:"(1–3)% Life Stolen Per Hit" },
              { cls:"r11", sTier:false, slot:"Weapon", rune:"Ort",  base:"Normal/Exceptional/Elite Axe",                    affix1:"+(35–60%) Enhanced Damage",      affix2:"(1–4)% Life Stolen Per Hit" },
            ]}
          />

          <CraftTable
            titleCls="b"
            name="Caster"
            href="http://classic.battle.net/diablo2exp/items/crafted/caster.shtml"
            gem="Perfect Amethyst"
            guarantee="Regenerate Mana (4–10)% + +(10–20) To Mana + 1 random affix"
            rows={[
              { cls:"b11", sTier:true,  slot:"Amulet", rune:"Ral",  base:"Amulet",                                      affix1:"(5–10)% Faster Cast Rate",              affix2:"" },
              { cls:"b22", sTier:true,  slot:"Belt",   rune:"Ith",  base:"Light Belt/Sharkskin Belt/Vampirefang Belt",   affix1:"5–10% Faster Cast Rate",                affix2:"" },
              { cls:"b11", sTier:false, slot:"Body",   rune:"Tal",  base:"Light Plate/Mage Plate/Archon Plate",          affix1:"+(1–3) Mana Per Kill",                  affix2:"" },
              { cls:"b22", sTier:false, slot:"Boots",  rune:"Thul", base:"Boots/Demonhide Boots/Wyrmhide Boots",         affix1:"Increase Maximum Mana (2–5)%",          affix2:"" },
              { cls:"b11", sTier:false, slot:"Gloves", rune:"Ort",  base:"Leather Gloves/Demonhide Gloves/Bramble Mitts",affix1:"+(1–3) Mana Per Kill",                  affix2:"" },
              { cls:"b22", sTier:false, slot:"Helm",   rune:"Nef",  base:"Magic Mask/Death Mask/Demonhead",              affix1:"(1–4)% Mana Stolen Per Hit",            affix2:"" },
              { cls:"b11", sTier:false, slot:"Ring",   rune:"Amn",  base:"Ring",                                         affix1:"+(1–5) To Energy",                      affix2:"" },
              { cls:"b22", sTier:false, slot:"Shield", rune:"Eth",  base:"Small Shield/Round Shield/Luna",               affix1:"+(5–10)% Increased Chance Of Blocking", affix2:"" },
              { cls:"b11", sTier:false, slot:"Weapon", rune:"Tir",  base:"Normal/Exceptional/Elite Scepters/Wands/Staves",affix1:"Increase Maximum Mana (1–5)%",         affix2:"" },
            ]}
          />

          <CraftTable
            titleCls="k"
            name="Hit Power"
            href="http://classic.battle.net/diablo2exp/items/crafted/hitpower.shtml"
            gem="Perfect Sapphire"
            guarantee="5% Chance To Cast Lvl 4 Frost Nova When Struck + 2 random affixes"
            rows={[
              { cls:"k11", sTier:false, slot:"Amulet", rune:"Thul", base:"Amulet",                                  affix1:"Hit Causes Monster To Flee (3–11)%",     affix2:"Attacker Takes Damage of (3–10)" },
              { cls:"k22", sTier:false, slot:"Belt",   rune:"Tal",  base:"Heavy Belt/Battle Belt/Troll Belt",        affix1:"(5–10)% Damage Goes to Mana",            affix2:"Attacker Takes Damage of (3–7)"  },
              { cls:"k11", sTier:false, slot:"Body",   rune:"Nef",  base:"Field Plate/Sharktooth Armor/Kraken",      affix1:"10–20% Faster Hit Recovery",             affix2:"Attacker Takes Damage of (3–10)" },
              { cls:"k22", sTier:false, slot:"Boots",  rune:"Ral",  base:"Chain/Mesh/Boneweave Boots",               affix1:"(25–50) Defense vs. Melee",              affix2:"Attacker Takes Damage of (3–7)"  },
              { cls:"k11", sTier:true,  slot:"Gloves", rune:"Ort",  base:"Chain Gloves/Heavy Bracers/Vambraces",     affix1:"Knockback",                              affix2:"Attacker Takes Damage of (3–7)"  },
              { cls:"k22", sTier:false, slot:"Helm",   rune:"Ith",  base:"Full Helm/Basinet/Giant Conch",            affix1:"(25–50) Defense vs. Missiles",           affix2:"Attacker Takes Damage of (3–7)"  },
              { cls:"k11", sTier:false, slot:"Ring",   rune:"Amn",  base:"Ring",                                     affix1:"+(1–5) To Dexterity",                    affix2:"Attacker Takes Damage of (3–6)"  },
              { cls:"k22", sTier:false, slot:"Shield", rune:"Eth",  base:"Gothic Shield/Ancient Shield/Ward",        affix1:"+(5–10)% Increased Chance Of Blocking",  affix2:"Attacker Takes Damage of (3–10)" },
              { cls:"k11", sTier:false, slot:"Weapon", rune:"Tir",  base:"Normal/Exceptional/Elite Scepters/Wands/Staves", affix1:"+(35–60%) Enhanced Damage",        affix2:"Attacker Takes Damage of (3–7)"  },
            ]}
          />

          <CraftTable
            titleCls="g"
            name="Safety"
            href="http://classic.battle.net/diablo2exp/items/crafted/safety.shtml"
            gem="Perfect Emerald"
            guarantee="Magic Dmg Reduced By (1–2) + Dmg Reduced By (1–4) + 2 random affixes"
            rows={[
              { cls:"g11", sTier:false, slot:"Amulet", rune:"Thul", base:"Amulet",                               affix1:"+(1–10)% Increased Chance Of Blocking", affix2:"—" },
              { cls:"g22", sTier:false, slot:"Belt",   rune:"Tal",  base:"Sash/Demonhide Sash/Spiderweb Sash",   affix1:"+(10–30)% Enhanced Defense",           affix2:"Poison Resist +(5–10)%" },
              { cls:"g11", sTier:false, slot:"Body",   rune:"Eth",  base:"Breast Plate/Cuirass/Great Hauberk",   affix1:"+(10–30)% Enhanced Defense",           affix2:"Half Freeze Duration" },
              { cls:"g22", sTier:false, slot:"Boots",  rune:"Ort",  base:"Greaves/War Boots/Myrmidon Boots",     affix1:"+(10–30)% Enhanced Defense",           affix2:"Fire Resist +(5–10)%" },
              { cls:"g11", sTier:false, slot:"Gloves", rune:"Ral",  base:"Gauntlets/War Gauntlets/Ogre Gauntlets",affix1:"+(10–30)% Enhanced Defense",          affix2:"Cold Resist +(5–10)%" },
              { cls:"g22", sTier:false, slot:"Helm",   rune:"Ith",  base:"Crown/Grand Crown/Corona",             affix1:"+(10–30)% Enhanced Defense",           affix2:"Lightning Resist +(5–10)%" },
              { cls:"g11", sTier:false, slot:"Ring",   rune:"Amn",  base:"Ring",                                 affix1:"+(1–5) To Vitality",                   affix2:"—" },
              { cls:"g22", sTier:false, slot:"Shield", rune:"Nef",  base:"Kite Shield/Dragon Shield/Monarch",    affix1:"+(10–30)% Enhanced Defense",           affix2:"Magic Resistance +(5–10)%" },
              { cls:"g11", sTier:false, slot:"Weapon", rune:"Sol",  base:"Normal/Exceptional/Elite Spear/Javelin",affix1:"+(5–10)% Enhanced Defense",           affix2:"—" },
            ]}
          />
        </div>
      </Section>

      {/* Gambling */}
      <Section title={<a href="http://classic.battle.net/diablo2exp/basics/gambling.shtml" target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: "var(--col-set)" }}>Gambling</a>}>
        <div className="flex flex-wrap gap-6">
          <div>
            <div className="text-xs mb-1" style={{ color: "var(--text-secondary)" }}>ilvl = clvl +4/−5 &nbsp;·&nbsp; <span className="unq">Gheeds</span> 10–15% discount &nbsp;·&nbsp; <span className="rw">Edge</span> 15% discount</div>
            <table className="head border-collapse text-xs">
              <thead><tr className="gt gb"><th className="p-1 px-3 text-left">Type</th><th className="p-1 px-3">Chance</th><th className="p-1 px-3">%</th></tr></thead>
              <tbody>
                {[
                  ["Unique",  "1/2000",   "0.05%"],
                  ["Set",     "2/2000",   "0.10%"],
                  ["Rare",  "200/2000",  "10.00%"],
                  ["Magic","1797/2000",  "89.85%"],
                ].map(([type, chance, pct], i) => (
                  <tr key={i} className={i % 2 === 0 ? "g11" : "g22"}>
                    <td className="p-1 px-3">{type}</td>
                    <td className="p-1 px-3 text-right">{chance}</td>
                    <td className="p-1 px-3 text-right">{pct}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div>
            <div className="text-xs mb-1" style={{ color: "var(--text-secondary)" }}>Vendor max ilvl</div>
            <table className="head border-collapse text-xs">
              <thead><tr className="gt gb"><th className="p-1 px-3 text-left">Acts</th><th className="p-1 px-3 text-right">max ilvl</th></tr></thead>
              <tbody>
                {[
                  ["Act 1, Normal",    "12"],
                  ["Act 2, Normal",    "20"],
                  ["Act 3, Normal",    "28"],
                  ["Act 4, Normal",    "36"],
                  ["Act 5, Normal",    "45"],
                  ["Normal",     "clvl+5 (normal & socket)"],
                  ["Nightmare",  "clvl+5 (normal–exceptional)"],
                  ["Hell",       "clvl+5 (normal–elite)"],
                ].map(([act, ilvl], i) => (
                  <tr key={i} className={i < 5 ? (i % 2 === 0 ? "b11" : "b22") : (i === 5 ? "k11" : i === 6 ? "g11" : "r11")}>
                    <td className="p-1 px-3">{act}</td>
                    <td className="p-1 px-3 text-right">{ilvl}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div>
            <div className="text-xs mb-1" style={{ color: "var(--text-secondary)" }}>
              <a href="https://www.reddit.com/r/pathofdiablo/comments/d28ued/the_complete_overview_guide_to_shopping_in_diablo/" target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: "var(--accent-bright)" }}>Shopping</a>
            </div>
            <table className="head border-collapse text-xs">
              <thead><tr className="gt gb"><th className="p-1 px-3 text-left">Item</th><th className="p-1 px-3 text-right">min ilvl</th><th className="p-1 px-3 text-right">clvl</th><th className="p-1 px-3 text-left">Note</th></tr></thead>
              <tbody>
                {[
                  ["+3 Warcries",                "55+",  "",   "NM/Hell"],
                  ["+3 Java / 20 IAS gloves",    "55+",  "",   "NM/Hell"],
                  ["+6 [trap] Claws",            "80",   "75", "NM/Hell"],
                  ["2os Staff (Leaf)",           "1–13", "",   "A1/A2"],
                  ["3os Bow (Edge)",             "1",    "",   "A1"],
                  ["3os Crown",                  "47",   "42", "A5+"],
                  ["3os Great Helm",             "44",   "39", "A5+"],
                  ["3os Flail (Black/Steel)",    "1",    "",   "A2 Fara"],
                  ["4os Full Plate, 100 life",   "73",   "68", "NM/Hell"],
                  ["Amulets +2 skills",          "90",   "93", ""],
                  ["Circlets +2 skills",         "92",   "",   ""],
                  ["20 FCR wand",                "23+",  "",   "A3+"],
                  ["Life Tap wand",              "18+",  "13", "A3+"],
                  ["Lower Resist wand",          "30+",  "25", "A4+"],
                  ["Teleport staff",             "18+",  "13", "A3+"],
                ].map(([item, ilvl, clvl, note], i) => (
                  <tr key={i} className={i % 2 === 0 ? "g11" : "g22"}>
                    <td className="p-1 px-3">{item}</td>
                    <td className="p-1 px-3 text-right">{ilvl}</td>
                    <td className="p-1 px-3 text-right">{clvl}</td>
                    <td className="p-1 px-3" style={{ color: "var(--text-secondary)" }}>{note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Section>

    </div>
  );
}
