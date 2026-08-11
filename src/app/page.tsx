"use client";

import { useState, useCallback, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, RotateCcw, ArrowUp } from "lucide-react";

import type { ViewState, UsageScenario, CpuData, GpuData, RamData, SsdData, PsuData, MonitorSpec, HardwareSelection, DiagnosisResult } from "@/types";
import { computeScores, scoreLabel } from "@/engine/scoring";
import { analyzeBottleneck } from "@/engine/bottleneck";
import { predictAllGames } from "@/engine/gaming";
import { generateUpgradeSuggestions } from "@/engine/upgrade";
import { cpus, gpus, rams } from "@/data";

import CursorProvider from "@/components/shared/CursorProvider";
import BackgroundSystem from "@/components/shared/BackgroundSystem";
import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import FeatureGrid from "@/components/landing/FeatureGrid";
import ProductDemo from "@/components/landing/ProductDemo";
import BottleneckShowcase from "@/components/landing/BottleneckShowcase";
import GameShowcase from "@/components/landing/GameShowcase";
import UpgradeShowcase from "@/components/landing/UpgradeShowcase";
import ReportShowcase from "@/components/landing/ReportShowcase";
import CTASection from "@/components/landing/CTASection";
import Footer from "@/components/landing/Footer";

import StepIndicator from "@/components/diagnosis/StepIndicator";
import UsageStep from "@/components/diagnosis/UsageStep";
import CpuStep from "@/components/diagnosis/CpuStep";
import GpuStep from "@/components/diagnosis/GpuStep";
import { RamStep, SsdStep, PsuStep, MonitorStep } from "@/components/diagnosis/HardwareSteps";
import ScanAnimation from "@/components/scanning/ScanAnimation";
import HealthScore from "@/components/results/HealthScore";
import HardwareCard from "@/components/results/HardwareCard";
import RadarChart from "@/components/results/RadarChart";
import BottleneckAnalysis from "@/components/results/BottleneckAnalysis";
import GamePerformance from "@/components/results/GamePerformance";
import UpgradeSuggestions from "@/components/results/UpgradeSuggestions";
import UpgradeSimulator from "@/components/results/UpgradeSimulator";

const outQuint = [0.22, 1, 0.36, 1] as const;
const viewTransitions = {
  "home→diagnosis": { initial: { x: 40, opacity: 0 }, animate: { x: 0, opacity: 1 }, exit: { x: -40, opacity: 0 }, transition: { duration: 0.35, ease: outQuint } },
  "diagnosis→scanning": { initial: { scale: 0.97, opacity: 0 }, animate: { scale: 1, opacity: 1 }, exit: { scale: 1.03, opacity: 0 }, transition: { duration: 0.3, ease: outQuint } },
  "scanning→results": { initial: { y: 30, opacity: 0 }, animate: { y: 0, opacity: 1 }, exit: { y: -20, opacity: 0 }, transition: { duration: 0.4, ease: outQuint } },
  default: { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: 0.3 } },
} as const;
function gt(from: ViewState, to: ViewState) {
  const k = `${from}→${to}`; return k in viewTransitions ? viewTransitions[k as keyof typeof viewTransitions] : viewTransitions.default;
}

export default function Home() {
  const [view, setView] = useState<ViewState>("home");
  const [prevView, setPrevView] = useState<ViewState>("home");
  const [showTop, setShowTop] = useState(false);
  const [step, setStep] = useState(0);
  const [usage, setUsage] = useState<UsageScenario[]>([]);
  const [cpu, setCpu] = useState<CpuData | null>(null);
  const [gpu, setGpu] = useState<GpuData | null>(null);
  const [ram, setRam] = useState<RamData | null>(null);
  const [ssd, setSsd] = useState<SsdData | null>(null);
  const [psu, setPsu] = useState<PsuData | null>(null);
  const [monitor, setMonitor] = useState<MonitorSpec | null>(null);
  const [result, setResult] = useState<DiagnosisResult | null>(null);

  useEffect(() => {
    const h = () => setShowTop(window.scrollY > 600);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  const cv = useCallback((v: ViewState) => { setPrevView(view); setView(v); }, [view]);
  const reset = useCallback(() => { setStep(0); setUsage([]); setCpu(null); setGpu(null); setRam(null); setSsd(null); setPsu(null); setMonitor(null); setResult(null); }, []);
  const sd = useCallback(() => { reset(); cv("diagnosis"); }, [reset, cv]);
  const le = useCallback(() => {
    const ec = cpus.find(c => c.id === "amd-ryzen-7-7800x3d")!;
    const eg = gpus.find(g => g.id === "nvidia-rtx-4070-super")!;
    const er = rams.find(r => r.id === "ddr5-6000-32gb")!;
    setCpu(ec); setGpu(eg); setRam(er); setUsage(["gaming"]);
    setMonitor({ resolution: "1440p144", resolutionLabel: "1440p", refreshRate: 144, resolutionWidth: 2560, resolutionHeight: 1440 });
    const sel: HardwareSelection = { cpu: ec, gpu: eg, ram: er, ssd: null, psu: null, monitor: { resolution: "1440p144", resolutionLabel: "1440p", refreshRate: 144, resolutionWidth: 2560, resolutionHeight: 1440 }, usage: ["gaming"] };
    setResult({ scores: computeScores(sel), bottleneck: analyzeBottleneck(sel), gamePredictions: predictAllGames(sel), upgrades: generateUpgradeSuggestions(sel), summary: "", selection: sel });
    cv("results");
  }, [cv]);

  if (view === "home") {
    return (
      <CursorProvider>
        <main className="bg-void relative">
          <BackgroundSystem revealImage="/images/bg-reveal.jpg" />
          <Navbar onStartDiagnosis={sd} />
          <HeroSection onStartDiagnosis={sd} onViewExample={le} />
          <FeatureGrid />
          <ProductDemo />
          <BottleneckShowcase />
          <GameShowcase />
          <UpgradeShowcase />
          <ReportShowcase onStartDiagnosis={sd} />
          <CTASection onStartDiagnosis={sd} />
          <Footer />
          <AnimatePresence>{showTop && (
            <motion.button className="scroll-top-btn" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}>
              <ArrowUp className="w-4 h-4" /></motion.button>)}
          </AnimatePresence>
        </main>
      </CursorProvider>
    );
  }

  const trans = gt(prevView, view);
  return (
    <CursorProvider>
      <main className="min-h-screen bg-void relative">
        <BackgroundSystem revealImage="/images/bg-reveal.jpg" />
        <nav className="fixed top-0 left-0 right-0 z-40 bg-[rgba(7,9,12,0.88)] backdrop-blur-xl border-b border-[var(--border-subtle)]">
          <div className="page-container h-14 flex items-center justify-between">
            <button onClick={() => { reset(); cv("home"); }}
              className="flex items-center gap-2 text-[13px] text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors duration-200 group">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
              <span className="hidden sm:inline font-medium">PC DOCTOR</span>
            </button>
            {view === "results" && (
              <button onClick={() => { reset(); sd(); }}
                className="flex items-center gap-2 text-[13px] text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors duration-200">
                <RotateCcw className="w-4 h-4" />
                <span className="hidden sm:inline">重新诊断</span>
              </button>
            )}
          </div>
        </nav>
        <AnimatePresence mode="wait">
          {view === "diagnosis" && (
            <motion.div key="d" className="pt-24 pb-20 page-container relative z-10"
              initial={trans.initial} animate={trans.animate} exit={trans.exit} transition={trans.transition}>
              <StepIndicator currentStep={step} />
              <div className="min-h-[50svh] flex items-center justify-center">
                <AnimatePresence mode="wait">
                  {step === 0 && <UsageStep key="u" selected={usage} onChange={setUsage} />}
                  {step === 1 && <CpuStep key="c" value={cpu} onChange={setCpu} onClear={() => setCpu(null)} />}
                  {step === 2 && <GpuStep key="g" value={gpu} onChange={setGpu} onClear={() => setGpu(null)} />}
                  {step === 3 && <RamStep key="r" value={ram} onChange={setRam} onClear={() => setRam(null)} />}
                  {step === 4 && <SsdStep key="s" value={ssd} onChange={setSsd} onClear={() => setSsd(null)} />}
                  {step === 5 && <PsuStep key="p" value={psu} onChange={setPsu} onClear={() => setPsu(null)} />}
                  {step === 6 && <MonitorStep key="m" value={monitor} onChange={setMonitor} />}
                </AnimatePresence>
              </div>
              <div className="flex justify-between mt-8 max-w-lg mx-auto">
                <button onClick={() => setStep(Math.max(0, step - 1))}
                  className={`px-5 py-2.5 rounded-[8px] text-[13px] font-medium transition-all duration-200
                    ${step === 0
                      ? "invisible"
                      : "border border-[var(--border-default)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-visible)]"}`}>
                  上一步
                </button>
                {step < 6 ? (
                  <button onClick={() => setStep(step + 1)}
                    disabled={!(step === 0 ? usage.length > 0 : step === 1 ? cpu !== null : step === 6 ? monitor !== null : true)}
                    className="px-6 py-2.5 rounded-[8px] text-[13px] font-semibold transition-all duration-200
                      border border-[rgba(255,255,255,0.15)] text-[var(--text-primary)] hover:border-[var(--border-visible)] hover:bg-[rgba(255,255,255,0.04)] active:scale-[0.98] disabled:opacity-30 disabled:cursor-not-allowed">
                    下一步
                  </button>
                ) : (
                  <button onClick={() => { const sel: HardwareSelection = { cpu, gpu, ram, ssd, psu, monitor, usage }; const s = computeScores(sel); const b = analyzeBottleneck(sel); setResult({ scores: s, bottleneck: b, gamePredictions: predictAllGames(sel), upgrades: generateUpgradeSuggestions(sel), summary: scoreLabel(s.overall), selection: sel }); cv("scanning"); }}
                    disabled={!monitor}
                    className="px-6 py-2.5 rounded-[8px] text-[13px] font-semibold transition-all duration-200
                      border border-[rgba(53,208,127,0.35)] text-[var(--accent-green)] hover:bg-[rgba(53,208,127,0.08)] hover:border-[rgba(53,208,127,0.5)] active:scale-[0.98] disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-2">
                    开始诊断 →
                  </button>
                )}
              </div>
            </motion.div>
          )}
          {view === "scanning" && (
            <motion.div key="s" className="relative z-10" initial={trans.initial} animate={trans.animate} exit={trans.exit} transition={trans.transition}>
              <ScanAnimation onComplete={() => cv("results")} />
            </motion.div>
          )}
          {view === "results" && result && (
            <motion.div key="r" className="pt-24 pb-20 page-container relative z-10" initial={trans.initial} animate={trans.animate} exit={trans.exit} transition={trans.transition}>
              <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
                <HealthScore score={result.scores.overall} summary={result.summary} />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
                  <HardwareCard label="CPU" score={result.scores.cpu} icon={<span>CPU</span>} detail={result.selection.cpu ? <div><p>{result.selection.cpu.name}</p></div> : undefined} />
                  <HardwareCard label="显卡" score={result.scores.gpu} icon={<span>GPU</span>} detail={result.selection.gpu ? <div><p>{result.selection.gpu.name}</p></div> : undefined} />
                  <HardwareCard label="内存" score={result.scores.ram} icon={<span>RAM</span>} />
                  <HardwareCard label="硬盘" score={result.scores.ssd} icon={<span>SSD</span>} />
                  <HardwareCard label="电源" score={result.scores.psu} icon={<span>PSU</span>} />
                </div>
                <div className="grid md:grid-cols-2 gap-6 mb-8"><RadarChart scores={result.scores} /><BottleneckAnalysis bottleneck={result.bottleneck} selection={result.selection} /></div>
                <div className="mb-8"><GamePerformance selection={result.selection} /></div>
                <div className="mb-8"><UpgradeSuggestions upgrades={result.upgrades} /></div>
                {result.selection.gpu && <div className="mb-8"><UpgradeSimulator currentGpu={result.selection.gpu} /></div>}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </CursorProvider>
  );
}
