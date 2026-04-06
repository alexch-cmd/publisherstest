"use client";

import { Globe, TrendingUp, TrendingDown, Info } from "lucide-react";
import { REGIONAL_REVENUE, type RegionRevenue } from "@/lib/mockPublisherData";
import BentoCard from "./BentoCard";
import { clsx } from "clsx";

// Simplified world layout grid - each cell is a region
// Using a custom grid that resembles a world map
const WORLD_GRID: Array<{
  code: string;
  label: string;
  col: number;
  row: number;
  cols: number;
  rows: number;
}> = [
  { code: "NA",  label: "North America",    col: 1, row: 1, cols: 3, rows: 2 },
  { code: "WEU", label: "W. Europe",        col: 4, row: 1, cols: 2, rows: 2 },
  { code: "EEU", label: "E. Europe",        col: 6, row: 1, cols: 2, rows: 2 },
  { code: "CAS", label: "Central Asia",     col: 8, row: 1, cols: 2, rows: 2 },
  { code: "EA",  label: "East Asia",        col: 10, row: 1, cols: 3, rows: 2 },
  { code: "LATAM", label: "Latin America",  col: 2, row: 3, cols: 2, rows: 2 },
  { code: "MEA", label: "Mid. East/Africa", col: 4, row: 3, cols: 3, rows: 2 },
  { code: "SA",  label: "South Asia",       col: 7, row: 3, cols: 2, rows: 2 },
  { code: "SEA", label: "SE Asia",          col: 9, row: 3, cols: 2, rows: 2 },
  { code: "OCE", label: "Oceania",          col: 11, row: 3, cols: 2, rows: 2 },
];

const revenueMap = Object.fromEntries(
  REGIONAL_REVENUE.map((r) => [r.code, r])
);

interface HeatColors { bg: string; border: string; text: string; }

function getHeatColor(pppRev: number, maxPpp: number): HeatColors {
  const pct = pppRev / maxPpp;
  if (pct >= 0.85) return { bg: "rgba(241,145,250,0.30)", border: "rgba(241,145,250,0.50)", text: "#F191FA" };
  if (pct >= 0.65) return { bg: "rgba(54,224,248,0.22)", border: "rgba(54,224,248,0.40)", text: "#36E0F8" };
  if (pct >= 0.40) return { bg: "rgba(171,247,144,0.18)", border: "rgba(171,247,144,0.35)", text: "#ABF790" };
  if (pct >= 0.20) return { bg: "rgba(250,253,126,0.14)", border: "rgba(250,253,126,0.30)", text: "#FAFD7E" };
  return { bg: "rgba(97,173,235,0.10)", border: "rgba(97,173,235,0.22)", text: "#61ADEB" };
}

const maxPpp = Math.max(...REGIONAL_REVENUE.map((r) => r.pppAdjusted));

interface RegionalRevenueMapProps {
  presentationMode: boolean;
}

export default function RegionalRevenueMap({ presentationMode }: RegionalRevenueMapProps) {
  const totalRaw = REGIONAL_REVENUE.reduce((s, r) => s + r.revenue, 0);
  const totalPpp = REGIONAL_REVENUE.reduce((s, r) => s + r.pppAdjusted, 0);
  const topGrowth = [...REGIONAL_REVENUE].sort((a, b) => b.growth - a.growth)[0];

  return (
    <BentoCard
      title="Global Revenue Heatmap"
      subtitle="Revenue adjusted for Purchasing Power Parity — identifies localization opportunities"
      icon={<Globe />}
      accentColor="#36E0F8"
      presentationMode={presentationMode}
      headerRight={
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 text-[10px] text-brand-4">
            <Info className="w-3 h-3" />
            <span>PPP-adjusted</span>
          </div>
        </div>
      }
    >
      {/* Summary strip */}
      <div className="grid grid-cols-4 gap-3 mb-5">
        {[
          { label: "Raw Revenue", value: `$${(totalRaw / 1_000_000).toFixed(2)}M`, color: "#36E0F8" },
          { label: "PPP-Adjusted", value: `$${(totalPpp / 1_000_000).toFixed(2)}M`, color: "#F191FA" },
          { label: "Fastest Growth", value: topGrowth.region, color: "#ABF790", sub: `+${topGrowth.growth}%` },
          { label: "Opportunity Gap", value: "$3.58M", color: "#FAFD7E", sub: "PPP vs Raw delta" },
        ].map((s) => (
          <div key={s.label} className="rounded-xl bg-white/02 border border-white/06 px-3 py-2.5">
            <p className="text-[9px] text-brand-4 uppercase tracking-wider mb-1">{s.label}</p>
            <p className="mono-num text-[15px] font-bold truncate" style={{ color: s.color }}>
              {s.value}
            </p>
            {s.sub && (
              <p className="mono-num text-[10px] text-status-success">{s.sub}</p>
            )}
          </div>
        ))}
      </div>

      {/* World heatmap grid */}
      <div
        className="relative w-full rounded-xl overflow-hidden border border-white/05 bg-white/01 p-3"
        style={{ minHeight: 200 }}
      >
        <div
          className="grid gap-1.5"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(12, 1fr)",
            gridTemplateRows: "repeat(4, 60px)",
          }}
        >
          {WORLD_GRID.map(({ code, label, col, row, cols, rows }) => {
            const region = revenueMap[code];
            if (!region) return null;
            const heat = getHeatColor(region.pppAdjusted, maxPpp);
            const isGrowing = region.growth > 0;

            return (
              <div
                key={code}
                className="rounded-xl border flex flex-col justify-between p-2.5 transition-all hover:scale-[1.02] cursor-pointer group"
                style={{
                  gridColumn: `${col} / span ${cols}`,
                  gridRow: `${row} / span ${rows}`,
                  background: heat.bg,
                  borderColor: heat.border,
                }}
                title={`${region.region}: $${(region.pppAdjusted / 1000).toFixed(0)}K PPP-adj`}
              >
                <div className="flex items-start justify-between gap-1">
                  <span
                    className="text-[8px] font-bold uppercase tracking-widest"
                    style={{ color: heat.text }}
                  >
                    {code}
                  </span>
                  <span
                    className={clsx(
                      "flex items-center text-[8px] font-bold",
                      isGrowing ? "text-status-success" : "text-status-error"
                    )}
                  >
                    {isGrowing ? (
                      <TrendingUp className="w-2.5 h-2.5" />
                    ) : (
                      <TrendingDown className="w-2.5 h-2.5" />
                    )}
                    {Math.abs(region.growth)}%
                  </span>
                </div>
                <div>
                  <p
                    className="mono-num text-[11px] font-bold leading-tight"
                    style={{ color: heat.text }}
                  >
                    ${(region.pppAdjusted / 1000).toFixed(0)}K
                  </p>
                  <p className="text-[8px] text-brand-4 leading-tight truncate mt-0.5">
                    {label}
                  </p>
                  <p className="text-[7px] text-brand-4/60 mt-0.5 font-mono">
                    {region.currency}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* PPP legend */}
      <div className="flex items-center gap-3 mt-4 pt-3 border-t border-white/05 flex-wrap">
        <span className="text-[9px] text-brand-4 uppercase tracking-wider">PPP Revenue Intensity:</span>
        {[
          { label: "Tier 1 (85%+)", color: "#F191FA" },
          { label: "Tier 2 (65%+)", color: "#36E0F8" },
          { label: "Tier 3 (40%+)", color: "#ABF790" },
          { label: "Tier 4 (20%+)", color: "#FAFD7E" },
          { label: "Emerging", color: "#61ADEB" },
        ].map((l) => (
          <div key={l.label} className="flex items-center gap-1">
            <div
              className="w-3 h-3 rounded-sm border"
              style={{ background: `${l.color}30`, borderColor: `${l.color}60` }}
            />
            <span className="text-[9px] text-brand-4">{l.label}</span>
          </div>
        ))}
        <div className="ml-auto text-[9px] text-brand-4 italic">
          * PPP-adj reveals true demand — SA, SEA, LATAM are high-opportunity underpenetrated markets
        </div>
      </div>
    </BentoCard>
  );
}
