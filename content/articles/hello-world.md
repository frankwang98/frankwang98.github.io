---
title: "Hello World：我的第一篇独立文章"
description: 一篇 Markdown 示例，展示如何记录项目实践、插入代码并发布到个人网站。
date: 2026-11-07
tags: [随笔, 网站]
---

这是一篇**示例文章**，用来演示个人网站的独立文章功能。你可以直接修改这份文件，也可以复制它开始新的记录。

## 为什么写下来

项目主页展示作品，文章则记录过程：为什么做、遇到了什么问题、怎样验证结果。

我希望每篇记录至少回答三个问题：

- **背景**：要解决什么问题？
- **实践**：做了哪些尝试，为什么这样选择？
- **结果**：验证了什么，还有什么需要继续探索？

## 一个最小代码示例

下面只是演示代码块排版，不代表项目中的实际实现：

```cpp
#include <iostream>

int main() {
    std::cout << "Hello, robotics!" << std::endl;
    return 0;
}
```

## 如何维护文章

1. 在 `content/articles/` 中新增 `.md` 文件，文件名使用英文、数字和连字符。
2. 填写开头的 `title`、`description` 和 `date`。
3. 用 Markdown 编写正文，不需要复制页面样式和导航。
4. 按需要填写 `tags` 标签列表，博客页会自动收录文章并支持搜索、筛选。
5. 本地预览，确认后提交并推送到 `main`，由 Actions 自动发布。

例如，这篇文章的源文件是 `hello-world.md`，生成地址是 `/articles/hello-world.html`。

> 示例中的内容可以自由替换。正式发布自己的文章时，也记得同步更新标题、描述和日期。

## 继续探索

- [查看 ROS2Drive 项目](https://github.com/frankwang98/ROS2Drive)
- [返回文章列表](/articles/)
