# 栗提 Riti 原创 IP 展示网站

这是一个用于展示原创 IP「栗提 Riti」的前端网站，集中呈现角色设定、视觉素材、内容入口、互动小游戏和创作者作品案例。项目适合作为品牌主页、IP 展示页或静态内容站点部署。

## 技术栈

- React
- Vite
- Tailwind CSS
- Framer Motion
- Nginx

## 本地运行

```bash
npm install
npm run dev
```

启动后访问终端输出的本地地址，通常为：

```text
http://localhost:5173
```

## 构建

```bash
npm run build
```

构建产物会生成在 `dist/` 目录。

## 部署说明

`dist/` 目录可以部署到静态站点环境，例如：

- Nginx
- GitHub Pages
- Vercel

使用 Nginx 部署时，将 `dist/` 目录中的文件作为站点根目录即可。
