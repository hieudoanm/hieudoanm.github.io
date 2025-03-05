/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextPage } from 'next';
import pdfMake from 'pdfmake/build/pdfmake';
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

const markdownToPdfmake = (markdownText: string) => {
  const lines = markdownText.split('\n');
  const pdfContent: any[] = [];

  lines.forEach((line) => {
    if (line.startsWith('# ')) {
      pdfContent.push({ text: line.replace('# ', ''), style: 'h1' });
    } else if (line.startsWith('## ')) {
      pdfContent.push({ text: line.replace('## ', ''), style: 'h2' });
    } else if (line.startsWith('### ')) {
      pdfContent.push({ text: line.replace('### ', ''), style: 'h3' });
    } else if (line.startsWith('#### ')) {
      pdfContent.push({ text: line.replace('#### ', ''), style: 'h4' });
    } else if (line.startsWith('##### ')) {
      pdfContent.push({ text: line.replace('##### ', ''), style: 'h5' });
    } else if (line.startsWith('###### ')) {
      pdfContent.push({ text: line.replace('###### ', ''), style: 'h6' });
    } else if (line.startsWith('- ') || line.startsWith('* ')) {
      if (!Array.isArray(pdfContent[pdfContent.length - 1]?.ul)) {
        pdfContent.push({ ul: [] });
      }
      pdfContent[pdfContent.length - 1].ul?.push(line.replace(/^[-*] /, ''));
    } else if (/\*\*(.*?)\*\*/.test(line)) {
      pdfContent.push({
        text: line.replace(/\*\*(.*?)\*\*/g, ' $1 '),
        bold: true,
      });
    } else if (/\*(.*?)\*/.test(line)) {
      pdfContent.push({
        text: line.replace(/\*(.*?)\*/g, ' $1 '),
        italics: true,
      });
    } else if (line.trim() !== '') {
      pdfContent.push({ text: line });
    }
  });

  return pdfContent;
};

const MarkdownPage: NextPage = () => {
  const [{ md, html }, setContent] = useState({
    md: cheatsheet,
    html: converter.makeHtml(cheatsheet),
  });

  return (
    <div className="h-screen w-screen">
      <div className="grid h-full grid-cols-2">
        <div className="col-span-1">
          <textarea
            id="md"
            name="md"
            placeholder="MD"
            className="h-full w-full p-8 whitespace-pre"
            value={md}
            onChange={(event: ChangeEvent<HTMLTextAreaElement>) => {
              const md: string = event.target.value;
              setContent({ md, html: converter.makeHtml(md) });
            }}
          />
        </div>
        <div className="col-span-1">
          <div className="h-full w-full bg-gray-900 p-8">
            <div className="flex w-full flex-col overflow-hidden">
              <button
                type="button"
                className="w-full cursor-pointer rounded bg-gray-100 px-4 py-2 text-gray-900 hover:bg-red-500 hover:text-gray-100"
                onClick={async () => {
                  const pdfContent = markdownToPdfmake(md);
                  const docDefinition = {
                    content: pdfContent,
                    styles: {
                      h1: { fontSize: 24, bold: true },
                      h2: { fontSize: 22, bold: true },
                      h3: { fontSize: 20, bold: true },
                      h4: { fontSize: 18, bold: true },
                      h5: { fontSize: 16, bold: true },
                      h6: { fontSize: 14, bold: true },
                      normal: { fontSize: 12 },
                    },
                  };
                  pdfMake.fonts = {
                    Roboto: {
                      normal:
                        'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Regular.ttf',
                      bold: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Medium.ttf',
                      italics:
                        'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Italic.ttf',
                      bolditalics:
                        'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-MediumItalic.ttf',
                    },
                  };
                  pdfMake.createPdf(docDefinition).download('markdown.pdf');
                }}>
                Download PDF
              </button>
              <div className="markdown-body h-full w-full grow overflow-auto !bg-gray-900 !text-gray-100">
                <div dangerouslySetInnerHTML={{ __html: html }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarkdownPage;
