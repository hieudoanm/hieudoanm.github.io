import { markdown as markdownLang } from '@codemirror/lang-markdown';
import { Compartment, EditorState } from '@codemirror/state';
import { oneDark } from '@codemirror/theme-one-dark';
import { EditorView } from '@codemirror/view';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';
import { tryCatch } from '@hieudoanm/try-catch';
import DOMPurify from 'dompurify';
import 'github-markdown-css/github-markdown.css';
import htmlToPdfmake from 'html-to-pdfmake';
import { marked } from 'marked';
import {
  Be_Vietnam_Pro,
  Fira_Code,
  Inter,
  JetBrains_Mono,
  Lato,
  Merriweather,
  Noto_Sans,
  Open_Sans,
  Roboto,
  Roboto_Mono,
  Source_Code_Pro,
  Ubuntu_Mono,
} from 'next/font/google';
import pdfMake from 'pdfmake/build/pdfmake';
import {
  Content,
  ContentText,
  PageSize,
  TDocumentDefinitions,
} from 'pdfmake/interfaces';
import { ChangeEvent, FC, useEffect, useRef, useState } from 'react';
import Tesseract from 'tesseract.js';

/* =========================
   Fonts
========================= */
const beVietnamPro = Be_Vietnam_Pro({ subsets: ['latin'], weight: '400' });
const firaCode = Fira_Code({ subsets: ['latin'] });
const inter = Inter({ subsets: ['latin'] });
const jetBrainsMono = JetBrains_Mono({ subsets: ['latin'] });
const lato = Lato({ subsets: ['latin'], weight: '400' });
const merriweather = Merriweather({ subsets: ['latin'], weight: '400' });
const notoSans = Noto_Sans({ subsets: ['latin'], weight: '400' });
const openSans = Open_Sans({ subsets: ['latin'] });
const roboto = Roboto({ subsets: ['latin'] });
const robotoMono = Roboto_Mono({ subsets: ['latin'] });
const sourceCodePro = Source_Code_Pro({ subsets: ['latin'] });
const ubuntuMono = Ubuntu_Mono({ subsets: ['latin'], weight: '400' });

const FONTS = [
  {
    id: 'be-vietnam-pro',
    name: 'Be Vietnam Pro',
    className: beVietnamPro.className,
  },
  { id: 'fira-code', name: 'Fira Code', className: firaCode.className },
  { id: 'inter', name: 'Inter', className: inter.className },
  {
    id: 'jetbrains-mono',
    name: 'JetBrains Mono',
    className: jetBrainsMono.className,
  },
  { id: 'lato', name: 'Lato', className: lato.className },
  {
    id: 'merriweather',
    name: 'Merriweather',
    className: merriweather.className,
  },
  { id: 'noto-sans', name: 'Noto Sans', className: notoSans.className },
  { id: 'open-sans', name: 'Open Sans', className: openSans.className },
  { id: 'roboto', name: 'Roboto', className: roboto.className },
  { id: 'roboto-mono', name: 'Roboto Mono', className: robotoMono.className },
  {
    id: 'source-code-pro',
    name: 'Source Code Pro',
    className: sourceCodePro.className,
  },
  { id: 'ubuntu-mono', name: 'Ubuntu Mono', className: ubuntuMono.className },
];

const DEFAULT_FONT_ID = 'roboto';

/* =========================
   Constants
========================= */
const FONT_NAME_TIMES = 'Times-New-Roman';
const A4_MARGIN: [number, number, number, number] = [72, 72, 72, 72];
const ZERO_MARGIN: [number, number, number, number] = [0, 0, 0, 0];

const INITIAL_MARKDOWN: string = `# Markdown Cheat Sheet

Thanks for visiting [The Markdown Guide](https://www.markdownguide.org)!

This Markdown cheat sheet provides a quick overview of all the Markdown syntax elements. It can't cover every edge case, so if you need more information about any of these elements, refer to the reference guides for [basic syntax](https://www.markdownguide.org/basic-syntax/) and [extended syntax](https://www.markdownguide.org/extended-syntax/).

## Basic Syntax

These are the elements outlined in John Gruber’s original design document. All Markdown applications support these elements.

### Heading

# H1

## H2

### H3

#### H4

##### H5

###### H6

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

X^2^
`;

/* =========================
   Previewer
========================= */
const MarkdownPreviewer: FC<{ html: string; fontClassName: string }> = ({
  html = '',
  fontClassName = '',
}) => {
  const [innerHTML, setInnerHTML] = useState<string>('');

  useEffect(() => {
    const __html: string = DOMPurify.sanitize(html);
    setInnerHTML(__html);
  }, [html]);

  return (
    <div
      dangerouslySetInnerHTML={{ __html: innerHTML }}
      className={`markdown-body !bg-base-100 !text-base-content h-full w-full ${fontClassName}`}
    />
  );
};

/* =========================
   Modal
========================= */
export const MarkdownModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [
    {
      html = '',
      loading = false,
      markdown = INITIAL_MARKDOWN,
      ocrLoading = false,
      fontId = DEFAULT_FONT_ID,
    },
    setState,
  ] = useState<{
    html: string;
    loading: boolean;
    markdown: string;
    ocrLoading: boolean;
    fontId: string;
  }>({
    html: '',
    loading: false,
    markdown: INITIAL_MARKDOWN,
    ocrLoading: false,
    fontId: DEFAULT_FONT_ID,
  });

  const selectedFont = FONTS.find((f) => f.id === fontId) ?? FONTS[0];

  /* =========================
     CodeMirror
  ========================= */
  const editorRef = useRef<HTMLDivElement | null>(null);
  const viewRef = useRef<EditorView | null>(null);
  const editableCompartment = useRef(new Compartment()).current;

  useEffect(() => {
    if (!editorRef.current) return;

    const state = EditorState.create({
      doc: markdown,
      extensions: [
        oneDark,
        markdownLang(),
        EditorView.lineWrapping,
        EditorView.theme({
          '&': { height: '100%' },
          '.cm-editor': { height: '100%' },
          '.cm-scroller': { overflow: 'auto', fontFamily: 'monospace' },
        }),
        editableCompartment.of(EditorView.editable.of(!ocrLoading)),
        EditorView.updateListener.of((update) => {
          if (update.docChanged) {
            const value = update.state.doc.toString();
            setState((prev) => ({ ...prev, markdown: value }));
          }
        }),
      ],
    });

    viewRef.current = new EditorView({ state, parent: editorRef.current });
    return () => viewRef.current?.destroy();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const view = viewRef.current;
    if (!view) return;
    view.dispatch({
      effects: editableCompartment.reconfigure(
        EditorView.editable.of(!ocrLoading)
      ),
    });
  }, [ocrLoading, editableCompartment]);

  useEffect(() => {
    const view = viewRef.current;
    if (!view) return;
    const current = view.state.doc.toString();
    if (current !== markdown) {
      view.dispatch({
        changes: { from: 0, to: current.length, insert: markdown },
      });
    }
  }, [markdown]);

  useEffect(() => {
    const setHTML = async () => {
      const newHTML = await marked(markdown);
      setState((prev) => ({ ...prev, html: newHTML }));
    };
    setHTML();
  }, [markdown]);

  /* =========================
     OCR
  ========================= */
  const handleOCRFile = async (e: ChangeEvent<HTMLInputElement>) => {
    setState((prev) => ({ ...prev, ocrLoading: true }));
    const file = e.target.files?.item(0);
    if (!file) {
      setState((prev) => ({ ...prev, ocrLoading: false }));
      return;
    }
    const { data = { data: { text: '' } }, error } = await tryCatch(
      Tesseract.recognize(file, 'eng', { logger: (m) => console.log(m) })
    );
    if (error) {
      setState((prev) => ({ ...prev, ocrLoading: false }));
      return;
    }
    const text = data?.data?.text?.trim();
    if (!text) {
      setState((prev) => ({ ...prev, ocrLoading: false }));
      return;
    }
    setState((prev) => ({ ...prev, markdown: text, ocrLoading: false }));
  };

  /* =========================
     PDF Export
  ========================= */
  const handleDownload = () => {
    setState((prev) => ({ ...prev, loading: true }));
    const origin = window.location.origin;
    pdfMake.fonts = {
      Times: {
        normal: `${origin}/fonts/${FONT_NAME_TIMES}/${FONT_NAME_TIMES}-Regular.ttf`,
        bold: `${origin}/fonts/${FONT_NAME_TIMES}/${FONT_NAME_TIMES}-Bold.ttf`,
        italics: `${origin}/fonts/${FONT_NAME_TIMES}/${FONT_NAME_TIMES}-Italic.ttf`,
        bolditalics: `${origin}/fonts/${FONT_NAME_TIMES}/${FONT_NAME_TIMES}-Bold-Italic.ttf`,
      },
    };
    const converted: Content[] = htmlToPdfmake(html) as Content[];
    const filteredContent = converted.filter(
      (content) => (content as ContentText).text !== ' '
    );
    const documentDefinitions: TDocumentDefinitions = {
      pageSize: 'A4' as PageSize,
      pageMargins: A4_MARGIN,
      content: filteredContent,
      styles: {
        'html-h1': {
          fontSize: 12,
          bold: true,
          alignment: 'center',
          margin: ZERO_MARGIN,
          lineHeight: 2,
        },
        'html-h2': {
          fontSize: 12,
          bold: true,
          alignment: 'left',
          margin: ZERO_MARGIN,
          lineHeight: 2,
        },
        'html-h3': {
          fontSize: 12,
          bold: true,
          italics: true,
          alignment: 'left',
          margin: ZERO_MARGIN,
          lineHeight: 2,
        },
        'html-h4': {
          fontSize: 12,
          bold: true,
          alignment: 'left',
          margin: [36, 0, 0, 0],
          lineHeight: 2,
        },
        'html-h5': {
          fontSize: 12,
          bold: true,
          italics: true,
          alignment: 'left',
          margin: [36, 0, 0, 0],
          lineHeight: 2,
        },
        'html-h6': { fontSize: 12, margin: [36, 0, 0, 0], lineHeight: 2 },
        'html-p': { fontSize: 12, margin: ZERO_MARGIN, lineHeight: 2 },
      },
      defaultStyle: {
        font: 'Times',
        fontSize: 12,
        alignment: 'left',
        margin: ZERO_MARGIN,
      },
    };
    pdfMake.createPdf(documentDefinitions).download('download.pdf');
    setState((prev) => ({ ...prev, loading: false }));
  };

  /* =========================
     UI
  ========================= */
  return (
    <ModalWrapper
      onClose={onClose}
      title="Markdown Editor"
      size="max-w-6xl"
      fullHeight>
      {/* Body */}
      <div className="divide-base-300 grid min-h-0 flex-1 divide-x overflow-hidden md:grid-cols-2">
        <div>
          {/* LEFT: Editor */}
          <div className="flex h-full flex-col overflow-hidden">
            <div className="border-base-300 flex gap-2 border-b p-2">
              <label
                className={`btn btn-secondary btn-sm cursor-pointer ${ocrLoading ? 'btn-disabled' : ''}`}>
                <span>{ocrLoading ? 'Processing OCR...' : 'Upload Image'}</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleOCRFile}
                  className="hidden"
                  disabled={ocrLoading}
                />
              </label>
            </div>
            <div
              ref={editorRef}
              className={`${ocrLoading ? 'pointer-events-none opacity-50' : ''} h-full w-full flex-1 overflow-auto text-sm`}
            />
          </div>

          {/* RIGHT: Preview */}
          <div className="bg-base-100 flex h-full flex-col overflow-hidden">
            <div className="border-base-300 flex items-center gap-2 border-b p-2">
              <button
                type="button"
                className="btn btn-primary btn-sm"
                disabled={loading || ocrLoading}
                onClick={handleDownload}>
                {loading ? (
                  <span className="loading loading-spinner loading-sm" />
                ) : (
                  'Download PDF'
                )}
              </button>

              {/* Font picker */}
              <select
                className="select select-sm border-base-300 min-w-0 flex-1 border"
                value={fontId}
                onChange={(e) =>
                  setState((prev) => ({ ...prev, fontId: e.target.value }))
                }>
                {FONTS.map(({ id, name }) => (
                  <option key={id} value={id}>
                    {name}
                  </option>
                ))}
              </select>
            </div>

            <div className="h-full w-full flex-1 overflow-auto p-4">
              <MarkdownPreviewer
                html={html}
                fontClassName={selectedFont.className}
              />
            </div>
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
};
