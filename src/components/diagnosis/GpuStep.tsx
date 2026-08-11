"use client";

import { Monitor } from "lucide-react";
import HardwareSearch from "./HardwareSearch";
import { GpuCardVisual } from "@/components/shared/HardwareVisuals";
import type { GpuData } from "@/types";
import { gpus } from "@/data";
import { motion } from "framer-motion";

interface GpuStepProps {
  value: GpuData | null;
  onChange: (gpu: GpuData) => void;
  onClear: () => void;
}

/** 已知有实物图的 GPU ID 映射 */
const gpuImages: Record<string, string> = {
  "nvidia-rtx-4070-super": "/images/gpu-rtx-4070-super.png",
  "nvidia-rtx-5070": "/images/gpu-rtx-5070.png",
};

export default function GpuStep({ value, onChange, onClear }: GpuStepProps) {
  const hasRealImage = value ? gpuImages[value.id] : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className="max-w-[480px] mx-auto text-center"
    >
      <Monitor className="w-7 h-7 text-[var(--text-tertiary)] mx-auto mb-2" />
      <h2 className="text-[18px] font-semibold text-[var(--text-primary)] tracking-[-0.02em] mb-1.5">选择 GPU</h2>
      <p className="text-[12px] text-[var(--text-tertiary)] mb-5">搜索你的显卡型号</p>

      <HardwareSearch
        items={gpus}
        placeholder="搜索 GPU，例如 RTX 4070 Super"
        value={value}
        onChange={onChange}
        onClear={onClear}
        searchFields={["name", "brand", "architecture"]}
        getDisplayName={(gpu) => gpu.name}
        renderItem={(gpu) => (
          <div>
            <p className="text-[13px] font-medium text-[var(--text-primary)] tracking-[-0.01em]">{gpu.name}</p>
            <p className="text-[10px] text-[var(--text-tertiary)] mt-0.5">
              {gpu.brand} · {gpu.vram}GB VRAM · {gpu.architecture} · {gpu.releaseYear}
            </p>
          </div>
        )}
      />

      {value && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-4 rounded-[6px] bg-[var(--bg-card)] border border-[var(--border-subtle)] text-left"
        >
          {/* GPU 可视化：有实物图用实物图，否则用 SVG */}
          <div className="mb-4">
            {hasRealImage ? (
              <motion.div
                className="relative overflow-hidden rounded-[4px] w-full max-w-[300px] mx-auto"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={hasRealImage}
                  alt={value.name}
                  className="w-full object-contain"
                  style={{
                    WebkitMaskImage: `radial-gradient(ellipse 90% 85% at 50% 50%, black 65%, transparent 100%)`,
                    maskImage: `radial-gradient(ellipse 90% 85% at 50% 50%, black 65%, transparent 100%)`,
                    filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.5))",
                  }}
                />
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: `linear-gradient(to top, rgba(19,22,27,0.7) 0%, transparent 20%),
                                 linear-gradient(to bottom, rgba(19,22,27,0.3) 0%, transparent 12%),
                                 linear-gradient(to right, rgba(19,22,27,0.3) 0%, transparent 8%),
                                 linear-gradient(to left, rgba(19,22,27,0.3) 0%, transparent 8%)`,
                  }}
                />
              </motion.div>
            ) : (
              <GpuCardVisual name={value.name} color="#35D07F" width={280} height={90} />
            )}
          </div>

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
              <span className="text-[9px] text-[var(--text-tertiary)] uppercase tracking-[0.1em]">显存</span>
              <p className="text-[12px] text-[var(--text-primary)] font-medium mt-0.5">{value.vram} GB</p>
            </div>
            <div>
              <span className="text-[9px] text-[var(--text-tertiary)] uppercase tracking-[0.1em]">功耗</span>
              <p className="text-[12px] text-[var(--text-primary)] font-medium mt-0.5">{value.tdp}W</p>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
