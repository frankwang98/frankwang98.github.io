"""Build the blog index from Pandoc article metadata; no extra dependencies."""
import html
import json
from pathlib import Path
import re
import subprocess

ROOT = Path(__file__).resolve().parent.parent


def plain(value):
    if isinstance(value, list):
        return ''.join(plain(item) for item in value)
    if isinstance(value, dict):
        kind = value.get('t')
        if kind in ('Space', 'SoftBreak', 'LineBreak'):
            return ' '
        return plain(value.get('c', ''))
    return str(value)


def main():
    posts = []
    for source in sorted((ROOT / 'content/articles').glob('*.md')):
        if not re.fullmatch(r'[a-z0-9]+(?:-[a-z0-9]+)*', source.stem):
            raise ValueError(f'Invalid article filename: {source.name}')
        document = json.loads(subprocess.check_output(['pandoc', str(source), '-t', 'json']))
        meta = document['meta']
        for required in ('title', 'description', 'date'):
            if required not in meta:
                raise ValueError(f'{source.name}: missing {required}')
        tags = meta.get('tags', {'t': 'MetaList', 'c': []})
        if tags['t'] != 'MetaList':
            raise ValueError(f'{source.name}: tags must be a YAML list')
        posts.append({
            'title': plain(meta['title']), 'description': plain(meta['description']),
            'date': plain(meta['date']), 'tags': [plain(tag) for tag in tags['c']],
            'url': f'/articles/{source.stem}.html', 'text': plain(document['blocks']),
        })
    posts.sort(key=lambda post: (post['date'], post['url']), reverse=True)
    escape = html.escape
    cards = []
    for post in posts:
        cards.append('<article class="blog-post" data-post><time>' + escape(post['date']) +
                     '</time><h2><a href="' + escape(post['url'], quote=True) + '">' +
                     escape(post['title']) + '</a></h2><p>' + escape(post['description']) +
                     '</p><div class="tech">' + ''.join('<span>' + escape(tag) + '</span>' for tag in post['tags']) +
                     '</div></article>')
    tags = sorted({tag for post in posts for tag in post['tags']})
    options = ''.join('<option value="' + escape(tag, quote=True) + '">' + escape(tag) + '</option>' for tag in tags)
    template = (ROOT / 'templates/blog.html').read_text()
    body = template.replace('<!-- TAGS -->', options).replace('<!-- POSTS -->', '\n'.join(cards))
    body = body.replace('<!-- COUNT -->', str(len(posts)))
    raw = ROOT / 'dist/blog-body.md'
    raw.write_text('````{=html}\n' + body + '\n````\n')
    subprocess.run(['pandoc', str(raw), '--standalone', '--template=' + str(ROOT / 'templates/page.html'),
                    '--metadata=title:Articles — Frank Wang', '--metadata=description:技术实践、项目记录与探索。',
                    '--metadata=canonical:https://frankwang98.asia/articles/', '--metadata=blog:true',
                    '-o', str(ROOT / 'dist/articles/index.html')], check=True)
    raw.unlink()
    (ROOT / 'dist/articles/search.json').write_text(json.dumps(posts, ensure_ascii=False))


if __name__ == '__main__':
    main()
