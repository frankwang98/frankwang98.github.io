"""Render escaped homepage data without third-party dependencies."""
import html
import json
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parent.parent
TOKEN = re.compile(r'\$\{([\w]+)(?:\|([\w]+))?\}')


def render(template, data, fragments):
    def substitute(match):
        value = data[match[1]]
        fragment = match[2]
        if fragment:
            rows = value if isinstance(value, list) else [value]
            return '\n'.join(render(fragments[fragment], row, fragments) for row in rows)
        return html.escape(str(value), quote=True)
    return TOKEN.sub(substitute, template)


def main():
    data = json.loads((ROOT / 'content/home.json').read_text())
    fragments = json.loads((ROOT / 'templates/home-fragments.json').read_text())
    body = render((ROOT / 'templates/home.html').read_text(), data, fragments)
    (ROOT / 'dist/home-body.md').write_text('````{=html}\n' + body + '\n````\n')
    (ROOT / 'dist/assets/js/home-data.js').write_text('window.HOME_RADAR = ' + json.dumps(data['radar'], ensure_ascii=True) + ';\n')
    metadata = {key: data[key] for key in ('title', 'description')}
    (ROOT / 'dist/home-meta.json').write_text(json.dumps(metadata))


if __name__ == '__main__':
    main()
