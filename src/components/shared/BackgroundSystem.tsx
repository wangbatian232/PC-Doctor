"use client";

import { useCursor } from "./CursorProvider";

interface BackgroundSystemProps {
  glowColor?: string;
  glowColor2?: string;
  /** Image to reveal on cursor hover */
  revealImage?: string;
}

export default function BackgroundSystem({
  glowColor = "rgba(53,208,127,0.06)",
  glowColor2 = "rgba(53,208,200,0.03)",
  revealImage,
}: BackgroundSystemProps) {
  const { nx, ny, isDesktop, isInside } = useCursor();
  const activePX = isDesktop && isInside ? nx : 0;
  const activePY = isDesktop && isInside ? ny : 0;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Layer 0: Reveal image — always faintly visible, cursor brightens */}
      {revealImage && (
        <>
          {/* Always-visible faint image */}
          <div className="absolute inset-0">
            <img
              src={revealImage}
              alt=""
              className="w-full h-full object-cover"
              style={{
                opacity: 0.08,
                filter: "brightness(0.4) saturate(0.3)",
              }}
            />
          </div>
          {/* Cursor-brightened spotlight on the image */}
          {isDesktop && (
            <div className="absolute inset-0">
              <img
                src={revealImage}
                alt=""
                className="w-full h-full object-cover"
                style={{
                  maskImage: `radial-gradient(circle 280px at calc(var(--cursor-x) * 100%) calc(var(--cursor-y) * 100%), black 0%, black 30%, transparent 55%)`,
                  WebkitMaskImage: `radial-gradient(circle 280px at calc(var(--cursor-x) * 100%) calc(var(--cursor-y) * 100%), black 0%, black 30%, transparent 55%)`,
                  opacity: isInside ? 0.45 : 0,
                  filter: "brightness(0.7)",
                  transition: "opacity 0.6s ease-out",
                }}
              />
            </div>
          )}
        </>
      )}

      {/* Layer 1: radial 光晕 */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at calc(70% + ${activePX * 15}px) calc(35% + ${activePY * 15}px), ${glowColor}, transparent 38%),
            radial-gradient(circle at calc(25% + ${activePX * -10}px) calc(65% + ${activePY * -10}px), ${glowColor2}, transparent 32%)
          `,
        }}
      />

      {/* Layer 2: 技术网格 */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(53,208,127,0.12) 1px, transparent 1px),
            linear-gradient(90deg, rgba(53,208,127,0.10) 1px, transparent 1px)
          `,
          backgroundSize: "72px 72px",
          opacity: 0.025,
          transform: `translate(${activePX * 5}px, ${activePY * 5}px)`,
        }}
      />

      {/* Layer 3: 光标聚光 */}
      {isDesktop && (
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle 420px at calc(var(--cursor-x) * 100%) calc(var(--cursor-y) * 100%), rgba(70,255,160,0.06), transparent 70%)`,
            opacity: isInside ? 1 : 0,
          }}
        />
      )}
    </div>
  );
}

/** Dashboard 3D tilt hook */
export function useDashboardTilt() {
  const { nx, ny, isDesktop, isInside } = useCursor();
  if (!isDesktop || !isInside) return {};
  return {
    transform: `perspective(1200px) rotateX(${ny * 2}deg) rotateY(${nx * -3}deg)`,
    transition: "transform 0.4s ease-out",
  };
}
