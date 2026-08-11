import type { HardwareSelection, UpgradeItem, GpuData } from "@/types";
import { computeScores } from "./scoring";
import { gpus } from "@/data";

/**
 * 升级建议引擎
 *
 * 根据瓶颈分析和各硬件得分，生成按优先级排序的升级建议。
 *
 * 为什么这样设计:
 * - 优先级基于瓶颈严重程度 + 各部件相对得分差距
 * - 星级 (1-5) 代表预期提升幅度
 * - 所有理由用通俗中文表达，不出现技术黑话
 * - 根据分辨率调整建议（4K 下 GPU 权重更高）
 */

export function generateUpgradeSuggestions(selection: HardwareSelection): UpgradeItem[] {
  const scores = computeScores(selection);
  const upgrades: UpgradeItem[] = [];
  const isHighRes = selection.monitor ? selection.monitor.resolutionHeight >= 1440 : false;

  // ── 显卡升级 ──
  if (selection.gpu) {
    const gpuScore = scores.gpu;
    let stars = 1;
    let improvement = 0;
    let reason = "";

    if (gpuScore < 50) {
      stars = 5; improvement = 55;
      reason = "当前显卡是系统中最明显的性能短板，升级后将带来最大的游戏体验提升。";
    } else if (gpuScore < 65) {
      stars = 4; improvement = 35;
      reason = isHighRes
        ? "在 1440p 以上分辨率下，当前显卡难以稳定输出高帧率，升级显卡是最有效的改进。"
        : "显卡性能偏弱，升级后游戏流畅度会有明显提升。";
    } else if (gpuScore < 78) {
      stars = 3; improvement = 20;
      reason = "显卡性能尚可，但如果追求更高画质或帧率，升级显卡效果明显。";
    } else if (gpuScore < 88) {
      stars = 2; improvement = 10;
      reason = "显卡性能已经不错，升级收益相对有限，优先级不高。";
    } else {
      stars = 1; improvement = 5;
      reason = "显卡性能非常强劲，目前完全不需要升级。";
    }

    const nextTierGpu = gpus
      .filter((g) => g.tier > selection.gpu!.tier && g.tier <= selection.gpu!.tier + 3)
      .sort((a, b) => a.tier - b.tier)[0];

    upgrades.push({
      component: "gpu", priority: 1, stars, improvementPercent: improvement, reason,
      suggestedUpgrade: nextTierGpu?.name ?? "更高性能显卡",
      priceEstimate: nextTierGpu?.priceUsd ?? 500,
    });
  }

  // ── 固态硬盘升级 ──
  if (selection.ssd) {
    const ssdScore = scores.ssd;
    let stars = 1; let improvement = 0; let reason = "";

    if (ssdScore < 40) {
      stars = 4; improvement = 40;
      reason = "当前使用的是较慢的固态硬盘，升级到 NVMe 固态可大幅缩短系统和游戏加载时间。";
    } else if (ssdScore < 60) {
      stars = 3; improvement = 20;
      reason = "固态硬盘性能一般，升级到更快的型号可以明显缩短加载等待时间。";
    } else if (ssdScore < 75) {
      stars = 2; improvement = 10;
      reason = "固态硬盘性能良好，升级收益相对有限，除非需要更大容量。";
    } else {
      stars = 1; improvement = 3;
      reason = "固态硬盘性能已经非常出色，升级的体验提升微乎其微。";
    }

    upgrades.push({
      component: "ssd", priority: 3, stars, improvementPercent: improvement, reason,
      suggestedUpgrade: "NVMe Gen4 1TB 或更高规格",
      priceEstimate: 70,
    });
  }

  // ── 内存升级 ──
  if (selection.ram) {
    const ramScore = scores.ram;
    let stars = 1; let improvement = 0; let reason = "";

    if (ramScore < 35) {
      stars = 4; improvement = 35;
      reason = "内存容量或频率偏低，可能影响多任务处理和部分大型游戏的流畅度。";
    } else if (ramScore < 55) {
      stars = 3; improvement = 15;
      reason = "内存配置尚可，但如果经常多开应用或玩大型游戏，升级会有帮助。";
    } else if (ramScore < 70) {
      stars = 2; improvement = 8;
      reason = "内存配置良好，日常使用和游戏中完全够用。";
    } else {
      stars = 1; improvement = 3;
      reason = "内存性能充足，不需要升级。";
    }

    upgrades.push({
      component: "ram", priority: 4, stars, improvementPercent: improvement, reason,
      suggestedUpgrade: "DDR5 6000MHz 32GB",
      priceEstimate: 100,
    });
  }

  // ── CPU 升级 ──
  if (selection.cpu) {
    const cpuScore = scores.cpu;
    let stars = 1; let improvement = 0; let reason = "";

    if (cpuScore < 55) {
      stars = 4; improvement = 30;
      reason = "CPU 性能偏弱，在需要大量计算的场景（视频剪辑、编译、模拟）下可能成为瓶颈。";
    } else if (cpuScore < 70) {
      stars = 2; improvement = 12;
      reason = "CPU 性能尚可，日常使用和大部分游戏中不会拖后腿。";
    } else {
      stars = 1; improvement = 5;
      reason = "CPU 性能很强，当前不需要升级。";
    }

    upgrades.push({
      component: "cpu", priority: 2, stars, improvementPercent: improvement, reason,
      suggestedUpgrade: "新一代高性能处理器",
      priceEstimate: 300,
    });
  }

  // ── 电源升级 ──
  if (selection.psu) {
    const psuScore = scores.psu;
    let stars = 1; let improvement = 0; let reason = "";

    if (psuScore < 45) {
      stars = 3; improvement = 10;
      reason = "电源规格偏低，如果计划升级显卡等功耗较高的硬件，建议同步更换更高功率的电源。";
    } else if (psuScore < 70) {
      stars = 2; improvement = 5;
      reason = "电源足够当前配置使用，但未来升级高性能显卡时建议同步升级。";
    } else {
      stars = 1; improvement = 1;
      reason = "电源性能充足，完全不需要更换。";
    }

    upgrades.push({
      component: "psu", priority: 5, stars, improvementPercent: improvement, reason,
      suggestedUpgrade: "750W 80+ Gold 或更高",
      priceEstimate: 110,
    });
  }

  return upgrades
    .sort((a, b) => a.priority - b.priority)
    .filter((u) => !(u.stars === 1 && u.improvementPercent <= 5));
}

/** 模拟升级：对比当前显卡和目标显卡 */
export function simulateGpuUpgrade(
  currentGpu: GpuData,
  targetGpu: GpuData
): { percentImprovement: number; currentFps: number; targetFps: number } {
  const currentFps = currentGpu.tier * 0.75 * 20;
  const targetFps = targetGpu.tier * 0.75 * 20;
  const percentImprovement = Math.round(((targetFps - currentFps) / currentFps) * 100);

  return {
    percentImprovement,
    currentFps: Math.round(currentFps),
    targetFps: Math.round(targetFps),
  };
}
