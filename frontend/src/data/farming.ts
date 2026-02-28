// alvl85 TC87 zones — Hell difficulty
// [act, nearestWP, zone, farmZone, packs, F, C, L, P, p, m]
// immunity flags: true = immune, false = not immune
export type AlvlZone = {
  act: number;
  wp: string;
  zone: string;
  farmZone: string;
  packs: string;
  F: boolean; C: boolean; L: boolean; P: boolean; ph: boolean; m: boolean;
};

export const ALVL85_ZONES: AlvlZone[] = [
  { act:1, wp:"Cold Plains",      zone:"Burial Grounds",  farmZone:"Mausoleum",             packs:"4-5", F:false,C:false,L:true, P:false,ph:false,m:false },
  { act:1, wp:"Stony Field",      zone:"",                farmZone:"Underground Passage 2", packs:"3-5", F:true, C:true, L:true, P:true, ph:false,m:false },
  { act:1, wp:"Outer Cloister",   zone:"Tamoe Highland",  farmZone:"Pit Level 1",           packs:"6-8", F:true, C:true, L:true, P:false,ph:false,m:false },
  { act:1, wp:"Outer Cloister",   zone:"Tamoe Highland",  farmZone:"Pit Level 2",           packs:"2-3", F:true, C:true, L:true, P:false,ph:false,m:false },
  { act:2, wp:"Lut Gholein",      zone:"Rocky Waste",     farmZone:"Stony Tomb Level 1",    packs:"6-8", F:false,C:false,L:true, P:true, ph:false,m:false },
  { act:2, wp:"Lut Gholein",      zone:"Rocky Waste",     farmZone:"Stony Tomb Level 2",    packs:"4-6", F:false,C:false,L:true, P:true, ph:false,m:false },
  { act:2, wp:"Far Oasis",        zone:"Far Oasis",       farmZone:"Maggot Lair 3",         packs:"4-5", F:false,C:false,L:true, P:true, ph:true, m:false },
  { act:2, wp:"Lost City",        zone:"Lost City",       farmZone:"Ancient Tunnels",       packs:"6-8", F:true, C:false,L:true, P:true, ph:true, m:true  },
  { act:3, wp:"Spider Forest",    zone:"Spider Forest",   farmZone:"Arachnid Lair",         packs:"6-8", F:true, C:false,L:true, P:true, ph:false,m:false },
  { act:3, wp:"Flayer Jungle",    zone:"Flayer Jungle",   farmZone:"Swampy Pit Level 1",    packs:"6-8", F:false,C:false,L:true, P:true, ph:false,m:false },
  { act:3, wp:"Flayer Jungle",    zone:"Flayer Jungle",   farmZone:"Swampy Pit Level 2",    packs:"6-8", F:true, C:false,L:true, P:true, ph:false,m:false },
  { act:3, wp:"Flayer Jungle",    zone:"Flayer Jungle",   farmZone:"Swampy Pit Level 3",    packs:"2-3", F:false,C:false,L:true, P:true, ph:false,m:false },
  { act:3, wp:"Kurast Bazaar",    zone:"Kurast Bazaar",   farmZone:"Disused Fane",          packs:"4",   F:true, C:true, L:true, P:true, ph:true, m:true  },
  { act:3, wp:"Kurast Bazaar",    zone:"Kurast Bazaar",   farmZone:"Ruined Temple",         packs:"4",   F:true, C:true, L:false,P:false,ph:false,m:true  },
  { act:3, wp:"Kurast Bazaar",    zone:"Kurast Bazaar",   farmZone:"Kurast Sewers 1",       packs:"6-7", F:false,C:true, L:true, P:true, ph:false,m:true  },
  { act:3, wp:"Kurast Bazaar",    zone:"Kurast Bazaar",   farmZone:"Kurast Sewers 2",       packs:"?1",  F:false,C:true, L:true, P:true, ph:false,m:true  },
  { act:3, wp:"Upper Kurast",     zone:"Upper Kurast",    farmZone:"Forgotten Temple",      packs:"2",   F:true, C:true, L:true, P:false,ph:false,m:false },
  { act:3, wp:"Upper Kurast",     zone:"Upper Kurast",    farmZone:"Forgotten Reliquary",   packs:"4",   F:true, C:true, L:false,P:false,ph:false,m:true  },
  { act:3, wp:"Upper Kurast",     zone:"Kurast Causeway", farmZone:"Ruined Fane",           packs:"2",   F:true, C:true, L:true, P:false,ph:false,m:false },
  { act:3, wp:"Upper Kurast",     zone:"Kurast Causeway", farmZone:"Disused Reliquary",     packs:"2",   F:true, C:true, L:true, P:false,ph:false,m:false },
  { act:4, wp:"River of Flame",   zone:"—",               farmZone:"River of Flame",        packs:"6-7", F:true, C:true, L:true, P:true, ph:false,m:false },
  { act:4, wp:"River of Flame",   zone:"—",               farmZone:"Chaos Sanctuary",       packs:"6-7", F:true, C:true, L:true, P:false,ph:false,m:false },
  { act:5, wp:"Frigid Highlands", zone:"Frigid Highlands",farmZone:"Abaddon",               packs:"6-8", F:true, C:true, L:true, P:true, ph:true, m:false },
  { act:5, wp:"Arreat Plateau",   zone:"Pit of Acheron",  farmZone:"Pit of Acheron",        packs:"6-8", F:true, C:true, L:false,P:true, ph:true, m:true  },
  { act:5, wp:"Glacial Trail",    zone:"Glacial Trail",   farmZone:"Drifter Cavern",        packs:"6-8", F:true, C:true, L:true, P:true, ph:true, m:true  },
  { act:5, wp:"Frozen Tundra",    zone:"Frozen Tundra",   farmZone:"Infernal Pit",          packs:"6-8", F:true, C:true, L:true, P:true, ph:true, m:false },
  { act:5, wp:"Ancients' Way",    zone:"Ancients' Way",   farmZone:"Icy Cellar",            packs:"6-8", F:false,C:true, L:true, P:true, ph:true, m:false },
  { act:5, wp:"Worldstone Keep 2",zone:"—",               farmZone:"Worldstone Keep 1",     packs:"6-8", F:true, C:true, L:true, P:false,ph:false,m:false },
  { act:5, wp:"Worldstone Keep 2",zone:"—",               farmZone:"Worldstone Keep 2",     packs:"6-8", F:true, C:true, L:true, P:true, ph:false,m:true  },
  { act:5, wp:"Worldstone Keep 2",zone:"—",               farmZone:"Worldstone Keep 3",     packs:"6-8", F:true, C:true, L:true, P:true, ph:true, m:true  },
  { act:5, wp:"Worldstone Keep 2",zone:"—",               farmZone:"Throneroom",            packs:"6-8", F:true, C:true, L:true, P:true, ph:true, m:true  },
];

// Uniques that require mlvl > 81 (don't drop in Cows)
export const COW_CANT_DROP = [
  { mlvl:"85+", unique:"Andariel's Visage",   base:"Demonhead"       },
  { mlvl:"",    unique:"Alma Negra",           base:"Sacred Rondache" },
  { mlvl:"",    unique:"Arkaine's Valor",      base:"Balrog Skin"     },
  { mlvl:"",    unique:"Halaberd's Reign",     base:"Conqueror Crown" },
  { mlvl:"",    unique:"Kira's Guardian",      base:"Tiara"           },
  { mlvl:"",    unique:"Shadow Killer",        base:"Battle Cestus"   },
  { mlvl:"",    unique:"The Cranium Basher",   base:"Thunder Maul"    },
  { mlvl:"",    unique:"The Gladiator's Bane", base:"Wire Fleece"     },
  { mlvl:"",    unique:"The Grandfather",      base:"Colossus Blade"  },
  { mlvl:"",    unique:"Wolfhowl",             base:"Fury Visor"      },
  { mlvl:"86+", unique:"Crown of Ages",        base:"Corona"          },
  { mlvl:"",    unique:"Mang Song's Lesson",   base:"Archon Staff"    },
  { mlvl:"",    unique:"Stormlash",            base:"Scourge"         },
  { mlvl:"",    unique:"Tomb Reaver",          base:"Cryptic Axe"     },
  { mlvl:"87+", unique:"Arachnid Mesh",        base:"Spiderweb Sash"  },
  { mlvl:"",    unique:"Azurewrath",           base:"Phase Blade"     },
  { mlvl:"",    unique:"Tyrael's Might",       base:"Sacred Armor"    },
];
