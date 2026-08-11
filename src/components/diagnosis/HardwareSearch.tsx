"use client";

import { useState, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, ChevronRight } from "lucide-react";

interface HardwareSearchProps<T> {
  items: T[];
  placeholder: string;
  value: T | null;
  onChange: (item: T) => void;
  onClear: () => void;
  renderItem: (item: T) => React.ReactNode;
  searchFields: (keyof T)[];
  getDisplayName: (item: T) => string;
}

export default function HardwareSearch<T>({
  items,
  placeholder,
  value,
  onChange,
  onClear,
  renderItem,
  searchFields,
  getDisplayName,
}: HardwareSearchProps<T>) {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const displayValue = query || (value ? getDisplayName(value) : "");

  const filtered = useMemo(() => {
    if (!query.trim()) return items.slice(0, 8);
    const q = query.toLowerCase();
    return items
      .filter((item) =>
        searchFields.some((field) => {
          const val = item[field];
          return typeof val === "string" && val.toLowerCase().includes(q);
        })
      )
      .slice(0, 8);
  }, [query, items, searchFields]);

  return (
    <div className="relative w-full max-w-[480px] mx-auto">
      {/* Search input — tighter, industrial */}
      <div className={`
        flex items-center gap-2.5 px-3.5 py-2.5 rounded-[6px] border transition-all duration-150
        ${focused
          ? "border-[var(--border-visible)] bg-[var(--bg-panel)]"
          : "border-[var(--border-subtle)] bg-[var(--bg-card)]"}
      `}>
        <Search className="w-3.5 h-3.5 text-[var(--text-tertiary)] shrink-0" />
        <input
          ref={inputRef}
          type="text"
          value={displayValue}
          onChange={(e) => {
            setQuery(e.target.value);
            if (value && e.target.value !== getDisplayName(value)) {
              onClear();
            }
          }}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 120)}
          placeholder={placeholder}
          className="flex-1 bg-transparent text-[13px] text-[var(--text-primary)] placeholder-[var(--text-placeholder)] outline-none tracking-[-0.01em]"
        />
        {value && (
          <button onClick={onClear} className="text-[var(--text-tertiary)] hover:text-[var(--status-danger)] transition-colors">
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Dropdown — tighter rows, spec-table density */}
      <AnimatePresence>
        {focused && !value && filtered.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -2 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -2 }}
            transition={{ duration: 0.12 }}
            className="absolute top-full mt-1.5 left-0 right-0 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-[6px] overflow-hidden z-50 max-h-[320px] overflow-y-auto"
          >
            {filtered.map((item, i) => (
              <motion.button
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.015 }}
                onClick={() => {
                  onChange(item);
                  setQuery("");
                  setFocused(false);
                }}
                className="w-full text-left px-3.5 py-2.5 hover:bg-[rgba(255,255,255,0.03)] transition-colors
                           border-b border-[rgba(255,255,255,0.03)] last:border-0
                           flex items-center justify-between gap-3"
              >
                <div className="flex-1 min-w-0">{renderItem(item)}</div>
                <ChevronRight className="w-3 h-3 text-[var(--text-tertiary)] shrink-0" />
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Empty state */}
      {query && !value && filtered.length === 0 && (
        <p className="text-center text-[12px] text-[var(--text-tertiary)] mt-3">
          暂时没有找到该硬件
        </p>
      )}
    </div>
  );
}
