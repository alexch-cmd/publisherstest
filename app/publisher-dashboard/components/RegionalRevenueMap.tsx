"use client";

import { Globe, Info, TrendingUp } from "lucide-react";
import { REGIONAL_REVENUE } from "@/lib/mockPublisherData";
import BentoCard from "./BentoCard";
import WorldMap from "./WorldMap";

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
      id="section-revenue"
      headerRight={
        <div className="flex items-center gap-1.5 text-[10px] text-brand-4">
          <Info className="w-3 h-3" />
          <span>PPP-adjusted · hover for details</span>
        </div>
      }
    >
      {/* Summary strip */}
      <div className="grid grid-cols-4 gap-3 mb-4">
        {[
          { label: "Raw Revenue",    value: `$${(totalRaw / 1_000_000).toFixed(2)}M`,  color: "#36E0F8" },
          { label: "PPP-Adjusted",   value: `$${(totalPpp / 1_000_000).toFixed(2)}M`,  color: "#F191FA" },
          { label: "Fastest Growth", value: topGrowth.region, color: "#ABF790", sub: `+${topGrowth.growth}%` },
          { label: "Opportunity Gap", value: "$3.58M", color: "#FAFD7E", sub: "PPP vs Raw delta" },
        ].map((s) => (
          <div key={s.label} className="rounded-xl bg-white/02 border border-white/06 px-3 py-2.5">
            <p className="text-[9px] text-brand-4 uppercase tracking-wider mb-1">{s.label}</p>
            <p className="mono-num text-[15px] font-bold truncate" style={{ color: s.color }}>
              {s.value}
            </p>
            {s.sub && <p className="mono-num text-[10px] text-status-success">{s.sub}</p>}
          </div>
        ))}
      </div>

      {/* SVG World Map */}
      <div className="rounded-xl overflow-hidden border border-white/06 bg-[#080e1a]">
        <WorldMap />
      </div>

      {/* Turbo colour scale legend */}
      <div className="flex items-center gap-3 mt-3 pt-3 border-t border-white/05 flex-wrap">
        <span className="text-[9px] text-brand-4 uppercase tracking-wider">PPP Intensity:</span>
        <div className="flex items-center gap-0">
          {["#0a1628","#0f4d8a","#1aaccc","#36E0F8","#7bf0ff"].map((c, i) => (
            <div key={i} className="w-8 h-2.5 first:rounded-l-full last:rounded-r-full" style={{ background: c }} />
          ))}
        </div>
        <span className="text-[9px] text-brand-4">Low → High</span>
        <div className="ml-auto flex items-center gap-1.5 text-[9px] text-brand-4 italic">
          <TrendingUp className="w-3 h-3 text-[#ABF790]" />
          SA, SEA, LATAM — high-opportunity underpenetrated markets
        </div>
      </div>
    </BentoCard>
  );
}
