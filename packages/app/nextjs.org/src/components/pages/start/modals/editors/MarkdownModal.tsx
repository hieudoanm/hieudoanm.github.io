import { markdown as markdownLang } from '@codemirror/lang-markdown';
import { search, searchKeymap } from '@codemirror/search';
import { Compartment, EditorState } from '@codemirror/state';
import { EditorView, keymap, lineNumbers } from '@codemirror/view';
import { oneDark } from '@codemirror/theme-one-dark';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';
import {
  capitalize,
  deburr,
  kebabCase,
  lowerCase,
  snakeCase,
  upperCase,
} from '@lodash/ts';
import { tryCatch } from '@lodashx/ts';
import DOMPurify from 'dompurify';
import { saveAs } from 'file-saver';
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
import {
  ChangeEvent,
  FC,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import Tesseract from 'tesseract.js';

/* =========================
   Types
========================= */
type ViewMode = 'split' | 'editor' | 'preview';

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

const STORAGE_KEY = '@hieudoanm/markdown-draft';

interface TocItem {
  level: number;
  text: string;
  line: number;
}

interface DraftData {
  markdown: string;
  fontId: string;
  viewMode: ViewMode;
  fileName: string;
  showLineNumbers: boolean;
}

/* =========================
   Formatting helpers
========================= */
const insertAround = (
  view: EditorView,
  before: string,
  after: string,
  placeholder?: string
) => {
  const { from, to } = view.state.selection.main;
  const text = view.state.sliceDoc(from, to) || placeholder || '';
  view.dispatch({
    changes: { from, to, insert: `${before}${text}${after}` },
    selection: {
      anchor: from + before.length,
      head: from + before.length + text.length,
    },
  });
  view.focus();
};

const insertAtLineStart = (view: EditorView, prefix: string) => {
  const { from } = view.state.selection.main;
  const line = view.state.doc.lineAt(from);
  view.dispatch({
    changes: { from: line.from, to: line.from, insert: `${prefix} ` },
  });
  view.focus();
};

const insertBlock = (
  view: EditorView,
  before: string,
  after: string,
  placeholder?: string
) => {
  const { from, to } = view.state.selection.main;
  const text = view.state.sliceDoc(from, to) || placeholder || '';
  view.dispatch({
    changes: { from, to, insert: `${before}\n${text}\n${after}` },
    selection: {
      anchor: from + before.length + 1,
      head: from + before.length + 1 + text.length,
    },
  });
  view.focus();
};

const insertHeading = (view: EditorView, level: number) => {
  const { from } = view.state.selection.main;
  const line = view.state.doc.lineAt(from);
  const prefix = '#'.repeat(level);
  const existingMatch = line.text.match(/^(#{1,6})\s/);
  if (existingMatch && existingMatch[1].length === level) {
    view.dispatch({
      changes: { from: line.from, to: line.from + level + 1, insert: '' },
    });
  } else {
    view.dispatch({
      changes: { from: line.from, to: line.from, insert: `${prefix} ` },
    });
  }
  view.focus();
};

const insertTable = (view: EditorView) => {
  const { from } = view.state.selection.main;
  const table =
    '| Column 1 | Column 2 | Column 3 |\n|----------|----------|----------|\n| Cell     | Cell     | Cell     |';
  view.dispatch({
    changes: { from, to: from, insert: table },
  });
  view.focus();
};

/* =========================
   String transform helpers
========================= */
type StringStype =
  | 'capitalize'
  | 'deburr'
  | 'kebabCase'
  | 'lowerCase'
  | 'snakeCase'
  | 'upperCase';

const STRING_STYLES: { value: StringStype | ''; label: string }[] = [
  { value: '', label: 'Format…' },
  { value: 'capitalize', label: 'Capitalise' },
  { value: 'deburr', label: 'deburr' },
  { value: 'kebabCase', label: 'kebab-case' },
  { value: 'lowerCase', label: 'lowercase' },
  { value: 'snakeCase', label: 'snake_case' },
  { value: 'upperCase', label: 'UPPERCASE' },
];

const STYLE_FN: Record<StringStype, (s: string) => string> = {
  capitalize,
  deburr,
  kebabCase,
  lowerCase,
  snakeCase,
  upperCase,
};

/* =========================
   Auto-pairing
========================= */
const autoClose = (open: string, close: string) => (view: EditorView) => {
  const { from, to } = view.state.selection.main;
  if (from !== to) {
    view.dispatch({
      changes: {
        from,
        to,
        insert: open + view.state.sliceDoc(from, to) + close,
      },
      selection: { anchor: from + open.length, head: to + open.length },
    });
  } else if (
    from < view.state.doc.length &&
    view.state.sliceDoc(from, from + close.length) === close
  ) {
    view.dispatch({
      selection: { anchor: from + close.length },
    });
  } else {
    view.dispatch({
      changes: { from, insert: open + close },
      selection: { anchor: from + open.length },
    });
  }
  view.focus();
  return true;
};

/* =========================
   Stats
========================= */
interface Stats {
  characters: number;
  charactersNoSpaces: number;
  words: number;
  lines: number;
  readingTime: string;
}

const computeStats = (text: string): Stats => {
  const characters = text.length;
  const charactersNoSpaces = text.replace(/\s/g, '').length;
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const lines = text ? text.split('\n').length : 0;
  const minutes = Math.max(1, Math.ceil(words / 200));
  const readingTime = `${minutes} min`;
  return { characters, charactersNoSpaces, words, lines, readingTime };
};

/* =========================
   INITIAL_MARKDOWN
========================= */
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
      viewMode = 'split' as ViewMode,
      showToc = false,
      restored = false,
      fileName = 'untitled.md',
      showLineNumbers = false,
    },
    setState,
  ] = useState<{
    html: string;
    loading: boolean;
    markdown: string;
    ocrLoading: boolean;
    fontId: string;
    viewMode: ViewMode;
    showToc: boolean;
    restored: boolean;
    fileName: string;
    showLineNumbers: boolean;
  }>({
    html: '',
    loading: false,
    markdown: INITIAL_MARKDOWN,
    ocrLoading: false,
    fontId: DEFAULT_FONT_ID,
    viewMode: 'split',
    showToc: false,
    restored: false,
    fileName: 'untitled.md',
    showLineNumbers: false,
  });

  const [stringStyle, setStringStyle] = useState<StringStype | ''>('');

  const selectedFont = FONTS.find((f) => f.id === fontId) ?? FONTS[0];

  const stats = useMemo(() => computeStats(markdown), [markdown]);

  /* =========================
      CodeMirror
  ========================= */
  const editorRef = useRef<HTMLDivElement | null>(null);
  const viewRef = useRef<EditorView | null>(null);
  const editableCompartment = useRef(new Compartment()).current;
  const lineNumbersCompartment = useRef(new Compartment()).current;
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const ocrInputRef = useRef<HTMLInputElement | null>(null);
  const previewScrollRef = useRef<HTMLDivElement | null>(null);

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
        lineNumbersCompartment.of(showLineNumbers ? lineNumbers() : []),
        search({ top: true }),
        EditorView.updateListener.of((update) => {
          if (update.docChanged) {
            const value = update.state.doc.toString();
            setState((prev) => ({ ...prev, markdown: value }));
          }
        }),
        EditorView.domEventHandlers({
          paste: (event, view) => {
            const items = event.clipboardData?.items;
            if (!items) return false;
            for (let i = 0; i < items.length; i++) {
              if (items[i].type.startsWith('image/')) {
                event.preventDefault();
                const file = items[i].getAsFile();
                if (file) {
                  const reader = new FileReader();
                  reader.onload = (e) => {
                    const dataUrl = e.target?.result as string;
                    if (dataUrl) {
                      const { from } = view.state.selection.main;
                      view.dispatch({
                        changes: { from, insert: `![image](${dataUrl})` },
                      });
                      view.focus();
                    }
                  };
                  reader.readAsDataURL(file);
                }
                return true;
              }
            }
            return false;
          },
        }),
        keymap.of([
          ...searchKeymap,
          {
            key: 'Mod-b',
            run: (v) => {
              insertAround(v, '**', '**', 'bold text');
              return true;
            },
          },
          {
            key: 'Mod-i',
            run: (v) => {
              insertAround(v, '*', '*', 'italic text');
              return true;
            },
          },
          {
            key: 'Mod-Shift-x',
            run: (v) => {
              insertAround(v, '~~', '~~', 'strikethrough text');
              return true;
            },
          },
          {
            key: 'Mod-k',
            run: (v) => {
              insertAround(v, '[', '](url)', 'link text');
              return true;
            },
          },
          {
            key: 'Mod-`',
            run: (v) => {
              insertAround(v, '`', '`', 'code');
              return true;
            },
          },
          {
            key: 'Mod-Shift-c',
            run: (v) => {
              insertBlock(v, '```', '```', 'code');
              return true;
            },
          },
          { key: '"', run: autoClose('"', '"') },
          { key: "'", run: autoClose("'", "'") },
          { key: '`', run: autoClose('`', '`') },
          { key: '[', run: autoClose('[', ']') },
          { key: '(', run: autoClose('(', ')') },
        ]),
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

  /* =========================
      Line numbers toggle
  ========================= */
  useEffect(() => {
    const view = viewRef.current;
    if (!view) return;
    view.dispatch({
      effects: lineNumbersCompartment.reconfigure(
        showLineNumbers ? lineNumbers() : []
      ),
    });
  }, [showLineNumbers, lineNumbersCompartment]);

  /* =========================
      Preview scroll sync
  ========================= */
  useEffect(() => {
    const view = viewRef.current;
    const previewEl = previewScrollRef.current;
    if (!view || !previewEl) return;

    const editorScroll = view.scrollDOM;
    let syncing = false;

    const onEditorScroll = () => {
      if (syncing) return;
      syncing = true;
      const maxScroll = editorScroll.scrollHeight - editorScroll.clientHeight;
      if (maxScroll > 0) {
        const ratio = editorScroll.scrollTop / maxScroll;
        const previewMax = previewEl.scrollHeight - previewEl.clientHeight;
        previewEl.scrollTop = previewMax > 0 ? ratio * previewMax : 0;
      }
      syncing = false;
    };

    const onPreviewScroll = () => {
      if (syncing) return;
      syncing = true;
      const maxScroll = previewEl.scrollHeight - previewEl.clientHeight;
      if (maxScroll > 0) {
        const ratio = previewEl.scrollTop / maxScroll;
        const editorMax = editorScroll.scrollHeight - editorScroll.clientHeight;
        editorScroll.scrollTop = editorMax > 0 ? ratio * editorMax : 0;
      }
      syncing = false;
    };

    editorScroll.addEventListener('scroll', onEditorScroll, { passive: true });
    previewEl.addEventListener('scroll', onPreviewScroll, { passive: true });

    return () => {
      editorScroll.removeEventListener('scroll', onEditorScroll);
      previewEl.removeEventListener('scroll', onPreviewScroll);
    };
  });

  useEffect(() => {
    const setHTML = async () => {
      const newHTML = await marked(markdown);
      setState((prev) => ({ ...prev, html: newHTML }));
    };
    setHTML();
  }, [markdown]);

  /* =========================
      localStorage: restore draft on mount
  ========================= */
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const data = JSON.parse(raw) as DraftData;
        if (data.markdown && data.markdown !== INITIAL_MARKDOWN) {
          setState((prev) => ({
            ...prev,
            markdown: data.markdown,
            fontId: data.fontId ?? prev.fontId,
            viewMode: data.viewMode ?? prev.viewMode,
            fileName: data.fileName ?? prev.fileName,
            showLineNumbers: data.showLineNumbers ?? prev.showLineNumbers,
            restored: true,
          }));
        }
      }
    } catch {
      // ignore corrupted data
    }
  }, []);

  /* =========================
      localStorage: save draft on change
  ========================= */
  useEffect(() => {
    try {
      if (markdown && markdown !== INITIAL_MARKDOWN) {
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({
            markdown,
            fontId,
            viewMode,
            fileName,
            showLineNumbers,
          } satisfies DraftData)
        );
      }
    } catch {
      // localStorage may be full
    }
  }, [markdown, fontId, viewMode]);

  /* =========================
      ToC parsing
  ========================= */
  const tocItems = useMemo(() => {
    const items: TocItem[] = [];
    const lines = markdown.split('\n');
    lines.forEach((line, index) => {
      const match = line.match(/^(#{1,6})\s+(.+)/);
      if (match) {
        const text = match[2].replace(/\{#[^}]+\}/g, '').trim();
        if (text) {
          items.push({ level: match[1].length, text, line: index });
        }
      }
    });
    return items;
  }, [markdown]);

  /* =========================
      Toolbar actions
  ========================= */
  const exec = useCallback((fn: (view: EditorView) => void) => {
    const view = viewRef.current;
    if (view) fn(view);
  }, []);

  /* =========================
      File operations
  ========================= */
  const handleNew = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setState((prev) => ({
      ...prev,
      markdown: '',
      html: '',
      restored: false,
      fileName: 'untitled.md',
    }));
  }, []);

  const handleOpen = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleOpenFile = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.item(0);
      if (!file) return;
      const text = await file.text();
      setState((prev) => ({ ...prev, markdown: text, fileName: file.name }));
      e.target.value = '';
    },
    []
  );

  const handleSave = useCallback(() => {
    const blob = new Blob([markdown], { type: 'text/markdown;charset=utf-8' });
    saveAs(blob, fileName);
  }, [markdown, fileName]);

  const handleExportHTML = useCallback(() => {
    const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>${fileName}</title></head>
<body>${html}</body>
</html>`;
    const blob = new Blob([fullHtml], { type: 'text/html;charset=utf-8' });
    saveAs(blob, fileName.replace(/\.md$/, '') + '.html');
  }, [html, fileName]);

  const handleCopyMarkdown = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(markdown);
    } catch {
      // silently fail
    }
  }, [markdown]);

  const handleCopyHTML = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(html);
    } catch {
      // silently fail
    }
  }, [html]);

  const scrollToHeading = useCallback((line: number) => {
    const view = viewRef.current;
    if (!view) return;
    const pos = view.state.doc.line(line + 1).from;
    view.dispatch({
      selection: { anchor: pos },
      scrollIntoView: true,
    });
    view.focus();
  }, []);

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
      View mode
  ========================= */
  const viewModes: { id: ViewMode; label: string }[] = [
    { id: 'split', label: 'Split' },
    { id: 'editor', label: 'Editor' },
    { id: 'preview', label: 'Preview' },
  ];

  /* =========================
      UI
  ========================= */
  return (
    <ModalWrapper
      onClose={onClose}
      title="Markdown Editor"
      size="max-w-6xl"
      fullHeight>
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
        {/* File toolbar */}
        <div className="border-base-300 flex flex-wrap items-center gap-1 border-b px-3 py-1.5">
          <button
            type="button"
            className="btn btn-ghost btn-xs"
            onClick={handleNew}
            title="New document">
            New
          </button>
          <button
            type="button"
            className="btn btn-ghost btn-xs"
            onClick={handleOpen}
            title="Open .md file">
            Open
          </button>
          <button
            type="button"
            className="btn btn-ghost btn-xs"
            onClick={handleSave}
            title="Save as .md">
            Save
          </button>

          <div className="border-base-300 mx-1 h-4 w-px border-l" />

          <span
            className="text-base-content/60 max-w-40 truncate font-mono text-xs"
            title={fileName}>
            {fileName}
          </span>

          <div className="border-base-300 mx-1 h-4 w-px border-l" />

          <button
            type="button"
            className="btn btn-ghost btn-xs"
            onClick={handleCopyMarkdown}
            title="Copy Markdown to clipboard">
            Copy MD
          </button>
          <button
            type="button"
            className="btn btn-ghost btn-xs"
            onClick={handleCopyHTML}
            title="Copy HTML to clipboard">
            Copy HTML
          </button>
          <button
            type="button"
            className="btn btn-ghost btn-xs"
            onClick={handleExportHTML}
            title="Export as HTML file">
            HTML
          </button>

          <div className="border-base-300 mx-1 h-4 w-px border-l" />

          <button
            type="button"
            className="btn btn-ghost btn-xs"
            disabled={loading || ocrLoading}
            onClick={handleDownload}
            title="Download as PDF">
            {loading ? (
              <span className="loading loading-spinner loading-xs" />
            ) : (
              'PDF'
            )}
          </button>

          <label
            className={`btn btn-ghost btn-xs cursor-pointer ${ocrLoading ? 'btn-disabled' : ''}`}
            title="Extract text from image (OCR)">
            <span>{ocrLoading ? 'OCR...' : 'OCR'}</span>
            <input
              ref={ocrInputRef}
              type="file"
              accept="image/*"
              onChange={handleOCRFile}
              className="hidden"
              disabled={ocrLoading}
            />
          </label>
        </div>

        {/* Formatting toolbar */}
        <div className="border-base-300 flex flex-wrap items-center gap-0.5 border-b px-3 py-1">
          <button
            type="button"
            className="btn btn-ghost btn-xs btn-square font-bold"
            onClick={() =>
              exec((v) => insertAround(v, '**', '**', 'bold text'))
            }
            title="Bold (Ctrl+B)">
            B
          </button>
          <button
            type="button"
            className="btn btn-ghost btn-xs btn-square italic"
            onClick={() =>
              exec((v) => insertAround(v, '*', '*', 'italic text'))
            }
            title="Italic (Ctrl+I)">
            I
          </button>
          <button
            type="button"
            className="btn btn-ghost btn-xs btn-square line-through"
            onClick={() =>
              exec((v) => insertAround(v, '~~', '~~', 'strikethrough text'))
            }
            title="Strikethrough (Ctrl+Shift+X)">
            S
          </button>

          <div className="border-base-300 mx-0.5 h-4 w-px border-l" />

          {[1, 2, 3].map((level) => (
            <button
              key={level}
              type="button"
              className="btn btn-ghost btn-xs btn-square font-bold"
              onClick={() => exec((v) => insertHeading(v, level))}
              title={`Heading ${level}`}>
              H{level}
            </button>
          ))}

          <div className="border-base-300 mx-0.5 h-4 w-px border-l" />

          <button
            type="button"
            className="btn btn-ghost btn-xs"
            onClick={() =>
              exec((v) => insertAround(v, '[', '](url)', 'link text'))
            }
            title="Link (Ctrl+K)">
            Link
          </button>
          <button
            type="button"
            className="btn btn-ghost btn-xs"
            onClick={() =>
              exec((v) => insertAround(v, '![', '](url)', 'alt text'))
            }
            title="Image">
            Img
          </button>

          <div className="border-base-300 mx-0.5 h-4 w-px border-l" />

          <button
            type="button"
            className="btn btn-ghost btn-xs"
            onClick={() => exec((v) => insertAtLineStart(v, '-'))}
            title="Unordered list">
            UL
          </button>
          <button
            type="button"
            className="btn btn-ghost btn-xs"
            onClick={() => exec((v) => insertAtLineStart(v, '1.'))}
            title="Ordered list">
            OL
          </button>
          <button
            type="button"
            className="btn btn-ghost btn-xs"
            onClick={() => exec((v) => insertAtLineStart(v, '- [ ]'))}
            title="Task list">
            Task
          </button>

          <div className="border-base-300 mx-0.5 h-4 w-px border-l" />

          <button
            type="button"
            className="btn btn-ghost btn-xs"
            onClick={() => exec((v) => insertAround(v, '`', '`', 'code'))}
            title="Inline code (Ctrl+`)">
            Code
          </button>
          <button
            type="button"
            className="btn btn-ghost btn-xs"
            onClick={() =>
              exec((v) => insertBlock(v, '```\n', '\n```', 'code'))
            }
            title="Code block (Ctrl+Shift+C)">
            {`{ }`}
          </button>
          <button
            type="button"
            className="btn btn-ghost btn-xs"
            onClick={() => exec((v) => insertAtLineStart(v, '>'))}
            title="Blockquote">
            Quote
          </button>
          <button
            type="button"
            className="btn btn-ghost btn-xs"
            onClick={() =>
              exec((v) => {
                const { from } = v.state.selection.main;
                v.dispatch({ changes: { from, insert: '\n---\n' } });
                v.focus();
              })
            }
            title="Horizontal rule">
            HR
          </button>
          <button
            type="button"
            className="btn btn-ghost btn-xs"
            onClick={() => exec((v) => insertTable(v))}
            title="Insert table">
            Tbl
          </button>

          <div className="border-base-300 mx-0.5 h-4 w-px border-l" />

          <select
            className="select select-xs border-base-300 w-28 border font-mono"
            value={stringStyle}
            onChange={(e) => {
              const style = e.target.value as StringStype;
              if (style) {
                const view = viewRef.current;
                if (view) {
                  const { from, to } = view.state.selection.main;
                  const selected = view.state.sliceDoc(from, to);
                  if (selected) {
                    const transformed = STYLE_FN[style](selected);
                    view.dispatch({
                      changes: { from, to, insert: transformed },
                      selection: {
                        anchor: from,
                        head: from + transformed.length,
                      },
                    });
                    view.focus();
                  }
                }
              }
              setStringStyle('');
            }}
            title="Apply string transformation to selected text">
            {STRING_STYLES.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>

        {/* View mode + ToC + Font */}
        <div className="border-base-300 flex items-center justify-between border-b px-3 py-1.5">
          <div className="flex items-center gap-1">
            {viewModes.map(({ id, label }) => (
              <button
                key={id}
                type="button"
                className={`btn btn-xs ${viewMode === id ? 'btn-primary' : 'btn-ghost'}`}
                onClick={() => setState((prev) => ({ ...prev, viewMode: id }))}>
                {label}
              </button>
            ))}
            <div className="border-base-300 mx-0.5 h-4 w-px border-l" />
            <button
              type="button"
              className={`btn btn-xs ${showToc ? 'btn-primary' : 'btn-ghost'}`}
              onClick={() =>
                setState((prev) => ({ ...prev, showToc: !prev.showToc }))
              }
              title="Toggle table of contents">
              ToC
            </button>
            <button
              type="button"
              className={`btn btn-xs ${showLineNumbers ? 'btn-primary' : 'btn-ghost'}`}
              onClick={() =>
                setState((prev) => ({
                  ...prev,
                  showLineNumbers: !prev.showLineNumbers,
                }))
              }
              title="Toggle line numbers">
              #Line
            </button>
            {restored && (
              <span className="badge badge-warning badge-xs">
                Draft restored
              </span>
            )}
          </div>

          <select
            className="select select-xs border-base-300 w-auto border"
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

        {/* Main area: ToC sidebar + editor/preview */}
        <div className="flex min-h-0 flex-1 overflow-hidden">
          {showToc && (
            <div className="border-base-300 w-48 flex-shrink-0 overflow-y-auto border-r p-2 text-xs">
              {tocItems.length > 0 ? (
                <nav className="space-y-0.5">
                  {tocItems.map((item, i) => (
                    <button
                      key={i}
                      type="button"
                      className="hover:bg-base-300 block w-full cursor-pointer truncate rounded px-2 py-0.5 text-left"
                      style={{ paddingLeft: `${8 + (item.level - 1) * 12}px` }}
                      onClick={() => scrollToHeading(item.line)}
                      title={item.text}>
                      {item.text}
                    </button>
                  ))}
                </nav>
              ) : (
                <p className="text-base-content/40 p-2">No headings</p>
              )}
            </div>
          )}
          <div
            className={`grid min-h-0 flex-1 overflow-hidden ${viewMode === 'split' ? 'divide-base-300 divide-x md:grid-cols-2' : 'grid-cols-1'}`}>
            {/* Editor panel */}
            <div
              className={`flex flex-col overflow-hidden ${viewMode === 'preview' ? 'hidden' : ''}`}>
              <div
                ref={editorRef}
                className={`${ocrLoading ? 'pointer-events-none opacity-50' : ''} h-full w-full flex-1 overflow-auto text-sm`}
              />
            </div>

            {/* Preview panel */}
            <div
              className={`flex flex-col overflow-hidden ${viewMode === 'editor' ? 'hidden' : ''}`}>
              <div
                ref={previewScrollRef}
                className="h-full w-full flex-1 overflow-auto p-4">
                <MarkdownPreviewer
                  html={html}
                  fontClassName={selectedFont.className}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="border-base-300 text-base-content/60 flex flex-wrap items-center gap-4 border-t px-3 py-1 text-xs">
          <span>Chars: {stats.characters}</span>
          <span>Chars (no space): {stats.charactersNoSpaces}</span>
          <span>Words: {stats.words}</span>
          <span>Lines: {stats.lines}</span>
          <span>Reading: {stats.readingTime}</span>
        </div>
      </div>

      {/* Hidden file input for opening .md files */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".md,.markdown,text/markdown"
        onChange={handleOpenFile}
        className="hidden"
      />
    </ModalWrapper>
  );
};
