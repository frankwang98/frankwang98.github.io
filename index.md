# Frank's Home Page

> Write once, run anywhere.

---

## About

- 🔧 Developer
- 💻 Open source enthusiast

---

## Links

- [GitHub](https://github.com/frankwang98)
- [CSDN](#) <!-- TODO: add your CSDN link -->
- [Bilibili](#) <!-- TODO: add your Bilibili link -->

---

## Projects

- [home](http://frankwang98.github.io/home): A beautiful homepage
- [webnav](http://frankwang98.github.io/webnav): A website navigator
- [cpp](http://frankwang98.github.io/devfrank_cpp): Commonly used cpp libraries
- [wiki](http://frankwang98.github.io/wiki): A wiki page
- [tools](https://tools-two-delta.vercel.app/): Some useful tools

---

## GitHub

- [cpp_action_demo](https://github.com/frankwang98/cpp_action_demo): A GitHub Action of C++
- [ubuntu_automation_tool](https://github.com/frankwang98/ubuntu_automation_tool): Automate Ubuntu usage

---

> Tribute to https://www.bellard.org/

---

## All Repositories

<div id="repos-container">
  <p>Loading...</p>
</div>

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
        </div>
      </article>
    `).join('');
    container.innerHTML = html;
  } catch(e) {
    container.innerHTML = '<p>Failed to load repositories</p>';
  }
})();
</script>