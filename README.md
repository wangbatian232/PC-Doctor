# PC Doctor

一个用于分析电脑硬件配置、游戏性能、硬件瓶颈和升级建议的智能 PC 诊断工具。

让你的电脑配置，一眼看懂。

## Features

- 硬件配置分析（CPU / GPU / RAM / SSD / PSU）
- 游戏 FPS 预测（三角洲行动、CS2、赛博朋克2077、黑神话悟空等）
- 性能瓶颈检测（CPU ↔ GPU 平衡度分析）
- 硬件升级优先级建议
- 交互式诊断仪表盘
- 光标响应式动态背景
- 游戏切换过渡动画

## Tech Stack

- **Next.js** 16.3 (Turbopack)
- **React** 19.2
- **TypeScript** 5
- **Tailwind CSS** 4
- **Framer Motion** 13
- **Recharts** 3 (雷达图)
- **Lucide React** 1.31 (图标)

## Development

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev -- -p 3456

# 构建生产版本
npm run build
```

开发服务器默认运行在 `http://localhost:3456`。

## Project Structure

```
src/
├── app/              # Next.js App Router
│   ├── globals.css   # 全局设计系统 & CSS 变量
│   ├── layout.tsx    # 根布局
│   └── page.tsx      # 首页（Landing Page）
├── components/
│   ├── landing/      # Landing Page 章节组件
│   ├── diagnosis/    # 诊断流程组件
│   ├── scanning/     # 扫描动画
│   ├── results/      # 诊断结果组件
│   └── shared/       # 共享组件 (CursorProvider, BackgroundSystem, HardwareVisuals)
├── data/             # 硬件数据 (CPU/GPU/RAM/SSD/PSU)
├── engine/           # 评分 & 瓶颈分析引擎
└── types/            # TypeScript 类型定义
```
