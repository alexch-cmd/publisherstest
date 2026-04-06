"use client";

import { useRef, useState, useEffect } from "react";
import { Users, Flame } from "lucide-react";
import BentoCard from "./BentoCard";
import SankeyChart from "./SankeyChart";
import { SANKEY_DATA, WHALE_HEATMAP, GAMES } from "@/lib/mockPublisherData";

const GAME_COLORS: Record<string, string> = Object.fromEntries(GAMES.map((g) => [g.id, g.accentColor]));
const GAME_SHORT: Record<string, string> = Object.fromEntries(GAMES.map((g) => [g.id, g.shortName]));

function getIntensityStyle(score: number): { bg: string; border: string; text: string } {
  if (score >= 80) return { bg: "rgba(171,247,144,0.20)", border: "rgba(171,247,144,0.40)", text: "#ABF790" };
  if (score >= 60) return { bg: "rgba(54,224,248,0.15)", border: "rgba(54,224,248,0.30)", text: "#36E0F8" };
  if (score >= 40) return { bg: "rgba(241,145,250,0.12)", border: "rgba(241,145,250,0.22)", text: "#F191FA" };
  if (score >= 20) return { bg: "rgba(250,253,126,0.10)", border: "rgba(250,253,126,0.20)", text: "#FAFD7E" };
  return { bg: "rgba(97,173,235,0.07)", border: "rgba(97,173,235,0.15)", text: "#61ADEB" };
}

interface PortfolioMapProps {
  presentationMode: boolean;
}

export default function PortfolioMap({ presentationMode }: PortfolioMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [chartWidth, setChartWidth] = useState(480);

  useEffect(() => {
    const update = () => {
      if (containerRef.current) setChartWidth(containerRef.current.offsetWidth - 16);
    };
    update();
    const ro = new ResizeObserver(update);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  const gameOrder = GAMES.map((g) => g.id);

  return (
    <div className="grid grid-cols-12 gap-4 h-full">
      {/* Sankey — 7 cols */}
      <div className="col-span-7 min-h-[440px]">
        <BentoCard
          title="Cross-Title Audience Flow"
          subtitle="Player migration between portfolio titles — RPG→TCG funnel active"
          icon={<Users />}
          accentColor="#36E0F8"
          presentationMode={presentationMode}
          className="h-full"
          id="sankey-card"
        >
          <div ref={containerRef} className="w-full">
            <SankeyChart
              nodes={SANKEY_DATA.nodes}
              links={SANKEY_DATA.links}
              width={chartWidth}
              height={280}
            />
          </div>

          {/* Genre flow summary */}
          <div className="grid grid-cols-3 gap-2 mt-3">
            {[
              { label: "RPG → TCG",   value: "44.0K", delta: "+18%", color: "#F191FA", isStrong: true },
              { label: "TCG ↔ TCG",   value: "8.2K",  delta: "+6%",  color: "#C9A2F6", isStrong: false },
              { label: "FPS → Others", value: "1.6K",  delta: "–",    color: "#61ADEB", isStrong: false },
            ].map((s) => (
              <div key={s.label} className="rounded-xl border border-white/06 bg-white/02 px-3 py-2.5">
                <p className="text-[9px] text-brand-4 uppercase tracking-wider mb-1">{s.label}</p>
                <div className="flex items-baseline gap-1.5">
                  <span className="mono-num text-[16px] font-bold" style={{ color: s.color }}>{s.value}</span>
                  <span className={`mono-num text-[10px] font-semibold ${s.isStrong ? "text-status-success" : "text-brand-4"}`}>{s.delta}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Genre isolation note */}
          <div className="mt-3 flex items-center gap-2 text-[10px] text-brand-4 bg-[#61ADEB]/06 border border-[#61ADEB]/15 rounded-lg px-3 py-2">
            <span className="text-[#61ADEB] font-bold">FPS SILO:</span>
            Iron Front players don't migrate to TCG or RPG titles — confirmed isolated genre.
          </div>
        </BentoCard>
      </div>

      {/* Whale Heatmap — 5 cols */}
      <div className="col-span-5 min-h-[440px]">
        <BentoCard
          title="Player Spending Distribution"
          subtitle="Engagement score by spend tier across all titles"
          icon={<Flame />}
          accentColor="#F191FA"
          presentationMode={presentationMode}
          className="h-full"
        >
          {/* Column headers */}
          <div className="grid gap-1 mb-2" style={{ gridTemplateColumns: `148px repeat(5, 1fr)` }}>
            <div />
            {gameOrder.map((id) => (
              <div key={id} className="text-center text-[8px] font-bold uppercase tracking-wider truncate px-1 py-1" style={{ color: GAME_COLORS[id] }}>
                {GAME_SHORT[id]}
              </div>
            ))}
          </div>

          {/* Rows */}
          <div className="space-y-1.5">
            {WHALE_HEATMAP.map((row) => (
              <div key={row.cohort} className="grid items-center gap-1" style={{ gridTemplateColumns: `148px repeat(5, 1fr)` }}>
                <span className="text-[9px] text-brand-4 leading-tight pr-2">{row.cohort}</span>
                {gameOrder.map((gameId) => {
                  const score = (row.games as Record<string, number>)[gameId] ?? 0;
                  const s = getIntensityStyle(score);
                  return (
                    <div key={gameId} className="rounded-md flex items-center justify-center py-2.5 border" style={{ background: s.bg, borderColor: s.border }}>
                      <span className="mono-num text-[11px] font-bold" style={{ color: s.text }}>{score}</span>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="flex items-center gap-2 mt-3 pt-3 border-t border-white/05 flex-wrap">
            <span className="text-[8px] text-brand-4 uppercase tracking-wider">Score:</span>
            {[
              { label: "80+", color: "#ABF790" }, { label: "60+", color: "#36E0F8" },
              { label: "40+", color: "#F191FA" }, { label: "20+", color: "#FAFD7E" }, { label: "<20", color: "#61ADEB" },
            ].map((l) => (
              <div key={l.label} className="flex items-center gap-1">
                <div className="w-2.5 h-2.5 rounded-sm" style={{ background: `${l.color}40`, border: `1px solid ${l.color}70` }} />
                <span className="text-[8px] text-brand-4">{l.label}</span>
              </div>
            ))}
          </div>
        </BentoCard>
      </div>
    </div>
  );
}
