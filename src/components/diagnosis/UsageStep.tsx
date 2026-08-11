"use client";

import { motion } from "framer-motion";
import type { UsageScenario } from "@/types";

const usageOptions: { id: UsageScenario; label: string; icon: string; desc: string }[] = [
  { id: "gaming", label: "游戏", icon: "🎮", desc: "评估游戏帧率和流畅度" },
  { id: "office", label: "办公", icon: "💼", desc: "日常办公和多任务处理" },
  { id: "video", label: "视频剪辑", icon: "🎬", desc: "视频编辑和渲染性能" },
  { id: "3d", label: "3D", icon: "🎨", desc: "3D 建模与渲染" },
  { id: "ai", label: "AI", icon: "🤖", desc: "AI 训练和推理" },
  { id: "general", label: "综合", icon: "⚡", desc: "全面综合性能评估" },
];

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
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className="max-w-[520px] mx-auto text-center"
    >
      <h2 className="text-[18px] font-semibold text-[var(--text-primary)] tracking-[-0.02em] mb-1.5">
        选择使用场景
      </h2>
      <p className="text-[12px] text-[var(--text-tertiary)] mb-6">
        选择你主要的使用场景，我们会据此优化评分权重
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {usageOptions.map((opt) => {
          const isSelected = selected.includes(opt.id);
          return (
            <motion.button
              key={opt.id}
              onClick={() => toggle(opt.id)}
              className={`
                relative p-3.5 rounded-[6px] border text-left transition-all duration-150
                ${isSelected
                  ? "border-[var(--accent-green)] bg-[var(--accent-green-dim)]"
                  : "border-[var(--border-subtle)] bg-[rgba(255,255,255,0.01)] hover:border-[var(--border-default)]"}
              `}
              whileTap={{ scale: 0.985 }}
            >
              {isSelected && (
                <motion.div
                  className="absolute top-2 right-2 w-4 h-4 rounded-[3px] bg-[var(--accent-green)] flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.15, ease: [0.34, 1.56, 0.64, 1] }}
                >
                  <svg className="w-2.5 h-2.5 text-[var(--bg-canvas)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </motion.div>
              )}
              <span className="text-lg block mb-1.5">{opt.icon}</span>
              <span className="text-[13px] font-semibold text-[var(--text-primary)] block mb-0.5 tracking-[-0.01em]">
                {opt.label}
              </span>
              <span className="text-[10px] text-[var(--text-tertiary)]">{opt.desc}</span>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}
