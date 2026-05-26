import createDOMPurify from 'dompurify';
import 'github-markdown-css/github-markdown.css';
import html2canvas from 'html2canvas-pro';
import { marked } from 'marked';
import { createEffect, createMemo, createSignal, onCleanup } from 'solid-js';
import { ModalWrapper } from '@hieudoanm/components/atoms/ModalWrapper';

/* ------------------------------------------------------------------ */
/* Helpers                                                              */
/* ------------------------------------------------------------------ */

const DOMPurify =
  typeof window !== 'undefined' ? createDOMPurify(window) : null;

export const countWords = (text: string): number =>
  (text.match(/\b[\p{L}\p{N}']+\b/gu) ?? []).length;

const scrambleWord = (word: string): string => {
  if (word.length <= 3) return word;
  const first = word[0];
  const last = word[word.length - 1];
  const middle = word.slice(1, -1).split('');
  const shuffleTimes = Math.min(
    middle.length,
    2 + Math.floor(Math.random() * 3)
  );
  for (let n = 0; n < shuffleTimes; n++) {
    const i = Math.floor(Math.random() * middle.length);
    let j = Math.floor(Math.random() * middle.length);
    if (i === j) j = (j + 1) % middle.length;
    [middle[i], middle[j]] = [middle[j], middle[i]];
  }
  if (middle.join('') === word.slice(1, -1) && middle.length > 1)
    [middle[0], middle[middle.length - 1]] = [
      middle[middle.length - 1],
      middle[0],
    ];
  return first + middle.join('') + last;
};

const scrambleText = (text: string): string =>
  text.replace(/\b[a-zA-Z]+\b/g, scrambleWord);

/* ------------------------------------------------------------------ */
/* INITIAL                                                              */
/* ------------------------------------------------------------------ */

const INITIAL = `# Typoglycemia

Typoglycemia is a made-up word that comes from typo and hypoglycemia. It describes a popular idea about how people read text. The idea says that readers can understand words even when the letters in the middle are mixed up, as long as the first and last letters stay the same. Many examples of this are shared online to show how "easy" it is to read scrambled text.

However, this idea is often exaggerated. Reading mixed-up words works best when the words are familiar and the sentence gives clear context. If too many letters are changed, or the text is complex, reading becomes much harder. Because of this, typoglycemia is considered an Internet myth rather than proven science.
`;

/* ------------------------------------------------------------------ */
/* Editor tab                                                           */
/* ------------------------------------------------------------------ */

const EditorTab = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (e: Event) => void;
}) => {
  let textareaRef: HTMLTextAreaElement | undefined;
  const [selectedWordCount, setSelectedWordCount] = createSignal(0);

  const handleSelect = () => {
    if (!textareaRef) return;
    const sel = textareaRef.value.substring(
      textareaRef.selectionStart,
      textareaRef.selectionEnd
    );
    setSelectedWordCount((sel.match(/\b[\p{L}\p{N}']+\b/gu) ?? []).length);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = value;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      onChange({ target: { value: text } } as any);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div class="flex h-full flex-col">
      <textarea
        ref={(el) => (textareaRef = el)}
        placeholder="Type or paste markdown here…"
        class="w-full grow resize-none p-4 font-mono text-sm focus:outline-none"
        value={value}
        onChange={onChange}
        onSelect={handleSelect}
      />
      <div class="border-base-300 flex items-center justify-between border-t px-4 py-2 text-xs">
        <span class="opacity-50">
          {countWords(value)} words
          {selectedWordCount() > 0 && <> · {selectedWordCount()} selected</>}
        </span>
        <div class="flex gap-2">
          <button
            type="button"
            class="btn btn-ghost btn-xs"
            onClick={handleCopy}>
            📄 Copy
          </button>
          <button
            type="button"
            class="btn btn-ghost btn-xs"
            onClick={handlePaste}>
            📋 Paste
          </button>
        </div>
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* View tab                                                             */
/* ------------------------------------------------------------------ */

const ViewTab = ({
  html = '',
  intervalMs = 1000,
}: {
  html?: string;
  intervalMs?: number;
}) => {
  let imageRef: HTMLDivElement | undefined;
  let containerRef: HTMLDivElement | undefined;
  const [tick, setTick] = createSignal(0);
  const [running, setRunning] = createSignal(true);

  const sanitizedHTML = createMemo(() => DOMPurify?.sanitize(html));

  createEffect(() => {
    if (!running()) return;
    const id = setInterval(() => setTick((t) => t + 1), intervalMs);
    onCleanup(() => clearInterval(id));
  });

  createEffect(() => {
    const root = containerRef;
    if (!root) return;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
    let node: Text | null;
    while ((node = walker.nextNode() as Text | null)) {
      if (!node.parentElement) continue;
      if (node.parentElement.closest('code, pre, textarea')) continue;
      node.textContent = scrambleText(node.textContent ?? '');
    }
  });

  const handleSaveAsImage = async () => {
    if (!imageRef) return;
    const canvas = await html2canvas(imageRef, {
      backgroundColor: null,
      scale: 2,
    });
    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'typoglycemia.png';
      a.click();
      URL.revokeObjectURL(url);
    });
  };

  return (
    <div class="flex h-full flex-col">
      <div
        ref={(el) => (imageRef = el)}
        class="min-h-0 flex-1 overflow-auto p-4">
        <div
          ref={(el) => (containerRef = el)}
          innerHTML={sanitizedHTML ?? ''}
          class="markdown-body !text-base-content prose max-w-none !bg-transparent"
        />
      </div>
      <div class="border-base-300 flex justify-end gap-2 border-t px-4 py-2">
        <button
          class="btn btn-ghost btn-xs"
          onClick={() => setRunning((p) => !p)}>
          {running() ? '⏸️ Stop' : '▶️ Shuffle'}
        </button>
        <button class="btn btn-ghost btn-xs" onClick={handleSaveAsImage}>
          🖼️ Save
        </button>
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Modal                                                                */
/* ------------------------------------------------------------------ */

type Tab = 'editor' | 'view';

export const TypoglycemiaModal = ({ onClose }: { onClose: () => void }) => {
  const [tab, setTab] = createSignal<Tab>('editor');
  const [input, setInput] = createSignal(INITIAL);
  const [output, setOutput] = createSignal('');

  createEffect(() => {
    const convert = async () => {
      const html = await marked(input(), { gfm: true, breaks: true });
      setOutput(html);
    };

    convert();
  });

  return (
    <ModalWrapper
      onClose={onClose}
      title="Typoglycemia"
      size="max-w-2xl"
      fullHeight>
      <div class="border-base-300 flex items-center justify-between border-b px-4 py-3">
        <div class="tabs tabs-boxed">
          {(['editor', 'view'] as Tab[]).map((t) => (
            <a
              key={t}
              role="tab"
              class={`tab tab-sm capitalize ${tab() === t ? 'tab-active' : ''}`}
              onClick={() => setTab(t)}>
              {t === 'editor' ? '✏️ Editor' : '👁 View'}
            </a>
          ))}
        </div>
      </div>

      {/* Body */}
      <div class="min-h-0 flex-1 overflow-hidden">
        {tab() === 'editor' && (
          <EditorTab
            value={input()}
            onChange={(e) => setInput(e.target.value)}
          />
        )}
        {tab() === 'view' && <ViewTab html={output()} />}
      </div>
    </ModalWrapper>
  );
};
