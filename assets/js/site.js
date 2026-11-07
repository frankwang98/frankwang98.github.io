
// =============================================================
// Theme switch (system / light / dark) with localStorage
// =============================================================
(function(){
  var KEY = 'fw.theme';
  function apply(theme){
  if (theme === 'system' || !theme) {
  document.documentElement.removeAttribute('data-theme');
  } else {
  document.documentElement.setAttribute('data-theme', theme);
  }
  }
  var saved = null;
  try { saved = localStorage.getItem(KEY); } catch(e){}
  if (!saved) saved = 'system';
  apply(saved);

  var btn = document.querySelector('.theme-toggle');
  if (!btn) return;
  btn.addEventListener('click', function(){
  var cur = document.documentElement.getAttribute('data-theme') || 'system';
  var next = cur === 'system' ? 'light' : (cur === 'light' ? 'dark' : 'system');
  apply(next);
  try { localStorage.setItem(KEY, next); } catch(e){}
  });
})();

// =============================================================
// Active section highlight on scroll (IntersectionObserver)
// =============================================================
(function(){
  var links = document.querySelectorAll('[data-nav]');
  if (!links.length) return;
  var targets = {};
  links.forEach(function(l){
  var id = l.getAttribute('href').slice(1);
  var el = document.getElementById(id);
  if (el) targets[id] = { link: l, el: el };
  });
  function setActive(id){
  links.forEach(function(l){ l.classList.remove('is-active'); });
  if (targets[id]) targets[id].link.classList.add('is-active');
  }
  var observer = new IntersectionObserver(function(entries){
  // Pick the topmost intersecting
  var visible = entries
  .filter(function(e){ return e.isIntersecting; })
  .sort(function(a,b){ return a.boundingClientRect.top - b.boundingClientRect.top; })[0];
  if (visible) setActive(visible.target.id);
  }, { rootMargin: '-30% 0px -55% 0px', threshold: 0 });
  Object.values(targets).forEach(function(t){ observer.observe(t.el); });
})();

// =============================================================
// ECharts radar — current capability + growth direction
// Lazy init on intersection
// =============================================================
const SKILL_SCORES = window.HOME_RADAR?.current || {};
const TARGET_SCORES = window.HOME_RADAR?.target || {};
const CATEGORIES = Object.keys(SKILL_SCORES);

function isDark() {
  var stored = document.documentElement.getAttribute('data-theme');
  if (stored === 'dark' || stored === 'light') return stored === 'dark';
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
}

let radarChart;
function renderRadar(){
  var el = document.getElementById('radar');
  if (!el || typeof echarts === 'undefined') return;
  if (radarChart) radarChart.dispose();
  radarChart = echarts.init(el, isDark() ? 'dark' : null);
  var s = getComputedStyle(document.body);
  var dark = isDark();
  radarChart.setOption({
  backgroundColor: 'transparent',
  tooltip: { trigger: 'item' },
  radar: {
  indicator: CATEGORIES.map(function(c){ return { name: c, max: 5 }; }),
  splitArea: {
  areaStyle: {
  color: dark ? ['rgba(20,20,22,0.4)', 'rgba(38,38,38,0.4)'] : ['rgba(246,246,247,0.4)', 'rgba(229,229,231,0.4)']
  }
  },
  splitLine: { lineStyle: { color: dark ? '#262626' : '#e5e5e7' } },
  axisLine:   { lineStyle: { color: dark ? '#262626' : '#e5e5e7' } },
  axisName: { color: s.getPropertyValue('--text-dim'), fontSize: 11 }
  },
  series: [{
  type: 'radar',
  symbol: 'circle',
  symbolSize: 4,
  data: [
  {
  name: '当前',
  value: CATEGORIES.map(function(c){ return SKILL_SCORES[c]; }),
  areaStyle: { opacity: 0.30, color: '#6366F1' },
  lineStyle: { color: '#6366F1', width: 2 },
  itemStyle: { color: '#6366F1' }
  },
  {
  name: '成长方向',
  value: CATEGORIES.map(function(c){ return TARGET_SCORES[c]; }),
  areaStyle: { opacity: 0.06, color: '#a5b4fc' },
  lineStyle: { color: '#a5b4fc', width: 1.5, type: 'dashed' },
  itemStyle: { color: '#a5b4fc' }
  }
  ]
  }]
  });
}

(function(){
  var el = document.getElementById('radar');
  if (!el) return;
  var ECHARTS_URL = 'https://cdn.jsdelivr.net/npm/echarts@5.5.0/dist/echarts.min.js';
  var loading = false;
  function ensureECharts(cb){
  if (typeof echarts !== 'undefined') return cb();
  if (loading) return; // already in flight
  loading = true;
  var s = document.createElement('script');
  s.src = ECHARTS_URL;
  s.async = true;
  s.onload = function(){ cb(); };
  s.onerror = function(){ loading = false; }; // Keep the page usable if the chart CDN is unavailable.
  document.head.appendChild(s);
  }
  var observer = new IntersectionObserver(function(entries){
  entries.forEach(function(e){
  if (e.isIntersecting) {
  ensureECharts(function(){ renderRadar(); });
  observer.disconnect();
  }
  });
  }, { rootMargin: '200px 0px' });
  observer.observe(el);
  window.addEventListener('resize', function(){ if (radarChart) radarChart.resize(); });
  // Re-render on theme change
  if (window.matchMedia) {
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', renderRadar);
  }
  // Theme toggle already toggles data-theme — observe attribute changes for re-render
  new MutationObserver(renderRadar).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
})();
