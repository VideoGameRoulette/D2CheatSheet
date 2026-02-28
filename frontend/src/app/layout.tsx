import type { Metadata } from "next";
import "@/app/globals.css";
import "@/../public/css/theme.css";
import { ThemeProvider } from "@/components/ThemeProvider";

export const metadata: Metadata = {
  title: "Diablo 2 Cheat Sheet — VideoGameRoulette",
  description: "D2/D2R runewords, Holy Grail, breakpoints, cube & crafting, maps, and reference. Ported to Next.js by VideoGameRoulette, original data by Michaelangel007.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className="antialiased min-h-screen" style={{ backgroundColor: "var(--bg-base)", color: "var(--text-primary)" }}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
