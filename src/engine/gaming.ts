import type { GamePrediction, HardwareSelection } from "@/types";
import { games } from "@/data";

/**
 * Game Performance Prediction Engine
 *
 * Estimates FPS for each game based on GPU tier, resolution, and quality settings.
 *
 * Design rationale (为什么这样设计):
 * - Uses a tier-multiplier model: GPU tier × game-specific multiplier = estimated FPS
 * - This is simpler than linear regression and easier to maintain
 * - Each game has resolution × quality presets with tierMultiplier and vramBase
 * - Clearly marks estimates as such — never claims real benchmark data
 * - 1% Low FPS estimated at ~70% of average (reasonable rule of thumb)
 * - GPU usage estimated based on resolution (higher res = more GPU-bound)
 * - CPU bottleneck is factored into the final FPS via a simple cap
 */

function getResolutionKey(resolutionLabel: string): string {
  if (resolutionLabel === "4K") return "4k";
  if (resolutionLabel === "1440p") return "1440p";
  return "1080p";
}

function getQualityKey(quality: string): string {
  const q = quality.toLowerCase();
  if (q === "低" || q === "low") return "low";
  if (q === "中" || q === "medium") return "medium";
  if (q === "高" || q === "high") return "high";
  return "ultra";
}

function clampFps(fps: number): number {
  return Math.max(1, Math.round(fps));
}

export function predictGamePerformance(
  selection: HardwareSelection,
  gameId: string,
  quality: string = "高"
): GamePrediction | null {
  const gpu = selection.gpu;
  const game = games.find((g) => g.id === gameId);
  const monitor = selection.monitor;

  if (!gpu || !game) return null;

  const resLabel = monitor?.resolutionLabel ?? "1080p";
  const resKey = getResolutionKey(resLabel);
  const qualityKey = getQualityKey(quality);

  const estimate = game.fpsEstimates[resKey]?.[qualityKey];
  if (!estimate) return null;

  // Calculate raw FPS: GPU tier × multiplier × 20 (scaling factor)
  const rawAvgFps = gpu.tier * estimate.tierMultiplier * 20;

  // Apply CPU bottleneck factor
  let cpuFactor = 1.0;
  const cpu = selection.cpu;
  if (cpu && game.cpuIntensive > 0.5) {
    const cpuTier = cpu.tier;
    const gpuTier = gpu.tier;
    if (cpuTier < gpuTier - 1) {
      cpuFactor = 0.7 + (cpuTier / gpuTier) * 0.3;
    }
  }

  const avgFps = clampFps(rawAvgFps * cpuFactor);
  const low1pFps = clampFps(avgFps * 0.65);
  const vramUsage = estimate.vramBase + (resKey === "4k" ? 3 : resKey === "1440p" ? 1.5 : 0);

  // GPU usage estimate: higher at higher resolution
  const gpuUsage = resKey === "4k" ? Math.min(99, 85 + Math.random() * 14)
    : resKey === "1440p" ? Math.min(98, 75 + Math.random() * 15)
    : Math.min(95, 60 + Math.random() * 20);

  const recommendedSettings = avgFps >= 100 ? "极高"
    : avgFps >= 60 ? "高"
    : avgFps >= 40 ? "中"
    : "低";

  return {
    gameId: game.id,
    gameName: game.nameZh || game.name,
    avgFps,
    low1pFps,
    vramUsage,
    gpuUsage: Math.round(gpuUsage),
    recommendedSettings,
    estimated: true,
  };
}

export function predictAllGames(
  selection: HardwareSelection,
  quality: string = "高"
): GamePrediction[] {
  return games
    .map((game) => predictGamePerformance(selection, game.id, quality))
    .filter((p): p is GamePrediction => p !== null);
}
