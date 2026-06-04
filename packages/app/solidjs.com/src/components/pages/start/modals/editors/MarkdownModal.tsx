import { markdown as markdownLang } from '@codemirror/lang-markdown';
import { Compartment, EditorState } from '@codemirror/state';
import { oneDark } from '@codemirror/theme-one-dark';
import { EditorView } from '@codemirror/view';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';
import { tryCatch } from '@lodashx/ts';
import DOMPurify from 'dompurify';
import 'github-markdown-css/github-markdown.css';
import htmlToPdfmake from 'html-to-pdfmake';
import { marked } from 'marked';
import pdfMake from 'pdfmake/build/pdfmake';
import {
  Content,
  ContentText,
  PageSize,
  TDocumentDefinitions,
} from 'pdfmake/interfaces';
import { createEffect, createSignal, onCleanup, onMount } from 'solid-js';
import Tesseract from 'tesseract.js';

/* =========================
   Fonts
========================= */

const FONTS = [
  { id: 'inter', name: 'Inter' },
  { id: 'roboto', name: 'Roboto' },
  { id: 'lato', name: 'Lato' },
  { id: 'fira-code', name: 'Fira Code' },
  { id: 'jetbrains-mono', name: 'JetBrains Mono' },
  { id: 'noto-sans', name: 'Noto Sans' },
  { id: 'open-sans', name: 'Open Sans' },
  { id: 'merriweather', name: 'Merriweather' },
  { id: 'source-code-pro', name: 'Source Code Pro' },
  { id: 'ubuntu-mono', name: 'Ubuntu Mono' },
  { id: 'be-vietnam-pro', name: 'Be Vietnam Pro' },
  { id: 'roboto-mono', name: 'Roboto Mono' },
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

These are the elements outlined in John Gruber's original design document. All Markdown applications support these elements.

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
const MarkdownPreviewer = ({
  html = '',
  fontClassName = '',
}: {
  html?: string;
  fontClassName?: string;
}) => {
  const [innerHTML, setInnerHTML] = createSignal<string>('');

  createEffect(() => {
    const __html: string = DOMPurify.sanitize(html);
    setInnerHTML(__html);
  });

  return (
    <div
      innerHTML={innerHTML()}
      class={`markdown-body !bg-base-100 !text-base-content h-full w-full ${fontClassName}`}
    />
  );
};

/* =========================
   Modal
========================= */
export const MarkdownModal = ({ onClose }: { onClose: () => void }) => {
  const [state, setState] = createSignal<{
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
  const html = () => state().html;
  const loading = () => state().loading;
  const markdown = () => state().markdown;
  const ocrLoading = () => state().ocrLoading;
  const fontId = () => state().fontId;

  /* =========================
     CodeMirror
  ========================= */
  let editorRef: HTMLDivElement | undefined;
  let viewRef: EditorView | undefined;
  const editableCompartment = new Compartment();

  onMount(() => {
    if (!editorRef) return;

    const state = EditorState.create({
      doc: markdown(),
      extensions: [
        oneDark,
        markdownLang(),
        EditorView.lineWrapping,
        EditorView.theme({
          '&': { height: '100%' },
          '.cm-editor': { height: '100%' },
          '.cm-scroller': { overflow: 'auto', fontFamily: 'monospace' },
        }),
        editableCompartment.of(EditorView.editable.of(!ocrLoading())),
        EditorView.updateListener.of((update) => {
          if (update.docChanged) {
            const value = update.state.doc.toString();
            setState((prev) => ({ ...prev, markdown: value }));
          }
        }),
      ],
    });

    viewRef = new EditorView({ state, parent: editorRef });
    onCleanup(() => viewRef?.destroy());
  });

  createEffect(() => {
    const view = viewRef;
    if (!view) return;
    view.dispatch({
      effects: editableCompartment.reconfigure(
        EditorView.editable.of(!ocrLoading())
      ),
    });
  });

  createEffect(() => {
    const view = viewRef;
    if (!view) return;
    const current = view.state.doc.toString();
    if (current !== markdown()) {
      view.dispatch({
        changes: { from: 0, to: current.length, insert: markdown() },
      });
    }
  });

  createEffect(() => {
    const setHTML = async () => {
      const newHTML = await marked(markdown());
      setState((prev) => ({ ...prev, html: newHTML }));
    };
    setHTML();
  });

  /* =========================
     OCR
  ========================= */
  const handleOCRFile = async (e: Event) => {
    setState((prev) => ({ ...prev, ocrLoading: true }));
    const file = (e.target as HTMLInputElement).files?.item(0);
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
    const converted: Content[] = htmlToPdfmake(html()) as Content[];
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
  const selectedFont = () => FONTS.find((f) => f.id === fontId()) ?? FONTS[0];

  return (
    <ModalWrapper
      onClose={onClose}
      title="Markdown Editor"
      size="max-w-6xl"
      fullHeight>
      {/* Body */}
      <div class="divide-base-300 grid min-h-0 flex-1 divide-x overflow-hidden md:grid-cols-2">
        <div>
          {/* LEFT: Editor */}
          <div class="flex h-full flex-col overflow-hidden">
            <div class="border-base-300 flex gap-2 border-b p-2">
              <label
                class={`btn btn-secondary btn-sm cursor-pointer ${ocrLoading() ? 'btn-disabled' : ''}`}>
                <span>
                  {ocrLoading() ? 'Processing OCR...' : 'Upload Image'}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleOCRFile}
                  class="hidden"
                  disabled={ocrLoading()}
                />
              </label>
            </div>
            <div
              ref={editorRef}
              class={`${ocrLoading() ? 'pointer-events-none opacity-50' : ''} h-full w-full flex-1 overflow-auto text-sm`}
            />
          </div>

          {/* RIGHT: Preview */}
          <div class="bg-base-100 flex h-full flex-col overflow-hidden">
            <div class="border-base-300 flex items-center gap-2 border-b p-2">
              <button
                type="button"
                class="btn btn-primary btn-sm"
                disabled={loading() || ocrLoading()}
                onClick={handleDownload}>
                {loading() ? (
                  <span class="loading loading-spinner loading-sm" />
                ) : (
                  'Download PDF'
                )}
              </button>

              {/* Font picker */}
              <select
                class="select select-sm border-base-300 min-w-0 flex-1 border"
                value={fontId()}
                onChange={(e) =>
                  setState((prev) => ({
                    ...prev,
                    fontId: (e.target as HTMLSelectElement).value,
                  }))
                }>
                {FONTS.map(({ id, name }) => (
                  <option key={id} value={id}>
                    {name}
                  </option>
                ))}
              </select>
            </div>

            <div class="h-full w-full flex-1 overflow-auto p-4">
              <MarkdownPreviewer
                html={html()}
                fontClassName={selectedFont().id}
              />
            </div>
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
};
