"use client";

import { useState, useCallback, useMemo } from "react";
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps";
import { REGIONAL_REVENUE } from "@/lib/mockPublisherData";

// Country ISO numeric → region code mapping
const COUNTRY_REGION: Record<string, string> = {
  // North America
  "840": "NA", "124": "NA",
  // Western Europe
  "276": "WEU", "826": "WEU", "250": "WEU", "380": "WEU", "724": "WEU",
  "528": "WEU", "752": "WEU", "756": "WEU", "40": "WEU", "56": "WEU",
  "208": "WEU", "246": "WEU", "620": "WEU", "372": "WEU", "578": "WEU",
  "442": "WEU", "470": "WEU", "300": "WEU", "191": "WEU",
  // Eastern Europe
  "616": "EEU", "203": "EEU", "348": "EEU", "642": "EEU", "100": "EEU",
  "703": "EEU", "705": "EEU", "804": "EEU", "112": "EEU", "498": "EEU",
  // Russia
  "643": "RU",
  // East Asia
  "156": "EA", "392": "EA", "410": "EA", "158": "EA",
  // Southeast Asia
  "702": "SEA", "764": "SEA", "360": "SEA", "458": "SEA", "608": "SEA",
  "704": "SEA", "104": "SEA", "116": "SEA",
  // South Asia
  "356": "SA", "586": "SA", "50": "SA", "144": "SA", "524": "SA",
  // Latin America
  "76": "LATAM", "484": "LATAM", "32": "LATAM", "152": "LATAM",
  "170": "LATAM", "604": "LATAM", "862": "LATAM", "218": "LATAM",
  "858": "LATAM", "600": "LATAM", "68": "LATAM", "320": "LATAM",
  "340": "LATAM", "214": "LATAM", "332": "LATAM", "388": "LATAM",
  // Middle East
  "682": "MEA", "784": "MEA", "818": "MEA", "368": "MEA", "400": "MEA",
  "414": "MEA", "512": "MEA", "760": "MEA", "422": "MEA", "275": "MEA",
  "376": "MEA", "364": "MEA",
  // Africa
  "710": "MEA", "404": "MEA", "566": "MEA", "12": "MEA", "504": "MEA",
  "231": "MEA", "716": "MEA", "180": "MEA",
  "72": "MEA", "686": "MEA", "204": "MEA",
  // Oceania
  "36": "OCE", "554": "OCE", "598": "OCE",
  // Central Asia
  "398": "CAS", "860": "CAS", "762": "CAS", "795": "CAS", "417": "CAS",
};

// Turbo-inspired color scale: Deep navy → teal → neon cyan (PPP intensity)
function getTurboColor(normalised: number): string {
  // 0 = no data (dark), 1 = max PPP revenue (bright cyan)
  if (normalised <= 0) return "rgba(255,255,255,0.04)";
  const stops: [number, string][] = [
    [0.0, "#0a1628"],
    [0.15, "#0d2d5e"],
    [0.30, "#0f4d8a"],
    [0.45, "#0f7cb5"],
    [0.60, "#1aaccc"],
    [0.75, "#29d4e8"],
    [0.90, "#36E0F8"],
    [1.0, "#7bf0ff"],
  ];
  for (let i = 0; i < stops.length - 1; i++) {
    const [t0, c0] = stops[i];
    const [t1, c1] = stops[i + 1];
    if (normalised >= t0 && normalised <= t1) {
      const t = (normalised - t0) / (t1 - t0);
      return lerpColor(c0, c1, t);
    }
  }
  return "#7bf0ff";
}

function hexToRgb(hex: string): [number, number, number] {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return [r, g, b];
}

function lerpColor(a: string, b: string, t: number): string {
  const [r0, g0, b0] = hexToRgb(a);
  const [r1, g1, b1] = hexToRgb(b);
  const r = Math.round(r0 + (r1 - r0) * t);
  const g = Math.round(g0 + (g1 - g0) * t);
  const bv = Math.round(b0 + (b1 - b0) * t);
  return `rgb(${r},${g},${bv})`;
}

interface TooltipData {
  x: number; y: number; region: string; code: string;
  revenue: number; pppAdjusted: number; growth: number; currency: string;
}

export default function WorldMap() {
  const [tooltip, setTooltip] = useState<TooltipData | null>(null);

  const revenueByCode = useMemo(() => {
    const map: Record<string, typeof REGIONAL_REVENUE[0]> = {};
    REGIONAL_REVENUE.forEach((r) => { map[r.code] = r; });
    return map;
  }, []);

  const maxPpp = useMemo(() => Math.max(...REGIONAL_REVENUE.map((r) => r.pppAdjusted)), []);

  const getRegionForCountry = useCallback((geoId: string): typeof REGIONAL_REVENUE[0] | null => {
    const code = COUNTRY_REGION[geoId];
    if (!code) return null;
    return revenueByCode[code] ?? null;
  }, [revenueByCode]);

  return (
    <div className="relative w-full" style={{ height: 280 }}>
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{ scale: 130, center: [10, 20] }}
        style={{ width: "100%", height: "100%" }}
      >
        <ZoomableGroup>
          <Geographies geography="https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json">
            {({ geographies }: { geographies: Array<{ rsmKey: string; id: string; [key: string]: unknown }> }) =>
              geographies.map((geo) => {
                const region = getRegionForCountry(geo.id as string);
                const normalised = region ? region.pppAdjusted / maxPpp : 0;
                const fill = region ? getTurboColor(normalised) : "rgba(255,255,255,0.04)";
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={fill}
                    stroke="rgba(255,255,255,0.08)"
                    strokeWidth={0.4}
                    style={{
                      default: { outline: "none" },
                      hover: { outline: "none", fill: region ? getTurboColor(Math.min(1, normalised + 0.2)) : "rgba(255,255,255,0.08)", cursor: region ? "pointer" : "default" },
                      pressed: { outline: "none" },
                    }}
                    onMouseEnter={(e: React.MouseEvent) => {
                      if (!region) return;
                      setTooltip({
                        x: e.clientX, y: e.clientY,
                        region: region.region, code: region.code,
                        revenue: region.revenue, pppAdjusted: region.pppAdjusted,
                        growth: region.growth, currency: region.currency,
                      });
                    }}
                    onMouseLeave={() => setTooltip(null)}
                  />
                );
              })
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>

      {/* Tooltip */}
      {tooltip && (
        <div
          className="fixed z-50 pointer-events-none rounded-xl border border-white/12 p-3 text-[11px] min-w-[200px]"
          style={{
            left: tooltip.x + 12, top: tooltip.y - 80,
            background: "rgba(13,13,13,0.96)", backdropFilter: "blur(16px)",
          }}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="font-bold text-brand-1">{tooltip.region}</span>
            <span
              className={`mono-num text-[10px] font-bold ${tooltip.growth > 0 ? "text-status-success" : "text-status-error"}`}
            >
              {tooltip.growth > 0 ? "+" : ""}{tooltip.growth}% YoY
            </span>
          </div>
          <div className="space-y-1">
            <div className="flex justify-between gap-4">
              <span className="text-brand-4">Raw Revenue</span>
              <span className="mono-num font-semibold text-brand-1">${(tooltip.revenue / 1000).toFixed(0)}K</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-brand-4">PPP-Adjusted</span>
              <span className="mono-num font-semibold text-[#36E0F8]">${(tooltip.pppAdjusted / 1000).toFixed(0)}K</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-brand-4">PPP Delta</span>
              <span className="mono-num font-semibold text-[#F191FA]">
                +{Math.round((tooltip.pppAdjusted / tooltip.revenue - 1) * 100)}%
              </span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-brand-4">Currency</span>
              <span className="mono-num text-brand-3">{tooltip.currency}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
