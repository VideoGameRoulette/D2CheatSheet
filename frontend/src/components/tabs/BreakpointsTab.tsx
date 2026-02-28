"use client";

import {
  FCR_FRAMES, FCR_ROWS,
  FHR_FRAMES, FHR_ROWS,
  FBR_FRAMES, FBR_ROWS,
} from "@/data/breakpoints";

type BpRow = { label: string; cls: string; values: (number | null)[]; note?: string };

function BreakpointTable({
  title,
  titleCls,
  abbr,
  frames,
  rows,
  note,
  link,
}: {
  title: string;
  titleCls: string;
  abbr: string;
  frames: number[];
  rows: BpRow[];
  note?: string;
  link?: { href: string; label: string };
}) {
  return (
    <div className="overflow-x-auto">
      <table className={`head w-full border-collapse text-xs font-mono whitespace-nowrap`}>
        <thead>
          <tr className={`${titleCls}t ${titleCls}b`}>
            <th className="text-left p-2 text-sm font-semibold" colSpan={frames.length + 1}>
              <span className={titleCls}>{title} (<span className={abbr.toLowerCase()}>{abbr}</span>)</span>
              {note && <span className="font-normal ml-2 text-xs" style={{ color: "var(--text-secondary)" }}>{note}</span>}
              {link && (
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-2 hover:underline font-normal text-xs"
                  style={{ color: "var(--accent-bright)" }}
                >
                  {link.label}
                </a>
              )}
            </th>
          </tr>
          <tr className={`${titleCls}t ${titleCls}b`}>
            <th className="text-left p-1 pl-2">Frames</th>
            {frames.map((f) => (
              <th key={f} className="p-1 text-center" style={{ color: "var(--text-primary)" }}>{f}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri} className={`${row.cls} hover:brightness-150 cursor-default`}>
              <td className="p-1 pl-2" style={{ color: "var(--text-primary)" }}>{row.label}</td>
              {row.note ? (
                <td colSpan={frames.length} className="p-1 italic" style={{ color: "var(--text-muted)" }}>
                  {row.note}
                </td>
              ) : (
                frames.map((_, fi) => {
                  const val = row.values[fi];
                  return (
                    <td key={fi} className="p-1 text-center">
                      {val === 0 ? (
                        <span className="font-bold" style={{ color: "var(--accent-bright)" }}>0</span>
                      ) : val !== null && val !== undefined ? (
                        <span style={{ color: "var(--text-primary)" }}>{val}</span>
                      ) : (
                        <span style={{ color: "var(--text-muted)" }}>·</span>
                      )}
                    </td>
                  );
                })
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function BreakpointsTab() {
  return (
    <div className="space-y-6">
      <p className="text-xs" style={{ color: "var(--text-muted)" }}>
        Values are the minimum % needed to reach that frame count. Lower frames = faster animation.{" "}
        <span className="font-bold" style={{ color: "var(--accent-bright)" }}>0</span> = base (no bonus needed).
      </p>

      <BreakpointTable
        title="Faster Cast Rate"
        titleCls="b"
        abbr="FCR"
        frames={FCR_FRAMES}
        rows={FCR_ROWS}
        link={{ href: "https://www.youtube.com/watch?v=ivm5cFeJYSA", label: "Hidden 86 breakpoint guide" }}
        note="* Sor Other skills 63* includes a hidden 86 breakpoint"
      />

      <BreakpointTable
        title="Faster Hit Recovery"
        titleCls="g"
        abbr="FHR"
        frames={FHR_FRAMES}
        rows={FHR_ROWS}
      />

      <BreakpointTable
        title="Faster Block Rate"
        titleCls="r"
        abbr="FBR"
        frames={FBR_FRAMES}
        rows={FBR_ROWS}
        note="Block% = (Shield% × (Dex − 15)) / (clvl × 2)"
      />
    </div>
  );
}
