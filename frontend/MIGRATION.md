# Next.js Migration

This project has been migrated to Next.js with a tabbed UI. The original code lives in the **parent directory** (`../`) for reference.

## Quick Start

**Docker (recommended):**
```bash
docker-compose up --build
```
Then open http://localhost:3000

**Local:**
```bash
cd frontend
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build (Static Export)

```bash
npm run build
```

Output goes to `out/` folder. Deploy the `out/` directory to any static host (GitHub Pages, Netlify, etc.).

## Project Structure

```
src/
├── app/           # Next.js App Router
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── Header.tsx
│   ├── Tabs.tsx
│   └── tabs/
│       ├── RunewordsTab.tsx   # Full rune picker + runeword table
│       ├── HolyGrailTab.tsx   # Placeholder (migrate from index.html)
│       ├── BreakpointsTab.tsx
│       ├── CubeTab.tsx
│       ├── MapsTab.tsx
│       └── ReferenceTab.tsx
└── data/
    ├── runes.ts
    └── recipes.ts
```

## Tabs

| Tab | Status |
|-----|--------|
| **Runewords** | ✅ Complete – rune picker, table, localStorage |
| **Holy Grail** | Placeholder – migrate ITEMS data & table |
| **Breakpoints** | Placeholder – migrate FCR/FHR/FBR tables |
| **Cube** | Placeholder – migrate cube/crafting recipes |
| **Maps** | Placeholder – migrate alvl85, map layouts |
| **Reference** | Placeholder – attributes, XP, links |

## Static Assets

Runes, gems, and pics are copied to `public/` during setup. They are served at `/runes/`, `/gems/`, `/pics/`.

## Original Cheat Sheet

The original `index.html` remains at the project root. Link to it from the Reference tab for full content until all sections are migrated.
