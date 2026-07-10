# CLAUDE.md — Frank's Personal Site

> 给 Claude / 后续维护者的快速参考。所有信息基于仓库现状（无 `_config.yml`、无 Gemfile、纯静态 GitHub Pages）。

---

## 项目概况

| 项 | 值 |
|---|---|
| 仓库 | `frankwang98/frankwang98.github.io`（**User Page**） |
| 类型 | 纯静态 GitHub Pages 个人主页 |
| 域名 | `frankwang98.github.io`（由 `CNAME` 文件声明） |
| 部署 | `main` 分支 push 后由 GitHub Pages 自动渲染 |
| 主语言 | 中文（部分英文） |

## 技术栈与构建

- **没有 Jekyll 自定义配置**：无 `_config.yml`、无 `Gemfile`、无 `package.json`。
- **运行时渲染**：GitHub Pages 启用默认 Jekyll（kramdown + minima theme 占位），但仓库内文件**刻意用内嵌 `<style>` 覆盖主题样式**，最终视觉由内嵌 CSS 控制。
- **本地预览**：`pandoc` + `preview.sh`。**没有真正的打包工具**（无 Vite/Webpack）。
- **第三方依赖**：通过 CDN 加载（`cdn.jsdelivr.net`）。例：ECharts、Pico CSS。

## 关键文件

| 路径 | 作用 |
|---|---|
| [`index.md`](index.md) | 首页（社交链接 + 项目 + 关注图 + GitHub repos 自动抓取） |
| [`skillmap.md`](skillmap.md) | 能力图谱子页（雷达图对照 P6/P7 + 自动缺口排序，支持自评） |
| [`preview.sh`](preview.sh) | 本地预览脚本：`bash preview.sh [file.md]`，默认输出 `preview.html` |
| [`preview.html`](preview.html) | `preview.sh` 生成的预览产物（**已 commit**，充当快照） |
| [`CNAME`](CNAME) | 自定义域名 |
| [`assets/`](assets/) | 静态资源（图标、二维码、pay 收款码、公众号二维码、本地 favicon） |
| [`history/`](history/) | 历史归档页面（独立 HTML） |
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

### 3. 主题（Light / Dark）

```css
:root {
  --bg: #ffffff;
  --card-bg: #f6f8fa;
  --border: #d0d7de;
  --text: #24292f;
  --text-dim: #57606a;
  --accent: #0969da;
  --link: #0969da;
}
@media (prefers-color-scheme: dark) {
  :root {
    --bg: #0d1117;
    --card-bg: #161b22;
    --border: #30363d;
    --text: #c9d1d9;
    --text-dim: #8b9496;
    --accent: #58a6ff;
    --link: #58a6ff;
  }
}
```

新增页面若需要暗色支持，复制以上两段即可；变量名保持**全站统一**。

### 4. 资源引用规则

- **第三方**：CDN（jsdelivr / unpkg）—— 见 `echarts.min.js` 用法
- **仓库内**：相对路径，例如 `assets/csdn.png`
- **GitHub favicons**：直接用 `https://github.githubassets.com/favicon.ico` 这类公共资源
- **emoji**：直接用原生 Unicode，如 `🧭 📡 📊 🔧 💻`

### 5. 内容写法

- 小标题统一 `<h2>`，样式上小写、灰底色
- 列表项使用项目符号（已有 `li::before` 注入 `•`）
- 列表项目：**短链接 → 描述**
- 折叠区优先用 `<details><summary>`，例：`index.md` 的 "All Repositories" 模块

## 添加新子页的标准流程

1. 在仓库根创建 `xxx.md`（不要放子目录，URL 就是 `xxx.html`）
2. 顶部放 front matter：`title`、`description`
3. 内容用 Markdown + 可选内嵌 `<style>` / `<script>`
4. 在 [`index.md`](index.md) 增加一个导航入口到 `Pages` 区块
5. 本地预览：
   ```bash
   bash preview.sh xxx.md
   open preview.html
   ```
6. 浏览器开发者工具确认无报错后，commit + push（main 分支）

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
