"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import AnimatedCounter from "./AnimatedCounter";
import { Gamepad2 } from "lucide-react";

interface Game {
  id: string;
  name: string;
  fps: number;
  low: number;
  gpu: number;
  vram: string;
  settings: string;
  res: string;
  tag: string;
}

const games: Game[] = [
  { id: "delta-force", name: "三角洲行动", fps: 108, low: 78, gpu: 94, vram: "7.8", settings: "极高", res: "1440P", tag: "TACTICAL" },
  { id: "cs2", name: "CS2", fps: 312, low: 198, gpu: 62, vram: "3.2", settings: "极高", res: "1080P", tag: "COMPETITIVE" },
  { id: "pubg", name: "绝地求生", fps: 142, low: 96, gpu: 76, vram: "5.4", settings: "极高", res: "1440P", tag: "BATTLE ROYALE" },
  { id: "cyberpunk-2077", name: "赛博朋克 2077", fps: 72, low: 48, gpu: 97, vram: "9.1", settings: "高", res: "1440P", tag: "OPEN WORLD" },
  { id: "black-myth-wukong", name: "黑神话：悟空", fps: 64, low: 42, gpu: 99, vram: "10.5", settings: "中", res: "1440P", tag: "ACTION RPG" },
  { id: "elden-ring", name: "艾尔登法环", fps: 85, low: 58, gpu: 88, vram: "6.3", settings: "高", res: "1440P", tag: "SOULSLIKE" },
];

/* ── 游戏卡片颜色微差 ── */
const cardAccents: Record<string, string> = {
  "delta-force": "rgba(53,208,127,0.10)",
  "cs2": "rgba(160,170,180,0.06)",
  "pubg": "rgba(53,208,160,0.08)",
  "cyberpunk-2077": "rgba(180,140,200,0.08)",
  "black-myth-wukong": "rgba(200,160,100,0.07)",
  "elden-ring": "rgba(140,170,180,0.06)",
};

/* ── Perf column: centered, equal width ── */
function PerfCol({ label, value, suffix = "", delay, color }: {
  label: string; value: number; suffix?: string; delay: number; color?: string;
}) {
  return (
    <motion.div
      className="flex flex-col items-center justify-center text-center py-[clamp(20px,3vw,36px)] px-2"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      <p className="text-[clamp(24px,2.5vw,40px)] font-semibold tabular-nums text-white leading-none"
        style={{ color: color ?? "white" }}>
        <AnimatedCounter to={value} duration={500} suffix={suffix} />
      </p>
      <p className="text-[10px] tracking-[0.1em] font-medium text-white/35 mt-2 uppercase">{label}</p>
    </motion.div>
  );
}

export default function GameShowcase() {
  const [selected, setSelected] = useState(games[0]);
  const [analyzing, setAnalyzing] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: false, amount: 0.15 });

  const switchGame = useCallback((g: Game) => {
    if (g.id === selected.id) return;
    setAnalyzing(true);
    setTimeout(() => setSelected(g), 80);
    setTimeout(() => setAnalyzing(false), 700);
  }, [selected.id]);

  return (
    <section ref={ref} id="ch04" className="section-chapter page-container bg-panel">
      <div className="w-full">
        {/* Header */}
        <motion.div className="mb-[clamp(32px,5vw,64px)]"
          initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}>
          <span className="t-mono text-[var(--accent-green)] mb-3 block">04 / GAMING</span>
          <h2 className="t-section text-[var(--text-primary)] mb-3">你的电脑，能跑多少 FPS？</h2>
          <p className="t-body max-w-[480px]">选择游戏，查看实时帧率预测。所有数据基于硬件性能模型估算。</p>
        </motion.div>

        {/* Game selector cards */}
        <motion.div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-10"
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.1 }}>
          {games.map((g, i) => {
            const isSelected = selected.id === g.id;
            return (
              <motion.button
                key={g.id}
                onClick={() => switchGame(g)}
                className={`relative text-left p-4 rounded-[10px] border transition-all duration-250 ease-out group overflow-hidden
                  ${isSelected
                    ? "border-[rgba(53,208,127,0.4)] bg-[rgba(53,208,127,0.08)]"
                    : "border-[var(--border-subtle)] hover:border-[var(--border-default)] bg-[rgba(255,255,255,0.015)] hover:bg-[rgba(255,255,255,0.03)]"
                  }`}
                initial={{ opacity: 0, y: 12 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.12 + i * 0.05, duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.97 }}
              >
                {/* Card accent top bar */}
                {isSelected && (
                  <motion.div
                    className="absolute top-0 left-0 right-0 h-[2px]"
                    style={{ background: "var(--accent-green)" }}
                    layoutId="game-card-accent"
                    transition={{ type: "spring", stiffness: 400, damping: 35 }}
                  />
                )}
                {/* Subtle game-tinted background */}
                <div className="absolute inset-0 opacity-50 pointer-events-none"
                  style={{ background: cardAccents[g.id] ?? "transparent" }} />
                {/* Content */}
                <div className="relative z-10">
                  <div className="w-8 h-8 rounded-[6px] bg-[rgba(255,255,255,0.04)] border border-[var(--border-subtle)] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-200">
                    <Gamepad2 className={`w-4 h-4 ${isSelected ? "text-[var(--accent-green)]" : "text-[var(--text-tertiary)]"} transition-colors`} />
                  </div>
                  <p className={`text-[13px] font-semibold mb-1 transition-colors ${isSelected ? "text-[var(--text-primary)]" : "text-[var(--text-secondary)]"}`}>
                    {g.name}
                    <motion.span
                      className="inline-block ml-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200"
                      style={{ color: "var(--accent-green)" }}
                    >→</motion.span>
                  </p>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[9px] tracking-[0.08em] font-medium text-[var(--text-tertiary)]">{g.tag}</span>
                    {isSelected && (
                      <motion.span
                        className="w-1.5 h-1.5 rounded-full bg-[var(--accent-green)]"
                        initial={{ scale: 0 }} animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 500 }}
                      />
                    )}
                  </div>
                </div>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Performance panel — game image as full background */}
        <div className="glass overflow-hidden relative">
          {/* Game image background — covers entire panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selected.id + "-bg"}
              className="absolute inset-0 z-0"
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.03 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div
                className="absolute inset-0"
                initial={{ scale: 1 }}
                animate={{ scale: 1.03 }}
                transition={{ duration: 10, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
              >
                <img
                  src={`/images/game-${selected.id}.jpg`}
                  alt=""
                  className="w-full h-full object-cover"
                  style={{ filter: "blur(4px) brightness(0.30)" }}
                />
              </motion.div>
              {/* Gradient: top lighter for title, bottom darker for stats */}
              <div className="absolute inset-0"
                style={{ background: "linear-gradient(180deg, rgba(7,9,12,0.35) 0%, rgba(7,9,12,0.2) 30%, rgba(7,9,12,0.55) 70%, rgba(7,9,12,0.85) 100%)" }}
              />
            </motion.div>
          </AnimatePresence>

          {/* Scan line on analyze */}
          {analyzing && (
            <motion.div
              className="absolute left-0 right-0 h-[1px] pointer-events-none z-20"
              style={{ background: "linear-gradient(90deg, transparent, rgba(53,208,127,0.2), transparent)" }}
              initial={{ top: 0 }}
              animate={{ top: "100%" }}
              transition={{ duration: 0.5, ease: "easeIn" }}
            />
          )}

          {/* Content overlaid on image */}
          <div className="relative z-10 flex flex-col min-h-[420px]">
            {/* ── Top: Game title (centered, prominent) ── */}
            <div className="flex-1 flex flex-col items-center justify-center pt-[clamp(40px,5vw,64px)] pb-4">
              {/* Title glow */}
              <div className="absolute top-[15%] left-1/2 -translate-x-1/2 w-[60%] h-[40%] pointer-events-none"
                style={{ background: "radial-gradient(ellipse at center, rgba(255,255,255,0.06), transparent 70%)" }}
              />
              <AnimatePresence mode="wait">
                <motion.div
                  key={selected.id + "-title"}
                  className="text-center"
                  initial={{ opacity: 0, filter: "blur(6px)", y: 8 }}
                  animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                  exit={{ opacity: 0, filter: "blur(6px)", y: -8 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                  <h3 className="text-[clamp(32px,3.5vw,48px)] font-bold text-white tracking-[0.02em] mb-2">
                    {selected.name}
                  </h3>
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-[12px] text-white/45 tracking-[0.1em] font-medium">{selected.res}</span>
                    <span className="text-[10px] text-white/25">·</span>
                    <span className="text-[12px] text-white/45 tracking-[0.1em] font-medium">{selected.settings}</span>
                    {analyzing && (
                      <motion.span className="t-mono text-[var(--accent-green)] ml-3" initial={{ opacity: 0 }} animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 0.8, repeat: Infinity }}>
                        ANALYZING...
                      </motion.span>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* ── Bottom: 4 equal performance columns ── */}
            <div
              className="grid grid-cols-4 divide-x divide-[rgba(255,255,255,0.06)] border-t border-[rgba(255,255,255,0.06)]"
              style={{ background: "rgba(0,0,0,0.3)", backdropFilter: "blur(4px)" }}
            >
              <PerfCol key={selected.id + "-fps"} label="AVG FPS" value={selected.fps} delay={0}
                color={selected.fps >= 100 ? "#35D07F" : selected.fps >= 60 ? "#F5B942" : "#FF5C5C"} />
              <PerfCol key={selected.id + "-low"} label="LOW FPS" value={selected.low} delay={0.08} />
              <PerfCol key={selected.id + "-gpu"} label="GPU USAGE" value={selected.gpu} delay={0.16} suffix="%" />
              <PerfCol key={selected.id + "-vram"} label="VRAM" value={parseFloat(selected.vram)} delay={0.24} suffix=" GB" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
