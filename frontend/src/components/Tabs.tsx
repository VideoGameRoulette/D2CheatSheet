"use client";

import { ReactNode } from "react";

export type TabId = "runewords" | "breakpoints" | "cube" | "reference" | "holygrail" | "maps" | "maptips" | "terrorzone";

interface Tab {
  id: TabId;
  label: string;
  icon?: string;
}

const TABS: Tab[] = [
  { id: "runewords",   label: "Runewords",      icon: "⚡" },
  { id: "holygrail",   label: "Holy Grail",      icon: "🏆" },
  { id: "breakpoints", label: "Breakpoints",     icon: "⏱" },
  { id: "cube",        label: "Cube & Crafting", icon: "🧊" },
  { id: "maps",        label: "Maps & Farming",  icon: "🗺" },
  { id: "maptips",     label: "Map Tips",        icon: "💡" },
  { id: "terrorzone",  label: "Terror Zones",    icon: "🔥" },
  { id: "reference",   label: "Reference",       icon: "📖" },
];

interface TabsProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
  children: ReactNode;
}

export function Tabs({ activeTab, onTabChange, children }: TabsProps) {
  return (
    <div className="w-full">
      <nav
        className="flex flex-wrap gap-1 mb-6 pb-3"
        style={{ borderBottom: "1px solid var(--border-subtle)" }}
      >
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-md text-sm font-medium transition-all"
              style={isActive ? {
                background: "var(--bg-overlay)",
                color: "var(--text-heading)",
                border: "1px solid var(--border-default)",
              } : {
                background: "transparent",
                color: "var(--text-secondary)",
                border: "1px solid transparent",
              }}
              onMouseEnter={e => {
                if (!isActive) {
                  (e.currentTarget as HTMLButtonElement).style.background = "var(--bg-raised)";
                  (e.currentTarget as HTMLButtonElement).style.color = "var(--text-primary)";
                }
              }}
              onMouseLeave={e => {
                if (!isActive) {
                  (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                  (e.currentTarget as HTMLButtonElement).style.color = "var(--text-secondary)";
                }
              }}
            >
              <span aria-hidden="true">{tab.icon}</span>
              {tab.label}
            </button>
          );
        })}
      </nav>

      <div className="w-full">
        {children}
      </div>
    </div>
  );
}
