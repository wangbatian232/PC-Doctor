"use client";

import { MemoryStick, HardDrive, Zap, Monitor } from "lucide-react";
import HardwareSearch from "./HardwareSearch";
import type { RamData, SsdData, PsuData, MonitorSpec } from "@/types";
import { rams, ssds, psus, monitorOptions } from "@/data";
import { motion } from "framer-motion";

/* ══════════════════════════════════════════
   Remaining Diagnosis Step Components
   Unified pattern: tight, spec-table density, Linear + NVIDIA synthesis
   ══════════════════════════════════════════ */

// ── RAM Step ──
interface RamStepProps { value: RamData | null; onChange: (ram: RamData) => void; onClear: () => void; }
export function RamStep({ value, onChange, onClear }: RamStepProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }} className="max-w-[480px] mx-auto text-center">
      <MemoryStick className="w-7 h-7 text-[var(--text-tertiary)] mx-auto mb-2" />
      <h2 className="text-[18px] font-semibold text-[var(--text-primary)] tracking-[-0.02em] mb-1.5">选择内存</h2>
      <p className="text-[12px] text-[var(--text-tertiary)] mb-5">搜索你的内存规格</p>
      <HardwareSearch items={rams} placeholder="搜索内存，例如 DDR5 6000MHz 32GB" value={value} onChange={onChange} onClear={onClear}
        searchFields={["name", "type"]} getDisplayName={(ram) => ram.name}
        renderItem={(ram) => (
          <div>
            <p className="text-[13px] font-medium text-[var(--text-primary)] tracking-[-0.01em]">{ram.name}</p>
            <p className="text-[10px] text-[var(--text-tertiary)] mt-0.5">{ram.type} · {ram.speed}MHz · {ram.capacity}GB</p>
          </div>
        )} />
      {value && (
        <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-4 rounded-[6px] bg-[var(--bg-card)] border border-[var(--border-subtle)] text-left">
          <div className="grid grid-cols-3 gap-x-4 gap-y-2">
            <div><span className="text-[9px] text-[var(--text-tertiary)] uppercase tracking-[0.1em]">类型</span><p className="text-[12px] text-[var(--text-primary)] font-medium mt-0.5">{value.type}</p></div>
            <div><span className="text-[9px] text-[var(--text-tertiary)] uppercase tracking-[0.1em]">容量</span><p className="text-[12px] text-[var(--text-primary)] font-medium mt-0.5">{value.capacity} GB</p></div>
            <div><span className="text-[9px] text-[var(--text-tertiary)] uppercase tracking-[0.1em]">频率</span><p className="text-[12px] text-[var(--text-primary)] font-medium mt-0.5">{value.speed} MHz</p></div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

// ── SSD Step ──
interface SsdStepProps { value: SsdData | null; onChange: (ssd: SsdData) => void; onClear: () => void; }
export function SsdStep({ value, onChange, onClear }: SsdStepProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }} className="max-w-[480px] mx-auto text-center">
      <HardDrive className="w-7 h-7 text-[var(--text-tertiary)] mx-auto mb-2" />
      <h2 className="text-[18px] font-semibold text-[var(--text-primary)] tracking-[-0.02em] mb-1.5">选择硬盘</h2>
      <p className="text-[12px] text-[var(--text-tertiary)] mb-5">搜索你的固态硬盘型号</p>
      <HardwareSearch items={ssds} placeholder="搜索 SSD，例如 NVMe Gen4 1TB" value={value} onChange={onChange} onClear={onClear}
        searchFields={["name", "type"]} getDisplayName={(ssd) => ssd.name}
        renderItem={(ssd) => (
          <div>
            <p className="text-[13px] font-medium text-[var(--text-primary)] tracking-[-0.01em]">{ssd.name}</p>
            <p className="text-[10px] text-[var(--text-tertiary)] mt-0.5">{ssd.type} · {ssd.readSpeed}MB/s 读取</p>
          </div>
        )} />
      {value && (
        <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-4 rounded-[6px] bg-[var(--bg-card)] border border-[var(--border-subtle)] text-left">
          <div className="grid grid-cols-4 gap-x-4 gap-y-2">
            <div><span className="text-[9px] text-[var(--text-tertiary)] uppercase tracking-[0.1em]">类型</span><p className="text-[12px] text-[var(--text-primary)] font-medium mt-0.5">{value.type}</p></div>
            <div><span className="text-[9px] text-[var(--text-tertiary)] uppercase tracking-[0.1em]">容量</span><p className="text-[12px] text-[var(--text-primary)] font-medium mt-0.5">{value.capacity >= 1024 ? `${value.capacity / 1024}TB` : `${value.capacity}GB`}</p></div>
            <div><span className="text-[9px] text-[var(--text-tertiary)] uppercase tracking-[0.1em]">读取</span><p className="text-[12px] text-[var(--text-primary)] font-medium mt-0.5">{value.readSpeed} MB/s</p></div>
            <div><span className="text-[9px] text-[var(--text-tertiary)] uppercase tracking-[0.1em]">写入</span><p className="text-[12px] text-[var(--text-primary)] font-medium mt-0.5">{value.writeSpeed} MB/s</p></div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

// ── PSU Step ──
interface PsuStepProps { value: PsuData | null; onChange: (psu: PsuData) => void; onClear: () => void; }
export function PsuStep({ value, onChange, onClear }: PsuStepProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }} className="max-w-[480px] mx-auto text-center">
      <Zap className="w-7 h-7 text-[var(--text-tertiary)] mx-auto mb-2" />
      <h2 className="text-[18px] font-semibold text-[var(--text-primary)] tracking-[-0.02em] mb-1.5">选择电源</h2>
      <p className="text-[12px] text-[var(--text-tertiary)] mb-5">搜索你的电源规格</p>
      <HardwareSearch items={psus} placeholder="搜索电源，例如 750W 80+ Gold" value={value} onChange={onChange} onClear={onClear}
        searchFields={["name", "rating"]} getDisplayName={(psu) => psu.name}
        renderItem={(psu) => (
          <div>
            <p className="text-[13px] font-medium text-[var(--text-primary)] tracking-[-0.01em]">{psu.name}</p>
            <p className="text-[10px] text-[var(--text-tertiary)] mt-0.5">{psu.wattage}W · {psu.rating}</p>
          </div>
        )} />
      {value && (
        <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-4 rounded-[6px] bg-[var(--bg-card)] border border-[var(--border-subtle)] text-left">
          <div className="grid grid-cols-2 gap-x-4 gap-y-2">
            <div><span className="text-[9px] text-[var(--text-tertiary)] uppercase tracking-[0.1em]">功率</span><p className="text-[12px] text-[var(--text-primary)] font-medium mt-0.5">{value.wattage}W</p></div>
            <div><span className="text-[9px] text-[var(--text-tertiary)] uppercase tracking-[0.1em]">认证</span><p className="text-[12px] text-[var(--text-primary)] font-medium mt-0.5">{value.rating}</p></div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

// ── Monitor Step ──
interface MonitorStepProps { value: MonitorSpec | null; onChange: (monitor: MonitorSpec) => void; }
export function MonitorStep({ value, onChange }: MonitorStepProps) {
  const groups = [
    { label: "1080p", options: monitorOptions.filter((m) => m.resolutionLabel === "1080p") },
    { label: "1440p", options: monitorOptions.filter((m) => m.resolutionLabel === "1440p") },
    { label: "4K", options: monitorOptions.filter((m) => m.resolutionLabel === "4K") },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }} className="max-w-[400px] mx-auto text-center">
      <Monitor className="w-7 h-7 text-[var(--text-tertiary)] mx-auto mb-2" />
      <h2 className="text-[18px] font-semibold text-[var(--text-primary)] tracking-[-0.02em] mb-1.5">选择显示器</h2>
      <p className="text-[12px] text-[var(--text-tertiary)] mb-5">选择你使用的显示器分辨率和刷新率</p>

      <div className="space-y-3">
        {groups.map((group) => (
          <div key={group.label}>
            <p className="text-[9px] text-[var(--text-tertiary)] uppercase tracking-[0.12em] font-medium mb-1.5 text-left">
              {group.label}
            </p>
            <div className="grid grid-cols-3 gap-1.5">
              {group.options.map((opt) => {
                const isSelected = value?.resolution === opt.resolution;
                return (
                  <motion.button key={opt.resolution} onClick={() => onChange(opt)}
                    className={`px-3 py-2 rounded-[4px] text-[12px] font-medium transition-all duration-150
                      ${isSelected
                        ? "border border-[var(--accent-green)] bg-[var(--accent-green-dim)] text-[var(--accent-green)]"
                        : "border border-[var(--border-subtle)] bg-[rgba(255,255,255,0.01)] text-[var(--text-secondary)] hover:border-[var(--border-default)]"}`}
                    whileTap={{ scale: 0.97 }}>
                    {opt.refreshRate}Hz
                  </motion.button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
