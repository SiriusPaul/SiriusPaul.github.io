# Yuqiao Chen — 个人主页

浅色玻璃风格的学术主页，包含项目目录、独立项目详情页、博客目录和 Markdown 文章。保留纯静态 HTML：访问者无需 JavaScript 即可阅读内容，生成后的文件可直接托管在 GitHub Pages。

## 本地预览

需要 Node.js 20 或更高版本。首次运行：

```powershell
npm ci
npm run build
npm run check
npm run preview
```

打开 http://127.0.0.1:3456。修改内容后重新执行 `npm run build`，刷新浏览器。预览服务用 `Ctrl+C` 停止；可通过环境变量 `PORT` 修改端口。

## 文件结构

```text
content/
  profile.json           # 姓名、简介、研究兴趣、教育、荣誉、联系方式
  projects.json          # 项目摘要、时间、标签、详细贡献、可选外部链接
  posts/*.md             # 博客源文件（Markdown + YAML 元信息）
  generated-pages.json   # 自动生成的页面清单，不手动编辑
templates/page.html      # 共用页面框架、导航、页脚、SEO 元信息
scripts/build.mjs        # 内容生成、主页及详情页布局
scripts/check.mjs        # 本地链接、图片、锚点、页面基本结构检查
scripts/serve.mjs        # 仅用于本地的静态预览服务
assets/images/           # 照片（可替换为自己的图片）
assets/favicon.svg       # 网站图标
style.css                # 全站样式；顶部是颜色、字体、宽度变量
script.js                # 手机导航交互
index.html               # 以下都是生成文件
projects/index.html
projects/<slug>/index.html
blog/index.html
blog/<slug>/index.html
```

**更新时改 `content/`，不要直接改生成的 HTML。** 布局在 `scripts/build.mjs` 和 `templates/page.html` 中修改。生成页面清单只用于删除曾生成、之后取消发布的页面，不会清理整个博客或项目目录。

## 修改个人信息

编辑 `content/profile.json`。`about` 支持简短 HTML，例如 `<strong>`；研究兴趣的 `icon` 是内联 SVG。首页英文介绍面向研究交流与 PhD 申请，支持在博客中使用中文。

姓名、联系方式和页脚会随配置同步更新。网站图标在 `assets/favicon.svg` 中修改。

## 更新项目

编辑 `content/projects.json`。每个项目字段如下：

| 字段 | 用途 |
| --- | --- |
| `slug` | 稳定 URL，如 `creditflow`；小写英文、数字、连字符 |
| `name` | 卡片和详情页短名称 |
| `title` | 完整项目标题 |
| `subtitle` | 首页的一句话摘要 |
| `date` | 展示时间 |
| `tags` | 领域标签列表 |
| `details` | 详情页贡献列表，支持 `<strong>` 和 `<a>` 等简短 HTML |
| `url` | 可选 HTTPS 仓库、论文或项目链接，暂无则留空字符串 |

主页只显示摘要卡片，卡片始终进入本站详情页。填写 `url` 后，详情页会出现 “Visit project” 按钮。数组顺序决定项目显示顺序。添加项目只需添加一条记录并重新生成。

现有项目中的数字和成果声明沿用原主页内容；本次改版未重新核实研究结果。

## 写一篇博客

在 `content/posts/` 中新建 `2026-10-05-my-new-post.md`，也可以复制现有示例：

```markdown
---
title: "My new post"
date: "2026-10-05"
slug: my-new-post
description: "A short summary for the blog card and search engines."
tags: [Research, Notes]
cover: assets/images/mountains.jpg
coverAlt: "A description of the cover image"
lang: en
draft: false
---

Write an opening paragraph here.

## First section

Text, **bold**, *italic*, and [a link](https://example.com).

![Describe your image](../../assets/images/my-photo.jpg)

*A short caption.*

| Method | Result |
| :--- | ---: |
| Example | 1.0 |
```

- 日期必须加引号，使用 `YYYY-MM-DD`。
- `slug` 是文章 URL，必须唯一；发布后建议保持稳定。
- `description` 用于卡片摘要和页面描述，`coverAlt` 描述封面内容。
- 封面路径相对网站根目录，如 `assets/images/photo.jpg`；正文图片路径相对文章页面，因此使用 `../../assets/images/photo.jpg`。
- `##` 二级标题自动生成桌面版文章目录。手机端表格可横向滚动。
- 中文文章使用 `lang: zh-CN`；支持中英文标题和正文。
- `draft: true` 可隐藏草稿；重新生成后会删除该文章之前生成的 HTML。草稿源文件仍在公开仓库中，因此请勿把敏感内容放入公开仓库草稿。
- 列表、引用、表格、带语言标记的代码块均可使用；代码块保持原始格式，不依赖外部高亮脚本。默认不支持 Markdown 内嵌 HTML 或 LaTeX 公式。
- 文章按日期倒序排列；首页显示最新一篇，博客目录显示所有已发布文章。

## 图片素材

三张示例图片已存储于 `assets/images/`，页面加载不会请求第三方字体或图片。它们是 Unsplash 示例照片，**不表示本人摄影或旅行经历**；示例文章的表格数据也为虚构。

原始来源见 [assets/images/README.md](assets/images/README.md)。用自己的照片替换时，更新文件、图片说明与来源，尽量压缩至几百 KB。

## 发布更新

1. 修改源内容。
2. 运行 `npm run build` 和 `npm run check`。
3. 本地预览确认排版。
4. 提交源内容和生成的 HTML、图片一起，再按已有仓库发布方式推送。

此改版没有修改远端或发布设置，也没有添加自动部署。仓库根目录的 `.nojekyll` 让静态文件按原样发布。如果 GitHub Pages 当前使用分支发布，保留相应分支与根目录设置即可；如果使用自定义 Actions，请保持原来的发布流程。

## 视觉调整

`style.css` 顶部的 `--bg`、`--ink`、`--accent`、`--glass`、`--width` 控制基本主题。浮动导航和卡片使用半透明、背景模糊、边缘高光与柔和阴影；正文保持清晰对比度。已包含手机布局、键盘焦点、减少动画偏好、无背景模糊时的回退样式和打印样式。
