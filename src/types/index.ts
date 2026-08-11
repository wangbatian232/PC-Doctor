// ── Hardware Data Types ──

export interface CpuData {
  id: string;
  name: string;
  brand: "Intel" | "AMD";
  cores: number;
  threads: number;
  baseClock: number; // GHz
  boostClock: number; // GHz
  tdp: number; // watts
  releaseYear: number;
  tier: number; // 1-10 overall performance tier
  singleCoreScore: number; // 0-100
  multiCoreScore: number; // 0-100
  gamingScore: number; // 0-100
  architecture: string;
  socket: string;
  priceUsd: number;
}

export interface GpuData {
  id: string;
  name: string;
  brand: "NVIDIA" | "AMD" | "Intel";
  vram: number; // GB
  tier: number; // 1-10
  gamingScore: number; // 0-100
  rayTracingScore: number; // 0-100
  tdp: number;
  releaseYear: number;
  priceUsd: number;
  architecture: string;
}

export interface RamData {
  id: string;
  name: string;
  type: "DDR4" | "DDR5";
  capacity: number; // GB
  speed: number; // MHz
  tier: number; // 1-10
  score: number; // 0-100
  priceUsd: number;
}

export interface SsdData {
  id: string;
  name: string;
  type: "NVMe Gen3" | "NVMe Gen4" | "NVMe Gen5" | "SATA";
  capacity: number; // GB
  readSpeed: number; // MB/s
  writeSpeed: number; // MB/s
  tier: number;
  score: number; // 0-100
  priceUsd: number;
}

export interface PsuData {
  id: string;
  name: string;
  wattage: number;
  rating: "80+ Bronze" | "80+ Silver" | "80+ Gold" | "80+ Platinum" | "80+ Titanium";
  tier: number;
  score: number; // 0-100
  priceUsd: number;
}

export interface MonitorSpec {
  resolution: string;
  resolutionLabel: string;
  refreshRate: number;
  resolutionWidth: number;
  resolutionHeight: number;
}

export interface GameData {
  id: string;
  name: string;
  nameZh: string;
  genre: string;
  cpuIntensive: number; // 0-1
  gpuIntensive: number; // 0-1
  // FPS estimates by resolution and quality: tierMultiplier × gpuTier × 20 = estimated FPS
  fpsEstimates: Record<string, Record<string, { tierMultiplier: number; vramBase: number }>>;
}

// ── Diagnosis Types ──

export type UsageScenario = "gaming" | "office" | "video" | "3d" | "ai" | "general";
export type ViewState = "home" | "diagnosis" | "scanning" | "results";

export interface HardwareSelection {
  cpu: CpuData | null;
  gpu: GpuData | null;
  ram: RamData | null;
  ssd: SsdData | null;
  psu: PsuData | null;
  monitor: MonitorSpec | null;
  usage: UsageScenario[];
}

export interface HardwareScores {
  cpu: number;
  gpu: number;
  ram: number;
  ssd: number;
  psu: number;
  balance: number;
  overall: number;
}

export interface BottleneckResult {
  type: "none" | "cpu_bound" | "gpu_bound" | "ram_bound";
  severity: "low" | "medium" | "high";
  balancePercent: number;
  description: string;
}

export interface GamePrediction {
  gameId: string;
  gameName: string;
  avgFps: number;
  low1pFps: number;
  vramUsage: number;
  gpuUsage: number;
  recommendedSettings: string;
  estimated: boolean;
}

export interface UpgradeItem {
  component: "cpu" | "gpu" | "ram" | "ssd" | "psu";
  priority: number; // 1 = highest
  stars: number; // 1-5
  improvementPercent: number;
  reason: string;
  suggestedUpgrade: string;
  priceEstimate: number;
}

export interface DiagnosisResult {
  scores: HardwareScores;
  bottleneck: BottleneckResult;
  gamePredictions: GamePrediction[];
  upgrades: UpgradeItem[];
  summary: string;
  selection: HardwareSelection;
}
