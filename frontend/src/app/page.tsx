"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { Tabs, type TabId } from "@/components/Tabs";
import { RunewordsTab } from "@/components/tabs/RunewordsTab";
import { BreakpointsTab } from "@/components/tabs/BreakpointsTab";
import { CubeTab } from "@/components/tabs/CubeTab";
import { ReferenceTab } from "@/components/tabs/ReferenceTab";
import { MapsTab } from "@/components/tabs/MapsTab";
import { MapTipsTab } from "@/components/tabs/MapTipsTab";
import { TerrorZoneTab } from "@/components/tabs/TerrorZoneTab";
import { HolyGrailTab } from "@/components/tabs/HolyGrailTab";

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabId>("runewords");

  const renderTabContent = () => {
    switch (activeTab) {
      case "runewords":   return <RunewordsTab />;
      case "holygrail":   return <HolyGrailTab />;
      case "breakpoints": return <BreakpointsTab />;
      case "cube":        return <CubeTab />;
      case "maps":        return <MapsTab />;
      case "maptips":     return <MapTipsTab />;
      case "terrorzone":  return <TerrorZoneTab />;
      case "reference":   return <ReferenceTab />;
      default:            return <RunewordsTab />;
    }
  };

  return (
    <div className="min-h-screen" style={{ background: "var(--bg-base)" }}>
      <main className="max-w-[1440px] mx-auto px-4 sm:px-6 py-6">
        <Header />
        <Tabs activeTab={activeTab} onTabChange={setActiveTab}>
          {renderTabContent()}
        </Tabs>
        <footer
          className="mt-16 pt-4 text-xs flex flex-wrap items-center gap-2"
          style={{ borderTop: "1px solid var(--border-subtle)", color: "var(--text-muted)" }}
        >
          <span>Ported to Next.js by</span>
          <a
            href="https://github.com/VideoGameRoulette"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "var(--accent-bright)" }}
            className="hover:underline"
          >
            VideoGameRoulette
          </a>
          <span>·</span>
          <span>Original source data by</span>
          <a
            href="https://github.com/Michaelangel007/d2_cheat_sheet"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "var(--text-secondary)" }}
            className="hover:underline"
          >
            Michaelangel007
          </a>
        </footer>
      </main>
    </div>
  );
}
