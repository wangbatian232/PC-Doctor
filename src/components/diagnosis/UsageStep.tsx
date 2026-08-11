"use client";

import { motion, AnimatePresence } from "framer-motion";
import type { UsageScenario } from "@/types";

interface Workload {
  id: UsageScenario;
  num: string;
  title: string;
  desc: string;
  stats: { icon: string; label: string; value: string; accent?: boolean }[];
}

const workloads: Workload[] = [
  {
    id: "gaming", num: "01", title: "游戏娱乐", desc: "FPS 游戏性能 · 显卡性能 · 处理器性能 · 显存",
    stats: [
      { icon: "🎮", label: "FPS 游戏性能", value: "108 FPS", accent: true },
      { icon: "🖥", label: "显卡性能", value: "94%", accent: true },
      { icon: "⚙", label: "处理器性能", value: "63%" },
      { icon: "💾", label: "显存占用", value: "8.6 GB" },
    ],
  },
  {
    id: "ai", num: "02", title: "AI / ComfyUI", desc: "显存占用 · 显卡性能 · 模型兼容",
    stats: [
      { icon: "🤖", label: "显存占用", value: "12 GB", accent: true },
      { icon: "🖥", label: "显卡性能", value: "就绪", accent: true },
      { icon: "🧩", label: "模型兼容", value: "就绪" },
      { icon: "⚡", label: "推理速度", value: "就绪" },
    ],
  },
  {
    id: "office", num: "03", title: "专业办公", desc: "处理器性能 · 内存容量 · 多任务能力",
    stats: [
      { icon: "⚙", label: "处理器性能", value: "███████" },
      { icon: "📊", label: "内存容量", value: "32 GB", accent: true },
      { icon: "📋", label: "多任务能力", value: "就绪" },
      { icon: "💼", label: "响应速度", value: "就绪" },
    ],
  },
  {
    id: "general", num: "04", title: "创意设计", desc: "显卡性能 · 显存容量 · 渲染能力",
    stats: [
      { icon: "🎨", label: "显卡性能", value: "████████" },
      { icon: "💾", label: "显存容量", value: "12 GB", accent: true },
      { icon: "🎬", label: "渲染能力", value: "就绪" },
      { icon: "🖼", label: "导出速度", value: "就绪" },
    ],
  },
];

interface UsageStepProps {
  selected: UsageScenario[];
  onChange: (selected: UsageScenario[]) => void;
}

export default function UsageStep({ selected, onChange }: UsageStepProps) {
  const toggle = (id: UsageScenario) => {
    if (selected.includes(id)) onChange(selected.filter(s => s !== id));
    else onChange([...selected, id]);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="w-full max-w-[960px] mx-auto pb-24"
    >
      {/* Header */}
      <div className="text-center mb-[clamp(32px,5vw,56px)]">
        <span className="t-mono text-[var(--accent-green)] mb-3 block">01 / 配置选择</span>
        <h2 className="text-[clamp(28px,3.5vw,48px)] font-bold text-[var(--text-primary)] tracking-[-0.03em] mb-3">
          这台电脑的主要用途是？
        </h2>
        <p className="text-[clamp(13px,0.9vw,16px)] text-[var(--text-secondary)] max-w-[520px] mx-auto">
          请选择您最关注的场景，PC Doctor 将据此评估您的硬件配置。
        </p>
      </div>

      {/* Workload cards — 2x2 grid */}
      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        {workloads.map((w, i) => {
          const isSelected = selected.includes(w.id);
          return (
            <motion.button
              key={w.id}
              onClick={() => toggle(w.id)}
              className={`relative text-left p-[clamp(22px,3vw,36px)] rounded-[14px] border transition-all duration-250 ease-out overflow-hidden
                ${isSelected
                  ? "border-[var(--accent-green)] bg-[rgba(53,208,127,0.06)] shadow-[0_0_24px_rgba(53,208,127,0.06)]"
                  : "border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.02)] hover:border-[rgba(255,255,255,0.15)] hover:bg-[rgba(255,255,255,0.04)]"
                }`}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.06 * i, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.985 }}
            >
              {/* Top bar — selected */}
              {isSelected && (
                <motion.div className="absolute top-0 left-0 right-0 h-[2px] bg-[var(--accent-green)]"
                  initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.25 }} />
              )}

              <div className="relative z-10">
                {/* Header row */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2.5">
                    <span className="t-mono text-[var(--accent-green)]">{w.num}</span>
                    <span className="text-[10px] tracking-[0.12em] font-medium text-[var(--text-tertiary)] uppercase">{w.title === "游戏娱乐" ? "游戏" : w.title === "AI / ComfyUI" ? "AI" : w.title === "专业办公" ? "办公" : "创作"}</span>
                  </div>
                  {/* Checkbox state */}
                  <motion.div
                    className={`w-6 h-6 rounded-[6px] flex items-center justify-center transition-colors duration-200
                      ${isSelected ? "bg-[var(--accent-green)]" : "border border-[rgba(255,255,255,0.15)] bg-transparent"}`}
                    animate={{ scale: isSelected ? [1, 1.2, 1] : 1 }}
                    transition={{ duration: 0.25 }}
                  >
                    {isSelected && (
                      <svg className="w-3.5 h-3.5 text-[var(--bg-void)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </motion.div>
                </div>

                {/* Title + desc */}
                <h3 className="text-[clamp(17px,1.4vw,24px)] font-semibold text-[var(--text-primary)] mb-1.5">
                  {w.title}
                </h3>
                <p className="text-[12px] text-[var(--text-tertiary)] mb-6">{w.desc}</p>

                {/* Diagnostic stats */}
                <div className={`space-y-2 pt-5 border-t border-[rgba(255,255,255,0.05)] transition-opacity duration-300
                  ${isSelected ? "opacity-100" : "opacity-35"}`}>
                  {w.stats.map((s, j) => (
                    <div key={j} className="flex items-center justify-between">
                      <span className="flex items-center gap-2 text-[11px] text-[var(--text-secondary)]">
                        <span className="text-[13px]">{s.icon}</span>
                        <span>{s.label}</span>
                      </span>
                      <span className={`text-[12px] font-semibold tabular-nums tracking-[0.03em] ${s.accent ? "text-[var(--accent-green)]" : "text-[var(--text-tertiary)]"}`}>
                        {s.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Bottom bar — counts + big CTA */}
      <motion.div
        className="flex items-center justify-between gap-4"
        initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
      >
        <p className="text-[12px] text-[var(--text-tertiary)] tracking-[0.06em]">
          {selected.length > 0 ? `已选择 ${selected.length} 个场景` : "请选择任务场景"}
        </p>
        <motion.div
          className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-[8px] text-[14px] font-semibold transition-all duration-250
            ${selected.length > 0
              ? "border border-[rgba(53,208,127,0.4)] text-[var(--accent-green)] hover:bg-[rgba(53,208,127,0.08)] cursor-pointer"
              : "border border-[rgba(255,255,255,0.06)] text-[var(--text-tertiary)] cursor-not-allowed"
            }`}
          whileHover={selected.length > 0 ? { scale: 1.02 } : {}}
          whileTap={selected.length > 0 ? { scale: 0.97 } : {}}
        >
          确认并继续
          <motion.span animate={{ x: selected.length > 0 ? 3 : 0, opacity: selected.length > 0 ? 1 : 0.3 }} transition={{ duration: 0.2 }}>
            →
          </motion.span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
