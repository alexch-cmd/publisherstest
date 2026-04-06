"use client";

import { useMemo, useState } from "react";
import { sankey, sankeyLinkHorizontal } from "d3-sankey";
import type { SankeyNode, SankeyLink } from "d3-sankey";

interface RawNode { name: string; color: string }
interface RawLink { source: number; target: number; value: number }

type LayoutNode = SankeyNode<RawNode, RawLink>;
type LayoutLink = SankeyLink<RawNode, RawLink>;

interface SankeyChartProps {
  nodes: RawNode[];
  links: RawLink[];
  width: number;
  height: number;
}

export default function SankeyChart({ nodes: rawNodes, links: rawLinks, width, height }: SankeyChartProps) {
  const [hoveredLinkIdx, setHoveredLinkIdx] = useState<number | null>(null);

  const { nodes, links } = useMemo(() => {
    if (width <= 50) return { nodes: [] as LayoutNode[], links: [] as LayoutLink[] };
    const layout = sankey<RawNode, RawLink>()
      .nodeWidth(14)
      .nodePadding(18)
      .extent([[88, 8], [width - 88, height - 8]]);

    try {
      return layout({
        nodes: rawNodes.map((d) => ({ ...d })),
        links: rawLinks.map((d) => ({ ...d })),
      });
    } catch {
      return { nodes: [] as LayoutNode[], links: [] as LayoutLink[] };
    }
  }, [rawNodes, rawLinks, width, height]);

  const linkPath = sankeyLinkHorizontal<RawNode, RawLink>();

  return (
    <svg width={width} height={height} style={{ overflow: "visible" }}>
      <defs>
        {links.map((link, i) => {
          const src = link.source as LayoutNode;
          const tgt = link.target as LayoutNode;
          const gradId = `sg-${i}`;
          return (
            <linearGradient key={gradId} id={gradId} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={src.color} stopOpacity={0.5} />
              <stop offset="100%" stopColor={tgt.color} stopOpacity={0.3} />
            </linearGradient>
          );
        })}
      </defs>

      {/* Links */}
      {links.map((link, i) => {
        const path = linkPath(link as Parameters<typeof linkPath>[0]);
        if (!path) return null;
        const w = Math.max(1.5, link.width ?? 1);
        const isHovered = hoveredLinkIdx === i;
        const isDimmed = hoveredLinkIdx !== null && !isHovered;
        return (
          <g key={i} style={{ cursor: "pointer" }}
            onMouseEnter={() => setHoveredLinkIdx(i)}
            onMouseLeave={() => setHoveredLinkIdx(null)}
          >
            {/* Hit area (invisible wider path) */}
            <path d={path} fill="none" stroke="transparent" strokeWidth={Math.max(w + 8, 16)} />
            <path
              d={path}
              fill="none"
              stroke={`url(#sg-${i})`}
              strokeWidth={isHovered ? w + 2 : w}
              strokeOpacity={isDimmed ? 0.1 : isHovered ? 0.9 : 0.6}
              style={{ transition: "stroke-opacity 0.2s, stroke-width 0.2s" }}
            />
          </g>
        );
      })}

      {/* Nodes */}
      {nodes.map((node, i) => {
        const x0 = node.x0 ?? 0;
        const x1 = node.x1 ?? 0;
        const y0 = node.y0 ?? 0;
        const y1 = node.y1 ?? 0;
        const nodeH = Math.max(2, y1 - y0);
        const isLeft = x0 < width / 2;
        const textX = isLeft ? x1 + 8 : x0 - 8;
        const anchor = isLeft ? "start" : "end";

        return (
          <g key={i}>
            <rect
              x={x0} y={y0} width={x1 - x0} height={nodeH}
              rx={3} fill={node.color} fillOpacity={0.92}
            />
            {/* Glow */}
            <rect
              x={x0 - 1} y={y0 - 1} width={x1 - x0 + 2} height={nodeH + 2}
              rx={4} fill="none"
              stroke={node.color} strokeWidth={1} strokeOpacity={0.4}
              style={{ filter: `drop-shadow(0 0 6px ${node.color}60)` }}
            />
            <text
              x={textX} y={y0 + nodeH / 2}
              textAnchor={anchor}
              dominantBaseline="middle"
              fill="#F3F3F3"
              fontSize={10.5}
              fontFamily="var(--font-geist-mono, monospace)"
              letterSpacing="-0.01em"
            >
              {node.name}
            </text>
            {/* Value label */}
            <text
              x={textX} y={y0 + nodeH / 2 + 13}
              textAnchor={anchor}
              dominantBaseline="middle"
              fill="#B6B6B6"
              fontSize={9}
              fontFamily="var(--font-geist-mono, monospace)"
            >
              {((node.value ?? 0) / 1000).toFixed(1)}K
            </text>
          </g>
        );
      })}
    </svg>
  );
}
