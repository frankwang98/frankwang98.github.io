#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"
bash scripts/build.sh
if [ "${1:-}" = '--serve' ]; then
  echo 'Preview: http://localhost:8000'
  python3 -m http.server 8000 --directory dist
else
  echo '运行 bash preview.sh --serve 开启本地预览'
fi
