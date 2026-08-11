"use client";

import { motion } from "framer-motion";

/**
 * 游戏封面组件 — 真实图片 + 渐变融合
 * 为什么这样设计:
 * - 使用 mask-image 渐变让图片边缘自然消失在暗色背景中
 * - 底部渐变遮罩确保封面与卡片背景平滑过渡
 * - 有真实图片用真实图片，没有则回退到渐变色块
 */
const gameImageMap: Record<string, string> = {
  "delta-force": "/images/game-delta-force.jpg",
  "cs2": "/images/game-cs2.jpg",
  "pubg": "/images/game-pubg.jpg",
  "cyberpunk-2077": "/images/game-cyberpunk-2077.jpg",
  "black-myth-wukong": "/images/game-black-myth-wukong.jpg",
  "elden-ring": "/images/game-elden-ring.jpg",
  "genshin-impact": "/images/game-genshin-impact.jpg",
  "rdr2": "/images/game-rdr2.jpg",
};

const fallbackColors: Record<string, [string, string]> = {
  "delta-force": ["#1a3a2a", "#0d1f15"],
  "cs2": ["#2a2a1a", "#1a1a0d"],
  "pubg": ["#1a2a3a", "#0d1a2a"],
  "cyberpunk-2077": ["#3a1a3a", "#1a0d2a"],
  "black-myth-wukong": ["#2a1a1a", "#1a0d0d"],
  "elden-ring": ["#1a2a2a", "#0d1a1a"],
  "genshin-impact": ["#1a3a3a", "#0d2a2a"],
  "rdr2": ["#2a1a0d", "#1a0d05"],
};

export function GameCover({ gameId, name }: { gameId: string; name: string }) {
  const imgSrc = gameImageMap[gameId];
  const initials = name.slice(0, 2);
  const [from, to] = fallbackColors[gameId] ?? ["#1a1a2a", "#0d0d1a"];

  if (imgSrc) {
    return (
      <div className="w-10 h-14 rounded-[3px] shrink-0 overflow-hidden relative group"
        style={{ border: "1px solid rgba(255,255,255,0.06)" }}>
        {/* 真实封面图片 — 带渐变蒙版融合 */}
        <img
          src={imgSrc}
          alt={name}
          className="w-full h-full object-cover"
          style={{
            // 四边渐变蒙版：左右淡出，底部深度淡出融入卡片背景
            WebkitMaskImage: `linear-gradient(
              to right,
              transparent 0%,
              black 8%,
              black 92%,
              transparent 100%
            ),
            linear-gradient(
              to bottom,
              black 0%,
              black 60%,
              transparent 100%
            )`,
            WebkitMaskComposite: "source-in",
            maskImage: `linear-gradient(
              to right,
              transparent 0%,
              black 8%,
              black 92%,
              transparent 100%
            ),
            linear-gradient(
              to bottom,
              black 0%,
              black 60%,
              transparent 100%
            )`,
            maskComposite: "intersect",
          }}
        />
        {/* 底部额外渐变叠加层 — 确保完全融入卡片底色 */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(to top, var(--bg-card, #13161B) 0%, transparent 35%)`,
          }}
        />
      </div>
    );
  }

  // 回退：渐变色块 + 名称缩写
  return (
    <div
      className="w-10 h-14 rounded-[3px] shrink-0 flex items-center justify-center overflow-hidden relative"
      style={{
        background: `linear-gradient(135deg, ${from}, ${to})`,
        border: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.05) 2px, rgba(255,255,255,0.05) 4px)",
        }}
      />
      <span className="text-[10px] font-bold text-white/70 tracking-[-0.01em] relative z-10">
        {initials}
      </span>
    </div>
  );
}

interface ChipVisualProps {
  label: string;
  subLabel?: string;
  score: number;
  color: string;
  variant: "cpu" | "gpu";
}

/**
 * SVG 芯片可视化组件（回退方案）
 */
export function ChipVisual({ label, subLabel, score, color, variant }: ChipVisualProps) {
  const pins = 8;
  return (
    <div className="flex flex-col items-center gap-2">
      <motion.svg
        viewBox="0 0 100 100"
        className="w-20 h-20"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
      >
        <defs>
          <filter id={`chip-glow-${variant}`}>
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {Array.from({ length: pins }).map((_, i) => {
          const p = (i + 0.5) * (60 / pins) + 12;
          return (
            <g key={i}>
              <motion.rect x={p} y={0} width={3} height={8} rx={1} fill={color} opacity={0.3}
                animate={{ opacity: [0.2, 0.5, 0.2] }}
                transition={{ duration: 2, delay: i * 0.15, repeat: Infinity, ease: "linear" }} />
              <motion.rect x={p} y={92} width={3} height={8} rx={1} fill={color} opacity={0.3}
                animate={{ opacity: [0.2, 0.5, 0.2] }}
                transition={{ duration: 2, delay: i * 0.15 + 0.5, repeat: Infinity, ease: "linear" }} />
              <motion.rect x={0} y={p} width={8} height={3} rx={1} fill={color} opacity={0.3}
                animate={{ opacity: [0.2, 0.5, 0.2] }}
                transition={{ duration: 2, delay: i * 0.15 + 1, repeat: Infinity, ease: "linear" }} />
              <motion.rect x={92} y={p} width={8} height={3} rx={1} fill={color} opacity={0.3}
                animate={{ opacity: [0.2, 0.5, 0.2] }}
                transition={{ duration: 2, delay: i * 0.15 + 1.5, repeat: Infinity, ease: "linear" }} />
            </g>
          );
        })}
        <rect x={10} y={10} width={80} height={80} rx={6}
          fill={color} fillOpacity={0.06}
          stroke={color} strokeWidth={1} strokeOpacity={0.35}
          filter={`url(#chip-glow-${variant})`} />
        <rect x={22} y={22} width={56} height={56} rx={3}
          fill={color} fillOpacity={0.04}
          stroke={color} strokeWidth={0.5} strokeOpacity={0.15} />
        {[0, 1, 2].map((r) => (
          <line key={`h${r}`} x1={26} y1={34 + r * 12} x2={74} y2={34 + r * 12}
            stroke={color} strokeWidth={0.3} strokeOpacity={0.12} />
        ))}
        {[0, 1, 2].map((c) => (
          <line key={`v${c}`} x1={34 + c * 12} y1={26} x2={34 + c * 12} y2={74}
            stroke={color} strokeWidth={0.3} strokeOpacity={0.12} />
        ))}
        <circle cx={50} cy={50} r={10} fill={color} fillOpacity={0.08} stroke={color} strokeWidth={0.5} strokeOpacity={0.25} />
        <text x={50} y={54} textAnchor="middle" fill={color} fontSize={10} fontWeight={700}
          fontFamily="Inter, system-ui, sans-serif" opacity={0.7}>
          {variant === "cpu" ? "CPU" : "GPU"}
        </text>
      </motion.svg>
      <div className="text-center">
        <p className="text-[10px] font-semibold text-[var(--text-primary)] tracking-[-0.01em]">{label}</p>
        {subLabel && <p className="text-[8px] text-[var(--text-tertiary)]">{subLabel}</p>}
        <motion.p className="text-[18px] font-bold tracking-[-0.03em] tabular-nums mt-0.5" style={{ color }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
          {score}
        </motion.p>
      </div>
    </div>
  );
}

/**
 * GPU 显卡 SVG 可视化（回退方案）
 */
export function GpuCardVisual({ name, color = "#35D07F", width = 200, height = 80 }: {
  name: string; color?: string; width?: number; height?: number;
}) {
  const aspectW = width;
  const aspectH = height;
  return (
    <motion.svg
      viewBox={`0 0 ${aspectW} ${aspectH}`}
      className="w-full"
      style={{ maxWidth: width }}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <defs>
        <linearGradient id="gpu-body-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={color} stopOpacity={0.12} />
          <stop offset="100%" stopColor={color} stopOpacity={0.04} />
        </linearGradient>
      </defs>
      <rect x={2} y={10} width={aspectW - 4} height={aspectH - 20} rx={4}
        fill="#0a0d10" stroke={color} strokeWidth={1} strokeOpacity={0.3} />
      <rect x={6} y={14} width={aspectW - 12} height={aspectH - 28} rx={3}
        fill="url(#gpu-body-grad)" stroke={color} strokeWidth={0.5} strokeOpacity={0.15} />
      <circle cx={aspectW * 0.28} cy={aspectH / 2} r={12}
        fill="none" stroke={color} strokeWidth={0.8} strokeOpacity={0.25} />
      <circle cx={aspectW * 0.28} cy={aspectH / 2} r={3}
        fill={color} fillOpacity={0.15} />
      {[0, 60, 120, 180, 240, 300].map((angle) => (
        <line key={angle} x1={aspectW * 0.28} y1={aspectH / 2}
          x2={aspectW * 0.28 + 8 * Math.cos(angle * Math.PI / 180)}
          y2={aspectH / 2 + 8 * Math.sin(angle * Math.PI / 180)}
          stroke={color} strokeWidth={0.4} strokeOpacity={0.15} />
      ))}
      <circle cx={aspectW * 0.68} cy={aspectH / 2} r={12}
        fill="none" stroke={color} strokeWidth={0.8} strokeOpacity={0.25} />
      <circle cx={aspectW * 0.68} cy={aspectH / 2} r={3}
        fill={color} fillOpacity={0.15} />
      {[0, 60, 120, 180, 240, 300].map((angle) => (
        <line key={angle} x1={aspectW * 0.68} y1={aspectH / 2}
          x2={aspectW * 0.68 + 8 * Math.cos(angle * Math.PI / 180)}
          y2={aspectH / 2 + 8 * Math.sin(angle * Math.PI / 180)}
          stroke={color} strokeWidth={0.4} strokeOpacity={0.15} />
      ))}
      <rect x={aspectW * 0.15} y={aspectH - 8} width={aspectW * 0.7} height={7} rx={1}
        fill={color} fillOpacity={0.12} stroke={color} strokeWidth={0.5} strokeOpacity={0.2} />
      {Array.from({ length: 12 }).map((_, i) => (
        <rect key={i} x={aspectW * 0.16 + i * (aspectW * 0.68 / 11)}
          y={aspectH - 7} width={2} height={5} rx={0.5} fill={color} fillOpacity={0.25} />
      ))}
      <text x={aspectW / 2} y={aspectH - 16} textAnchor="middle"
        fill={color} fontSize={7} fontWeight={600} opacity={0.6}
        fontFamily="Inter, system-ui, sans-serif">
        {name.length > 18 ? name.slice(0, 18) + "…" : name}
      </text>
    </motion.svg>
  );
}
