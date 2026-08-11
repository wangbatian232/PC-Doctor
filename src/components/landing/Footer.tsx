"use client";

import { Activity } from "lucide-react";

export default function Footer() {
  return (
    <footer className="py-16 border-t border-[var(--border-subtle)]">
      <div className="page-container">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <span className="text-[16px] font-bold text-[var(--text-primary)]">PC</span>
            <Activity className="w-4 h-4 text-[var(--accent-green)]" />
            <span className="text-[16px] font-bold text-[var(--text-primary)]">DOCTOR</span>
          </div>
          <div className="flex gap-8 text-[12px] text-[var(--text-tertiary)]">
            <span>© 2026 PC Doctor</span>
            <span>隐私政策</span>
            <span>使用条款</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
