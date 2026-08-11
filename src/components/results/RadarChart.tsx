"use client";

import { motion } from "framer-motion";
import {
  RadarChart as ReRadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
} from "recharts";
import type { HardwareScores } from "@/types";

interface RadarChartProps {
  scores: HardwareScores;
}

export default function RadarChart({ scores }: RadarChartProps) {
  const data = [
    { name: "CPU", value: scores.cpu, fullMark: 100 },
    { name: "GPU", value: scores.gpu, fullMark: 100 },
    { name: "RAM", value: scores.ram, fullMark: 100 },
    { name: "Storage", value: scores.ssd, fullMark: 100 },
    { name: "Gaming", value: Math.round((scores.gpu * 0.7 + scores.cpu * 0.3)), fullMark: 100 },
    { name: "Balance", value: scores.balance, fullMark: 100 },
  ];

  return (
    <motion.div
      className="p-6 rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[#0F1115]"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <h3 className="text-sm font-semibold text-[#F5F7FA] mb-4 uppercase tracking-wider">Performance Radar</h3>
      <ResponsiveContainer width="100%" height={280}>
        <ReRadarChart data={data} cx="50%" cy="50%" outerRadius="75%">
          <PolarGrid stroke="rgba(255,255,255,0.06)" />
          <PolarAngleAxis
            dataKey="name"
            tick={{ fill: "#8B929E", fontSize: 11, fontWeight: 500 }}
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 100]}
            tick={false}
            axisLine={false}
          />
          <Radar
            name="Score"
            dataKey="value"
            stroke="#35D07F"
            strokeWidth={1.5}
            fill="rgba(53,208,127,0.08)"
            fillOpacity={1}
            animationBegin={300}
            animationDuration={1200}
            animationEasing="ease-out"
          />
        </ReRadarChart>
      </ResponsiveContainer>
    </motion.div>
  );
}
