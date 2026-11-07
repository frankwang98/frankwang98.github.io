#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
command -v python3 >/dev/null || { echo '需要安装 Python 3' >&2; exit 1; }
command -v pandoc >/dev/null || { echo '需要安装 pandoc' >&2; exit 1; }
# Only generated output is replaced; source files remain untouched.
rm -rf dist
mkdir -p dist/articles
cp -R assets dist/assets
cp CNAME dist/CNAME
touch dist/.nojekyll
render() {
  local source="$1" output="$2" url="$3"
  shift 3
  pandoc --standalone --template=templates/page.html -f markdown -t html5 \
    --metadata="canonical=https://frankwang98.asia${url}" "$@" "$source" -o "$output"
}
python3 scripts/render_home.py
pandoc --standalone --template=templates/page.html -f markdown -t html5 \
  --metadata-file=dist/home-meta.json \
  --metadata=canonical:https://frankwang98.asia/ \
  dist/home-body.md -o dist/index.html
rm dist/home-body.md dist/home-meta.json
render 404.md dist/404.html /404.html --metadata=notfound:true --metadata=noindex:true
for source in content/articles/*.md; do
  [ -f "$source" ] || continue
  name="$(basename "$source" .md)"
  render "$source" "dist/articles/$name.html" "/articles/$name.html" --metadata=article:true
done
python3 scripts/build_blog.py
echo 'Built dist/'
