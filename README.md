# Frank Wang · Personal Site

个人展示与项目、知识库及内容平台链接入口。使用 Pandoc 构建静态网页，通过 GitHub Actions 发布到 GitHub Pages。

## 本地构建与预览

构建需要 Pandoc、Bash 和 Python 3；无需安装 Python 第三方包。

```bash
bash scripts/build.sh
bash preview.sh --serve
```

访问 http://localhost:8000 。本地与 CI 使用同一个构建脚本。

## 内容维护

- `content/home.json`：首页介绍、项目、自媒体账号与导航链接；按区块组织，`*_items` 数组可增删同类条目。
- `templates/home.html` 与 `templates/home-fragments.json`：首页布局，由构建脚本填入内容；日常无需修改。
- `404.md`：错误页内容。
- `assets/css/site.css`：共享样式；`assets/css/404.css`：错误页样式。
- `assets/js/site.js`：主题、导航与能力雷达。
- `templates/page.html`：共享 HTML 模板，读取 Markdown 的 title、description 等元信息。
- `content/articles/*.md`：可选文章，输出为 `/articles/文件名.html`。

文章示例（保存为 `content/articles/my-story.md`）：

```markdown
---
title: 我的工程实践
description: 一段工程实践的记录。
date: 2026-11-07
tags: [随笔, 工程]
---

## 起点

在这里编写 Markdown 正文。
```

文章生成后，无需修改首页数据，`/articles/` 会自动收录文章，按日期倒序展示，并支持正文搜索与标签筛选。文章文件名使用英文、数字和连字符。资源使用 `/assets/...` 绝对站点路径。本项目部署在域名根路径。

## 发布

PR 执行构建和 JavaScript 语法检查；main 推送构建成功后自动发布。只上传 `dist/`，不发布源码、维护文档和历史预览。`dist/` 为生成目录，不提交。保留 `CNAME` 以维护自定义域名。

图片直接从 assets 复制，新增或替换图片时同步准备需要的 WebP 版本。
