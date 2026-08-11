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

/* ── Stat row with stagger ── */
function Stat({ label, value, suffix, delay, color }: {
  label: string; value: number; suffix?: string; delay: number; color?: string;
}) {
  return (
    <motion.div
      className="p-5 rounded-[10px] border border-[var(--border-subtle)] bg-[rgba(255,255,255,0.015)]"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      <p className="t-label mb-2">{label}</p>
      <p
        className="t-number tabular-nums"
        style={{ color: color ?? "var(--text-primary)", fontSize: value >= 200 ? "clamp(40px,5vw,72px)" : undefined }}
      >
        <AnimatedCounter to={value} duration={600} suffix={suffix ?? ""} />
      </p>
      <p className="t-label mt-1" style={{ textTransform: "none" }}>{suffix ? suffix.replace("%", "") : (label.includes("FPS") ? "FPS" : label.includes("GPU") ? "负载" : "GB")}</p>
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

        {/* Performance panel */}
        <div className="glass overflow-hidden">
          {/* Scan line on analyze */}
          {analyzing && (
            <motion.div
              className="absolute left-0 right-0 h-[1px] pointer-events-none z-20"
              style={{ background: "linear-gradient(90deg, transparent, rgba(53,208,127,0.25), transparent)" }}
              initial={{ top: 0 }}
              animate={{ top: "100%" }}
              transition={{ duration: 0.5, ease: "easeIn" }}
            />
          )}

          <div className="grid md:grid-cols-[300px_1fr]">
            {/* Left: Game cover */}
            <div className="relative flex items-center justify-center bg-[rgba(0,0,0,0.35)] p-[clamp(20px,3vw,40px)] overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selected.id + "-img"}
                  className="w-[clamp(140px,14vw,200px)]"
                  initial={{ opacity: 0, scale: 1.06, filter: "blur(6px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 1.04, filter: "blur(4px)" }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="aspect-[3/4] rounded-[8px] overflow-hidden shadow-2xl relative">
                    <img
                      src={`/images/game-${selected.id}.jpg`}
                      alt={selected.name}
                      className="w-full h-full object-cover"
                    />
                    {/* Gradient overlay for readability */}
                    <div className="absolute inset-0"
                      style={{ background: "linear-gradient(to top, rgba(7,9,12,0.5) 0%, transparent 40%)" }} />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right: Performance data */}
            <div className="p-[clamp(24px,3vw,48px)] flex flex-col justify-center">
              {/* Game name — float transition */}
              <div className="mb-2 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selected.id + "-name"}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <h3 className="t-heading text-[var(--text-primary)]">{selected.name}</h3>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Res + Settings + Analyzing */}
              <div className="flex items-center gap-3 mb-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selected.id + "-meta"}
                    className="flex items-center gap-2"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.25, delay: 0.05 }}
                  >
                    <span className="text-[11px] text-[var(--text-tertiary)] bg-[rgba(255,255,255,0.04)] px-2.5 py-1 rounded-[4px]">{selected.res}</span>
                    <span className="text-[11px] text-[var(--text-tertiary)] bg-[rgba(255,255,255,0.04)] px-2.5 py-1 rounded-[4px]">{selected.settings}</span>
                  </motion.div>
                </AnimatePresence>
                {analyzing && (
                  <motion.span
                    className="t-mono text-[var(--accent-green)]"
                    initial={{ opacity: 0 }} animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                  >
                    ANALYZING...
                  </motion.span>
                )}
              </div>

              {/* Stats grid — staggered */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <Stat
                  key={selected.id + "-fps"}
                  label="平均帧率" value={selected.fps} delay={0}
                  color={selected.fps >= 100 ? "#35D07F" : selected.fps >= 60 ? "#F5B942" : "#FF5C5C"}
                />
                <Stat key={selected.id + "-low"} label="1% 低帧" value={selected.low} delay={0.08} />
                <Stat key={selected.id + "-gpu"} label="GPU 占用" value={selected.gpu} suffix="%" delay={0.16} />
                <motion.div
                  key={selected.id + "-vram"}
                  className="p-5 rounded-[10px] border border-[var(--border-subtle)] bg-[rgba(255,255,255,0.015)]"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.24, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p className="t-label mb-2">显存占用</p>
                  <p className="text-[clamp(32px,4vw,56px)] font-bold text-[var(--text-primary)] tabular-nums">{selected.vram}</p>
                  <p className="t-label mt-1" style={{ textTransform: "none" }}>GB</p>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
