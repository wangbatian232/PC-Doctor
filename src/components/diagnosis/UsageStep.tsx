"use client";

import { motion } from "framer-motion";
import type { UsageScenario } from "@/types";

interface Workload {
  id: UsageScenario;
  num: string;
  title: string;
  tag: string;
  desc: string;
  stats: { label: string; value: string; accent?: boolean }[];
}

const workloads: Workload[] = [
  {
    id: "gaming", num: "01", title: "GAMING", tag: "游戏", desc: "FPS / GPU / CPU / VRAM",
    stats: [
      { label: "FPS", value: "108", accent: true },
      { label: "GPU", value: "94%", accent: true },
      { label: "CPU", value: "63%" },
    ],
  },
  {
    id: "ai", num: "02", title: "AI / COMFYUI", tag: "AI", desc: "VRAM / GPU / MODEL",
    stats: [
      { label: "VRAM", value: "12 GB", accent: true },
      { label: "GPU", value: "READY", accent: true },
      { label: "MODEL", value: "READY" },
    ],
  },
  {
    id: "office", num: "03", title: "WORK", tag: "办公", desc: "CPU / RAM / MULTITASKING",
    stats: [
      { label: "CPU", value: "███████" },
      { label: "RAM", value: "32 GB", accent: true },
      { label: "TASKS", value: "READY" },
    ],
  },
  {
    id: "general", num: "04", title: "CREATIVE", tag: "创作", desc: "GPU / VRAM / RENDERING",
    stats: [
      { label: "GPU", value: "████████" },
      { label: "VRAM", value: "12 GB", accent: true },
      { label: "RENDER", value: "READY" },
    ],
  },
];

function MiniStat({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-2">
      <span className="text-[10px] text-white/30 tracking-[0.08em] font-medium">{label}</span>
      <span className={`text-[10px] font-semibold tabular-nums tracking-[0.04em] ${accent ? "text-[var(--accent-green)]" : "text-white/50"}`}>
        {value}
      </span>
    </div>
  );
}

interface UsageStepProps {
  selected: UsageScenario[];
  onChange: (selected: UsageScenario[]) => void;
}

export default function UsageStep({ selected, onChange }: UsageStepProps) {
  const toggle = (id: UsageScenario) => {
    if (selected.includes(id)) {
      onChange(selected.filter((s) => s !== id));
    } else {
      onChange([...selected, id]);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="w-full max-w-[900px] mx-auto"
    >
      {/* Header */}
      <div className="text-center mb-[clamp(28px,4vw,48px)]">
        <span className="t-mono text-[var(--accent-green)] mb-3 block">01 / CONFIGURATION</span>
        <h2 className="text-[clamp(28px,3.5vw,48px)] font-bold text-[var(--text-primary)] tracking-[-0.03em] mb-2">
          WHAT WILL YOU<br />USE THIS PC FOR?
        </h2>
        <p className="text-[clamp(13px,0.9vw,16px)] text-[var(--text-secondary)] max-w-[480px] mx-auto">
          Select the workloads that matter most. PC Doctor will use them to evaluate your configuration.
        </p>
      </div>

      {/* Workload cards — 2x2 grid */}
      <div className="grid sm:grid-cols-2 gap-3 mb-8">
        {workloads.map((w, i) => {
          const isSelected = selected.includes(w.id);
          return (
            <motion.button
              key={w.id}
              onClick={() => toggle(w.id)}
              className={`relative text-left p-[clamp(20px,2.5vw,32px)] rounded-[12px] border transition-all duration-250 ease-out overflow-hidden group
                ${isSelected
                  ? "border-[rgba(53,208,127,0.4)] bg-[rgba(53,208,127,0.05)]"
                  : "border-[rgba(255,255,255,0.07)] bg-[rgba(255,255,255,0.02)] hover:border-[rgba(255,255,255,0.12)] hover:bg-[rgba(255,255,255,0.035)]"
                }`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.06 * i, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.985 }}
            >
              {/* Selected accent bar */}
              {isSelected && (
                <motion.div
                  className="absolute top-0 left-0 right-0 h-[2px] bg-[var(--accent-green)]"
                  initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                />
              )}

              <div className="relative z-10">
                {/* Top row: num + tag + arrow */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2.5">
                    <span className="t-mono text-[var(--accent-green)]">{w.num}</span>
                    <span className="text-[10px] tracking-[0.12em] font-medium text-[var(--text-tertiary)]">{w.tag}</span>
                    {isSelected && (
                      <motion.span
                        className="w-1.5 h-1.5 rounded-full bg-[var(--accent-green)]"
                        initial={{ scale: 0 }} animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 500 }}
                      />
                    )}
                  </div>
                  <motion.div
                    animate={{ opacity: isSelected ? 1 : 0.25, x: isSelected ? 2 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <svg className="w-4 h-4 text-[var(--accent-green)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d={isSelected ? "M5 13l4 4L19 7" : "M9 18l6-6-6-6"} />
                    </svg>
                  </motion.div>
                </div>

                {/* Title + desc */}
                <h3 className="text-[clamp(18px,1.5vw,22px)] font-semibold text-[var(--text-primary)] mb-1"
                  style={{ transform: `translateX(${isSelected ? 3 : 0}px)`, transition: "transform 0.25s ease-out" }}>
                  {w.title}
                </h3>
                <p className="text-[12px] text-[var(--text-tertiary)] mb-5">{w.desc}</p>

                {/* Mini diagnostic viz */}
                <div className={`space-y-1.5 pt-4 border-t border-[rgba(255,255,255,0.04)] transition-opacity duration-300 ${isSelected ? "opacity-100" : "opacity-30"}`}>
                  {w.stats.map((s) => (
                    <MiniStat key={s.label} {...s} />
                  ))}
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Bottom: count + continue */}
      <div className="flex items-center justify-between">
        <motion.p
          className="t-mono text-[var(--text-secondary)]"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
        >
          {selected.length > 0 ? `${selected.length} WORKLOAD${selected.length > 1 ? "S" : ""} SELECTED` : "SELECT WORKLOADS"}
        </motion.p>
        <motion.div
          className={`text-[13px] font-semibold flex items-center gap-2 transition-all duration-200
            ${selected.length > 0 ? "text-[var(--accent-green)]" : "text-[var(--text-tertiary)]"}`}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}
        >
          CONTINUE
          <motion.span
            animate={{ x: selected.length > 0 ? 3 : 0, opacity: selected.length > 0 ? 1 : 0.3 }}
            transition={{ duration: 0.2 }}
          >
            →
          </motion.span>
        </motion.div>
      </div>
    </motion.div>
  );
}
