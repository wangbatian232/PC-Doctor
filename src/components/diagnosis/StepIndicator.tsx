"use client";

import { motion } from "framer-motion";

const steps = ["场景", "CPU", "GPU", "内存", "硬盘", "电源", "显示器"];

interface StepIndicatorProps {
  currentStep: number;
  onStepClick?: (step: number) => void;
}

export default function StepIndicator({ currentStep, onStepClick }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-center mb-8">
      {/* Mobile: show progress text */}
      <span className="md:hidden text-[10px] text-[var(--text-secondary)] tracking-[0.08em] mr-2">
        步骤 {currentStep + 1}/{steps.length}
      </span>

      <div className="hidden md:flex items-center">
        {steps.map((label, i) => {
          const isCompleted = i < currentStep;
          const isCurrent = i === currentStep;
          const isClickable = i < currentStep && !!onStepClick;

          return (
            <div key={i} className="flex items-center">
              <button
                onClick={() => isClickable && onStepClick?.(i)}
                className={`
                  relative flex items-center justify-center w-7 h-7 rounded-[4px] text-[10px] font-semibold
                  transition-all duration-200
                  ${isCompleted
                    ? "bg-[var(--accent-green)] text-[var(--bg-canvas)] cursor-pointer"
                    : ""}
                  ${isCurrent
                    ? "bg-transparent border border-[var(--accent-green)] text-[var(--accent-green)]"
                    : ""}
                  ${!isCompleted && !isCurrent
                    ? "bg-transparent border border-[rgba(255,255,255,0.06)] text-[var(--text-tertiary)]"
                    : ""}
                `}
              >
                {isCompleted ? (
                  <motion.svg
                    className="w-3 h-3"
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}
                    initial={{ scale: 0, rotate: -90 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.2, ease: [0.34, 1.56, 0.64, 1] }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </motion.svg>
                ) : (
                  i + 1
                )}

                {/* 当前步骤外圈脉冲光环 */}
                {isCurrent && (
                  <motion.div
                    className="absolute inset-[-3px] rounded-[6px] border border-[var(--accent-green)]"
                    animate={{ opacity: [0.4, 0, 0.4], scale: [1, 1.3, 1] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                  />
                )}
              </button>

              <span className={`
                text-[9px] ml-1.5 uppercase tracking-[0.12em] font-medium
                ${isCurrent ? "text-[var(--accent-green)]" : isCompleted ? "text-[var(--text-secondary)]" : "text-[var(--text-tertiary)]"}
              `}>
                {label}
              </span>

              {i < steps.length - 1 && (
                <div className={`
                  w-6 h-px mx-1.5 transition-all duration-500
                  ${i < currentStep
                    ? "bg-[var(--accent-green)]"
                    : "bg-[rgba(255,255,255,0.04)]"}
                `}>
                  {/* 绿色发光连接线 */}
                  {i < currentStep && (
                    <motion.div
                      className="h-full bg-[var(--accent-green)]"
                      style={{ boxShadow: "0 0 3px var(--accent-green-glow)" }}
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    />
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
