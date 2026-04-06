"use client";

import { Sankey, Tooltip, ResponsiveContainer } from "recharts";
import { Users, Flame } from "lucide-react";
import BentoCard from "./BentoCard";
import { SANKEY_DATA, WHALE_HEATMAP, GAMES } from "@/lib/mockPublisherData";

// Custom Sankey node renderer
const SankeyNode = ({
  x, y, width, height, index, payload,
}: {
  x: number; y: number; width: number; height: number; index: number; payload: { name: string };
}) => {
  const colors = ["#F191FA", "#ABF790", "#61ADEB", "#FAFD7E", "#FF637F"];
  const color = colors[index % colors.length];
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx={3}
        fill={color}
        fillOpacity={0.9}
      />
      <text
        x={x < 200 ? x + width + 8 : x - 8}
        y={y + height / 2}
        textAnchor={x < 200 ? "start" : "end"}
        dominantBaseline="middle"
        fill="#F3F3F3"
        fontSize={11}
        fontFamily="var(--font-geist-mono)"
      >
        {payload.name}
      </text>
    </g>
  );
};

// Custom Sankey link renderer
const SankeyLink = ({
  sourceX, sourceY, sourceControlX, targetX, targetY, targetControlX,
  linkWidth, index,
}: {
  sourceX: number; sourceY: number; sourceControlX: number;
  targetX: number; targetY: number; targetControlX: number;
  linkWidth: number; index: number;
}) => {
  const colors = ["#F191FA40", "#ABF79040", "#61ADEB40", "#FAFD7E40", "#FF637F40"];
  return (
    <path
      d={`
        M${sourceX},${sourceY}
        C${sourceControlX},${sourceY} ${targetControlX},${targetY} ${targetX},${targetY}
      `}
      strokeWidth={linkWidth}
      stroke={colors[index % colors.length]}
      fill="none"
      strokeOpacity={0.6}
    />
  );
};

function WhaleHeatmapGrid({ presentationMode }: { presentationMode: boolean }) {
  const gameOrder = GAMES.map((g) => g.id);
  const gameShortNames: Record<string, string> = Object.fromEntries(
    GAMES.map((g) => [g.id, g.shortName])
  );
  const gameColors: Record<string, string> = Object.fromEntries(
    GAMES.map((g) => [g.id, g.accentColor])
  );

  const getIntensity = (score: number) => {
    if (score >= 80) return { bg: "rgba(171,247,144,0.3)", border: "rgba(171,247,144,0.5)", text: "#ABF790" };
    if (score >= 60) return { bg: "rgba(54,224,248,0.2)", border: "rgba(54,224,248,0.35)", text: "#36E0F8" };
    if (score >= 40) return { bg: "rgba(241,145,250,0.15)", border: "rgba(241,145,250,0.25)", text: "#F191FA" };
    if (score >= 20) return { bg: "rgba(250,253,126,0.1)", border: "rgba(250,253,126,0.2)", text: "#FAFD7E" };
    return { bg: "rgba(255,99,127,0.08)", border: "rgba(255,99,127,0.15)", text: "#FF637F" };
  };

  return (
    <BentoCard
      title="High-Value Player Distribution"
      subtitle="Top 5% spenders activity by cohort"
      icon={<Flame />}
      accentColor="#F191FA"
      presentationMode={presentationMode}
      className="h-full"
    >
      {/* Column headers */}
      <div className="grid gap-1 mb-2" style={{ gridTemplateColumns: `160px repeat(5, 1fr)` }}>
        <div />
        {gameOrder.map((id) => (
          <div
            key={id}
            className="text-center text-[9px] font-semibold uppercase tracking-wider truncate px-1"
            style={{ color: gameColors[id] }}
          >
            {gameShortNames[id]}
          </div>
        ))}
      </div>

      {/* Rows */}
      <div className="space-y-1.5">
        {WHALE_HEATMAP.map((row) => (
          <div
            key={row.cohort}
            className="grid items-center gap-1"
            style={{ gridTemplateColumns: `160px repeat(5, 1fr)` }}
          >
            <span className="text-[10px] text-brand-4 leading-tight pr-2">{row.cohort}</span>
            {gameOrder.map((gameId) => {
              const score = row.games[gameId as keyof typeof row.games] ?? 0;
              const style = getIntensity(score);
              return (
                <div
                  key={gameId}
                  className="rounded-md flex items-center justify-center py-2 border"
                  style={{ background: style.bg, borderColor: style.border }}
                >
                  <span
                    className="mono-num text-[11px] font-bold"
                    style={{ color: style.text }}
                  >
                    {score}
                  </span>
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-3 mt-4 pt-3 border-t border-white/05">
        <span className="text-[9px] text-brand-4 uppercase tracking-wider">Activity Score</span>
        {[
          { label: "80+", color: "#ABF790" },
          { label: "60+", color: "#36E0F8" },
          { label: "40+", color: "#F191FA" },
          { label: "20+", color: "#FAFD7E" },
          { label: "<20", color: "#FF637F" },
        ].map((l) => (
          <div key={l.label} className="flex items-center gap-1">
            <div className="w-2.5 h-2.5 rounded-sm" style={{ background: l.color + "60", border: `1px solid ${l.color}80` }} />
            <span className="text-[9px] text-brand-4">{l.label}</span>
          </div>
        ))}
      </div>
    </BentoCard>
  );
}

interface PortfolioMapProps {
  presentationMode: boolean;
}

export default function PortfolioMap({ presentationMode }: PortfolioMapProps) {
  return (
    <div className="grid grid-cols-12 gap-4 h-[420px]">
      {/* Sankey — 7 cols */}
      <div className="col-span-7">
        <BentoCard
          title="Cross-Title Audience Flow"
          subtitle="Player migration between portfolio titles (monthly)"
          icon={<Users />}
          accentColor="#36E0F8"
          presentationMode={presentationMode}
          className="h-full"
        >
          <ResponsiveContainer width="100%" height={300}>
            <Sankey
              data={SANKEY_DATA}
              nodePadding={12}
              nodeWidth={12}
              iterations={64}
              node={SankeyNode as never}
              link={SankeyLink as never}
              margin={{ top: 8, right: 80, bottom: 8, left: 80 }}
            >
              <Tooltip
                contentStyle={{
                  background: "rgba(19,19,19,0.96)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 10,
                  fontSize: 12,
                  color: "#F3F3F3",
                }}
                formatter={(value) => [`${Number(value).toLocaleString()} players`, "Flow"]}
              />
            </Sankey>
          </ResponsiveContainer>

          {/* Flow stats */}
          <div className="grid grid-cols-3 gap-3 mt-2">
            {[
              { label: "Cross-Title Players", value: "68.4K", delta: "+12%", color: "#36E0F8" },
              { label: "Avg Titles / Player", value: "2.1", delta: "+0.3", color: "#F191FA" },
              { label: "Portfolio Stickiness", value: "38%", delta: "+4%", color: "#ABF790" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-white/06 bg-white/02 px-3 py-2.5"
              >
                <p className="text-[10px] text-brand-4 uppercase tracking-wider mb-1">{stat.label}</p>
                <div className="flex items-baseline gap-1.5">
                  <span className="mono-num text-[18px] font-bold" style={{ color: stat.color }}>
                    {stat.value}
                  </span>
                  <span className="mono-num text-[10px] text-status-success">{stat.delta}</span>
                </div>
              </div>
            ))}
          </div>
        </BentoCard>
      </div>

      {/* Whale Heatmap — 5 cols */}
      <div className="col-span-5">
        <WhaleHeatmapGrid presentationMode={presentationMode} />
      </div>
    </div>
  );
}
