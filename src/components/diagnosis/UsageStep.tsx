"use client";

import { motion } from "framer-motion";
import { Cpu, Monitor, HardDrive, MemoryStick, Zap, Brain, Briefcase, Palette } from "lucide-react";
import type { UsageScenario } from "@/types";

interface Workload {
  id: UsageScenario;
  num: string;
  title: string;
  desc: string;
  primary: { icon: React.ReactNode; label: string; value: string; bar: number };
  secondary: { icon: React.ReactNode; label: string; value: string }[];
}

const workloads: Workload[] = [
  {
    id: "gaming", num: "01", title: "游戏娱乐", desc: "FPS 表现 · 显卡性能 · 处理器负载",
    primary: { icon: <Monitor className="w-3.5 h-3.5" />, label: "FPS 游戏性能", value: "108 FPS", bar: 72 },
    secondary: [
      { icon: <Zap className="w-3.5 h-3.5" />, label: "显卡性能", value: "94%" },
      { icon: <Cpu className="w-3.5 h-3.5" />, label: "处理器性能", value: "63%" },
      { icon: <HardDrive className="w-3.5 h-3.5" />, label: "显存占用", value: "8.6 GB" },
    ],
  },
  {
    id: "ai", num: "02", title: "AI / ComfyUI", desc: "显存容量 · 显卡算力 · 模型兼容",
    primary: { icon: <Brain className="w-3.5 h-3.5" />, label: "显存占用", value: "12 GB", bar: 80 },
    secondary: [
      { icon: <Zap className="w-3.5 h-3.5" />, label: "显卡性能", value: "就绪" },
      { icon: <Cpu className="w-3.5 h-3.5" />, label: "模型兼容", value: "就绪" },
      { icon: <Monitor className="w-3.5 h-3.5" />, label: "推理速度", value: "就绪" },
    ],
  },
  {
    id: "office", num: "03", title: "专业办公", desc: "处理器 · 内存容量 · 多任务",
    primary: { icon: <Cpu className="w-3.5 h-3.5" />, label: "处理器性能", value: "优秀", bar: 65 },
    secondary: [
      { icon: <MemoryStick className="w-3.5 h-3.5" />, label: "内存容量", value: "32 GB" },
      { icon: <Briefcase className="w-3.5 h-3.5" />, label: "多任务能力", value: "就绪" },
      { icon: <Zap className="w-3.5 h-3.5" />, label: "响应速度", value: "极快" },
    ],
  },
  {
    id: "general", num: "04", title: "创意设计", desc: "显卡渲染 · 显存 · 导出速度",
    primary: { icon: <Palette className="w-3.5 h-3.5" />, label: "显卡性能", value: "强劲", bar: 75 },
    secondary: [
      { icon: <HardDrive className="w-3.5 h-3.5" />, label: "显存容量", value: "12 GB" },
      { icon: <Monitor className="w-3.5 h-3.5" />, label: "渲染能力", value: "就绪" },
      { icon: <Zap className="w-3.5 h-3.5" />, label: "导出速度", value: "快速" },
    ],
  },
];

/* ── Scan ring number badge ── */
function ScanRing({ num, selected }: { num: string; selected: boolean }) {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" className="shrink-0">
      <circle cx="16" cy="16" r="12" fill="none"
        stroke={selected ? "var(--accent-green)" : "rgba(255,255,255,0.12)"}
        strokeWidth={selected ? 2.5 : 1.5}
        strokeDasharray={selected ? "75" : "60 10"}
        strokeLinecap="round"
        style={{ transition: "all 0.3s ease" }}
      />
      <text x="16" y="20" textAnchor="middle" fontSize="10" fontWeight="600"
        fill={selected ? "var(--accent-green)" : "var(--text-tertiary)"}
        fontFamily='"JetBrains Mono", "Roboto Mono", monospace'
        style={{ transition: "fill 0.3s ease" }}>
        {num}
      </text>
    </svg>
  );
}

/* ── Checkbox ── */
function CheckBox({ selected }: { selected: boolean }) {
  return (
    <motion.div
      className={`w-6 h-6 rounded-[6px] flex items-center justify-center shrink-0 transition-colors duration-200
        ${selected ? "bg-[var(--accent-green)]" : "border border-[rgba(255,255,255,0.15)] bg-transparent"}`}
      animate={{ scale: selected ? [1, 1.15, 1] : 1 }}
      transition={{ duration: 0.2 }}
    >
      {selected && (
        <svg className="w-3.5 h-3.5 text-[#0A0C0B]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      )}
    </motion.div>
  );
}

/* ── 进度条 ── */
function StepBar({ active }: { active: boolean }) {
  return (
    <div className={`flex-1 h-[3px] rounded-full transition-colors duration-400 ${active ? "bg-[var(--accent-green)]" : "bg-[rgba(255,255,255,0.08)]"}`} />
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
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-[1120px] mx-auto pb-24"
    >
      {/* ── Progress bar ── */}
      <div className="flex items-center gap-2 mb-12">
        <div className="flex items-center gap-2 flex-1">
          {["场景", "硬件", "扫描", "报告"].map((label, i) => (
            <div key={label} className="flex items-center gap-2 flex-1 last:flex-none">
              <StepBar active={i === 0} />
              <span className={`text-[11px] font-medium tracking-[0.06em] whitespace-nowrap ${i === 0 ? "text-[var(--accent-green)]" : "text-[var(--text-tertiary)]"}`}>
                {label}
              </span>
              {i < 3 && <StepBar active={false} />}
            </div>
          ))}
        </div>
      </div>

      {/* ── Header ── */}
      <div className="text-center mb-10">
        <span className="text-[11px] tracking-[0.2em] text-[var(--accent-green)] font-semibold uppercase mb-4 block">Step 01</span>
        <h2 className="text-[clamp(24px,2.8vw,38px)] font-semibold text-[var(--text-primary)] tracking-[-0.02em] mb-3"
          style={{ fontFamily: `-apple-system, "PingFang SC", "HarmonyOS Sans SC", Inter, sans-serif` }}>
          这台电脑的主要用途是？
        </h2>
        <p className="text-[14px] text-[var(--text-secondary)] max-w-[480px] mx-auto leading-relaxed"
          style={{ fontFamily: `-apple-system, "PingFang SC", "HarmonyOS Sans SC", Inter, sans-serif` }}>
          选择您最关注的场景，PC Doctor 将据此评估您的硬件配置
        </p>
      </div>

      {/* ── Card grid ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {workloads.map((w, i) => {
          const isSel = selected.includes(w.id);
          return (
            <motion.button
              key={w.id}
              onClick={() => toggle(w.id)}
              className={`relative text-left p-[28px] rounded-[16px] transition-all duration-200 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-green)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0C0B]
                ${isSel
                  ? "border-[var(--accent-green)] bg-[var(--accent-green-dim)]"
                  : "border-[rgba(255,255,255,0.08)] bg-[#141917] hover:border-[rgba(57,233,145,0.4)] hover:-translate-y-0.5"
                } border`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.06 * i, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              whileTap={{ scale: 0.99 }}
            >
              {/* Top row: scan ring + title + checkbox */}
              <div className="flex items-start gap-3 mb-5">
                <ScanRing num={w.num} selected={isSel} />
                <div className="flex-1 min-w-0">
                  <h3 className="text-[19px] font-semibold text-[var(--text-primary)] tracking-[-0.01em]"
                    style={{ fontFamily: `-apple-system, "PingFang SC", "HarmonyOS Sans SC", Inter, sans-serif` }}>
                    {w.title}
                  </h3>
                  <p className="text-[13px] text-[var(--text-secondary)] mt-0.5">{w.desc}</p>
                </div>
                <CheckBox selected={isSel} />
              </div>

              <div className="h-px bg-[rgba(255,255,255,0.08)] mb-5" />

              {/* Primary metric */}
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-[var(--text-tertiary)]">{w.primary.icon}</span>
                  <span className="text-[12px] text-[var(--text-secondary)]">{w.primary.label}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[26px] font-semibold tabular-nums tracking-[-0.02em] text-[var(--text-primary)]"
                    style={{ fontFamily: '"JetBrains Mono", "Roboto Mono", monospace' }}>
                    {w.primary.value}
                  </span>
                </div>
                <div className="mt-2 h-[2px] rounded-full bg-[rgba(255,255,255,0.06)] overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-[var(--accent-green)]"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${w.primary.bar}%` }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.06, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  />
                </div>
              </div>

              {/* Secondary metrics */}
              <div className="space-y-2">
                {w.secondary.map((m, j) => (
                  <div key={j} className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-[12px] text-[var(--text-secondary)]">
                      <span className="text-[var(--text-tertiary)]">{m.icon}</span>
                      <span>{m.label}</span>
                    </span>
                    <span className="text-[13px] font-semibold tabular-nums text-[var(--text-primary)]"
                      style={{ fontFamily: '"JetBrains Mono", "Roboto Mono", monospace' }}>
                      {m.value}
                    </span>
                  </div>
                ))}
              </div>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}
