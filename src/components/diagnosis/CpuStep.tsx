"use client";

import { CpuIcon } from "lucide-react";
import HardwareSearch from "./HardwareSearch";
import type { CpuData } from "@/types";
import { cpus } from "@/data";
import { motion } from "framer-motion";

interface CpuStepProps {
  value: CpuData | null;
  onChange: (cpu: CpuData) => void;
  onClear: () => void;
}

export default function CpuStep({ value, onChange, onClear }: CpuStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className="max-w-[480px] mx-auto text-center"
    >
      <CpuIcon className="w-7 h-7 text-[var(--text-tertiary)] mx-auto mb-2" />
      <h2 className="text-[18px] font-semibold text-[var(--text-primary)] tracking-[-0.02em] mb-1.5">
        选择 CPU
      </h2>
      <p className="text-[12px] text-[var(--text-tertiary)] mb-5">
        搜索你的处理器型号
      </p>

      <HardwareSearch
        items={cpus}
        placeholder="搜索 CPU，例如 Ryzen 7 7800X3D"
        value={value}
        onChange={onChange}
        onClear={onClear}
        searchFields={["name", "brand", "architecture"]}
        getDisplayName={(cpu) => cpu.name}
        renderItem={(cpu) => (
          <div>
            <p className="text-[13px] font-medium text-[var(--text-primary)] tracking-[-0.01em]">{cpu.name}</p>
            <p className="text-[10px] text-[var(--text-tertiary)] mt-0.5">
              {cpu.brand} · {cpu.cores}C/{cpu.threads}T · {cpu.baseClock}GHz Base · {cpu.releaseYear}
            </p>
          </div>
        )}
      />

      {/* Selected detail — NVIDIA spec-table density */}
      {value && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-4 rounded-[6px] bg-[var(--bg-card)] border border-[var(--border-subtle)] text-left"
        >
          <div className="grid grid-cols-4 gap-x-4 gap-y-2">
            <div>
              <span className="text-[9px] text-[var(--text-tertiary)] uppercase tracking-[0.1em]">品牌</span>
              <p className="text-[12px] text-[var(--text-primary)] font-medium mt-0.5">{value.brand}</p>
            </div>
            <div>
              <span className="text-[9px] text-[var(--text-tertiary)] uppercase tracking-[0.1em]">架构</span>
              <p className="text-[12px] text-[var(--text-primary)] font-medium mt-0.5">{value.architecture}</p>
            </div>
            <div>
              <span className="text-[9px] text-[var(--text-tertiary)] uppercase tracking-[0.1em]">核心 / 线程</span>
              <p className="text-[12px] text-[var(--text-primary)] font-medium mt-0.5">{value.cores}C / {value.threads}T</p>
            </div>
            <div>
              <span className="text-[9px] text-[var(--text-tertiary)] uppercase tracking-[0.1em]">频率</span>
              <p className="text-[12px] text-[var(--text-primary)] font-medium mt-0.5">{value.baseClock} – {value.boostClock} GHz</p>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
