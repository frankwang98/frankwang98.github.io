(async function () {
  const search = document.getElementById('blog-search');
  const tag = document.getElementById('blog-tag');
  const cards = Array.from(document.querySelectorAll('[data-post]'));
  try {
    const response = await fetch('/articles/search.json');
    if (!response.ok) throw new Error('Search index unavailable');
    const posts = await response.json();
    if (posts.length !== cards.length) throw new Error('Search index mismatch');
    function filter() {
      const query = search.value.trim().toLocaleLowerCase();
      let count = 0;
      posts.forEach((post, index) => {
        const text = [post.title, post.description, post.text, ...post.tags].join(' ').toLocaleLowerCase();
        const matches = (!query || text.includes(query)) && (!tag.value || post.tags.includes(tag.value));
        cards[index].hidden = !matches;
        if (matches) count++;
      });
      document.getElementById('blog-count').textContent = `共 ${count} 篇文章 · 按日期倒序`;
      document.getElementById('blog-empty').hidden = count !== 0;
    }
    document.querySelector('.blog-filters').hidden = false;
    search.addEventListener('input', filter);
    tag.addEventListener('change', filter);
    filter();
  } catch (error) {
    // Static article links remain accessible when search cannot load.
    console.warn('Article search unavailable', error);
  }
})();
