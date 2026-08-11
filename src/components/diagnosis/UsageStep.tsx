"use client";

import { motion } from "framer-motion";
import { Activity, Cpu, Monitor, HardDrive, Zap, Brain, Briefcase, Palette } from "lucide-react";
import type { UsageScenario } from "@/types";

const workloads = [
  {
    id: "gaming" as UsageScenario, num: "01", tag: "GAMING", title: "游戏娱乐",
    desc: "FPS 表现 · 显卡性能 · 处理器负载",
    primary: { icon: Monitor, label: "FPS 游戏性能", value: "108", unit: "FPS", bar: 72, accent: true },
    metrics: [
      { icon: Zap, label: "显卡性能", value: "94%", accent: true },
      { icon: Cpu, label: "处理器性能", value: "63%" },
      { icon: HardDrive, label: "显存占用", value: "8.6 GB" },
    ],
  },
  {
    id: "ai" as UsageScenario, num: "02", tag: "AI / COMFYUI", title: "AI 与 ComfyUI",
    desc: "显存容量 · 显卡算力 · 模型兼容",
    primary: { icon: Brain, label: "显存占用", value: "12", unit: "GB", bar: 80, accent: true },
    metrics: [
      { icon: Zap, label: "显卡性能", value: "就绪", accent: true },
      { icon: Cpu, label: "模型兼容", value: "就绪" },
      { icon: Monitor, label: "推理速度", value: "就绪" },
    ],
  },
  {
    id: "office" as UsageScenario, num: "03", tag: "WORK", title: "专业办公",
    desc: "处理器 · 内存容量 · 多任务",
    primary: { icon: Cpu, label: "处理器性能", value: "优秀", unit: "", bar: 65, accent: false },
    metrics: [
      { icon: Briefcase, label: "内存容量", value: "32 GB", accent: true },
      { icon: Zap, label: "多任务能力", value: "就绪" },
      { icon: Cpu, label: "响应速度", value: "极快" },
    ],
  },
  {
    id: "general" as UsageScenario, num: "04", tag: "CREATIVE", title: "创意设计",
    desc: "显卡渲染 · 显存 · 导出速度",
    primary: { icon: Palette, label: "显卡性能", value: "强劲", unit: "", bar: 75, accent: false },
    metrics: [
      { icon: HardDrive, label: "显存容量", value: "12 GB", accent: true },
      { icon: Monitor, label: "渲染能力", value: "就绪" },
      { icon: Zap, label: "导出速度", value: "快速" },
    ],
  },
];

/*
 * 评分条 — 2px, 左 mono 标签, 右整数, <80 琥珀
 */
function ScoreBar({ label, value, color, delay }: { label: string; value: string; color: string; delay: number }) {
  const num = parseInt(value) || 65;
  return (
    <div className="mb-3">
      <div className="flex justify-between items-end mb-1">
        <span className="text-[10px] tracking-[0.15em] uppercase text-[#5F6B66] font-medium"
          style={{ fontFamily: '"JetBrains Mono", monospace' }}>{label}</span>
        <span className="text-[20px] font-extrabold tabular-nums leading-none"
          style={{ color, fontFamily: "system-ui, sans-serif" }}>{value}</span>
      </div>
      <div className="h-[2px] rounded-full bg-[rgba(255,255,255,0.06)] overflow-hidden">
        <motion.div className="h-full rounded-full"
          style={{ background: color }}
          initial={{ width: 0 }}
          whileInView={{ width: `${num}%` }}
          viewport={{ once: true }}
          transition={{ delay, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </div>
  );
}

interface UsageStepProps { selected: UsageScenario[]; onChange: (s: UsageScenario[]) => void; }

export default function UsageStep({ selected, onChange }: UsageStepProps) {
  const toggle = (id: UsageScenario) => {
    if (selected.includes(id)) onChange(selected.filter(s => s !== id));
    else onChange([...selected, id]);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-[1120px] mx-auto pb-20"
      style={{ fontFamily: '"Noto Sans SC", system-ui, sans-serif' }}
    >
      {/* Section head */}
      <header className="relative z-20 flex flex-col items-center text-center px-6 pt-14 pb-12">
        <p className="font-mono text-[11px] tracking-[0.4em] text-[#2FD671]">
          STEP 01 / SCENARIO
        </p>
        <h1 className="mt-4 text-4xl md:text-[44px] font-black leading-[1.15] text-[#F2F5F3]">
          这台电脑的
          <br />
          <span className="text-[#2FD671]">主要用途是?</span>
        </h1>
        <p className="mt-5 text-sm leading-relaxed text-[#9AA6A0] max-w-xl">
          选择您最关注的场景，PC Doctor 将据此评估您的硬件配置
        </p>
      </header>

      {/* 2×2 Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
        {workloads.map((w, i) => {
          const isSel = selected.includes(w.id);
          const PrimaryIcon = w.primary.icon;
          const barColor = parseInt(w.primary.value) >= 80 ? "#2FD671" : "#DFA63C";
          const barNum = parseInt(w.primary.value) || w.primary.bar;

          return (
            <motion.button
              key={w.id}
              onClick={() => toggle(w.id)}
              className={`relative text-left p-6 rounded-[12px] border transition-all duration-200 ease-out focus:outline-none
                ${isSel
                  ? "border-[#2FD671] bg-[rgba(47,214,113,0.06)]"
                  : "border-[rgba(255,255,255,0.07)] bg-[rgba(255,255,255,0.02)] hover:border-[rgba(47,214,113,0.3)] hover:bg-[rgba(255,255,255,0.035)]"
                }`}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * i, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.99 }}
            >
              {/* Header: icon square + tag + title */}
              <div className="flex items-start gap-3 mb-5">
                <div className="w-9 h-9 rounded-[8px] bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.06)] flex items-center justify-center shrink-0">
                  <Activity className={`w-4 h-4 ${isSel ? "text-[#2FD671]" : "text-[#5F6B66]"} transition-colors`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[9px] tracking-[0.15em] uppercase text-[#5F6B66] font-medium"
                      style={{ fontFamily: '"JetBrains Mono", monospace' }}>{w.tag}</span>
                    {isSel && (
                      <motion.span className="w-1.5 h-1.5 rounded-full bg-[#2FD671]" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.2 }} />
                    )}
                  </div>
                  <h3 className="text-[19px] font-black text-[#F2F5F3] tracking-[-0.01em]"
                    style={{ fontFamily: '"Noto Sans SC", system-ui, sans-serif' }}>{w.title}</h3>
                </div>
                {/* Check */}
                <motion.div
                  className={`w-5 h-5 rounded-[4px] flex items-center justify-center shrink-0 mt-0.5 transition-colors
                    ${isSel ? "bg-[#2FD671]" : "border border-[rgba(255,255,255,0.12)]"}`}
                  animate={{ scale: isSel ? [1, 1.15, 1] : 1 }}
                  transition={{ duration: 0.15 }}
                >
                  {isSel && (
                    <svg className="w-3 h-3 text-[#070A08]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </motion.div>
              </div>

              {/* Desc */}
              <p className="text-[12px] text-[#9AA6A0] mb-5">{w.desc}</p>

              {/* Primary metric with score bar */}
              <div className={`transition-opacity duration-300 ${isSel ? "opacity-100" : "opacity-55"}`}>
                <div className="flex items-center gap-2 mb-2">
                  <PrimaryIcon className="w-3.5 h-3.5 text-[#5F6B66]" />
                  <span className="text-[11px] tracking-[0.12em] uppercase text-[#5F6B66] font-medium"
                    style={{ fontFamily: '"JetBrains Mono", monospace' }}>{w.primary.label}</span>
                </div>
                <ScoreBar label={w.primary.label} value={w.primary.value} color={barColor} delay={0.2 + i * 0.06} />

                {/* Secondary metrics — icon + label + value */}
                <div className="space-y-2 pt-3 border-t border-[rgba(255,255,255,0.06)]">
                  {w.metrics.map((m, j) => {
                    const Icon = m.icon;
                    return (
                      <div key={j} className="flex items-center justify-between">
                        <span className="flex items-center gap-2 text-[12px] text-[#9AA6A0]">
                          <Icon className="w-3.5 h-3.5 text-[#5F6B66]" />
                          <span>{m.label}</span>
                        </span>
                        <span className={`text-[12px] font-semibold tabular-nums`}
                          style={{
                            color: m.accent ? "#2FD671" : "#F2F5F3",
                            fontFamily: m.accent || m.value.includes("%") || m.value.includes("GB") ? '"JetBrains Mono", monospace' : "system-ui, sans-serif",
                          }}>
                          {m.value}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Next step button */}
      <div className="flex justify-center mt-12">
        <button
          disabled={selected.length === 0}
          className={`min-h-[44px] px-8 py-3 rounded-full border text-sm font-medium transition-all duration-200 flex items-center gap-2
            ${selected.length > 0
              ? "border-[#2FD671] text-[#2FD671] hover:bg-[rgba(47,214,113,0.1)] hover:shadow-[0_0_16px_rgba(47,214,113,0.15)] cursor-pointer"
              : "border-white/10 text-[#5F6B66] cursor-not-allowed"
            }`}
          style={{ fontFamily: '"JetBrains Mono", monospace', letterSpacing: "0.2em", textTransform: "uppercase" }}
        >
          下一步
          <motion.span
            className="inline-block"
            animate={{ x: selected.length > 0 ? 4 : 0 }}
            transition={{ duration: 0.2 }}
          >
            →
          </motion.span>
        </button>
      </div>
    </motion.div>
  );
}
