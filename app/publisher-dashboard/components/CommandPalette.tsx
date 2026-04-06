"use client";

import { useEffect, useState, useCallback } from "react";
import { Command } from "cmdk";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, Gamepad2, Monitor, MapPin, BarChart2, GitBranch, X,
  Sparkles, TrendingUp, AlertTriangle, Users, Globe, Zap,
} from "lucide-react";
import { GAMES, type ActionChip } from "@/lib/mockPublisherData";

interface CommandPaletteProps {
  onNavigate: (sectionId: string) => void;
  onTogglePresentation: () => void;
  presentationMode: boolean;
  onHighlightGame: (gameId: string) => void;
  onChipClick?: (chip: ActionChip) => void;
}

// Updated sections (sentiment removed, insights added)
const SECTIONS = [
  { id: "section-insights",    label: "Weekly Pulse Insights",        icon: <Sparkles  className="w-3.5 h-3.5" /> },
  { id: "section-audience",    label: "Cross-Title Audience Flow",    icon: <BarChart2 className="w-3.5 h-3.5" /> },
  { id: "section-games",       label: "Game Performance Grid",        icon: <Gamepad2  className="w-3.5 h-3.5" /> },
  { id: "section-benchmarks",  label: "Industry Benchmarks",          icon: <BarChart2 className="w-3.5 h-3.5" /> },
  { id: "section-automation",  label: "Automation Pipeline",          icon: <GitBranch className="w-3.5 h-3.5" /> },
  { id: "section-revenue",     label: "Regional Overview",            icon: <MapPin    className="w-3.5 h-3.5" /> },
];

// NLQ suggested queries with routing logic
const SUGGESTED_QUERIES = [
  {
    id: "nlq-1",
    query: "Analyze churn risk for Iron Front",
    action: "highlight-game",
    target: "iron-front",
    icon: <AlertTriangle className="w-3.5 h-3.5" />,
    color: "#FF637F",
  },
  {
    id: "nlq-2",
    query: "Which game has the highest refund rate?",
    action: "highlight-game",
    target: "iron-front",
    icon: <TrendingUp className="w-3.5 h-3.5" />,
    color: "#FAFD7E",
  },
  {
    id: "nlq-3",
    query: "Compare RPG revenue vs TCG",
    action: "scroll",
    target: "section-games",
    icon: <BarChart2 className="w-3.5 h-3.5" />,
    color: "#36E0F8",
  },
  {
    id: "nlq-4",
    query: "Which regions are growing fastest?",
    action: "scroll",
    target: "section-revenue",
    icon: <Globe className="w-3.5 h-3.5" />,
    color: "#ABF790",
  },
  {
    id: "nlq-5",
    query: "Show me high spender engagement by title",
    action: "scroll",
    target: "section-audience",
    icon: <Users className="w-3.5 h-3.5" />,
    color: "#F191FA",
  },
  {
    id: "nlq-6",
    query: "Iron Front localization issues",
    action: "highlight-game",
    target: "iron-front",
    icon: <Zap className="w-3.5 h-3.5" />,
    color: "#FF637F",
  },
];

const GROUP_CLS = "[&>[cmdk-group-heading]]:px-4 [&>[cmdk-group-heading]]:py-1.5 [&>[cmdk-group-heading]]:text-[10px] [&>[cmdk-group-heading]]:font-bold [&>[cmdk-group-heading]]:uppercase [&>[cmdk-group-heading]]:tracking-widest [&>[cmdk-group-heading]]:text-brand-4";
const ITEM_CLS = "flex items-center gap-3 px-4 py-2.5 cursor-pointer text-[13px] text-brand-3 hover:text-brand-1 data-[selected=true]:bg-white/05 data-[selected=true]:text-brand-1 rounded-lg mx-2 transition-colors";

export default function CommandPalette({
  onNavigate, onTogglePresentation, presentationMode, onHighlightGame, onChipClick,
}: CommandPaletteProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  // Cmd+K to open
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
    setOpen(false);
    setQuery("");
  }, []);

  const handleGame = useCallback((gameId: string) => {
    onHighlightGame(gameId);
    scrollTo("section-games");
  }, [onHighlightGame, scrollTo]);

  const handleNlq = useCallback((item: typeof SUGGESTED_QUERIES[0]) => {
    if (item.action === "highlight-game") {
      handleGame(item.target);
    } else {
      scrollTo(item.target);
    }
  }, [handleGame, scrollTo]);

  const showSuggestions = query.trim() === "";

  return (
    <>
      {/* Trigger hint */}
      <button
        onClick={() => setOpen(true)}
        className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg glass-card border border-white/08 hover:border-white/20 transition-colors text-brand-4 hover:text-brand-1"
      >
        <Sparkles className="w-3.5 h-3.5 text-[#F191FA]" />
        <span className="text-[11px]">Ask your portfolio…</span>
        <kbd className="ml-1 text-[9px] font-bold px-1.5 py-0.5 rounded bg-white/06 border border-white/10">⌘K</kbd>
      </button>

      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />

            {/* Palette */}
            <motion.div
              className="fixed left-1/2 top-[18%] z-50 w-full max-w-[580px] -translate-x-1/2"
              initial={{ opacity: 0, scale: 0.96, y: -8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -8 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
            >
              <div className="rounded-2xl overflow-hidden border border-white/12 shadow-elevation-2"
                style={{ background: "rgba(19,19,19,0.96)", backdropFilter: "blur(32px)" }}
              >
                <Command className="w-full" shouldFilter={!showSuggestions}>
                  {/* Input */}
                  <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/08">
                    <Sparkles className="w-4 h-4 text-[#F191FA] flex-shrink-0" />
                    <Command.Input
                      placeholder="Ask your portfolio… (or search games, sections)"
                      className="flex-1 bg-transparent text-[13px] text-brand-1 placeholder:text-brand-4 outline-none"
                      autoFocus
                      value={query}
                      onValueChange={setQuery}
                    />
                    <button onClick={() => setOpen(false)}>
                      <X className="w-4 h-4 text-brand-4 hover:text-brand-1 transition-colors" />
                    </button>
                  </div>

                  <Command.List className="max-h-[420px] overflow-y-auto py-2">
                    <Command.Empty className="px-4 py-8 text-center text-[12px] text-brand-4">
                      No results — try a game name or section.
                    </Command.Empty>

                    {/* Portfolio Consultant (suggested queries on empty input) */}
                    {showSuggestions && (
                      <Command.Group
                        heading="Portfolio Consultant"
                        className={GROUP_CLS}
                      >
                        {SUGGESTED_QUERIES.map((item) => (
                          <Command.Item
                            key={item.id}
                            value={item.query}
                            onSelect={() => handleNlq(item)}
                            className={ITEM_CLS}
                          >
                            <span style={{ color: item.color }}>{item.icon}</span>
                            <span className="flex-1 text-[12px]">{item.query}</span>
                            <span className="text-[9px] text-brand-4">→ Go</span>
                          </Command.Item>
                        ))}
                      </Command.Group>
                    )}

                    {/* Games */}
                    <Command.Group heading="Games" className={GROUP_CLS}>
                      {GAMES.map((game) => (
                        <Command.Item
                          key={game.id}
                          value={game.name}
                          onSelect={() => handleGame(game.id)}
                          className={ITEM_CLS}
                        >
                          <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: game.accentColor }} />
                          <span className="flex-1">{game.name}</span>
                          <span
                            className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded border"
                            style={{ color: game.accentColor, borderColor: `${game.accentColor}40`, background: `${game.accentColor}12` }}
                          >
                            {game.genre}
                          </span>
                          <span className="text-[10px] text-brand-4">→ Highlight</span>
                        </Command.Item>
                      ))}
                    </Command.Group>

                    {/* Sections */}
                    <Command.Group heading="Jump To" className={GROUP_CLS}>
                      {SECTIONS.map((s) => (
                        <Command.Item
                          key={s.id}
                          value={s.label}
                          onSelect={() => scrollTo(s.id)}
                          className={ITEM_CLS}
                        >
                          <span className="text-[#36E0F8]">{s.icon}</span>
                          <span className="flex-1">{s.label}</span>
                          <span className="text-[10px] text-brand-4">→ Scroll</span>
                        </Command.Item>
                      ))}
                    </Command.Group>

                    {/* Actions */}
                    <Command.Group heading="Actions" className={GROUP_CLS}>
                      <Command.Item
                        value="Toggle Presentation Mode Board Deck"
                        onSelect={() => { onTogglePresentation(); setOpen(false); }}
                        className={ITEM_CLS}
                      >
                        <span className="text-[#F191FA]"><Monitor className="w-3.5 h-3.5" /></span>
                        <span className="flex-1">{presentationMode ? "Exit" : "Enter"} Presentation Mode</span>
                        <kbd className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-white/06 border border-white/10 text-brand-4">⌘P</kbd>
                      </Command.Item>
                    </Command.Group>
                  </Command.List>
                </Command>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
