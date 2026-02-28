// Breakpoint frames for FCR / FHR / FBR
// Each row: { label, cls, values } where values[i] is the % needed to hit frame (frameLabels[i])
// null means unreachable / not applicable for that class

export const FCR_FRAMES = [23,22,21,20,19,18,17,16,15,14,13,12,11,10,9,8,7];

export const FCR_ROWS: { label: string; cls: string; values: (number | null)[] }[] = [
  { label: "Ama",            cls: "zon", values: [null,null,null,null,null,0,7,14,22,32,48,68,99,152,null,null,null] },
  { label: "Asn",            cls: "sin", values: [null,null,null,null,null,null,null,null,0,8,16,27,42,65,102,174,null] },
  { label: "Bar",            cls: "bar", values: [null,null,null,null,null,null,null,null,null,null,0,9,20,37,63,105,200] },
  { label: "Drd Human",      cls: "dru", values: [null,null,null,null,0,4,10,19,30,46,68,99,163,null,null,null,null] },
  { label: "    Bear",       cls: "k11", values: [null,null,null,null,null,null,null,0,7,15,26,40,63,99,163,null,null] },
  { label: "    Wolf",       cls: "g22", values: [null,null,null,null,null,null,null,0,6,14,26,40,60,95,157,null,null] },
  { label: "Nec Human",      cls: "nec", values: [null,null,null,null,null,null,null,null,0,9,18,30,48,75,125,null,null] },
  { label: "    Vamp",       cls: "k22", values: [0,6,11,18,24,35,48,65,86,120,180,null,null,null,null,null,null] },
  { label: "Pal",            cls: "pal", values: [null,null,null,null,null,null,null,null,0,9,18,30,48,75,125,null,null] },
  { label: "Sor Lightning",  cls: "sor", values: [null,null,null,null,0,7,15,23,35,52,78,117,194,null,null,null,null] },
  { label: "    Other",      cls: "k11", values: [null,null,null,null,null,null,null,null,null,0,9,20,37,63,105,200,null] },
  { label: "War",            cls: "war", values: [null,null,null,null,null,null,null,null,0,9,18,30,48,75,125,null,null] },
  { label: "Mrc Act3",       cls: "k11", values: [null,null,null,null,null,null,null,0,8,15,26,39,58,86,138,null,null] },
];

export const FHR_FRAMES = [17,16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1];

export const FHR_ROWS: { label: string; cls: string; values: (number | null)[]; note?: string }[] = [
  { label: "Ama",            cls: "zon", values: [null,null,null,null,0,6,13,20,32,52,86,174,600,null,null,null,null] },
  { label: "Asn",            cls: "sin", values: [null,null,null,null,null,null,0,7,15,27,48,86,200,null,null,null,null] },
  { label: "Bar",            cls: "bar", values: [null,null,null,null,null,null,0,7,15,27,48,86,200,null,null,null,null] },
  { label: "Drd Human 1H",   cls: "dru", values: [0,3,7,13,19,29,42,63,99,174,456,null,null,null,null,null,null] },
  { label: "    Human 2H",   cls: "k11", values: [null,0,5,10,16,26,39,56,86,152,377,null,null,null,null,null,null] },
  { label: "    Bear",       cls: "g22", values: [null,0,5,10,16,24,37,54,86,152,360,null,null,null,null,null,null] },
  { label: "    Wolf",       cls: "k11", values: [null,null,null,null,null,null,null,null,0,9,20,42,86,280,null,null,null] },
  { label: "Nec Human",      cls: "nec", values: [null,0,5,10,16,26,39,56,86,152,377,null,null,null,null,null,null] },
  { label: "    Vamp",       cls: "k11", values: [0,2,6,10,16,24,34,48,72,117,null,null,null,null,null,null,null] },
  { label: "Pal Spear/Stave",cls: "pal", values: [null,0,3,7,13,20,32,48,75,129,280,null,null,null,null,null,null] },
  { label: "    rest",       cls: "k11", values: [null,null,null,null,null,null,0,7,15,27,48,86,200,null,null,null,null] },
  { label: "Sor",            cls: "sor", values: [0,5,9,14,20,30,42,60,86,142,280,null,null,null,null,null,null] },
  { label: "War",            cls: "war", values: [null,0,5,10,16,26,39,56,86,152,377,null,null,null,null,null,null] },
  { label: "Mrc Act1",       cls: "k11", values: [null,null,null,null,0,6,13,20,32,52,86,174,600,null,null,null,null] },
  { label: "    Act2",       cls: "k22", values: [0,5,9,14,20,30,42,60,86,142,280,null,null,null,null,null,null] },
  { label: "    Act3",       cls: "k11", values: [0,5,8,13,18,24,32,46,63,86,133,232,600,null,null,null,null] },
  { label: "    Act5",       cls: "k22", values: [], note: "no FHR animation" },
];

export const FBR_FRAMES = [17,16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1];

export const FBR_ROWS: { label: string; cls: string; values: (number | null)[]; note?: string }[] = [
  { label: "Ama 1H",         cls: "zon", values: [null,null,null,null,0,4,6,11,15,23,29,40,56,80,120,200,480] },
  { label: "    2H",         cls: "k11", values: [null,null,null,null,null,null,null,null,null,null,0,13,32,86,600,null,null] },
  { label: "Asn",            cls: "sin", values: [null,null,null,null,null,null,null,null,null,null,0,13,32,86,600,null,null] },
  { label: "Bar",            cls: "bar", values: [null,null,null,null,null,null,null,null,0,9,20,42,86,280,null,null,null] },
  { label: "Drd Human",      cls: "dru", values: [null,null,null,null,null,0,6,13,20,32,52,86,174,600,null,null,null] },
  { label: "    Bear",       cls: "g11", values: [null,null,null,null,null,null,null,0,7,15,27,48,86,200,null,null,null] },
  { label: "    Wolf",       cls: "k22", values: [null,null,0,5,10,16,27,40,65,109,223,null,null,null,null,null,null] },
  { label: "Nec Human",      cls: "nec", values: [null,null,null,null,null,0,6,13,20,32,52,86,174,600,null,null,null] },
  { label: "    Vamp",       cls: "k22", values: [0,2,6,10,16,24,34,48,72,117,208,null,null,null,null,null,null] },
  { label: "Pal",            cls: "pal", values: [null,null,null,null,null,null,null,null,null,null,0,13,32,86,600,null,null] },
  { label: "    Holy Shield",cls: "k22", values: [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,0] },
  { label: "Sor",            cls: "sor", values: [null,null,null,null,null,null,null,0,7,15,27,48,86,200,null,null,null] },
  { label: "War",            cls: "war", values: [null,null,null,null,null,0,6,13,20,32,52,86,null,null,null,null,null] },
];
