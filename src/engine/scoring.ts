import type { HardwareSelection, HardwareScores } from "@/types";

/**
 * 评分引擎
 *
 * 将硬件数据转化为 0-100 的标准化分数，并根据使用场景加权计算综合评分。
 *
 * 为什么这样设计:
 * - 每个硬件的基础分来自自身的 tier × 10，或专用 score 字段
 * - 综合评分按使用场景动态调整权重（游戏偏 GPU，办公偏 CPU/RAM）
 * - 分数上限 100，保持直觉易懂
 * - 平衡度独立计算，衡量 CPU-GPU 搭配质量
 */

function getComponentScore(component: { tier: number; score?: number } | null, defaultScore: number = 0): number {
  if (!component) return defaultScore;
  return component.score ?? component.tier * 10;
}

function computeBalance(cpuScore: number, gpuScore: number): number {
  if (cpuScore === 0 && gpuScore === 0) return 0;
  if (cpuScore === 0) return gpuScore;
  if (gpuScore === 0) return cpuScore;

  const ratio = Math.min(cpuScore, gpuScore) / Math.max(cpuScore, gpuScore);
  return Math.round(ratio * 100);
}

export function computeScores(selection: HardwareSelection): HardwareScores {
  const cpuScore = getComponentScore(selection.cpu);
  const gpuScore = getComponentScore(selection.gpu);
  const ramScore = getComponentScore(selection.ram);
  const ssdScore = getComponentScore(selection.ssd);
  const psuScore = getComponentScore(selection.psu);
  const balanceScore = computeBalance(cpuScore, gpuScore);

  const usage = selection.usage;
  let weights = { cpu: 0.20, gpu: 0.20, ram: 0.20, ssd: 0.20, psu: 0.20 };

  if (usage.includes("gaming")) {
    weights = { cpu: 0.22, gpu: 0.38, ram: 0.18, ssd: 0.12, psu: 0.10 };
  } else if (usage.includes("video") || usage.includes("3d")) {
    weights = { cpu: 0.20, gpu: 0.30, ram: 0.22, ssd: 0.18, psu: 0.10 };
  } else if (usage.includes("ai")) {
    weights = { cpu: 0.15, gpu: 0.40, ram: 0.25, ssd: 0.10, psu: 0.10 };
  } else if (usage.includes("office")) {
    weights = { cpu: 0.30, gpu: 0.10, ram: 0.25, ssd: 0.25, psu: 0.10 };
  }

  const overall = Math.round(
    cpuScore * weights.cpu +
    gpuScore * weights.gpu +
    ramScore * weights.ram +
    ssdScore * weights.ssd +
    psuScore * weights.psu
  );

  return { cpu: cpuScore, gpu: gpuScore, ram: ramScore, ssd: ssdScore, psu: psuScore, balance: balanceScore, overall };
}

/** 分数 → 中文标签 */
export function scoreLabel(score: number): string {
  if (score >= 95) return "卓越";
  if (score >= 85) return "优秀";
  if (score >= 70) return "良好";
  if (score >= 55) return "一般";
  return "偏弱";
}

/** 分数 → 颜色 */
export function scoreColor(score: number): string {
  if (score >= 80) return "#35D07F";
  if (score >= 60) return "#F5B942";
  return "#FF5C5C";
}
