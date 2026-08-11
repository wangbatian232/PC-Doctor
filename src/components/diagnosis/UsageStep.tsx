"use client";

import { motion } from "framer-motion";
import type { UsageScenario } from "@/types";

interface Workload {
  id: UsageScenario;
  num: string;
  title: string;
  desc: string;
  metrics: { icon: string; label: string; value: string }[];
}

const workloads: Workload[] = [
  {
    id: "gaming", num: "01", title: "游戏娱乐", desc: "FPS 表现 · 显卡性能 · 处理器负载",
    metrics: [
      { icon: "🎮", label: "FPS 游戏性能", value: "108 FPS" },
      { icon: "🖥️", label: "显卡性能", value: "94%" },
      { icon: "⚙️", label: "处理器性能", value: "63%" },
      { icon: "💾", label: "显存占用", value: "8.6 GB" },
    ],
  },
  {
    id: "ai", num: "02", title: "AI / ComfyUI", desc: "显存容量 · 显卡算力 · 模型兼容",
    metrics: [
      { icon: "🤖", label: "显存占用", value: "12 GB" },
      { icon: "🖥️", label: "显卡性能", value: "就绪" },
      { icon: "🧩", label: "模型兼容", value: "就绪" },
      { icon: "⚡", label: "推理速度", value: "就绪" },
    ],
  },
  {
    id: "office", num: "03", title: "专业办公", desc: "处理器 · 内存容量 · 多任务",
    metrics: [
      { icon: "⚙️", label: "处理器性能", value: "优秀" },
      { icon: "📊", label: "内存容量", value: "32 GB" },
      { icon: "📋", label: "多任务能力", value: "就绪" },
      { icon: "💼", label: "响应速度", value: "极快" },
    ],
  },
  {
    id: "general", num: "04", title: "创意设计", desc: "显卡渲染 · 显存 · 导出速度",
    metrics: [
      { icon: "🎨", label: "显卡性能", value: "强劲" },
      { icon: "💾", label: "显存容量", value: "12 GB" },
      { icon: "🎬", label: "渲染能力", value: "就绪" },
      { icon: "🖼️", label: "导出速度", value: "快速" },
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
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-[780px] mx-auto pb-20"
    >
      {/* Header */}
      <div className="text-center mb-10">
        <span className="text-[11px] tracking-[0.2em] text-[var(--accent-green)] font-medium uppercase mb-3 block">Step 01</span>
        <h2 className="text-[clamp(22px,2.8vw,36px)] font-semibold text-white tracking-[-0.02em] mb-2">
          这台电脑的主要用途是？
        </h2>
        <p className="text-[13px] text-white/40 max-w-[440px] mx-auto leading-relaxed">
          选择您最关注的场景，PC Doctor 将据此评估您的硬件配置
        </p>
      </div>

      {/* 2x2 Workload Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {workloads.map((w, i) => {
          const isSel = selected.includes(w.id);
          return (
            <motion.button
              key={w.id}
              onClick={() => toggle(w.id)}
              className={`relative text-left p-7 rounded-[20px] transition-all duration-300 ease-out
                ${isSel
                  ? "border-[#30D158] bg-[rgba(48,209,88,0.06)] shadow-[0_0_28px_rgba(48,209,88,0.12)]"
                  : "border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] hover:border-[rgba(255,255,255,0.14)] hover:bg-[rgba(255,255,255,0.05)]"
                }
                border backdrop-blur-sm`}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * i, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.985 }}
            >
              {/* Top: number + title + check */}
              <div className="flex items-start justify-between mb-5">
                <div>
                  <span className="text-[11px] tracking-[0.15em] text-[var(--accent-green)] font-medium">{w.num}</span>
                  <h3 className="text-[18px] font-semibold text-white mt-0.5">{w.title}</h3>
                  <p className="text-[12px] text-white/30 mt-0.5">{w.desc}</p>
                </div>
                <motion.div
                  className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 mt-1 transition-all duration-300
                    ${isSel ? "bg-[#30D158] scale-110" : "border border-[rgba(255,255,255,0.15)] bg-transparent"}`}
                  animate={{ scale: isSel ? [1, 1.2, 1.1] : 1 }}
                  transition={{ duration: 0.25 }}
                >
                  {isSel && (
                    <svg className="w-3.5 h-3.5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </motion.div>
              </div>

              {/* Metrics — simple key:value, right-aligned */}
              <div className={`space-y-2 pt-4 border-t border-[rgba(255,255,255,0.05)] transition-opacity duration-300 ${isSel ? "opacity-100" : "opacity-40"}`}>
                {w.metrics.map((m, j) => (
                  <div key={j} className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-[12px] text-white/50">
                      <span>{m.icon}</span>
                      <span>{m.label}</span>
                    </span>
                    <span className={`text-[13px] font-semibold tabular-nums ${isSel ? "text-white/90" : "text-white/40"}`}>
                      {m.value}
                    </span>
                  </div>
                ))}
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Bottom CTA — only when selections made */}
      {selected.length > 0 && (
        <motion.div
          className="flex justify-end mt-8"
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
        >
          <button
            className="px-8 py-3.5 rounded-[14px] font-semibold text-[15px] text-white
              bg-gradient-to-r from-[#30D158] to-[#28B848]
              hover:from-[#3DE065] hover:to-[#30D158]
              shadow-[0_4px_24px_rgba(48,209,88,0.25)]
              transition-all duration-200 active:scale-[0.97]
              animate-[pulse-subtle_2s_ease-in-out_infinite]"
          >
            确认配置，开始评估 →
          </button>
        </motion.div>
      )}
    </motion.div>
  );
}
