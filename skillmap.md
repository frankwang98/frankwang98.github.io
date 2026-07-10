---
title: 能力图谱 · 高级 / 资深 工程师对照
description: 机器人 / 自动驾驶工程师能力雷达图，对比当前 vs P6 高级 vs P7 资深，自动识别关键缺口
---

# 🧭 能力图谱 · 高级 / 资深 对照

> 把你的能力摆到 **P6 高级 / P7 资深** 的雷达上 — 一眼看出缺什么。

## 📡 综合能力雷达

<div class="legend">
  <span><i class="dot me"></i> 当前水平</span>
  <span><i class="dot p6"></i> P6 高级（团队 TL）</span>
  <span><i class="dot p7"></i> P7 资深（领域专家）</span>
</div>

<div id="chart" class="chart-box"></div>

## 🎯 关键缺口（距 P7）

<div id="gaps" class="gaps"></div>

## 📖 P6 → P7 差异

| 维度 | P6 高级 (团队 TL) | P7 资深 (领域专家) |
|---|---|---|
| **C++ 系统编程** | 大型代码库中独立完成复杂模块 | 设计跨团队公共库、推动 C++ 规范 |
| **Python / 数据 / ML** | 训练 / 部署深度学习模型 | 构建团队级数据闭环 / MLOps 平台 |
| **机器人 / 自动驾驶 领域** | 在感知 / 规划某方向独立交付 | 主导多模块协同、理解上下游系统 |
| **系统整合能力** | 解决子系统性能瓶颈 | 设计端到端 pipeline、把控接口与质量 |
| **数学 / 算法 / 前沿** | 应用 SOTA / 复现 paper | 改进算法 / 推动原创 / 落地重大方法论 |
| **工程化与架构** | 推动 CI/CD / 可观测性 | 设计大型系统架构、定工程标准 |
| **影响力与产品思维** | 带 3-5 人小组、技术分享 | 外部影响力：开源 / 大会 / 标准 / 行业判断 |

---

<small>💡 自评：编辑页面底部 <code>SKILL_SCORES</code> 中的 0-5 分，保存后刷新即可看到新雷达与缺口排序。</small>

<style>
:root {
  --bg: #ffffff;
  --card-bg: #f6f8fa;
  --border: #d0d7de;
  --text: #24292f;
  --text-dim: #57606a;
  --accent: #0969da;
  --accent-2: #1f883d;
}
@media (prefers-color-scheme: dark) {
  :root {
    --bg: #0d1117;
    --card-bg: #161b22;
    --border: #30363d;
    --text: #c9d1d9;
    --text-dim: #8b9496;
    --accent: #58a6ff;
    --accent-2: #56d364;
  }
}

.chart-box {
  width: 100%;
  height: 520px;
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 0.5rem;
  margin: 1rem 0;
}

.legend {
  display: flex;
  gap: 1.2rem;
  font-size: 0.85rem;
  color: var(--text-dim);
  align-items: center;
  margin: 0.5rem 0;
  flex-wrap: wrap;
}
.legend .dot {
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin-right: 0.35rem;
  vertical-align: middle;
}
.legend .dot.me { background: #58a6ff; }
.legend .dot.p6 { background: #f78166; }
.legend .dot.p7 { background: #d2a8ff; }

.gaps { display: grid; gap: 0.5rem; margin: 1rem 0; }
.gap-item {
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 0.55rem 0.75rem;
}
.gap-head {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.4rem;
}
.gap-head .rank {
  display: inline-flex;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: var(--accent);
  color: #fff;
  align-items: center;
  justify-content: center;
  font-size: 0.78rem;
  font-weight: 600;
  flex-shrink: 0;
}
.gap-head .cat {
  flex: 1;
  color: var(--text);
  font-weight: 500;
  font-size: 0.92rem;
}
.gap-head .num {
  font-family: ui-monospace, 'SF Mono', monospace;
  font-size: 0.78rem;
  color: var(--text-dim);
  white-space: nowrap;
}
.gap-item .bar {
  height: 5px;
  background: var(--border);
  border-radius: 3px;
  overflow: hidden;
}
.gap-item .bar .fill {
  display: block;
  height: 100%;
  background: linear-gradient(90deg, #f78166, #d2a8ff);
  border-radius: 3px;
  transition: width 0.5s ease;
}
.gap-item.is-done .bar .fill { background: var(--accent-2); }
.gap-item.is-done { opacity: 0.65; }
.gap-item.is-done .rank { background: var(--accent-2); }

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.88rem;
  margin: 1rem 0;
}
th, td {
  text-align: left;
  padding: 0.55rem 0.6rem;
  border-bottom: 1px solid var(--border);
  vertical-align: top;
}
th {
  font-weight: 600;
  color: var(--text-dim);
  font-size: 0.78rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}
td:first-child { width: 22%; font-weight: 500; color: var(--accent); }
tr:hover td { background: var(--card-bg); }

@media (max-width: 640px) {
  .chart-box { height: 380px; }
}
</style>

<script src="https://cdn.jsdelivr.net/npm/echarts@5.5.0/dist/echarts.min.js"></script>
<script>
// =============================================================
//  👉 编辑这里：每个维度 0-5 分，保存后刷新即生效
// =============================================================
const SKILL_SCORES = {
  'C++ 系统编程': 3,
  'Python / 数据 / ML': 4,
  '机器人 / 自动驾驶 领域': 3,
  '系统整合能力': 3,
  '数学 / 算法 / 前沿': 4,
  '工程化与架构': 3,
  '影响力与产品思维': 2,
};

// P6 高级工程师（团队 TL）参考
const P6_SCORES = {
  'C++ 系统编程': 4.0,
  'Python / 数据 / ML': 3.8,
  '机器人 / 自动驾驶 领域': 4.2,
  '系统整合能力': 4.0,
  '数学 / 算法 / 前沿': 3.8,
  '工程化与架构': 4.0,
  '影响力与产品思维': 3.5,
};

// P7 资深专家（领域权威）参考
const P7_SCORES = {
  'C++ 系统编程': 4.5,
  'Python / 数据 / ML': 4.5,
  '机器人 / 自动驾驶 领域': 4.7,
  '系统整合能力': 4.7,
  '数学 / 算法 / 前沿': 4.5,
  '工程化与架构': 4.6,
  '影响力与产品思维': 4.5,
};

// =============================================================
//  下面无需改
// =============================================================
const CATEGORIES = Object.keys(SKILL_SCORES);

function isDark() {
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
}

let chart;

function renderRadar() {
  const el = document.getElementById('chart');
  if (chart) chart.dispose();
  chart = echarts.init(el, isDark() ? 'dark' : null);
  const theme = getComputedStyle(document.body);
  chart.setOption({
    backgroundColor: 'transparent',
    tooltip: { trigger: 'item' },
    legend: {
      data: ['当前', 'P6 高级', 'P7 资深'],
      bottom: 6,
      textStyle: { color: theme.getPropertyValue('--text') },
    },
    radar: {
      indicator: CATEGORIES.map(c => ({ name: c, max: 5 })),
      splitArea: {
        areaStyle: {
          color: isDark()
            ? ['rgba(22,27,34,0.4)', 'rgba(48,54,61,0.4)']
            : ['rgba(246,248,250,0.4)', 'rgba(208,215,222,0.4)'],
        },
      },
      splitLine: { lineStyle: { color: isDark() ? '#30363d' : '#d0d7de' } },
      axisLine: { lineStyle: { color: isDark() ? '#30363d' : '#d0d7de' } },
      axisName: { color: theme.getPropertyValue('--text-dim'), fontSize: 12 },
    },
    series: [{
      type: 'radar',
      symbol: 'circle',
      symbolSize: 6,
      data: [
        {
          value: CATEGORIES.map(c => SKILL_SCORES[c]),
          name: '当前',
          areaStyle: { opacity: 0.35, color: '#58a6ff' },
          lineStyle: { color: '#58a6ff', width: 2 },
          itemStyle: { color: '#58a6ff' },
        },
        {
          value: CATEGORIES.map(c => P6_SCORES[c]),
          name: 'P6 高级',
          areaStyle: { opacity: 0.05 },
          lineStyle: { color: '#f78166', width: 1.5, type: 'dashed' },
          itemStyle: { color: '#f78166' },
        },
        {
          value: CATEGORIES.map(c => P7_SCORES[c]),
          name: 'P7 资深',
          areaStyle: { opacity: 0.08, color: '#d2a8ff' },
          lineStyle: { color: '#d2a8ff', width: 2.5 },
          itemStyle: { color: '#d2a8ff' },
        },
      ],
    }],
  });
}

function renderGaps() {
  const maxDelta = 5;
  const gaps = CATEGORIES.map(c => {
    const me = SKILL_SCORES[c];
    const p7 = P7_SCORES[c];
    return { cat: c, me, p7, gap: +(p7 - me).toFixed(2) };
  }).sort((a, b) => b.gap - a.gap);

  const el = document.getElementById('gaps');
  el.innerHTML = gaps.map((g, i) => {
    const done = g.gap <= 0.2;
    const pct = Math.min(100, (g.gap / maxDelta) * 100);
    return `
      <div class="gap-item ${done ? 'is-done' : ''}">
        <div class="gap-head">
          <span class="rank">${done ? '✓' : i + 1}</span>
          <span class="cat">${g.cat}</span>
          <span class="num">${g.me} → ${g.p7}  ·  Δ ${g.gap}</span>
        </div>
        <div class="bar"><span class="fill" style="width:${pct}%"></span></div>
      </div>`;
  }).join('');
}

function init() {
  if (typeof echarts === 'undefined') {
    document.getElementById('chart').innerHTML =
      '<p style="text-align:center;color:#888;padding:2rem;">ECharts CDN 加载失败，请检查网络后刷新</p>';
    return;
  }
  renderRadar();
  renderGaps();
  window.addEventListener('resize', () => chart && chart.resize());
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
      renderRadar();
    });
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
</script>
