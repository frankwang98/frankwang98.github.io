# Personal site maintenance

以 README.md 和实际实现为准。站点使用 Pandoc 静态构建，不使用 Jekyll。

- 首页用于个人展示与关联链接，避免添加无内容占位区块。
- 首页内容入口为 content/home.json；其余页面为 404.md 与 content/articles/*.md。首页模板为 templates/home.html 和 templates/home-fragments.json，使用 scripts/render_home.py 转义并渲染，无第三方 Python 依赖。
- 共享模板为 templates/page.html；CSS 和 JavaScript 位于 assets/css 和 assets/js。
- 本地和 CI 均执行 bash scripts/build.sh，只发布 dist/。
- 运行 bash preview.sh --serve 后通过 HTTP 检查页面，不直接打开 HTML 文件。
- 新文章使用 title、description、date front matter；输出路径为 /articles/<slug>.html。
- 保持现有视觉风格、主题切换和展示内容；不要自动 commit 或 push。
- JavaScript 修改后运行 node --check assets/js/site.js。
