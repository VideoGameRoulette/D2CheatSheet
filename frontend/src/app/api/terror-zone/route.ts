import { NextResponse } from "next/server";

export const runtime = "edge";
// Revalidate every 60 s so the CDN/edge caches it briefly
export const revalidate = 60;

const UPSTREAM = "https://d2runewizard.com/api/terror-zone";

export async function GET() {
  try {
    const res = await fetch(UPSTREAM, {
      headers: {
        // d2runewizard requires a Referer that looks like a known site
        Referer: "https://d2runewizard.com/",
        "User-Agent": "Mozilla/5.0 (compatible; d2-cheat-sheet-proxy/1.0)",
      },
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: `Upstream returned ${res.status}` },
        { status: res.status }
      );
    }

    const data = await res.json();

    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=30",
      },
    });
  } catch (err) {
    return NextResponse.json(
      { error: String(err) },
      { status: 502 }
    );
  }
}
