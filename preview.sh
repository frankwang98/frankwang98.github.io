#!/bin/bash
# Convert a markdown file to preview.html with pandoc
# Usage: ./preview.sh [file.md]   (default: index.md)

cd "$(dirname "$0")"

INPUT="${1:-index.md}"
OUTPUT="preview.html"

pandoc --standalone \
  --css=https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css \
  -f markdown \
  -t html5 \
  "$INPUT" \
  -o "$OUTPUT"

echo "Done! Open ${OUTPUT} to preview."
echo "  Tip: ./preview.sh skillmap.md    # preview the capability map"