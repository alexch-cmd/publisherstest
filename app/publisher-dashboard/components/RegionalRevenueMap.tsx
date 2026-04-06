"use client";

import { Globe, Info, TrendingUp, Users } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell,
} from "recharts";
import { REGIONAL_REVENUE } from "@/lib/mockPublisherData";
import BentoCard from "./BentoCard";

interface RegionalRevenueMapProps {
  presentationMode: boolean;
}

// Sort regions by PPP-adjusted revenue descending, exclude zero-revenue rows
const sorted = [...REGIONAL_REVENUE]
  .filter((r) => r.pppAdjusted > 0)
  .sort((a, b) => b.pppAdjusted - a.pppAdjusted);

// Same order for DAU chart
const sortedDau = [...sorted].sort((a, b) => b.dau - a.dau);

function RevenueTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; name: string }>; label?: string }) {
  if (!active || !payload?.length) return null;
  const region = REGIONAL_REVENUE.find((r) => r.code === label);
  const ppp = payload.find((p) => p.name === "pppAdjusted");
  const raw = payload.find((p) => p.name === "revenue");
  if (!region) return null;
  const delta = raw?.value ? Math.round((region.pppAdjusted / region.revenue - 1) * 100) : 0;
  return (
    <div className="rounded-xl border border-white/12 p-3 text-[11px] min-w-[180px]"
      style={{ background: "rgba(13,13,13,0.97)", backdropFilter: "blur(16px)" }}>
      <p className="font-bold text-brand-1 mb-1.5">{region.region}</p>
      <div className="space-y-1">
        <div className="flex justify-between gap-4">
          <span className="text-brand-4">Raw Revenue</span>
          <span className="mono-num font-semibold text-brand-3">${(region.revenue / 1000).toFixed(0)}K</span>
        </div>
        <div className="flex justify-between gap-4">
          <span className="text-brand-4">PPP-Adjusted</span>
          <span className="mono-num font-semibold text-[#36E0F8]">${(region.pppAdjusted / 1000).toFixed(0)}K</span>
        </div>
        {delta > 0 && (
          <div className="flex justify-between gap-4">
            <span className="text-brand-4">PPP Uplift</span>
            <span className="mono-num font-semibold text-[#F191FA]">+{delta}%</span>
          </div>
        )}
        <div className="flex justify-between gap-4">
          <span className="text-brand-4">YoY Growth</span>
          <span className={`mono-num font-semibold ${region.growth > 0 ? "text-status-success" : "text-status-error"}`}>
            {region.growth > 0 ? "+" : ""}{region.growth}%
          </span>
        </div>
        <div className="flex justify-between gap-4">
          <span className="text-brand-4">Currency</span>
          <span className="mono-num text-brand-4">{region.currency}</span>
        </div>
      </div>
    </div>
  );
}

function DauTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number }>; label?: string }) {
  if (!active || !payload?.length) return null;
  const region = REGIONAL_REVENUE.find((r) => r.code === label);
  if (!region) return null;
  return (
    <div className="rounded-xl border border-white/12 p-3 text-[11px] min-w-[160px]"
      style={{ background: "rgba(13,13,13,0.97)", backdropFilter: "blur(16px)" }}>
      <p className="font-bold text-brand-1 mb-1.5">{region.region}</p>
      <div className="flex justify-between gap-4">
        <span className="text-brand-4">Daily Active Users</span>
        <span className="mono-num font-semibold text-[#F191FA]">{(region.dau / 1000).toFixed(1)}K</span>
      </div>
      <div className="flex justify-between gap-4 mt-1">
        <span className="text-brand-4">YoY Growth</span>
        <span className={`mono-num font-semibold ${region.growth > 0 ? "text-status-success" : "text-status-error"}`}>
          {region.growth > 0 ? "+" : ""}{region.growth}%
        </span>
      </div>
    </div>
  );
}

// Turbo colour scale for revenue bars
function getRevenueColor(growth: number): string {
  if (growth >= 40) return "#7bf0ff";
  if (growth >= 25) return "#36E0F8";
  if (growth >= 15) return "#1aaccc";
  if (growth >= 5)  return "#0f7cb5";
  if (growth > 0)   return "#0f4d8a";
  return "#FF637F";
}

export default function RegionalRevenueMap({ presentationMode }: RegionalRevenueMapProps) {
  const totalRaw = REGIONAL_REVENUE.reduce((s, r) => s + r.revenue, 0);
  const totalPpp = REGIONAL_REVENUE.reduce((s, r) => s + r.pppAdjusted, 0);
  const totalDau = REGIONAL_REVENUE.reduce((s, r) => s + r.dau, 0);
  const topGrowth = [...REGIONAL_REVENUE].sort((a, b) => b.growth - a.growth)[0];
  const opportunityGap = totalPpp - totalRaw;

  return (
    <BentoCard
      title="Regional Overview"
      subtitle="Revenue and player distribution across markets · PPP-adjusted for localization opportunity"
      icon={<Globe />}
      accentColor="#36E0F8"
      presentationMode={presentationMode}
      id="section-revenue"
      headerRight={
        <div className="flex items-center gap-1.5 text-[10px] text-brand-4">
          <Info className="w-3 h-3" />
          <span>hover bars for detail</span>
        </div>
      }
    >
      {/* Summary strip */}
      <div className="grid grid-cols-4 gap-3 mb-5">
        {[
          { label: "Raw Revenue",     value: `$${(totalRaw / 1_000_000).toFixed(2)}M`,         color: "#36E0F8" },
          { label: "PPP-Adjusted",    value: `$${(totalPpp / 1_000_000).toFixed(2)}M`,         color: "#F191FA" },
          { label: "Fastest Growth",  value: topGrowth.region,                                  color: "#ABF790", sub: `+${topGrowth.growth}%` },
          { label: "Opportunity Gap", value: `$${(opportunityGap / 1_000_000).toFixed(2)}M`,   color: "#FAFD7E", sub: "PPP vs Raw delta" },
        ].map((s) => (
          <div key={s.label} className="rounded-xl bg-white/02 border border-white/06 px-3 py-2.5">
            <p className="text-[9px] text-brand-4 uppercase tracking-wider mb-1">{s.label}</p>
            <p className="mono-num text-[15px] font-bold truncate" style={{ color: s.color }}>{s.value}</p>
            {s.sub && <p className="mono-num text-[10px] text-status-success">{s.sub}</p>}
          </div>
        ))}
      </div>

      {/* Two charts side by side */}
      <div className="grid grid-cols-2 gap-5">
        {/* Revenue by Region */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Globe className="w-3.5 h-3.5 text-[#36E0F8]" />
            <span className="text-[10px] font-bold text-brand-1 uppercase tracking-wider">Revenue by Region</span>
            <span className="text-[9px] text-brand-4">PPP-adjusted · colour = growth</span>
          </div>
          <div style={{ height: 280 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={sorted}
                layout="vertical"
                margin={{ top: 0, right: 16, left: 0, bottom: 0 }}
                barSize={10}
              >
                <XAxis
                  type="number"
                  tickFormatter={(v) => `$${(v / 1000).toFixed(0)}K`}
                  tick={{ fill: "#B6B6B6", fontSize: 8 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  type="category"
                  dataKey="code"
                  tick={{ fill: "#B6B6B6", fontSize: 9, fontFamily: "monospace" }}
                  axisLine={false}
                  tickLine={false}
                  width={38}
                />
                <Tooltip content={<RevenueTooltip />} cursor={{ fill: "rgba(255,255,255,0.03)" }} />
                {/* Raw revenue — ghost bar */}
                <Bar dataKey="revenue" name="revenue" fill="rgba(54,224,248,0.15)" radius={[0, 2, 2, 0]} />
                {/* PPP adjusted — solid bar */}
                <Bar dataKey="pppAdjusted" name="pppAdjusted" radius={[0, 4, 4, 0]}>
                  {sorted.map((entry) => (
                    <Cell key={entry.code} fill={getRevenueColor(entry.growth)} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          {/* Growth colour legend */}
          <div className="flex items-center gap-2 mt-2 flex-wrap">
            <span className="text-[8px] text-brand-4">Growth:</span>
            {[
              { label: "40%+", color: "#7bf0ff" },
              { label: "25%+", color: "#36E0F8" },
              { label: "15%+", color: "#1aaccc" },
              { label: "5%+",  color: "#0f7cb5" },
              { label: "Low",  color: "#0f4d8a" },
              { label: "Neg.", color: "#FF637F" },
            ].map((l) => (
              <div key={l.label} className="flex items-center gap-1">
                <div className="w-2.5 h-2.5 rounded-sm" style={{ background: l.color }} />
                <span className="text-[8px] text-brand-4">{l.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* DAU by Region */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Users className="w-3.5 h-3.5 text-[#F191FA]" />
            <span className="text-[10px] font-bold text-brand-1 uppercase tracking-wider">Players by Region</span>
            <span className="text-[9px] text-brand-4">Daily Active Users · {(totalDau / 1000).toFixed(0)}K total</span>
          </div>
          <div style={{ height: 280 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={sortedDau}
                layout="vertical"
                margin={{ top: 0, right: 16, left: 0, bottom: 0 }}
                barSize={10}
              >
                <XAxis
                  type="number"
                  tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`}
                  tick={{ fill: "#B6B6B6", fontSize: 8 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  type="category"
                  dataKey="code"
                  tick={{ fill: "#B6B6B6", fontSize: 9, fontFamily: "monospace" }}
                  axisLine={false}
                  tickLine={false}
                  width={38}
                />
                <Tooltip content={<DauTooltip />} cursor={{ fill: "rgba(255,255,255,0.03)" }} />
                <Bar dataKey="dau" radius={[0, 4, 4, 0]}>
                  {sortedDau.map((entry, i) => {
                    // colour gradient: highest DAU = #F191FA, lowest = dimmer
                    const pct = i / Math.max(sortedDau.length - 1, 1);
                    const opacity = 1 - pct * 0.55;
                    return <Cell key={entry.code} fill={`rgba(241,145,250,${opacity})`} />;
                  })}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-[8px] text-brand-4 italic">
              SA, SEA, LATAM — high PPP uplift signals undermonetised player bases
            </span>
            <TrendingUp className="w-3 h-3 text-[#ABF790] ml-auto flex-shrink-0" />
          </div>
        </div>
      </div>
    </BentoCard>
  );
}
