"use client";

import { useEffect, useRef, useState } from "react";
import {
  MessageSquare, Star, Zap, Flame, AlertTriangle, Activity,
} from "lucide-react";
import {
  INITIAL_TICKER_EVENTS,
  GAMES,
  type TickerEvent,
  type TickerEventType,
} from "@/lib/mockPublisherData";
import { clsx } from "clsx";
import BentoCard from "./BentoCard";

const EVENT_ICONS: Record<TickerEventType, React.ReactNode> = {
  mention: <MessageSquare className="w-3.5 h-3.5" />,
  review: <Star className="w-3.5 h-3.5" />,
  ccu_spike: <Zap className="w-3.5 h-3.5" />,
  viral: <Flame className="w-3.5 h-3.5" />,
  review_bomb: <AlertTriangle className="w-3.5 h-3.5" />,
};

const EVENT_COLORS: Record<string, string> = {
  positive: "#ABF790",
  negative: "#FF637F",
  neutral: "#B6B6B6",
};

const VIRAL_COLORS = "#FAFD7E";

const GAME_COLORS: Record<string, string> = Object.fromEntries(
  GAMES.map((g) => [g.id, g.accentColor])
);

// Synthetic new events for the live stream simulation
const SYNTHETIC_EVENTS: TickerEvent[] = [
  {
    id: "s1",
    type: "ccu_spike",
    game: "Cozy Harbor",
    gameId: "cozy-harbor",
    message: "Weekend peak CCU: 38,400 — all-time high",
    timestamp: "now",
    sentiment: "positive",
    source: "Steam API",
    value: "38.4K",
  },
  {
    id: "s2",
    type: "mention",
    game: "Neon Abyss",
    gameId: "neon-abyss",
    message: "Patch 2.4.1 trending on Twitter — 12K mentions in 1h",
    timestamp: "now",
    sentiment: "positive",
    source: "Twitter / X",
    value: "12K mentions",
  },
  {
    id: "s3",
    type: "review",
    game: "SF Drifters",
    gameId: "starfield-drifters",
    message: '"Best space sim since Mass Effect. Ship combat is incredible."',
    timestamp: "now",
    sentiment: "positive",
    source: "Steam",
    value: "★★★★★",
  },
  {
    id: "s4",
    type: "viral",
    game: "Cozy Harbor",
    gameId: "cozy-harbor",
    message: "#cozyharbor YouTube shorts viral — 14.8M views in 12h",
    timestamp: "now",
    sentiment: "positive",
    source: "YouTube",
    value: "14.8M views",
    isViral: true,
  },
];

interface LiveTickerProps {
  presentationMode: boolean;
}

export default function LiveTicker({ presentationMode }: LiveTickerProps) {
  const [events, setEvents] = useState<(TickerEvent & { isNew?: boolean })[]>(
    INITIAL_TICKER_EVENTS
  );
  const [syntheticIdx, setSyntheticIdx] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);

  // Simulate new events arriving every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const next = SYNTHETIC_EVENTS[syntheticIdx % SYNTHETIC_EVENTS.length];
      const newEvent = {
        ...next,
        id: `live-${Date.now()}`,
        timestamp: "just now",
        isNew: true,
      };
      setEvents((prev) => [newEvent, ...prev.slice(0, 19)]);
      setSyntheticIdx((i) => i + 1);

      // Remove "isNew" after 3 seconds
      setTimeout(() => {
        setEvents((prev) =>
          prev.map((e) => (e.id === newEvent.id ? { ...e, isNew: false } : e))
        );
      }, 3000);
    }, 6000);
    return () => clearInterval(interval);
  }, [syntheticIdx]);

  const getSourceLabel = (source: string) => {
    const map: Record<string, string> = {
      Steam: "STM",
      "Steam API": "STM API",
      "Twitter / X": "X",
      TikTok: "TT",
      Reddit: "RDT",
      YouTube: "YT",
      Twitch: "TWC",
      IGN: "IGN",
    };
    return map[source] ?? source.slice(0, 3).toUpperCase();
  };

  return (
    <BentoCard
      title="Hype & Pulse"
      subtitle="Live social + platform feed"
      icon={<Activity />}
      accentColor="#ABF790"
      presentationMode={presentationMode}
      className="h-full"
      headerRight={
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-status-success pulse-dot" />
          <span className="text-[10px] text-status-success font-semibold uppercase tracking-wider">
            Live
          </span>
        </div>
      }
      noPadding
    >
      <div
        ref={listRef}
        className="overflow-y-auto h-full px-4 pb-4 pt-3 space-y-2 max-h-[540px]"
        style={{ scrollbarWidth: "thin" }}
      >
        {events.map((event) => {
          const color = event.isViral
            ? VIRAL_COLORS
            : EVENT_COLORS[event.sentiment];
          const gameColor = GAME_COLORS[event.gameId] ?? "#B6B6B6";

          return (
            <div
              key={event.id}
              className={clsx(
                "ticker-item relative rounded-xl border p-3 transition-all",
                event.isViral
                  ? "border-[#FAFD7E]/30 bg-[#FAFD7E]/05"
                  : event.sentiment === "negative"
                  ? "border-[#FF637F]/20 bg-[#FF637F]/04"
                  : "border-white/06 bg-white/02"
              )}
            >
              {/* Viral breakout banner */}
              {event.isViral && (
                <div className="absolute -top-px left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FAFD7E]/60 to-transparent" />
              )}

              <div className="flex items-start gap-2.5">
                {/* Icon */}
                <div
                  className="flex-shrink-0 mt-0.5 flex items-center justify-center w-6 h-6 rounded-lg border"
                  style={{
                    background: `${color}15`,
                    borderColor: `${color}30`,
                    color,
                  }}
                >
                  {EVENT_ICONS[event.type]}
                </div>

                <div className="flex-1 min-w-0">
                  {/* Top row */}
                  <div className="flex items-center gap-1.5 mb-0.5 flex-wrap">
                    {/* New badge */}
                    {event.isNew && (
                      <span className="new-badge flex-shrink-0 text-[8px] font-bold uppercase tracking-widest bg-[#ABF790] text-[#0D0D0D] px-1.5 py-0.5 rounded-full">
                        NEW
                      </span>
                    )}
                    {/* Viral badge */}
                    {event.isViral && (
                      <span className="flex-shrink-0 text-[8px] font-bold uppercase tracking-widest bg-[#FAFD7E]/20 text-[#FAFD7E] border border-[#FAFD7E]/40 px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
                        <Flame className="w-2.5 h-2.5" /> VIRAL
                      </span>
                    )}
                    {/* Game name */}
                    <span
                      className="text-[10px] font-semibold truncate"
                      style={{ color: gameColor }}
                    >
                      {event.game}
                    </span>
                    {/* Source badge */}
                    <span className="text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-white/05 text-brand-4 ml-auto flex-shrink-0">
                      {getSourceLabel(event.source)}
                    </span>
                  </div>

                  {/* Message */}
                  <p className="text-[11px] text-brand-3 leading-snug line-clamp-2">
                    {event.message}
                  </p>

                  {/* Bottom row */}
                  <div className="flex items-center justify-between mt-1.5">
                    <span className="text-[9px] text-brand-4">{event.timestamp}</span>
                    {event.value && (
                      <span
                        className="mono-num text-[10px] font-bold"
                        style={{ color }}
                      >
                        {event.value}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </BentoCard>
  );
}
