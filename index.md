---
title: Frank's Home Page
description: DevFrank's homepage - developer, open source enthusiast, sharing tech knowledge
---

🔧 Developer & 💻 Open source enthusiast

<span style="display:flex;align-items:center;gap:1rem">
  <span>分享有用的科技&生活知识～ 学习笔记｜日常记录｜实用软件</span>
  <img src="https://avatars.githubusercontent.com/frankwang98?v=4" width="48" height="48" style="border-radius:50%">
</span>

---

## Links

[<img src="https://github.githubassets.com/favicon.ico" width="16" height="16"> GitHub](https://github.com/frankwang98)
&nbsp;&nbsp;
[<img src="https://img-blog.csdnimg.cn/favicon.ico" width="16" height="16"> CSDN](https://devfrank.blog.csdn.net/)
&nbsp;&nbsp;
[<img src="https://bilibili.com/favicon.ico" width="16" height="16"> Bilibili](https://space.bilibili.com/286686575)
&nbsp;&nbsp;
<span class="gzh-pop"><img src="https://mp.weixin.qq.com/favicon.ico" width="16" height="16">公众号<img src="assets/gzh.jpg" class="gzh-img"></span>
&nbsp;&nbsp;
[📧 Email](mailto:854714081@qq.com)

<style>
.gzh-pop { position: relative; cursor: pointer; display: inline-block; }
.gzh-img {
  display: none;
  position: absolute;
  top: 1.5rem;
  left: 0;
  width: 380px;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.3);
  z-index: 100;
}
.gzh-pop:hover .gzh-img { display: block; }
</style>

---

## Projects

- 柠檬百宝盒 - 微信小程序，日常实用工具集合
- 柠檬大消除 - 休闲小游戏，水果消除玩法
- [ip-CLI工具箱](https://pypi.org/project/ipdisp/) - pip包 `pip install ipdisp`
- [home](http://frankwang98.github.io/home) - 个人主页模板
- [wiki](http://frankwang98.github.io/wiki) - 知识笔记 wiki
- [tools](https://tools-two-delta.vercel.app/) - 开发者在线工具集合

---

## Donate

<div class="donate-imgs">
  <img src="assets/wechat.png" alt="wechat">
  <img src="assets/alipay.png" alt="alipay">
</div>

---

## All Repositories

<details>
<summary>Click to expand</summary>

<div id="repos-container">
  <p>Loading...</p>
</div>

</details>

---

<small>Tribute to https://www.bellard.org/</small>

<style>
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
    --text-dim: #8b949e;
    --accent: #58a6ff;
    --link: #58a6ff;
  }
}

* { box-sizing: border-box; margin: 0; padding: 0; }

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;
  font-size: 14px;
  line-height: 1.5;
  background: var(--bg);
  color: var(--text);
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

h1 { font-size: 1.5rem; font-weight: 600; margin-bottom: 0.5rem; }
h2 { font-size: 0.85rem; font-weight: 600; color: var(--text-dim); text-transform: uppercase; letter-spacing: 0.05em; margin: 1.5rem 0 0.75rem; }

a { color: var(--link); text-decoration: none; }
a:hover { text-decoration: underline; }

hr { border: none; border-top: 1px solid var(--border); margin: 1.5rem 0; }

small { color: var(--text-dim); font-size: 0.8rem; }

ul { list-style: none; }
li { margin: 0.4rem 0; font-size: 0.95rem; }
li::before { content: '•'; color: var(--accent); margin-right: 0.5rem; }

/* Donate */
.donate-imgs {
  display: flex;
  gap: 1.5rem;
  margin-top: 0.5rem;
}
.donate-imgs img {
  width: 160px;
  height: 160px;
  object-fit: contain;
  border-radius: 8px;
  background: var(--card-bg);
  padding: 0.5rem;
  border: 1px solid var(--border);
}

/* Repos */
#repos-container { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 0.75rem; margin-top: 0.75rem; }

#repos-container article {
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 0.75rem;
}

#repos-container a { font-weight: 600; font-size: 0.95rem; }
#repos-container small { display: block; color: var(--text-dim); font-size: 0.8rem; margin: 0.25rem 0 0.5rem; line-height: 1.4; }
#repos-container div { display: flex; gap: 0.75rem; font-size: 0.75rem; color: var(--text-dim); }

kbd {
  background: var(--card-bg);
  color: var(--text-dim);
  border: 1px solid var(--border);
  border-radius: 3px;
  padding: 0.1rem 0.4rem;
  font-size: 0.75rem;
  font-family: monospace;
}

details { margin-top: 0.5rem; }
summary {
  cursor: pointer;
  color: var(--accent);
  font-weight: 600;
  padding: 0.5rem 0;
}
summary:hover { color: var(--text); }
</style>

<script>
(async function() {
  const container = document.getElementById('repos-container');
  try {
    const res = await fetch('https://api.github.com/users/frankwang98/repos?sort=updated&per_page=100');
    const repos = await res.json();
    if (!Array.isArray(repos)) throw new Error('Failed to fetch');
    const html = repos.map(repo => `
      <article>
        <a href="${repo.html_url}" target="_blank">${repo.name}</a>
        <small>${repo.description || 'No description'}</small>
        <div>
          ${repo.language ? `<kbd>${repo.language}</kbd>` : ''}
          <kbd>★ ${repo.stargazers_count}</kbd>
          <kbd>⑂ ${repo.forks_count}</kbd>
        </div>
      </article>
    `).join('');
    container.innerHTML = html;
  } catch(e) {
    container.innerHTML = '<p>Failed to load repositories</p>';
  }
})();
</script>