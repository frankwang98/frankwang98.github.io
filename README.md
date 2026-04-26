# frankwang98.github.io

My personal website powered by GitHub Pages.

## How to Update

1. Edit `index.md`
2. Commit and push
3. GitHub Actions will automatically convert Markdown to HTML

## Build

```bash
# Install pandoc locally (optional)
brew install pandoc

# Convert locally
pandoc --standalone --self-contained --css=https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css -f markdown -t html5 index.md -o index.html
```