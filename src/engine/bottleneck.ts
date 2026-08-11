import type { HardwareSelection, BottleneckResult } from "@/types";
import { computeScores } from "./scoring";

/**
 * Bottleneck Analysis Engine
 *
 * Analyzes CPU-GPU balance and determines if there's a meaningful bottleneck.
 *
 * Design rationale (为什么这样设计):
 * - Uses tier differential rather than raw percentage to avoid spurious precision
 * - Accounts for resolution: at 4K the GPU is almost always the limit; at 1080p CPU matters more
 * - Generates human-readable descriptions, not technical jargon
 * - Balance percentage comes from the scoring engine for consistency
 */

export function analyzeBottleneck(selection: HardwareSelection): BottleneckResult {
  const scores = computeScores(selection);
  const cpu = selection.cpu;
  const gpu = selection.gpu;

  if (!cpu || !gpu) {
    return {
      type: "none",
      severity: "low",
      balancePercent: 100,
      description: cpu && !gpu
        ? "GPU 信息缺失，无法进行完整的性能评估。"
        : "CPU 信息缺失，无法进行完整的性能评估。",
    };
  }

  const tierDiff = gpu.tier - cpu.tier;
  const monitor = selection.monitor;
  const isHighRes = monitor ? monitor.resolutionHeight >= 1440 : false;
  const is4K = monitor ? monitor.resolutionHeight >= 2160 : false;

  let type: BottleneckResult["type"] = "none";
  let severity: BottleneckResult["severity"] = "low";
  let description = "";

  if (tierDiff <= -3) {
    // GPU significantly weaker than CPU
    type = "gpu_bound";
    severity = "high";
    description = is4K
      ? "GPU 明显弱于 CPU，在 4K 分辨率下 GPU 性能严重不足。升级 GPU 将带来最大的游戏性能提升。"
      : "GPU 明显弱于 CPU，是当前游戏性能的主要限制因素。升级 GPU 可以获得显著的性能提升。";
  } else if (tierDiff === -2) {
    type = "gpu_bound";
    severity = "medium";
    description = isHighRes
      ? "在高分辨率下，GPU 是当前系统的主要性能瓶颈。如果预算允许，可以考虑升级显卡。"
      : "GPU 略弱于 CPU，在部分高画质游戏中 GPU 可能限制帧率。GPU 是当前最值得升级的部件。";
  } else if (tierDiff >= 3) {
    // CPU significantly weaker than GPU
    type = "cpu_bound";
    severity = "high";
    description = isHighRes
      ? "CPU 偏弱，但在高分辨率下 GPU 通常是主要限制因素，CPU 瓶颈影响相对较小。"
      : "CPU 明显弱于 GPU。在 1080p 高帧率游戏中，CPU 可能成为主要瓶颈，限制 GPU 的发挥。";
  } else if (tierDiff === 2) {
    type = "cpu_bound";
    severity = "medium";
    description = isHighRes
      ? "CPU 略弱于 GPU，在 1440p 及以上分辨率影响较小。若主要在低分辨率玩高帧率游戏，可以考虑升级 CPU。"
      : "CPU 略弱于 GPU，在部分高帧率竞技游戏中 CPU 可能轻微限制 GPU 性能。";
  } else {
    // Balanced (±1 tier)
    type = "none";
    severity = "low";
    if (scores.balance >= 90) {
      description = "配置非常均衡。CPU 和 GPU 搭配合理，两者都不会成为对方的明显限制。";
    } else if (scores.balance >= 75) {
      description = "CPU 和 GPU 搭配比较合理，日常使用和游戏中两者都能充分发挥性能。";
    } else {
      description = "CPU 和 GPU 搭配基本合理，但在部分极端场景下可能存在轻微不匹配。";
    }
  }

  // Adjust balance percent based on severity
  const balancePercent = severity === "high" ? Math.max(40, scores.balance - 20)
    : severity === "medium" ? Math.max(60, scores.balance - 10)
    : scores.balance;

  return { type, severity, balancePercent, description };
}
