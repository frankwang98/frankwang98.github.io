# CLAUDE.md — Frank's Personal Site

> 给 Claude / 后续维护者的快速参考。所有信息基于仓库现状（无 `_config.yml`、无 Gemfile、纯静态 GitHub Pages）。

---

## 项目概况

| 项 | 值 |
|---|---|
| 仓库 | `frankwang98/frankwang98.github.io`（**User Page**） |
| 类型 | 纯静态 GitHub Pages 个人主页（**技术个人品牌站点**） |
| 域名 | `frankwang98.asia`（由 `CNAME` 文件声明） |
| 部署 | push 到 `main` → `.github/workflows/static.yml` 用 `pandoc` 把根目录 `*.md` 转 `*.html` → GitHub Pages 部署 |
| 主语言 | 中文（部分英文） |
| 视觉系统 | 单页长滚动 + 极简 mono（`--text #0a0a0a` ↔ `#ededee`）+ 单一强调色 `--accent #6366F1` / 暗 `#818cf8` |

## 技术栈与构建

- **没有 Jekyll 自定义配置**：无 `_config.yml`、无 `Gemfile`、无 `package.json`。
- **运行时渲染**：`.github/workflows/static.yml` 在 CI 中 `pandoc --standalone --self-contained ...` 转 `*.md` → `*.html`（`README.md` 与 `CLAUDE.md` 跳过），再由 GitHub Pages 部署。原仓库里**没有任何 Jekyll 主题产物**——最终视觉完全靠内嵌 `<style>` 控制。
- **本地预览**：`pandoc` + `preview.sh`。**没有真正的打包工具**（无 Vite/Webpack）。
- **第三方依赖**：通过 CDN 加载（`cdn.jsdelivr.net`）。例：ECharts。CSS 变量系统全部内联，不需要 Pico CSS（虽然 `preview.sh` 仍会带 Pico，但 GitHub Pages 部署版不带任何外部 CSS）。

## 关键文件

| 路径 | 作用 |
|---|---|
| [`index.md`](index.md) | 首页（单页长滚动：Hero / About+雷达 / Projects / Knowledge / Content / Journey / Footer + sticky nav + 主题切换） |
| [`skillmap.md`](skillmap.md) | 能力图谱深度页（雷达图对照 P6/P7 + 自动缺口排序）— 旧链接 `skillmap.html` 仍可直访 |
| [`404.md`](404.md) | GitHub Pages 404 fallback（与首页同一视觉语言） |
| [`preview.sh`](preview.sh) | 本地预览脚本：`bash preview.sh [file.md]`，默认输出 `preview.html` |
| [`preview.html`](preview.html) | `preview.sh` 生成的预览产物（**已 commit**，充当快照） |
| [`CNAME`](CNAME) | 自定义域名 `frankwang98.asia` |
| [`assets/`](assets/) | 静态资源（`frankwang98.png` 用作 Hero 头像 / favicon） |
| `README.md` | 项目说明（GitHub 仓库页显示） |

## 关键约定（写新内容前先读这一节）

### 1. Markdown 内嵌 HTML/JS 是合法的

- `.md` 文件内**允许 `<style>` / `<script>` 块**，Jekyll kramdown 会原样透传。
- pandoc 也透传，所以本地预览与线上行为一致。
- ⚠️ **避免 Liquid 模板语法 `{{ ... }}`** —— 会被 Jekyll 当成模板变量处理。模板字符串用反引号 `` ` `` + `${}` 即可（不会触发 Liquid）。

### 2. YAML Front Matter

```yaml
---
title: 页面标题
description: 描述
link: assets/xxx.png   # 仅首页用作头像
---
```

> 多数页面**不需要 `layout`**，因为样式都内嵌覆盖了默认主题。如果需要 Jekyll 主题体系，加 `layout: default` 即可。

### 3. 视觉系统（CSS 变量）

色彩基调：**Mono + 单一强调色**。白底用 `#ffffff` ↔ 暗底 `#0a0a0a`，文本在白底 `=#0a0a0a`，暗底 `=#ededee`，无第三方调色板。强调色 `electric indigo`：
- Light: `--accent: #6366F1` / `--accent-soft: rgba(99,102,241,0.08)`
- Dark:  `--accent: #818cf8` / `--accent-soft: rgba(129,140,248,0.12)`

```css
:root {
  --bg: #ffffff;
  --bg-elev: #f6f6f7;
  --border: #e5e5e7;
  --text: #0a0a0a;
  --text-dim: #6b6b6b;
  --accent: #6366F1;
  --accent-2: #818cf8;
  --accent-soft: rgba(99,102,241,0.08);
  --font-sans: ui-sans-serif, -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif;
  --font-mono: ui-monospace, 'SF Mono', Menlo, Consolas, monospace;
}
@media (prefers-color-scheme: dark) {
  :root {
    --bg: #0a0a0a; --bg-elev: #141416; --border: #262626;
    --text: #ededee; --text-dim: #8a8a8e;
    --accent: #818cf8; --accent-2: #a5b4fc; --accent-soft: rgba(129,140,248,0.12);
  }
}
```

主题切换：右上角 `theme-toggle` 按钮循环 `system → light → dark`，状态写在 `localStorage['fw.theme']`，通过 `document.documentElement[data-theme]` 覆盖 `prefers-color-scheme`。新增页面复用同一个变量名集合即可。

### 4. 资源引用规则

- **第三方**：CDN（jsdelivr / unpkg）—— 见 `echarts.min.js` 用法
- **仓库内**：相对路径，例如 `assets/csdn.png`
- **GitHub favicons**：直接用 `https://github.githubassets.com/favicon.ico` 这类公共资源
- **emoji**：直接用原生 Unicode，如 `🧭 📡 📊 🔧 💻`

### 5. 内容写法

- **首页是单页长滚动**：所有内容都在 [`index.md`](index.md) 一个文件里，按 7 个 `<section id="...">` 排开（hero / about / projects / knowledge / content / journey / footer）。
- 每个区块顶部用 `<p class="eyebrow">`（small uppercase mono + accent 颜色）打标签，紧接 `<h2>` 写区段标题。
- 子标题层级：`h2`（section 标题）、`h3`（组标签如 "Open Source Tools"）、`h4`（卡片标题）。
- 折叠区优先用 `<details><summary>`，但**当首选要**直接做成 `<article class="card">` 卡片（用 CSS 网格排版）。
- HTML 卡片里**避免 Markdown 语法**（pandoc 在 HTML 内对 `**bold**` 等语法行为可能不一致）——直接用 `<strong>` / `<code>` 等原生标签。

## 添加新子页 / 新区块的标准流程

> **当前策略**：首页是单页长滚动，新内容**优先作为新 `<section>` 添加到 [`index.md`](index.md)**。独立成 `xxx.md` 仅在内容深度超 800 行或主题明显独立时使用（如 [`skillmap.md`](skillmap.md) 是「深度版」雷达图）。

**A. 仅在首页加区块：**
1. 在 [`index.md`](index.md) 现有 `</section>` 之前插入新 `<section id="...">`
2. 在 nav `<ul class="nav-links">` 里追加对应 `<a data-nav>` 链接（保持字母顺序友好即可）
3. 复用已有的 CSS 变量与 `.card` / `.grid` 工具类，**只在样式需要新增时才写新规则**

**B. 真的需要独立页：**
1. 在仓库根创建 `xxx.md`（不要放子目录，URL 就是 `xxx.html`），顶部 frontmatter：`title`、`description`
2. 内容开头用 `<p class="eyebrow">` + `<h1>` 收头，至少复制一份 `:root` 变量系统
3. 如要让访客能到达新页，需要在 [`index.md`](index.md) Footer 之上加一个跳转入口（一般是 Footer 链接区，或 Hero CTA 的 ghost 按钮）
4. 本地预览：`bash preview.sh xxx.md`（会覆盖 `preview.html`，预览完跑 `bash preview.sh index.md` 恢复）
5. 浏览器 DevTools 无报错后 commit + push（main 分支）

## 写"能力图谱"类页面的注意事项

[`skillmap.md`](skillmap.md) 是一个参考实现，包含：
- **单雷达图 + 多系列对照**（当前 vs P6 高级 vs P7 资深）
- **自动缺口排序**：每个维度 `Δ = P7 - 当前`，按缺口从大到小排序展示
- **可编辑数据**：修改页面底部 `SKILL_SCORES` 对象保存即可刷新
- **明/暗主题自适应**：通过 `prefers-color-scheme` 切换 ECharts `dark` 主题
- **可视化亮点突出 P7**：P7 系列用粗实线 + 浅色填充，P6 用虚线作为中间参照

通用对照模式（如想做"语言 X 对照"或"领域对照"）可直接复用：

```html
<div id="chart"></div>            <!-- 雷达 -->
<div id="gaps"></div>              <!-- 自动缺口条形列表 -->
```

并维护以下 JS 数据对象：
```js
const SKILL_SCORES = { ... };      // 👉 用户编辑的自评（0-5）
const P6_SCORES    = { ... };      // 行业参考（一般不改）
const P7_SCORES    = { ... };      // 行业参考（一般不改）

function renderRadar() { ... }     // 三系列叠加
function renderGaps()   { ... }     // 自动排序并显示 Δ
```

> 💡 三层框架：**自评 → 行业中段参考 → 行业顶端参考**，雷达形状直接映射职级段位。

## 已知坑 / 提醒

- `preview.html` 是**已 commit** 的产物，被改回 Windows 行尾 / 重新生成时记得 commit 新版以保留最新快照。
- pandoc 与 Jekyll 渲染在**表格列宽**、**`<details>` 默认状态**等细节上偶有差异，重要布局建议同时在浏览器和 `preview.html` 比对。
- `CNAME` 文件**不要删除**，否则自定义域名失效。
- 站内 JS（`index.md` 末段）是 async 拉取 GitHub API，**有 60 次/小时（未鉴权）的限流**；如果访问量大的页面重复触发抓取，可能触发限流——但本仓库目前只有首页一次调用，无影响。
- ECharts 通过 CDN 加载，离线 / 内网环境下图表会失败；目前接受这个 trade-off。
- 修改后**不要忘记在 `preview.html` 重新生成新快照并 commit**，否则 CI/外部预览可能用过时版本。

## 常用命令速查

```bash
# 本地预览首页
bash preview.sh                       # 默认 index.md → preview.html

# 本地预览其他页面
bash preview.sh skill-map.md          # 输出 preview.html

# 单独看渲染结果（macOS）
open preview.html

# 看变更
git status
git diff index.md
```

## 改不动时去查这里

- GitHub Pages 默认渲染行为 → 官方文档 "About GitHub Pages"
- Pandoc 选项含义 → `man pandoc` 或 [pandoc.org/MANUAL](https://pandoc.org/MANUAL.html)
- Jekyll kramdown 透传规则 → 官方 "Templates / Variables"
- ECharts 配置项 → [echarts.apache.org](https://echarts.apache.org/zh/option.html)
