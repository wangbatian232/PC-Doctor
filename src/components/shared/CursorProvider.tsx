"use client";

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";

interface CursorState {
  /** 当前平滑后的 x (0..1) */
  x: number;
  /** 当前平滑后的 y (0..1) */
  y: number;
  /** 归一化 x (-1..1)，用于 parallax */
  nx: number;
  /** 归一化 y (-1..1)，用于 parallax */
  ny: number;
  /** 是否桌面端 */
  isDesktop: boolean;
  /** 鼠标是否在窗口内 */
  isInside: boolean;
}

const CursorContext = createContext<CursorState>({
  x: 0.5, y: 0.5, nx: 0, ny: 0, isDesktop: false, isInside: false,
});

export function useCursor() {
  return useContext(CursorContext);
}

interface CursorProviderProps {
  children: ReactNode;
}

/**
 * 鼠标状态提供者
 * 为什么这样设计:
 * - 使用 RAF 平滑插值 (lerp factor 0.06) —— 不是 instant follow
 * - 通过 CSS 自定义属性注入到根元素，所有层直接读取
 * - 移动端完全跳过，零开销
 * - 只修改 CSS 变量和 transform，不触发 layout
 */
export default function CursorProvider({ children }: CursorProviderProps) {
  const [state, setState] = useState<CursorState>({
    x: 0.5, y: 0.5, nx: 0, ny: 0, isDesktop: false, isInside: false,
  });

  const rawRef = useRef({ x: 0.5, y: 0.5 });
  const smoothRef = useRef({ x: 0.5, y: 0.5 });
  const isDesktopRef = useRef(false);
  const isInsideRef = useRef(false);
  const rafRef = useRef<number>(0);
  const rootRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    // 检测桌面端
    const check = () => {
      const d = window.innerWidth > 1024 && window.matchMedia("(pointer: fine)").matches;
      isDesktopRef.current = d;
      setState(s => ({ ...s, isDesktop: d }));
      if (!d) {
        isInsideRef.current = false;
        setState(s => ({ ...s, isInside: false }));
      }
    };
    check();
    window.addEventListener("resize", check);

    // 获取根元素用于注入 CSS 变量
    rootRef.current = document.documentElement;

    // 鼠标移动回调
    const onMove = (e: MouseEvent) => {
      rawRef.current.x = e.clientX / window.innerWidth;
      rawRef.current.y = e.clientY / window.innerHeight;
      isInsideRef.current = true;
    };
    const onLeave = () => {
      isInsideRef.current = false;
    };

    // RAF 平滑循环
    const lerp = 0.06; // 越低越平滑，越高越灵敏
    const loop = () => {
      const raw = rawRef.current;
      const cur = smoothRef.current;

      // 平滑插值
      cur.x += (raw.x - cur.x) * lerp;
      cur.y += (raw.y - cur.y) * lerp;

      const nx = (cur.x - 0.5) * 2; // -1..1
      const ny = (cur.y - 0.5) * 2; // -1..1
      const inside = isInsideRef.current;
      const desktop = isDesktopRef.current;

      // 更新 React state（低频，用于组件读取）
      setState({
        x: cur.x,
        y: cur.y,
        nx: desktop && inside ? nx : 0,
        ny: desktop && inside ? ny : 0,
        isDesktop: desktop,
        isInside: desktop && inside,
      });

      // 直接注入 CSS 变量到 :root（高频，零 React overhead）
      if (rootRef.current) {
        rootRef.current.style.setProperty("--cursor-x", String(cur.x));
        rootRef.current.style.setProperty("--cursor-y", String(cur.y));
        rootRef.current.style.setProperty("--cursor-nx", String(nx));
        rootRef.current.style.setProperty("--cursor-ny", String(ny));
        rootRef.current.style.setProperty("--cursor-active", inside && desktop ? "1" : "0");
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    // 只在桌面端运行 RAF
    if (isDesktopRef.current) {
      window.addEventListener("mousemove", onMove, { passive: true });
      window.addEventListener("mouseleave", onLeave);
      rafRef.current = requestAnimationFrame(loop);
    }

    return () => {
      window.removeEventListener("resize", check);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <CursorContext.Provider value={state}>
      {children}
    </CursorContext.Provider>
  );
}
