#!/bin/bash
# Convert a markdown file to preview.html with pandoc + page-specific head include.
# Usage: ./preview.sh [file.md]   (default: index.md)
#
# Mirrors the GitHub Pages CI pipeline (.github/workflows/static.yml):
#   - No Pico CSS (inline <style> blocks already cover everything)
#   - Per-page head partial for shared <meta> + OG / Twitter cards

cd "$(dirname "$0")"

INPUT="${1:-index.md}"
NAME="$(basename "$INPUT" .md)"
HEAD="partials/head-${NAME}.html"
OUTPUT="preview.html"

case "$NAME" in
  404) PAGETITLE="404 — Frank Wang" ;;
  *) PAGETITLE="Frank Wang — Robotics Engineer · AI Explorer · Tech Creator" ;;
esac

if [ ! -f "$HEAD" ]; then
  echo "warning: missing $HEAD — falling back to partials/head-index.html" >&2
  HEAD="partials/head-index.html"
fi

pandoc --standalone \
  --css="data:text/css;base64," \
  --include-in-header="$HEAD" \
  --metadata=title: \
  --metadata="pagetitle=${PAGETITLE}" \
  -f markdown \
  -t html5 \
  "$INPUT" \
  -o "$OUTPUT"

echo "Done! Open ${OUTPUT} to preview."
