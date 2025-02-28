import { NextPage } from 'next';
import { ChangeEvent, useState } from 'react';
import { Converter } from 'showdown';

const converter = new Converter();

const cheatsheet: string = `# Markdown Cheat Sheet

Thanks for visiting [The Markdown Guide](https://www.markdownguide.org)!

This Markdown cheat sheet provides a quick overview of all the Markdown syntax elements. It can't cover every edge case, so if you need more information about any of these elements, refer to the reference guides for [basic syntax](https://www.markdownguide.org/basic-syntax/) and [extended syntax](https://www.markdownguide.org/extended-syntax/).

## Basic Syntax

These are the elements outlined in John Gruber’s original design document. All Markdown applications support these elements.

### Heading

# H1
## H2
### H3

### Bold

**bold text**

### Italic

*italicized text*

### Blockquote

> blockquote

### Ordered List

1. First item
2. Second item
3. Third item

### Unordered List

- First item
- Second item
- Third item

### Code

\`code\`

### Horizontal Rule

---

### Link

[Markdown Guide](https://www.markdownguide.org)

### Image

![alt text](https://www.markdownguide.org/assets/images/tux.png)

## Extended Syntax

These elements extend the basic syntax by adding additional features. Not all Markdown applications support these elements.

### Table

| Syntax | Description |
| ----------- | ----------- |
| Header | Title |
| Paragraph | Text |

### Fenced Code Block

\`\`\`
{
  "firstName": "John",
  "lastName": "Smith",
  "age": 25
}
\`\`\`

### Footnote

Here's a sentence with a footnote. [^1]

[^1]: This is the footnote.

### Heading ID

### My Great Heading {#custom-id}

### Definition List

term
: definition

### Strikethrough

~~The world is flat.~~

### Task List

- [x] Write the press release
- [ ] Update the website
- [ ] Contact the media

### Emoji

That is so funny! :joy:

(See also [Copying and Pasting Emoji](https://www.markdownguide.org/extended-syntax/#copying-and-pasting-emoji))

### Highlight

I need to highlight these ==very important words==.

### Subscript

H~2~O

### Superscript

X^2^`;

const MarkdownPage: NextPage = () => {
  const [content, setContent] = useState({
    md: cheatsheet,
    html: converter.makeHtml(cheatsheet),
  });

  return (
    <div className="h-screen w-screen overflow-hidden">
      <div className="grid h-full grid-cols-2">
        <div className="col-span-1">
          <textarea
            id="md"
            name="md"
            placeholder="MD"
            className="h-full w-full p-8 whitespace-pre"
            value={content.md}
            onChange={(event: ChangeEvent<HTMLTextAreaElement>) => {
              const md: string = event.target.value;
              setContent({ md, html: converter.makeHtml(md) });
            }}
          />
        </div>
        <div className="col-span-1 overflow-auto bg-gray-900">
          <div className="markdown-body h-full w-full px-8">
            <div dangerouslySetInnerHTML={{ __html: content.html }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarkdownPage;
