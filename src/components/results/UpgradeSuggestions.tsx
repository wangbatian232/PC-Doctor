"use client";

import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";
import type { UpgradeItem } from "@/types";

const componentLabels: Record<string, string> = { cpu: "CPU", gpu: "显卡", ram: "内存", ssd: "硬盘", psu: "电源" };
const componentColors: Record<string, string> = { cpu: "#35D07F", gpu: "#35D07F", ram: "#F5B942", ssd: "#8B929E", psu: "#8B929E" };

interface UpgradeSuggestionsProps { upgrades: UpgradeItem[]; }

export default function UpgradeSuggestions({ upgrades }: UpgradeSuggestionsProps) {
  if (upgrades.length === 0) {
    return (
      <motion.div
        className="p-5 rounded-[8px] border border-[var(--border-subtle)] bg-[rgba(255,255,255,0.01)] text-center"
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
      >
        <TrendingUp className="w-5 h-5 text-[var(--accent-green)] mx-auto mb-1.5" />
        <p className="text-[12px] text-[var(--text-primary)] font-medium tracking-[-0.01em]">配置已经非常均衡</p>
        <p className="text-[10px] text-[var(--text-tertiary)] mt-0.5">当前不需要升级任何硬件</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="rounded-[8px] border border-[var(--border-subtle)] bg-[rgba(255,255,255,0.01)] overflow-hidden"
      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="px-5 py-4 border-b border-[var(--border-subtle)]">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-3.5 h-3.5 text-[var(--text-tertiary)]" />
          <h3 className="text-[11px] font-semibold text-[var(--text-primary)] tracking-[0.08em]">
            升级优先级
          </h3>
        </div>
      </div>

      <div className="divide-y divide-[rgba(255,255,255,0.03)]">
        {upgrades.map((upgrade, i) => (
          <motion.div
            key={upgrade.component}
            className="px-5 py-3.5 flex items-center gap-3"
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="w-7 h-7 rounded-[4px] bg-[var(--bg-panel)] border border-[var(--border-subtle)] flex items-center justify-center text-[11px] font-bold text-[var(--text-primary)] shrink-0">
              {upgrade.priority}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-[9px] font-semibold tracking-[0.08em] px-1.5 py-0.5 rounded-[2px]"
                  style={{ color: componentColors[upgrade.component], background: `${componentColors[upgrade.component]}15` }}>
                  {componentLabels[upgrade.component]}
                </span>
                <span className="text-[10px] tracking-[0.05em]" style={{ color: componentColors[upgrade.component] }}>
                  {"★".repeat(upgrade.stars)}{"☆".repeat(5 - upgrade.stars)}
                </span>
              </div>
              <p className="text-[10px] text-[var(--text-tertiary)] leading-relaxed tracking-[-0.01em]">{upgrade.reason}</p>
              <p className="text-[9px] text-[var(--text-placeholder)] mt-1">
                建议升级至：{upgrade.suggestedUpgrade}
              </p>
            </div>

            <div className="text-right shrink-0">
              <p className="text-[18px] font-bold text-[var(--accent-green)] tracking-[-0.03em] tabular-nums">
                +{upgrade.improvementPercent}%
              </p>
              <p className="text-[8px] text-[var(--text-tertiary)] tracking-[0.08em]">预计提升</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
