import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PC Doctor — 电脑配置医生",
  description: "让你的电脑配置，一眼看懂。",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body className="bg-[var(--bg-void)] text-[var(--text-primary)] antialiased min-h-svh overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
