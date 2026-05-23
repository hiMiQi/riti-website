# 栗提 Riti 个人创作网站

第一版静态首页，使用 React + Vite + Tailwind CSS + Framer Motion + lucide-react。

## 运行项目

```bash
npm install
npm run dev
```

如果你在 Windows PowerShell 里遇到 `npm.ps1` 执行策略报错，可以改用：

```bash
npm.cmd install
npm.cmd run dev
```

开发服务器启动后，打开终端里显示的本地地址，通常是 `http://localhost:5173`。

## 图片位置

首屏大图放在：

```text
public/images/riti-sleep.png
```

页面里用的访问路径是：

```text
/images/riti-sleep.png
```

少量表情贴纸素材放在：

```text
public/images/riti-thumb.png
public/images/riti-pillow.png
public/images/riti-laugh.png
public/images/riti-thumb-cut.png
public/images/riti-pillow-cut.png
public/images/riti-laugh-cut.png
```

## 主要组件

- `src/components/Navbar.jsx`：顶部导航
- `src/components/ScrollProgress.jsx`：页面顶部滚动进度条
- `src/components/Hero.jsx`：首屏 Hero，包含鼠标跟随高光、玻璃层和少量贴纸点缀
- `src/components/IntroSection.jsx`：第二屏滚动介绍，承接核心文案和下滑动效
- `src/components/LabSection.jsx`：第三屏互动实验室，预留栗提跑酷、打字游戏、小工具、图表
- `src/components/Game2048.jsx`：2048 独立小游戏页面内容
- `src/components/MemoryCards.jsx`：记忆翻牌独立小游戏页面内容
- `src/pages/GamePage.jsx`：小游戏详情页，根据 `#/games/...` 显示对应游戏
- `src/data/games.js`：小游戏卡片数据和路由 id
- `src/components/AboutSection.jsx`：正在做的三个主要方向
- `src/components/ProjectsSection.jsx`：作品入口和未来项目链接位置
- `src/components/ProjectMockup.jsx`：项目卡片里的现代占位图
- `src/components/PlatformsSection.jsx`：B站、公众号、视频号、表情包等平台列表入口
- `src/components/WorldNotesSection.jsx`：关于网站和联系信息
- `src/components/Footer.jsx`：联系区域

## 后续扩展

- 把项目卡片数据迁移到单独的 `projects.js`，方便维护图书系统、数据面板等真实作品。
- 增加项目详情页，例如 `/projects/library-system`。
- 给 Demo 实验室加入小型交互 Demo、动画效果、可玩的组件、小工具和数据可视化图表。
- 给平台入口补充真实的小红书、抖音、公众号文章、表情包和视频链接。
- 给「分享与资源」接入 MDX 或本地 Markdown 内容。
- 以后需要后台时，再考虑 CMS、数据库、登录和发布流程。
