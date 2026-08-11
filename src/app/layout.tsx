import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PC Doctor — 电脑配置医生",
  description: "让你的电脑配置，一眼看懂。",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Barlow:wght@300;400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-black text-white antialiased min-h-svh overflow-x-hidden font-body">
        {children}
      </body>
    </html>
  );
}
