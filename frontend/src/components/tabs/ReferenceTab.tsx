"use client";

// ─── Data ────────────────────────────────────────────────────────────────────

const CLASS_ATTRS = [
  { cls:"Amazon",     abbr:"Zon", url:"https://classic.battle.net/diablo2exp/classes/amazon.shtml",     str:20, dex:25, vit:20, eng:15, life:"+2",   stam:"+1",    mana:"+1.5",  lifeVit:"+3",   stamVit:"+1",   manaEng:"+1.5"  },
  { cls:"Assassin",   abbr:"Sin", url:"https://classic.battle.net/diablo2exp/classes/assassin.shtml",   str:20, dex:20, vit:20, eng:25, life:"+2",   stam:"+1.25", mana:"+1.5",  lifeVit:"+3",   stamVit:"+1.25",manaEng:"+1.75" },
  { cls:"Barbarian",  abbr:"Bar", url:"https://classic.battle.net/diablo2exp/classes/barbarian.shtml",  str:30, dex:20, vit:25, eng:10, life:"+2",   stam:"+1",    mana:"+1",    lifeVit:"+4",   stamVit:"+1",   manaEng:"+1"    },
  { cls:"Druid",      abbr:"Drd", url:"https://classic.battle.net/diablo2exp/classes/druid.shtml",      str:15, dex:20, vit:25, eng:20, life:"+1.5", stam:"+1",    mana:"+2",    lifeVit:"+2",   stamVit:"+1",   manaEng:"+2"    },
  { cls:"Necromancer",abbr:"Nec", url:"https://classic.battle.net/diablo2exp/classes/necromancer.shtml",str:15, dex:25, vit:15, eng:25, life:"+1.5", stam:"+1",    mana:"+2",    lifeVit:"+2",   stamVit:"+1",   manaEng:"+2"    },
  { cls:"Paladin",    abbr:"Pal", url:"https://classic.battle.net/diablo2exp/classes/paladin.shtml",    str:25, dex:20, vit:25, eng:15, life:"+2",   stam:"+1",    mana:"+1.5",  lifeVit:"+3",   stamVit:"+1",   manaEng:"+1.5"  },
  { cls:"Sorceress",  abbr:"Sor", url:"https://classic.battle.net/diablo2exp/classes/sorceress.shtml",  str:10, dex:25, vit:10, eng:35, life:"+1",   stam:"+1",    mana:"+2",    lifeVit:"+2",   stamVit:"+1",   manaEng:"+2"    },
  { cls:"Druid (D2R)",abbr:"Lok", url:"https://diablo2.blizzard.com/en-us/",                            str:15, dex:20, vit:25, eng:20, life:"+2",   stam:"+1",    mana:"+1.5",  lifeVit:"+3",   stamVit:"+1",   manaEng:"+2"    },
];

const XP_TABLE = [
  [1,500,500],[2,1000,1500],[3,2250,3750],[4,4125,7875],[5,6300,14175],
  [6,8505,22680],[7,10206,32886],[8,11510,44396],[9,13319,57715],[10,14429,72144],
  [11,18036,90180],[12,22545,112725],[13,28181,140906],[14,35226,176132],[15,44033,220165],
  [16,55042,275207],[17,68801,344008],[18,86002,430010],[19,107503,537513],[20,134378,671891],
  [21,167973,839864],[22,209966,1049830],[23,262457,1312287],[24,328072,1640359],[25,410090,2050449],
  [26,512612,2563061],[27,640765,3203826],[28,698434,3902260],[29,761293,4663553],[30,829810,5493363],
  [31,904492,6397855],[32,985897,7383752],[33,1074627,8458379],[34,1171344,9629723],[35,1276765,10906488],
  [36,1391674,12298162],[37,1516924,13815086],[38,1653448,15468534],[39,1802257,17270791],[40,1964461,19235252],
  [41,2141263,21376515],[42,2333976,23710491],[43,2544034,26254525],[44,2772997,29027522],[45,3022566,32050088],
  [46,3294598,35344686],[47,3591112,38935798],[48,3914311,42850109],[49,4266600,47116709],[50,4650593,51767302],
  [51,5069147,56836449],[52,5525370,62361819],[53,6022654,68384473],[54,6564692,74949165],[55,7155515,82104680],
  [56,7799511,89904191],[57,8501467,98405658],[58,9266598,107672256],[59,10100593,117772849],[60,11009646,128782495],
  [61,12000515,140783010],[62,13080560,153863570],[63,14257811,168121381],[64,15541015,183662396],[65,16939705,200602101],
  [66,18464279,219066380],[67,20126064,239192444],[68,21937409,261129853],[69,23911777,285041630],[70,26063836,311105466],
  [71,28409582,339515048],[72,30966444,370481492],[73,33753424,404234916],[74,36791232,441026148],[75,40102443,481128591],
  [76,43711663,524840254],[77,47645713,572485967],[78,51933826,624419793],[79,56607872,681027665],[80,61702579,742730244],
  [81,67255812,809986056],[82,73308835,883294891],[83,79906630,963201521],[84,87098226,1050299747],[85,94937067,1145236814],
  [86,103481403,1248718217],[87,112794729,1361512946],[88,122946255,1484459201],[89,134011418,1618470619],[90,146072446,1764543065],
  [91,159218965,1923762030],[92,173548673,2097310703],[93,189168053,2286478756],[94,206193177,2492671933],[95,224750564,2717422497],
  [96,244978115,2962400612],[97,267026144,3229426756],[98,291058498,3520485254],[99,0,3520485254],
] as [number, number, number][];

const HOLY_SHIELD_SHIELDS = [
  { name:"Sacred Targe",   str:86,  block:"60%", dex0:198, dex19:135 },
  { name:"Sacred Rondache",str:109, block:"58%", dex0:204, dex19:138 },
  { name:"Kurast Shield",  str:124, block:"55%", dex0:213, dex19:142 },
  { name:"Zakarum Shield", str:142, block:"52%", dex0:222, dex19:146 },
  { name:"Vortex Shield",  str:148, block:"49%", dex0:233, dex19:150 },
];

const STAT_ABBREVS = [
  { abbr:"alvl",    desc:"Area Level" },
  { abbr:"clvl",    desc:"Character Level" },
  { abbr:"ilvl",    desc:"Item Level — hidden number used to determine affixes (NOT equip level)" },
  { abbr:"mlvl",    desc:"Monster Level" },
  { abbr:"qlvl",    desc:"Quality Level — minimum item level for sets and uniques" },
  { abbr:"TC",      desc:"Treasure Class — drop pool" },
  { abbr:"LK",      desc:"Lower Kurast, Act 3 — farm chests for runes" },
  { abbr:"wp",      desc:"Waypoint" },
  { abbr:"tp",      desc:"Town Portal" },
  { abbr:"#os",     desc:"Number of open sockets (1os, 2os … 6os)" },
  { abbr:"SSF",     desc:"Solo Self Found" },
  { abbr:"P3/P8",   desc:"/players 3 or /players 8 (single player difficulty)" },
  { abbr:"base",    desc:"Item type used for making runewords" },
  { abbr:"affix",   desc:"An effect applied to weapon/armor (e.g. Crushing Blow)" },
  { abbr:"skillers",desc:"Grand Charm with +1 to skills" },
];

// ─── Gems ────────────────────────────────────────────────────────────────────
type GemTier = { tier: string; clvl: number };
type GemEntry = { tier: GemTier; socket: string; am: string; di: string; em: string; ru: string; sa: string; sk: string; to: string };

const GEM_TIERS: GemTier[] = [
  { tier:"Chipped",  clvl:1  },
  { tier:"Flawed",   clvl:5  },
  { tier:"(normal)", clvl:12 },
  { tier:"Flawless", clvl:15 },
  { tier:"Perfect",  clvl:18 },
];

const GEM_DATA: GemEntry[] = [
  { tier:GEM_TIERS[0], socket:"Weapon", am:"+40 AR",         di:"+28% Dmg Undead",   em:"+10 Poison dmg/3s", ru:"3–4 Fire dmg",       sa:"1–3 Cold dmg 1.0s",  sk:"Steals 2% life, 1% Mana",          to:"1–8 Lightning dmg"    },
  { tier:GEM_TIERS[0], socket:"Shield", am:"+8 Def",          di:"Resist All +6%",    em:"12% Resist Poison", ru:"12% Resist Fire",     sa:"12% Resist Cold",     sk:"Attacker takes 4 dmg",             to:"12% Resist Lightning"  },
  { tier:GEM_TIERS[0], socket:"Armor",  am:"+3 STR",          di:"+20 AR",            em:"+3 Dexterity",      ru:"+10 Life",            sa:"+10 Max Mana",        sk:"Replenish Life +2, Regen Mana 8%", to:"+9% MF"               },
  { tier:GEM_TIERS[1], socket:"Weapon", am:"+60 AR",          di:"+34% Dmg Undead",   em:"+20 Poison dmg/4s", ru:"5–8 Fire dmg",        sa:"3–5 Cold dmg 1.4s",  sk:"Steals 2% life, 2% Mana",          to:"1–14 Lightning dmg"   },
  { tier:GEM_TIERS[1], socket:"Shield", am:"+12 Def",         di:"Resist All +8%",    em:"16% Resist Poison", ru:"16% Resist Fire",     sa:"16% Resist Cold",     sk:"Attacker takes 8 dmg",             to:"16% Resist Lightning"  },
  { tier:GEM_TIERS[1], socket:"Armor",  am:"+4 STR",          di:"+40 AR",            em:"+4 Dexterity",      ru:"+17 Life",            sa:"+17 Max Mana",        sk:"Replenish Life +3, Regen Mana 8%", to:"+13% MF"              },
  { tier:GEM_TIERS[2], socket:"Weapon", am:"+80 AR",          di:"+44% Dmg Undead",   em:"+40 Poison dmg/5s", ru:"8–12 Fire dmg",       sa:"4–7 Cold dmg 2.0s",  sk:"Steals 3% life, 2% Mana",          to:"1–22 Lightning dmg"   },
  { tier:GEM_TIERS[2], socket:"Shield", am:"+18 Def",         di:"Resist All +11%",   em:"22% Resist Poison", ru:"22% Resist Fire",     sa:"22% Resist Cold",     sk:"Attacker takes 12 dmg",            to:"22% Resist Lightning"  },
  { tier:GEM_TIERS[2], socket:"Armor",  am:"+6 STR",          di:"+60 AR",            em:"+6 Dexterity",      ru:"+24 Life",            sa:"+24 Max Mana",        sk:"Replenish Life +3, Regen Mana 12%",to:"+16% MF"              },
  { tier:GEM_TIERS[3], socket:"Weapon", am:"+100 AR",         di:"+54% Dmg Undead",   em:"+60 Poison dmg/6s", ru:"10–16 Fire dmg",      sa:"6–20 Cold dmg 2.4s", sk:"Steals 3% life, 3% Mana",          to:"1–30 Lightning dmg"   },
  { tier:GEM_TIERS[3], socket:"Shield", am:"+24 Def",         di:"Resist All +14%",   em:"28% Resist Poison", ru:"28% Resist Fire",     sa:"28% Resist Cold",     sk:"Attacker takes 16 dmg",            to:"28% Resist Lightning"  },
  { tier:GEM_TIERS[3], socket:"Armor",  am:"+8 STR",          di:"+80 AR",            em:"+8 Dexterity",      ru:"+31 Life",            sa:"+31 Max Mana",        sk:"Replenish Life +4, Regen Mana 12%",to:"+20% MF"              },
  { tier:GEM_TIERS[4], socket:"Weapon", am:"+150 AR",         di:"+68% Dmg Undead",   em:"+100 Poison dmg/7s",ru:"15–20 Fire dmg",      sa:"10–14 Cold dmg 3.0s",sk:"Steals 4% life, 3% Mana",          to:"1–40 Lightning dmg"   },
  { tier:GEM_TIERS[4], socket:"Shield", am:"+30 Def",         di:"Resist All +19%",   em:"40% Resist Poison", ru:"40% Resist Fire",     sa:"40% Resist Cold",     sk:"Attacker takes 20 dmg",            to:"40% Resist Lightning"  },
  { tier:GEM_TIERS[4], socket:"Armor",  am:"+10 STR",         di:"+100 AR",           em:"+10 Dexterity",     ru:"+38 Life",            sa:"+38 Max Mana",        sk:"Replenish Life +5, Regen Mana 19%",to:"+24% MF"              },
];

// ─── Socketing ───────────────────────────────────────────────────────────────
const SOCK_ITEMS = [
  { name:"Buckler",            ilvl25:1, ilvl40:1, ilvl41:1, quality:"Normal",      type:"Shield",  clvl:1  },
  { name:"Dagger",             ilvl25:1, ilvl40:1, ilvl41:1, quality:"Normal",      type:"Dagger",  clvl:1  },
  { name:"Hard Leather Armor", ilvl25:2, ilvl40:2, ilvl41:2, quality:"Normal",      type:"Armor",   clvl:1  },
  { name:"Burnt Wand",         ilvl25:1, ilvl40:1, ilvl41:1, quality:"Exceptional", type:"Wand",    clvl:19 },
  { name:"Holy Water Sprinkler",ilvl25:3,ilvl40:3, ilvl41:3, quality:"Exceptional", type:"Scepter", clvl:25 },
  { name:"Bone Knife",         ilvl25:1, ilvl40:1, ilvl41:1, quality:"Elite",       type:"Dagger",  clvl:43 },
];

// ─── Upping Recipes ──────────────────────────────────────────────────────────
const UP_RECIPES = [
  { category:"Rares",   color:"rare",  rows:[
    { runes:"Ort + Amn + Perfect Sapphire",    from:"Normal Rare Weapon",     to:"Exceptional Rare Weapon" },
    { runes:"Fal + Um + Perfect Sapphire",     from:"Exceptional Rare Weapon",to:"Elite Rare Weapon" },
    { runes:"Ral + Thul + Perfect Amethyst",   from:"Normal Rare Armor",      to:"Exceptional Rare Armor" },
    { runes:"Ko + Pul + Perfect Amethyst",     from:"Exceptional Rare Armor", to:"Elite Rare Armor" },
  ]},
  { category:"Sets (Patch 2.4+ Ladder)",   color:"set",   rows:[
    { runes:"Ral + Sol + Perfect Emerald",     from:"Normal Set Weapon",      to:"Exceptional Set Weapon" },
    { runes:"Lum + Pul + Perfect Emerald",     from:"Exceptional Set Weapon", to:"Elite Set Weapon" },
    { runes:"Tal + Shael + Perfect Diamond",   from:"Normal Set Armor",       to:"Exceptional Set Armor" },
    { runes:"Ko + Lem + Perfect Diamond",      from:"Exceptional Set Armor",  to:"Elite Set Armor" },
  ]},
  { category:"Uniques", color:"unq",   rows:[
    { runes:"Ral + Sol + Perfect Emerald",     from:"Normal Unique Weapon",   to:"Exceptional Unique Weapon" },
    { runes:"Lum + Pul + Perfect Emerald",     from:"Exceptional Unique Weapon",to:"Elite Unique Weapon" },
    { runes:"Tal + Shael + Perfect Diamond",   from:"Normal Unique Armor",    to:"Exceptional Unique Armor" },
    { runes:"Ko + Lem + Perfect Diamond",      from:"Exceptional Unique Armor",to:"Elite Unique Armor" },
  ]},
  { category:"Low Quality Fix", color:"",  rows:[
    { runes:"Eld + Chipped Gem",               from:"Low Quality/Cracked Weapon", to:"Normal Weapon (ilvl = 1)" },
    { runes:"El + Chipped Gem",                from:"Low Quality/Cracked Armor",  to:"Normal Armor (ilvl = 1)" },
  ]},
];

// ─── Skiller Grand Charms ─────────────────────────────────────────────────────
const SKILLER_TIERS = [
  { tier:"S", cls:"stier", rows:[
    { cls:"", zon:"",              sin:"",      bar:"",                  dru:"",                  nec:"",           pal:"Combat",      sor:"Fire, Cold, Lightning" },
  ]},
  { tier:"A", cls:"atier", rows:[
    { cls:"", zon:"Javelin & Spear",sin:"Traps", bar:"",                  dru:"Elemental",         nec:"Poison & Bone",pal:"",           sor:"" },
  ]},
  { tier:"B", cls:"btier", rows:[
    { cls:"", zon:"Passive",       sin:"Shadow, Martial",bar:"Masteries, Warcries",dru:"Shapeshifting, Summoning",nec:"Summoning",pal:"Offensive",sor:"" },
  ]},
  { tier:"C", cls:"ctier", rows:[
    { cls:"", zon:"Bow & Crossbow",sin:"",      bar:"Combat",            dru:"",                  nec:"",           pal:"Defensive",   sor:"" },
  ]},
  { tier:"D", cls:"dtier", rows:[
    { cls:"", zon:"",              sin:"",      bar:"",                  dru:"",                  nec:"Curses",     pal:"",            sor:"" },
  ]},
];

// ─── Item Type Reference ──────────────────────────────────────────────────────
// [norm, normSet, normUnq, exc, excSet, excUnq, elite, eliteSet, eliteUnq]
type ItemRow = [string, string, string, string, string, string, string, string, string];
type ItemSection = { title: string; url: string; cls: string; header: string; rows: ItemRow[] };

const ITEM_SECTIONS: ItemSection[] = [
  { title:"Belts", url:"https://diablo2.wiki.fextralife.com/Belts", cls:"k", header:"kt kb",
    rows:[
      ["Belt",         "Hsarus' Iron Stay",   "Nightsmoke",           "Mesh Belt",       "Tal Rasha's Fire-Spun Cloth","Gloom's Trap",        "Mithril Coil",   "Credendum",           "Verdungo's Hearty Cord"],
      ["Belt",         "Hwanin's Blessing",   "—",                    "—",               "—",                          "—",                   "—",              "—",                   "—"],
      ["Heavy Belt",   "Infernal Sign",       "Goldwrap",             "Battle Belt",     "Wilhelm's Pride",            "Snowclash",           "Troll Belt",     "Trang-Oul's Avatar",  "—"],
      ["Heavy Belt",   "Iratha's Cord",       "—",                    "—",               "—",                          "—",                   "—",              "—",                   "—"],
      ["Light Belt",   "Arctic Binding",      "Snakecord",            "Sharkskin Belt",  "M'avina's Tenet",            "Razortail",           "Vampirefang Belt","—",                  "Nosferatu's Coil"],
      ["Plated Belt",  "Sigon's Wrap",        "BladeBuckle",          "War Belt",        "Immortal King's Detail",     "Thundergod's Vigor",  "Colossus Girdle","—",                   "—"],
      ["Sash",         "Death's Guard",       "Lenymo",               "Demonhide Sash",  "—",                          "String of Ears",      "Spiderweb Sash", "—",                   "Arachnid Mesh"],
    ]},
  { title:"Boots", url:"https://diablo2.wiki.fextralife.com/Boots", cls:"b", header:"bt bb",
    rows:[
      ["Boots",             "Tancred's Hobnails","Hotspur",          "Demonhide Boots", "Rite of Passage",   "Infernostride",    "Wyrmhide Boots",   "—",                       "—"],
      ["Chain Boots",       "Hsarus' Iron Heel", "Treads of Cthon",  "Mesh Boots",      "Natalya's Soul",    "Silkweave",        "Boneweave Boots",  "—",                       "Marrowwalk"],
      ["Greaves",           "Sigon's Sabot",     "Tearhaunch",       "War Boots",       "Immortal King's Pillar","Gore Rider",  "Myrmidon Greaves", "—",                       "Shadow Dancer"],
      ["Heavy Boots",       "Cow King's Hooves", "Gorefoot",         "Sharkskin Boots", "—",                 "Waterwalk",        "Scarabshell Boots","—",                       "Sandstorm Trek"],
      ["Heavy Boots",       "Sander's Riprap",   "—",                "—",               "—",                 "—",                "—",                "—",                       "—"],
      ["Light Plated Boots","Vidala's Fetlock",  "Goblin Toe",       "Battle Boots",    "Aldur's Advance",   "War Traveler",     "Mirrored Boots",   "—",                       "—"],
    ]},
  { title:"Chest Armor", url:"https://diablo2.wiki.fextralife.com/Armor", cls:"k", header:"kt kb",
    rows:[
      ["Ancient Armor",    "Milabrega's Robe",    "Silks of the Victor", "Ornate Plate",  "Griswold's Heart",           "Corpsemourn",       "Sacred Armor",   "Immortal King's Soul Cage","Tyrael's Might"],
      ["Breast Plate",     "Isenhart's Case",     "Venom Ward",          "Cuirass",       "Haemosu's Adamant",          "Duriel's Shell",    "Great Hauberk",  "—",                       "—"],
      ["Chain Mail",       "Cathan's Mesh",       "Sparking Mail",       "Mesh Armor",    "—",                          "Shaftstop",         "Boneweave",      "—",                       "—"],
      ["Gothic Plate",     "Sigon's Shelter",     "Rattlecage",          "Embossed Plate","—",                          "Atma's Wail",       "Lacquered Plate","Tal Rasha's Guardianship","—"],
      ["Field Plate",      "—",                   "Rockfleece",          "Sharktooth Armor","—",                        "Toothrow",          "Kraken Shell",   "M'avina's Embrace",       "Leviathan"],
      ["Full Plate Mail",  "Tancred's Spine",     "Goldskin",            "Chaos Armor",   "Trang-Oul's Scales",         "Black Hades",       "Shadow Plate",   "Aldur's Deception",       "Steel Carapace"],
      ["Light Plate",      "Arcanna's Flesh",     "Heavenly Garb",       "Mage Plate",    "—",                          "Que-Hegan's Wisdom","Archon Plate",   "—",                       "—"],
      ["Plate Mail",       "—",                   "Boneflesh",           "Templar Coat",  "—",                          "Guardian Angel",    "Hellforge Plate","Naj's Light Plate",       "—"],
      ["Quilted Armor",    "Arctic Furs",         "Greyform",            "Ghost Armor",   "—",                          "The Spirit Shroud", "Dusk Shroud",    "Dark Adherent",           "Ormus' Robes"],
      ["Ring Mail",        "Angelic Mantle",      "Darkglow",            "Linked Mail",   "—",                          "Spirit Forge",      "Diamond Mail",   "—",                       "—"],
      ["Scale Mail",       "—",                   "Hawkmail",            "Tigulated Mail","Hwanin's Refuge",            "Crow Caw",          "Loricated Mail", "Natalya's Shadow",        "—"],
      ["Splint Mail",      "Berserker's Hauberk", "Iceblink",            "Russet Armor",  "—",                          "Skullder's Ire",    "Balrog Skin",    "Sazabi's Ghost Liberator","—"],
      ["Studded Leather",  "Cow King's Hide",     "Twitchthroe",         "Trellised Armor","—",                         "Iron Pelt",         "Wire Fleece",    "—",                       "The Gladiator's Bane"],
    ]},
  { title:"Gloves", url:"https://diablo2.wiki.fextralife.com/Gloves", cls:"g", header:"gt gb",
    rows:[
      ["Leather Gloves", "Death's Hand",     "The Hand of Broc","Demonhide Gloves","—",                  "Venom Grip",     "Bramble Mitts",    "Laying of Hands","—"],
      ["Heavy Gloves",   "Sander's Taboo",   "Bloodfist",       "Sharkskin Gloves","Magnus' Skin",       "Gravepalm",      "Vampirebone Gloves","—",             "Dracul's Grasp"],
      ["Chain Gloves",   "Cleglaw's Pincers","Chance Guards",   "Heavy Bracers",  "Trang-Oul's Claws",  "Ghoulhide",      "Vambraces",        "—",               "Soul Drainer"],
      ["Light Gauntlets","Iratha's Cuff",    "Magefist",        "Battle Gauntlets","M'avina's Icy Clutch","Lava Gout",    "Crusader Gauntlets","—",              "—"],
      ["Gauntlets",      "Sigon's Gage",     "Frostburn",       "War Gauntlets",  "Immortal King's Forge","Hellmouth",    "Ogre Gauntlets",   "—",               "Steelrend"],
    ]},
  { title:"Helms", url:"https://diablo2.wiki.fextralife.com/Helms", cls:"b", header:"bt bb",
    rows:[
      ["Bone Helm",  "Tancred's Skull",  "Wormskull",          "Grim Helm",    "—",                     "Vampire Gaze",   "Bone Visage",   "—",                    "Giant Skull"],
      ["Cap",        "Infernal Cranium", "Biggin's Bonnet",    "War Hat",      "Cow King's Horns",      "Peasant Crown",  "Shako",         "—",                    "Harlequin Crest"],
      ["Crown",      "Iratha's Coil",    "Undead Crown",       "Grand Crown",  "Hwanin's Splendor",     "Crown of Thieves","Corona",       "—",                    "Crown of Ages"],
      ["Helm",       "Berserker's Helm", "Coif of Glory",      "Casque",       "—",                     "—",              "Armet",         "—",                    "Steelshade"],
      ["Full Helm",  "Isenhart's Horn",  "Duskdeep",           "Basinet",      "Sazabi's Mental Sheath","—",              "Giant Conch",   "—",                    "—"],
      ["Great Helm", "Sigon's Visor",    "Howltusk",           "Winged Helm",  "Guillaume's Face",      "—",              "Spired Helm",   "Ondal's Almighty",     "Veil of Steel"],
      ["Great Helm", "—",                "—",                  "—",            "—",                     "—",              "—",             "—",                    "Nightwing's Veil"],
      ["Mask",       "Cathan's Visage",  "The Face of Horror", "Death Mask",   "Tal Rasha's Horadric Crest","Blackhorn's Face","Demonhead","—",                  "Andariel's Visage"],
      ["Skull Cap",  "Arcanna's Head",   "Tarnhelm",           "Sallet",       "—",                     "Rockstopper",    "Hydraskull",    "—",                    "—"],
    ]},
  { title:"Barb Helms", url:"", cls:"r", header:"rt rb",
    rows:[
      ["Assault Helm","—",               "—",                  "Savage Helmet","—",             "—",             "Conqueror Crown","—",               "Halaberd's Reign"],
      ["Avenger Guard","Immortal King's Will","—",             "Slayer Guard", "—",             "Arreat's Face", "Guardian Crown", "—",               "—"],
      ["Fanged Helm", "—",               "—",                  "Lion Helm",    "—",             "—",             "Fury Visor",     "—",               "Wolfhowl"],
      ["Horned Helm", "—",               "—",                  "Rage Mask",    "—",             "—",             "Destroyed Helm", "—",               "Demonhorn's Edge"],
    ]},
  { title:"Circlets", url:"", cls:"b", header:"bt bb",
    rows:[
      ["Circlet",    "Naj's Circlet",  "—",                    "Coronet",  "—",                  "—",              "Tiara",  "—",                    "Kira's Guardian"],
      ["—",          "—",              "—",                    "—",        "—",                  "—",              "Diadem", "M'avina's True Sight",  "Griffon's Eye"],
    ]},
  { title:"Druid Pelts", url:"", cls:"g", header:"gt gb",
    rows:[
      ["Antlers",     "—","—","Hunter's Guise",  "Aldur's Stony Gaze","—","Earth Spirit","—","—"],
      ["Falcon Mask", "—","—","Sacred Feathers", "—",                 "—","Sky Spirit",  "—","—"],
      ["Hawk Helm",   "—","—","Griffon Headdress","—",                "—","Sun Spirit",  "—","—"],
      ["Spirit Mask", "—","—","Totemic Mask",    "—",                 "—","Dream Spirit","—","—"],
      ["Wolf Head",   "—","—","Alpha Helm",      "—",                 "—","Blood Spirit","—","—"],
    ]},
];

const MISC_LINKS: { section: string; items: { label: string; url: string }[] }[] = [
  { section: "Abbreviations", items: [
    { label:"D2 Abbreviations & Acronyms — diablo2.diablowiki.net", url:"https://diablo2.diablowiki.net/Abbreviations_and_Acronyms" },
    { label:"D2 Abbreviations — purediablo.com", url:"https://www.purediablo.com/diablo-2/diablo-2-abbreviations" },
  ]},
  { section: "Bases", items: [
    { label:"d2runewizard — Weapon & Armor Bases", url:"https://d2runewizard.com/bases" },
  ]},
  { section: "Builds", items: [
    { label:"D2R Build Guides — Maxroll.gg", url:"https://maxroll.gg/d2/category/guides" },
  ]},
  { section: "Calculators", items: [
    { label:"Larzuk Socket Calculator — diablo2.io", url:"https://diablo2.io/larzuksockets.php" },
    { label:"D2R Character & Gear Planner — Maxroll.gg", url:"https://d2.maxroll.gg/d2planner/" },
    { label:"Drop Calculator — Maxroll.gg", url:"https://d2.maxroll.gg/d2-drop-calculator" },
    { label:"Drop Calculator — Silospen", url:"https://dropcalc.silospen.com/item.php" },
    { label:"Boss/Monster Drop Simulator — pairofdocs", url:"https://pairofdocs.github.io/d2-dropsim-web/" },
    { label:"Attack Speed Calculator — Planetdiablo", url:"https://planetdiablo.eu/diablo2/calcs/speedcalc/speedcalc_english.php" },
    { label:"Warren1001's D2R IAS Calculator", url:"https://warren1001.github.io/IAS_Calculator/" },
    { label:"Diablo 2 Attack Speed Calculator — d2.lc", url:"https://d2.lc/IAS/" },
  ]},
  { section: "Content Creators", items: [
    { label:"Zarfen the Loot Goblin (YouTube)", url:"https://www.youtube.com/@zarfen" },
    { label:"TheNuclearRabbit (YouTube)", url:"https://www.youtube.com/@thenuclearrabbit" },
    { label:"MrLlamaSC (YouTube)", url:"https://www.youtube.com/@MrLlamaSC" },
  ]},
  { section: "Utilities", items: [
    { label:"D2R Terror Zone Tracker — d2runewizard.com", url:"https://d2runewizard.com/terror-zone-tracker" },
    { label:"Holy Grail Tracker — d2-holy-grail.herokuapp.com", url:"https://d2-holy-grail.herokuapp.com/" },
    { label:"D2 Armoury — d2armoury.com", url:"https://d2armoury.com/" },
    { label:"D2JSP — forums & trading", url:"https://forums.d2jsp.org/" },
    { label:"Diablo 2 Wiki — diablo2.diablowiki.net", url:"https://diablo2.diablowiki.net/" },
  ]},
];

// ─── Component ───────────────────────────────────────────────────────────────

function Section({ title, color, children }: { title: React.ReactNode; color?: string; children: React.ReactNode }) {
  return (
    <section>
      <h3 className="font-semibold text-sm pb-1 mb-2" style={{ borderBottom: "1px solid var(--border-muted)", color: color ?? "var(--text-heading)" }}>{title}</h3>
      {children}
    </section>
  );
}

function fmt(n: number) {
  if (n === 0) return "n/a";
  return n.toLocaleString();
}

export function ReferenceTab() {
  return (
    <div className="space-y-6 text-xs">

      {/* ── Starting Attributes ── */}
      <Section title="Starting Attributes">
        <div className="overflow-x-auto">
          <table className="head border-collapse whitespace-nowrap w-full">
            <thead>
              <tr className="bt bb" style={{ color: "var(--text-secondary)" }}>
                <th className="p-1 pl-2 text-left">Class</th>
                <th className="p-1 text-center">Str</th>
                <th className="p-1 text-center">Dex</th>
                <th className="p-1 text-center">Vit</th>
                <th className="p-1 text-center">Eng</th>
                <th className="p-1 text-center" style={{ borderLeft: "1px solid var(--border-muted)" }}>Life</th>
                <th className="p-1 text-center">Stam</th>
                <th className="p-1 text-center">Mana</th>
                <th className="p-1 text-center" style={{ borderLeft: "1px solid var(--border-muted)" }}>Life/Vit</th>
                <th className="p-1 text-center">Stam/Vit</th>
                <th className="p-1 text-center">Mana/Eng</th>
              </tr>
            </thead>
            <tbody>
              {CLASS_ATTRS.map((c, i) => {
                const clsColor = ["zon","sin","bar","dru","nec","pal","sor","lok"][i];
                return (
                  <tr key={c.cls} className={`${clsColor} hover:brightness-150 cursor-default`}>
                    <td className="p-1 pl-2">
                      <a href={c.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                        {c.cls}
                      </a>
                    </td>
                    <td className="p-1 text-center">{c.str}</td>
                    <td className="p-1 text-center">{c.dex}</td>
                    <td className="p-1 text-center">{c.vit}</td>
                    <td className="p-1 text-center">{c.eng}</td>
                    <td className="p-1 text-center" style={{ borderLeft: "1px solid var(--border-muted)" }}>{c.life}</td>
                    <td className="p-1 text-center">{c.stam}</td>
                    <td className="p-1 text-center">{c.mana}</td>
                    <td className="p-1 text-center" style={{ borderLeft: "1px solid var(--border-muted)" }}>{c.lifeVit}</td>
                    <td className="p-1 text-center">{c.stamVit}</td>
                    <td className="p-1 text-center">{c.manaEng}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Section>

      {/* ── Skill / Stat Points ── */}
      <Section title="Skill &amp; Stat Points" color="var(--col-set)">
        <div className="flex flex-wrap gap-6">
          <table className="head border-collapse">
            <thead><tr className="gt gb"><th className="p-1 px-3 text-left">Skill Points</th></tr></thead>
            <tbody>
              {[
                ["g22", "+98", "(Level 99 − 1) × 1/level"],
                ["g20", "+ 3", "3 difficulties × 1 Den of Evil"],
                ["g22", "+ 3", "3 difficulties × 1 Radament"],
                ["g20", "+ 6", "3 difficulties × 2 Izual"],
                ["gt gb", "= 110", "Total Skill Points"],
              ].map(([cls, val, desc], i) => (
                <tr key={i} className={`${cls} hover:brightness-150 cursor-default`}>
                  <td className="p-1 pl-3 font-bold" style={{ color: "var(--accent-bright)" }}>{val}</td>
                  <td className="p-1 pr-3" style={{ color: "var(--text-primary)" }}>{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <table className="head border-collapse">
            <thead><tr className="gt gb"><th className="p-1 px-3 text-left">Stat Points</th></tr></thead>
            <tbody>
              {[
                ["g22", "+490", "(Level 99 − 1) × 5/level"],
                ["g20", "+ 15", "3 difficulties × 5 Lam Esen"],
                ["gt gb", "= 505", "Total Stat Points"],
              ].map(([cls, val, desc], i) => (
                <tr key={i} className={`${cls} hover:brightness-150 cursor-default`}>
                  <td className="p-1 pl-3 font-bold" style={{ color: "var(--accent-bright)" }}>{val}</td>
                  <td className="p-1 pr-3" style={{ color: "var(--text-primary)" }}>{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="self-end pb-1" style={{ color: "var(--text-secondary)" }}>
            <a href="https://maxroll.gg/d2/d2planner/" target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: "var(--accent-bright)" }}>D2/D2R Character Planner</a>
          </div>
        </div>
      </Section>

      {/* ── XP Table ── */}
      <Section title="XP to Level" color="var(--col-tc)">
        <div className="overflow-x-auto">
          <table className="head border-collapse font-mono">
            <thead>
              <tr className="bt bb" style={{ color: "var(--text-secondary)" }}>
                <th className="p-1 pl-2 text-right">Lev</th>
                <th className="p-1 px-3 text-right">XP to Level</th>
                <th className="p-1 px-3 text-right">Total XP</th>
                <th className="p-1 px-3 text-right">% of Max</th>
              </tr>
            </thead>
            <tbody>
              {XP_TABLE.map(([lev, xpToLev, totalXp], i) => {
                const pctOfMax = totalXp > 0 ? ((100 * totalXp) / 3520485254).toFixed(7) : "—";
                return (
                  <tr key={lev} className={`${i % 2 === 0 ? "b22" : "b00"} hover:brightness-150 cursor-default`}>
                    <td className="p-1 pl-2 text-right font-bold" style={{ color: "var(--accent-bright)" }}>{lev}</td>
                    <td className="p-1 px-3 text-right">{xpToLev > 0 ? fmt(xpToLev) : "n/a"}</td>
                    <td className="p-1 px-3 text-right">{fmt(totalXp)}</td>
                    <td className="p-1 px-3 text-right" style={{ color: "var(--text-secondary)" }}>{xpToLev > 0 ? `${pctOfMax}%` : ""}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Section>

      {/* ── Block / Holy Shield ── */}
      <Section title="Block Rate &amp; Holy Shield Dex" color="var(--res-fire)">
        <p className="text-secondary-d mb-2">
          Block% = (Shield% × (Dex − 15)) / (clvl × 2).{" "}
          <a href="https://old.reddit.com/r/diablo2/comments/1jb0v9o/there_is_clearly_something_wrong/mhsc21b/" target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: "var(--accent-bright)" }}>Block Rate guide.</a>
          {" "}Dex needed for max block with <strong>Holy Shield</strong>:
          0 HS (+0% block) vs 19+ HS (+35% block)
        </p>
        <table className="head border-collapse">
          <thead>
            <tr className="bt bb text-secondary-d">
              <th className="p-1 pl-2 text-left">
                <a href="https://classic.battle.net/diablo2exp/items/elite/paladinshields.shtml" target="_blank" rel="noopener noreferrer" className="hover:underline">Pali Elite Shield</a>
              </th>
              <th className="p-1 px-3 text-center">Str Req</th>
              <th className="p-1 px-3 text-center">Block</th>
              <th className="p-1 px-3 text-center">Dex (0 HS)</th>
              <th className="p-1 px-3 text-center">Dex (19 HS)</th>
              <th className="p-1 px-3 text-center" style={{ color: "var(--col-set)" }}>Saved</th>
            </tr>
          </thead>
          <tbody>
            {HOLY_SHIELD_SHIELDS.map((s, i) => (
              <tr key={s.name} className={`${i % 2 === 0 ? "b22" : "b20"} hover:brightness-150 cursor-default`}>
                <td className="p-1 pl-2">{s.name}</td>
                <td className="p-1 px-3 text-center">{s.str}</td>
                <td className="p-1 px-3 text-center" style={{ color: "var(--col-rune)" }}>{s.block}</td>
                <td className="p-1 px-3 text-center">{s.dex0}</td>
                <td className="p-1 px-3 text-center">{s.dex19}</td>
                <td className="p-1 px-3 text-center font-bold" style={{ color: "var(--col-set)" }}>−{s.dex0 - s.dex19}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Section>

      {/* ── Act 2 Mercs ── */}
      <Section title="Act II Mercenaries" color="var(--hdr-y)">
        <table className="head border-collapse">
          <thead><tr className="yt yb"><th className="p-1 px-3 text-left">Type</th><th className="p-1 px-3 text-left">Normal / Hell</th><th className="p-1 px-3 text-left">Nightmare</th></tr></thead>
          <tbody>
            {[
              ["y11","Combat","Prayer","Thorns"],
              ["y22","Defense","Defiance","Holy Freeze"],
              ["y11","Offense","Blessed Aim","Might"],
            ].map(([cls, type, norm, nm], i) => (
              <tr key={i} className={`${cls} hover:brightness-150 cursor-default`}>
                <td className="p-1 pl-3 font-semibold">{type}</td>
                <td className="p-1 px-3">{norm}</td>
                <td className="p-1 px-3">{nm}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="text-secondary-d mt-2">
          Single-Player Difficulty: <span className="k22 px-1">/players #</span>
          {" — "}<span className="text-primary-d"><strong>1</strong> = Quest, <strong>3</strong> = MF Farm, <strong>8</strong> = Levels</span>
        </p>
      </Section>

      {/* ── Pandemonium / Uber Diablo ── */}
      <Section title="Pandemonium Event &amp; Uber Diablo" color="var(--res-fire)">
        <div className="flex flex-wrap gap-6">
          <div>
            <div className="text-primary-d font-semibold mb-1">
              <a href="https://diablo2.diablowiki.net/Pandemonium_Event" target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: "var(--col-tc)" }}>Pandemonium Event</a>
              {" — Hell Act 5, cube 3 unique keys/organs → tp"}
            </div>
            <table className="head border-collapse">
              <thead><tr className="bt bb"><th className="p-1 px-2 text-left">Mob / Location</th><th className="p-1 px-2 text-left">Key</th><th className="p-1 px-2 text-left">Location</th><th className="p-1 px-2 text-left">Organ</th></tr></thead>
              <tbody>
                {[
                  ["r22","The Countess","A1","Terror","Matron's Den","Diablo's Horn"],
                  ["g22","The Summoner","A2","Hate","Forgotten Sands","Baal's Eye"],
                  ["b22","Nihlathak","A5","Destruction","Furnace of Pain","Mephisto's Brain"],
                ].map(([cls, mob, act, key, loc, organ]) => (
                  <tr key={mob} className={`${cls} hover:brightness-150 cursor-default`}>
                    <td className="p-1 pl-2">{mob}</td>
                    <td className="p-1 px-2 text-secondary-d">{act}</td>
                    <td className="p-1 px-2" style={{ color: "var(--col-rune)" }}>Key of {key}</td>
                    <td className="p-1 px-2 text-primary-d">{loc}</td>
                    <td className="p-1 px-2">{organ}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
            <div className="text-primary-d font-semibold mb-1">Essences → <a href="https://diablo-archive.fandom.com/wiki/Token_of_Absolution_(Diablo_II)" target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: "var(--col-set)" }}>Token of Absolution</a></div>
            <table className="head border-collapse">
              <tbody>
                {[
                  ["k11","A1 Andariel/Duriel","Twisted Essence of Suffering"],
                  ["k22","A3 Mephisto","Charged Essence of Hatred"],
                  ["k11","A4 Diablo","Burning Essence of Terror"],
                  ["k22","A5 Baal","Festering Essence of Destruction"],
                ].map(([cls, src, ess]) => (
                  <tr key={ess} className={`${cls} hover:brightness-150 cursor-default`}>
                    <td className="p-1 pl-2 text-secondary-d">{src}</td>
                    <td className="p-1 px-2">{ess}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
            <div className="text-primary-d font-semibold mb-1">
              <a href="https://diablo2.diablowiki.net/Uber_Diablo_Quest" target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: "var(--col-tc)" }}>Uber Diablo</a>
              {" — SoJ → Diablo Clone → Annihilus"}
            </div>
            <table className="head border-collapse">
              <tbody>
                {[
                  ["k11","Single Player: sell ONE SoJ to spawn Diablo Clone"],
                  ["k11","Multiplayer: sell 75–125 SoJ per game type / region"],
                  ["k11","Spawns instead of first Superunique after:"],
                  ["k22","  \"Diablo walks the Earth\" message"],
                ].map(([cls, txt], i) => (
                  <tr key={i} className={`${cls} hover:brightness-150 cursor-default`}>
                    <td className="p-1 px-2">{txt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="text-secondary-d mt-1">Chat command: <span className="k22 px-1">/uberdiablo</span> to check progress</div>
          </div>
        </div>
      </Section>

      {/* ── Gems ── */}
      <Section title="Gem Tiers" color="var(--accent-bright)">
        <div className="overflow-x-auto">
          <table className="head border-collapse text-sm">
            <thead>
              <tr className="gt gb">
                <th className="p-1 px-2 text-left">Tier</th>
                <th className="p-1 px-2 text-right text-secondary-d">clvl</th>
                <th className="p-1 px-2 text-left">Socket</th>
                <th className="p-1 px-2 text-left gemam">Amethyst</th>
                <th className="p-1 px-2 text-left gemdi">Diamond</th>
                <th className="p-1 px-2 text-left gemem">Emerald</th>
                <th className="p-1 px-2 text-left gemru">Ruby</th>
                <th className="p-1 px-2 text-left gemsa">Sapphire</th>
                <th className="p-1 px-2 text-left gemsk">Skull</th>
                <th className="p-1 px-2 text-left gemto">Topaz</th>
              </tr>
            </thead>
            <tbody>
              {GEM_DATA.map((g, i) => {
                const rowCls = i % 3 === 0 ? "gem" : i % 3 === 2 ? "gem gb" : "gem";
                const showTier = i % 3 === 1;
                const showClvl = i % 3 === 1;
                return (
                  <tr key={i} className={`${rowCls} hover:brightness-150 cursor-default`}>
                    <td className="p-1 pl-2 font-mono">{showTier ? g.tier.tier : ""}</td>
                    <td className="p-1 px-2 text-right text-secondary-d">{showClvl && g.tier.clvl > 1 ? g.tier.clvl : ""}</td>
                    <td className="p-1 px-2 text-primary-d">{g.socket}</td>
                    <td className="p-1 px-2 gemam">{g.am}</td>
                    <td className="p-1 px-2 gemdi">{g.di}</td>
                    <td className="p-1 px-2 gemem">{g.em}</td>
                    <td className="p-1 px-2 gemru">{g.ru}</td>
                    <td className="p-1 px-2 gemsa">{g.sa}</td>
                    <td className="p-1 px-2 gemsk">{g.sk}</td>
                    <td className="p-1 px-2 gemto">{g.to}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Section>

      {/* ── Socketing / Upping ── */}
      <Section title="Socketing &amp; Upgrading Recipes" color="var(--col-rune)">
        <div className="flex flex-wrap gap-8">
          <div>
            <div className="text-primary-d font-semibold mb-1">Larzuk Socketing (quest reward)</div>
            <div className="text-secondary-d text-sm mb-2">Max sockets = min(item max, socket table)</div>
            <table className="head border-collapse text-sm">
              <thead>
                <tr className="kt kb">
                  <th className="p-1 px-2 text-left">Item</th>
                  <th className="p-1 px-2 text-center">ilvl 1–25</th>
                  <th className="p-1 px-2 text-center">26–40</th>
                  <th className="p-1 px-2 text-center">41+</th>
                  <th className="p-1 px-2 text-left">Quality</th>
                  <th className="p-1 px-2 text-left">Type</th>
                  <th className="p-1 px-2 text-right">Equip clvl</th>
                </tr>
              </thead>
              <tbody>
                {SOCK_ITEMS.map((s, i) => (
                  <tr key={s.name} className={`${i % 2 === 0 ? "k11" : "k22"} hover:brightness-150 cursor-default`}>
                    <td className="p-1 pl-2">{s.name}</td>
                    <td className="p-1 px-2 text-center">{s.ilvl25}</td>
                    <td className="p-1 px-2 text-center">{s.ilvl40}</td>
                    <td className="p-1 px-2 text-center">{s.ilvl41}</td>
                    <td className="p-1 px-2 text-secondary-d">{s.quality}</td>
                    <td className="p-1 px-2 text-secondary-d">{s.type}</td>
                    <td className="p-1 px-2 text-right">{s.clvl}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div>
            <div className="text-primary-d font-semibold mb-1">Crafted Item ilvl &amp; Affix Count</div>
            <div className="text-secondary-d text-sm mb-1">Crafted ilvl = int(clvl/2) + int(ilvl/2)</div>
            <table className="head border-collapse text-sm">
              <thead><tr className="bt bb">
                <th className="p-1 px-2 text-right">ilvl</th>
                <th className="p-1 px-2 text-center">4 affixes</th>
                <th className="p-1 px-2 text-center">3 affixes</th>
                <th className="p-1 px-2 text-center">2 affixes</th>
                <th className="p-1 px-2 text-center">1 affix</th>
              </tr></thead>
              <tbody>
                {[
                  ["b11","1–30", "20%","20%","20%","40%"],
                  ["b22","31–50","20%","20%","60%","—"],
                  ["b11","51–70","20%","80%","—","—"],
                  ["b22","71+", "100%","—","—","—"],
                ].map(([cls, rng, a4, a3, a2, a1]) => (
                  <tr key={rng} className={`${cls} hover:brightness-150 cursor-default`}>
                    <td className="p-1 px-2 text-right" style={{ color: "var(--text-primary)" }}>{rng}</td>
                    <td className="p-1 px-2 text-center">{a4}</td>
                    <td className="p-1 px-2 text-center">{a3}</td>
                    <td className="p-1 px-2 text-center">{a2}</td>
                    <td className="p-1 px-2 text-center">{a1}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-4">
          <div className="text-primary-d font-semibold mb-2">Upgrade Recipes (Horadric Cube)</div>
          <div className="flex flex-wrap gap-6">
            {UP_RECIPES.map(cat => (
              <div key={cat.category} className="min-w-[340px]">
                <div
                  className="text-sm font-semibold mb-1"
                  style={{
                    color: cat.color === "rare" ? "var(--col-rare)"
                         : cat.color === "set"  ? "var(--col-set)"
                         : cat.color === "unq"  ? "var(--col-unq)"
                         : "var(--text-secondary)",
                  }}
                >{cat.category}</div>
                <table className="head border-collapse text-sm w-full">
                  <tbody>
                    {cat.rows.map((r, i) => (
                      <tr key={i} className={`${i % 2 === 0 ? "k11" : "k22"} hover:brightness-150 cursor-default`}>
                        <td className="p-1 px-2 font-mono text-xs" style={{ color: "var(--col-rune)" }}>{r.runes}</td>
                        <td className="p-1 px-2 text-secondary-d text-xs">+</td>
                        <td className="p-1 px-2 text-primary-d text-xs">{r.from}</td>
                        <td className="p-1 px-2 text-secondary-d text-xs">→</td>
                        <td className="p-1 px-2 text-xs">{r.to}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── Skiller Grand Charms ── */}
      <Section title="Skiller Grand Charms (tier by class)" color="var(--col-magic)">
        <div className="overflow-x-auto">
          <table className="head border-collapse text-sm">
            <thead>
              <tr className="gt gb">
                <th className="p-1 px-2 text-center">Tier</th>
                <th className="p-1 px-2 text-left">Amazon</th>
                <th className="p-1 px-2 text-left">Assassin</th>
                <th className="p-1 px-2 text-left">Barbarian</th>
                <th className="p-1 px-2 text-left">Druid</th>
                <th className="p-1 px-2 text-left">Necromancer</th>
                <th className="p-1 px-2 text-left">Paladin</th>
                <th className="p-1 px-2 text-left">Sorceress</th>
              </tr>
            </thead>
            <tbody>
              {SKILLER_TIERS.map((t, i) => (
                <tr key={t.tier} className={`${i % 2 === 0 ? "k11" : "k22"} hover:brightness-150 cursor-default`}>
                  <td className={`p-1 px-2 text-center font-bold ${t.cls}`}>{t.tier}</td>
                  <td className="p-1 px-2">{t.rows[0].zon || "—"}</td>
                  <td className="p-1 px-2">{t.rows[0].sin || "—"}</td>
                  <td className="p-1 px-2">{t.rows[0].bar || "—"}</td>
                  <td className="p-1 px-2">{t.rows[0].dru || "—"}</td>
                  <td className="p-1 px-2">{t.rows[0].nec || "—"}</td>
                  <td className="p-1 px-2">{t.rows[0].pal || "—"}</td>
                  <td className="p-1 px-2">{t.rows[0].sor || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs mt-1" style={{ color: "var(--text-secondary)" }}>Source: personal preference / community consensus — your mileage may vary.</p>
      </Section>

      {/* ── Item Type Tables ── */}
      <Section title="Item Type Reference" color="var(--col-tc)">
        <div className="flex flex-wrap gap-8">
          {ITEM_SECTIONS.map(sec => (
            <div key={sec.title} className="min-w-[min(100%,640px)]">
              <div className="font-semibold mb-1" style={{ color: "var(--text-primary)" }}>
                {sec.url
                  ? <a href={sec.url} target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: "var(--col-tc)" }}>{sec.title}</a>
                  : sec.title
                }
              </div>
              <div className="overflow-x-auto">
                <table className="head border-collapse text-xs">
                  <thead>
                    <tr className={sec.header}>
                      <th className="p-0.5 px-1 text-left">Base</th>
                      <th className="p-0.5 px-1 text-left set">Normal Set</th>
                      <th className="p-0.5 px-1 text-left unq">Normal Unq</th>
                      <th className="p-0.5 px-1 text-left set">Exc Set</th>
                      <th className="p-0.5 px-1 text-left unq">Exc Unq</th>
                      <th className="p-0.5 px-1 text-left set">Elite Set</th>
                      <th className="p-0.5 px-1 text-left unq">Elite Unq</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sec.rows.map((r, i) => (
                      <tr key={i} className={`${i % 2 === 0 ? sec.cls + "11" : sec.cls + "22"} hover:brightness-150 cursor-default`}>
                        <td className="p-0.5 px-1 font-mono text-primary-d">{r[0]}</td>
                        <td className="p-0.5 px-1 set">{r[1] === "—" ? <span className="text-muted-d">—</span> : r[1]}</td>
                        <td className="p-0.5 px-1 unq">{r[2] === "—" ? <span className="text-muted-d">—</span> : r[2]}</td>
                        <td className="p-0.5 px-1 set">{r[3] === "—" ? <span className="text-muted-d">—</span> : r[3]}</td>
                        <td className="p-0.5 px-1 unq">{r[4] === "—" ? <span className="text-muted-d">—</span> : r[4]}</td>
                        <td className="p-0.5 px-1 set">{r[6] === "—" ? <span className="text-muted-d">—</span> : r[6]}</td>
                        <td className="p-0.5 px-1 unq">{r[8] === "—" ? <span className="text-muted-d">—</span> : r[8]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Stat Abbreviations ── */}
      <Section title="Abbreviations &amp; Terminology">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-0.5">
          {STAT_ABBREVS.map(a => (
            <div key={a.abbr} className="flex gap-2">
              <span className="font-mono w-16 shrink-0" style={{ color: "var(--col-rune)" }}>{a.abbr}</span>
              <span className="text-secondary-d">{a.desc}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Links ── */}
      <Section title="Links &amp; Resources">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4">
          {MISC_LINKS.map(group => (
            <div key={group.section}>
              <div className="font-semibold mb-1" style={{ color: "var(--accent-bright)" }}>{group.section}</div>
              <ul className="space-y-0.5">
                {group.items.map(item => (
                  <li key={item.url}>
                    <a href={item.url} target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: "var(--text-secondary)" }}>
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

    </div>
  );
}
