# 栗提 Riti 原创 IP 首页

这是一个静态前端网站，用来宣传原创 IP「栗提 Riti」，同时穿插展示背后的创作者、小游戏、平台入口和幕后作品记录。

技术栈：React + Vite + Tailwind CSS + Framer Motion + lucide-react。

## 运行项目

```bash
npm install
npm run dev
```

Windows PowerShell 如果遇到 `npm.ps1` 执行策略报错，可以改用：

```bash
npm.cmd install
npm.cmd run dev
```

启动后打开终端显示的本地地址，通常是：

```text
http://localhost:5173
```

## 图片位置

项目图片统一放在：

```text
public/images/
```

栗提 IP 相关素材放在：

```text
public/images/riti-brand/
```

页面里引用图片时不用写 `public`，例如：

```text
/images/riti-brand/banner.png
```

## 首页主要组件

- `src/components/Navbar.jsx`：顶部导航
- `src/components/Hero.jsx`：首屏，介绍栗提 Riti
- `src/components/RitiIdentitySection.jsx`：栗提是谁，角色定位和视觉识别
- `src/components/RitiContentSection.jsx`：表情包与内容入口
- `src/components/RitiWorldSection.jsx`：栗提世界、道具和故事方向
- `src/components/LabSection.jsx`：小游戏和互动 Demo 入口
- `src/components/PlatformsSection.jsx`：B站、公众号、微信表情包、视频号等平台入口
- `src/components/CreatorSection.jsx`：创作者背景，放在栗提内容之后
- `src/components/ProjectsSection.jsx`：幕后作品记录
- `src/components/WorldNotesSection.jsx`：下一阶段和邮箱联系

## 游戏与作品页面

- `src/pages/GamePage.jsx`：小游戏详情页
- `src/data/games.js`：小游戏卡片和路由配置
- `src/pages/ProjectPage.jsx`：作品整理页
- `src/data/projects.js`：作品分类和详情数据
- `src/pages/BookManagerPage.jsx`：图书管理系统案例
- `src/pages/DataDashboardPage.jsx`：数据仪表盘案例
- `src/pages/VisualCasePage.jsx`：视觉 / 动画案例

## 后续扩展建议

- 做一个「表情包图鉴」页面，集中展示栗提表情包和使用场景。
- 给「栗提世界」增加角色关系、道具图鉴和短故事列表。
- 把「栗提跑酷」升级成独立游戏页，增加素材、音效和关卡。
- 补齐 B站、公众号、小红书、抖音、微信表情包的真实链接。
- 给幕后作品增加 GitHub 链接、在线预览和制作复盘。
