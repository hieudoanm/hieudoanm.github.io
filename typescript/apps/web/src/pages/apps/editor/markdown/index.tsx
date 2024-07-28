import { Layout } from '@web/layout';
import { logger } from '@web/log';
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

  const downloadPDF = async () => {
    try {
      alert('Work in Progress');
    } catch (error) {
      logger.error(error);
    }
  };

  return (
    <Layout nav full>
      <div className='container mx-auto h-full'>
        <div className='h-full p-4 md:p-8'>
          <div className='grid h-full grid-cols-2 gap-4 md:gap-8'>
            <div className='col-span-1 h-full'>
              <div className='flex h-full flex-col gap-y-4 md:gap-y-8'>
                <button type='button' className='btn btn-outline'>
                  Download MD
                </button>
                <div className='grow'>
                  <textarea
                    id='md'
                    name='md'
                    placeholder='MD'
                    className='textarea textarea-bordered h-full w-full border-base-content'
                    value={content.md}
                    onChange={(event: ChangeEvent<HTMLTextAreaElement>) => {
                      const md: string = event.target.value;
                      setContent({ md, html: converter.makeHtml(md) });
                    }}
                  />
                </div>
              </div>
            </div>
            <div className='col-span-1 h-full'>
              <div className='flex h-full flex-col gap-y-4 md:gap-y-8'>
                <button
                  type='button'
                  className='btn btn-outline'
                  onClick={() => {
                    downloadPDF();
                  }}>
                  Download PDF
                </button>
                <div className='grow'>
                  <div
                    className={`h-[70vh] w-full overflow-auto rounded-lg border border-base-content`}>
                    <div
                      className='flex h-full flex-col gap-y-4 p-4'
                      dangerouslySetInnerHTML={{ __html: content.html }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MarkdownPage;
