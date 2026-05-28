# 栗提 Riti 原创 IP 展示网站

一个基于 **React + Vite + Tailwind CSS** 开发的原创 IP 展示型前端网站，用于集中呈现原创角色「栗提 Riti」的角色设定、视觉内容、味道日记、作品项目、内容栏目和轻量互动入口。

网站定位不是单纯的静态页面，而是一个围绕原创 IP 搭建的个人作品展示站：既展示角色世界观与视觉内容，也承载前端项目、小游戏实验、作品集案例和创作者长期更新记录。

## 在线预览

- GitHub Pages：[https://himiqi.github.io/riti-website/](https://himiqi.github.io/riti-website/)
- GitHub 仓库：[https://github.com/hiMiQi/riti-website](https://github.com/hiMiQi/riti-website)

## 项目亮点

- **原创 IP 展示页**：围绕「栗提 Riti」建立角色介绍、世界观、味道日记、视觉记录和表情包入口，让角色不只是图片展示，而是有持续内容承载的个人 IP。
- **组件化前端结构**：使用 React 组件拆分首页、项目展示、视觉案例、小游戏入口、平台入口等模块，方便后续继续扩展内容。
- **现代化视觉呈现**：使用 Tailwind CSS 构建响应式页面布局，并通过 Framer Motion 添加轻量动效，使页面保持简洁、清晰和有氛围感。
- **轻量互动内容**：网站中包含小游戏、图书管理页面、数据可视化仪表盘等练习型项目入口，用于展示前端交互、状态管理和页面组织能力。
- **GitHub Pages 自动部署**：通过 GitHub Actions 构建并部署到 GitHub Pages，适合作为个人简历作品、原创 IP 展示站和长期作品集入口。
- **静态资源路径兼容**：已处理 Vite 在 GitHub Pages 仓库子路径部署时的 `base` 配置和 `public` 图片资源路径问题。

## 技术栈

| 分类 | 技术 |
| --- | --- |
| 前端框架 | React |
| 构建工具 | Vite |
| 样式方案 | Tailwind CSS |
| 开发语言 | JavaScript |
| 动效 | Framer Motion |
| 图标 | lucide-react |
| 部署 | GitHub Pages / GitHub Actions |
| 静态托管 | 可部署至 GitHub Pages、Nginx 等静态环境 |

## 功能模块

### 首页展示

首页用于建立「栗提 Riti」的整体印象，包含角色视觉、内容入口、最近更新、项目展示、小型互动入口和平台入口等模块。

### 栗提 IP 内容

用于展示原创角色的基础设定、视觉风格、内容方向和可延展场景，包括表情包、短故事、生活记录、小游戏设定等。

### 味道日记 / 森林观察

以内容栏目形式记录栗提相关的生活化文本，例如水果、米饭、森林、湖泊、日常观察和创作日志。

### 项目展示

整理前端项目、视觉作品、IP 内容和文章资源等方向，用于呈现个人学习、创作和开发能力。

### 小游戏实验

包含跑酷、打字练习、2048、贪吃蛇、消除、俄罗斯方块、扫雷、记忆翻牌等轻量小游戏，用于展示 Canvas、计分、碰撞检测、计时器和基础交互逻辑。

### 视觉案例

收录 UI 页面练习、短动画概念、海报设计、作品集封面系统等内容，展示视觉设计、信息层级和动效表达能力。

### 个人创作入口

整合作品展示、平台入口和创作者信息，方便将网站作为个人作品集和长期创作记录的一部分。

## 本地运行

建议使用 Node.js 18 或更高版本。

```bash
npm install
npm run dev
```

启动后访问终端输出的本地地址，通常为：

```text
http://localhost:5173/
```

## 构建项目

```bash
npm run build
```

构建产物会生成在：

```text
dist/
```

可以通过以下命令本地预览构建结果：

```bash
npm run preview
```

## GitHub Pages 自动部署

本项目是纯前端静态站点，当前使用 GitHub Actions 自动部署到 GitHub Pages，配置文件位于 `.github/workflows/deploy.yml`。

部署流程：

1. 代码 push 到 `main` 分支，或在 GitHub Actions 页面手动触发 workflow。
2. GitHub Actions 使用 Node.js 22 安装依赖。
3. 执行 `npm run build` 生成 `dist/`。
4. 上传 `dist/` 作为 GitHub Pages artifact。
5. 使用 `actions/deploy-pages` 发布到 GitHub Pages。

`vite.config.js` 中已根据部署环境配置动态 `base`：

```js
base: process.env.GITHUB_ACTIONS ? "/riti-website/" : "/"
```

这样可以同时兼容：

- 本地开发环境：`/`
- GitHub Pages 仓库子路径：`/riti-website/`

静态资源路径使用 `import.meta.env.BASE_URL` 拼接，例如：

```js
`${import.meta.env.BASE_URL}images/example.png`
```

这样可以避免在 GitHub Pages 子路径部署时出现图片路径错误。

## 目录结构

```text
riti-website/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Pages 自动部署配置
├── public/
│   └── images/                 # 网站静态图片资源
├── src/
│   ├── components/             # 首页模块、公共组件和小游戏组件
│   ├── data/                   # 页面内容数据、项目数据和游戏数据
│   ├── pages/                  # 项目页、游戏页和视觉案例页
│   ├── App.jsx                 # 应用入口与 hash 路由分发
│   ├── index.css               # 全局样式与 Tailwind 引入
│   └── main.jsx                # React 挂载入口
├── index.html                  # Vite HTML 入口
├── package.json                # 项目脚本与依赖
├── tailwind.config.js          # Tailwind CSS 配置
├── vite.config.js              # Vite 配置与 GitHub Pages base 设置
└── README.md
```

## 开发记录

当前项目已完成：

- React + Vite 项目搭建
- Tailwind CSS 页面样式开发
- 首页与多模块内容展示
- 角色设定、味道日记、视觉内容和平台入口展示
- 项目展示、视觉案例和小游戏入口
- 多个轻量小游戏与互动页面
- GitHub Pages 部署
- GitHub Actions 自动构建与发布
- GitHub Pages 子路径下的 Vite `base` 配置
- GitHub Pages 子路径下的图片资源路径修复

## 后续计划

- 继续完善栗提 Riti 的角色设定和世界观内容
- 补充更多表情包、视觉案例和创作记录
- 优化移动端细节体验
- 增加更多小游戏与互动实验
- 整理项目复盘文章和创作日志
- 持续完善作品集展示内容

## 简历项目描述

栗提 Riti 原创 IP 展示网站是一个基于 Vite、React 和 Tailwind CSS 构建的纯前端作品集项目。项目围绕原创角色 IP 组织内容，包含角色设定、视觉作品、味道日记、项目展示和多个小型互动游戏，并通过组件化方式拆分页面结构。项目已接入 GitHub Actions 自动部署到 GitHub Pages，同时处理了 Vite 在 GitHub Pages 子路径部署时的 `base` 配置和静态图片资源路径兼容问题。

## 项目定位

这个项目主要用于展示：

- 前端页面开发能力
- React 组件化开发能力
- Tailwind CSS 页面搭建能力
- 原创 IP 视觉内容组织能力
- 轻量前端交互与小游戏实现能力
- GitHub Pages 自动部署和静态站点发布经验
- 个人作品集与长期内容维护能力

它适合作为个人简历作品、原创 IP 展示主页、数字媒体作品集入口和前端学习成果展示。

## 注意事项

- 本项目是纯前端静态项目。
- 项目不包含后端服务、数据库、Docker、Redis、Java 服务或登录权限系统。
- `dist/` 为构建产物目录，可用于 GitHub Pages、Nginx 等静态站点部署场景。

## 版权说明

「栗提 Riti」为原创角色 IP。网站中的角色设定、视觉素材、文案内容和相关创意内容仅用于个人作品展示与学习交流，未经授权请勿直接商用或二次使用。
