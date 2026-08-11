import type { CpuData, GpuData, RamData, SsdData, PsuData, GameData, MonitorSpec } from "@/types";
import cpuData from "./cpu.json";
import gpuData from "./gpu.json";
import ramData from "./ram.json";
import ssdData from "./ssd.json";
import psuData from "./psu.json";
import gamesData from "./games.json";

export const cpus: CpuData[] = cpuData as CpuData[];
export const gpus: GpuData[] = gpuData as GpuData[];
export const rams: RamData[] = ramData as RamData[];
export const ssds: SsdData[] = ssdData as SsdData[];
export const psus: PsuData[] = psuData as PsuData[];
export const games: GameData[] = gamesData as unknown as GameData[];

export const monitorOptions: MonitorSpec[] = [
  { resolution: "1080p60", resolutionLabel: "1080p", refreshRate: 60, resolutionWidth: 1920, resolutionHeight: 1080 },
  { resolution: "1080p144", resolutionLabel: "1080p", refreshRate: 144, resolutionWidth: 1920, resolutionHeight: 1080 },
  { resolution: "1080p240", resolutionLabel: "1080p", refreshRate: 240, resolutionWidth: 1920, resolutionHeight: 1080 },
  { resolution: "1440p60", resolutionLabel: "1440p", refreshRate: 60, resolutionWidth: 2560, resolutionHeight: 1440 },
  { resolution: "1440p144", resolutionLabel: "1440p", refreshRate: 144, resolutionWidth: 2560, resolutionHeight: 1440 },
  { resolution: "1440p240", resolutionLabel: "1440p", refreshRate: 240, resolutionWidth: 2560, resolutionHeight: 1440 },
  { resolution: "4k60", resolutionLabel: "4K", refreshRate: 60, resolutionWidth: 3840, resolutionHeight: 2160 },
  { resolution: "4k144", resolutionLabel: "4K", refreshRate: 144, resolutionWidth: 3840, resolutionHeight: 2160 },
];
