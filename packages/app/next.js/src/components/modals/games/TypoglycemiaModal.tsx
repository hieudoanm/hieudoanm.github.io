'use client';

import createDOMPurify from 'dompurify';
import 'github-markdown-css/github-markdown.css';
import html2canvas from 'html2canvas-pro';
import { marked } from 'marked';
import {
  ChangeEventHandler,
  FC,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

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

const EditorTab: FC<{
  value: string;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
}> = ({ value, onChange }) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [selectedWordCount, setSelectedWordCount] = useState(0);

  const handleSelect = () => {
    if (!textareaRef.current) return;
    const sel = textareaRef.current.value.substring(
      textareaRef.current.selectionStart,
      textareaRef.current.selectionEnd
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
    <div className="flex h-full flex-col">
      <textarea
        ref={textareaRef}
        placeholder="Type or paste markdown here…"
        className="w-full grow resize-none p-4 font-mono text-sm focus:outline-none"
        value={value}
        onChange={onChange}
        onSelect={handleSelect}
      />
      <div className="border-base-300 flex items-center justify-between border-t px-4 py-2 text-xs">
        <span className="opacity-50">
          {countWords(value)} words
          {selectedWordCount > 0 && <> · {selectedWordCount} selected</>}
        </span>
        <div className="flex gap-2">
          <button
            type="button"
            className="btn btn-ghost btn-xs"
            onClick={handleCopy}>
            📄 Copy
          </button>
          <button
            type="button"
            className="btn btn-ghost btn-xs"
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

const ViewTab: FC<{ html: string; intervalMs?: number }> = ({
  html = '',
  intervalMs = 1000,
}) => {
  const imageRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [tick, setTick] = useState(0);
  const [running, setRunning] = useState(true);

  const sanitizedHTML = useMemo(() => DOMPurify?.sanitize(html), [html]);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setTick((t) => t + 1), intervalMs);
    return () => clearInterval(id);
  }, [intervalMs, running]);

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
    let node: Text | null;
    while ((node = walker.nextNode() as Text | null)) {
      if (!node.parentElement) continue;
      if (node.parentElement.closest('code, pre, textarea')) continue;
      node.textContent = scrambleText(node.textContent ?? '');
    }
  }, [tick, sanitizedHTML]);

  const handleSaveAsImage = async () => {
    if (!imageRef.current) return;
    const canvas = await html2canvas(imageRef.current, {
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
    <div className="flex h-full flex-col">
      <div ref={imageRef} className="min-h-0 flex-1 overflow-auto p-4">
        <div
          ref={containerRef}
          dangerouslySetInnerHTML={{ __html: sanitizedHTML ?? '' }}
          className="markdown-body !text-base-content prose max-w-none !bg-transparent"
        />
      </div>
      <div className="border-base-300 flex justify-end gap-2 border-t px-4 py-2">
        <button
          className="btn btn-ghost btn-xs"
          onClick={() => setRunning((p) => !p)}>
          {running ? '⏸️ Stop' : '▶️ Shuffle'}
        </button>
        <button className="btn btn-ghost btn-xs" onClick={handleSaveAsImage}>
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

export const TypoglycemiaModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [tab, setTab] = useState<Tab>('editor');
  const [input, setInput] = useState(INITIAL);
  const [output, setOutput] = useState('');

  useEffect(() => {
    const convert = async () => {
      const html = await marked(input, { gfm: true, breaks: true });
      setOutput(html);
    };

    convert();
  }, [input]);

  return (
    <dialog
      className="modal modal-open"
      style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}>
      <div className="modal-box flex h-[80vh] w-full max-w-2xl flex-col overflow-hidden p-0">
        {/* Header */}
        <div className="border-base-300 flex items-center justify-between border-b px-4 py-3">
          <div className="tabs tabs-boxed">
            {(['editor', 'view'] as Tab[]).map((t) => (
              <a
                key={t}
                role="tab"
                className={`tab tab-sm capitalize ${tab === t ? 'tab-active' : ''}`}
                onClick={() => setTab(t)}>
                {t === 'editor' ? '✏️ Editor' : '👁 View'}
              </a>
            ))}
          </div>
          <button onClick={onClose} className="btn btn-sm btn-circle btn-ghost">
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="min-h-0 flex-1 overflow-hidden">
          {tab === 'editor' && (
            <EditorTab
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          )}
          {tab === 'view' && <ViewTab html={output} />}
        </div>
      </div>

      <div className="modal-backdrop" onClick={onClose} />
    </dialog>
  );
};
