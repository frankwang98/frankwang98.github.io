#!/bin/bash
# Convert index.md to index.html with pandoc

cd "$(dirname "$0")"

pandoc --standalone \
  --css=https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css \
  -f markdown \
  -t html5 \
  index.md \
  -o preview.html

echo "Done! Open preview.html to preview."