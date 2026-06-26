import { FC, useCallback, useMemo, useState } from 'react';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';

const WORDS = [
  'lorem',
  'ipsum',
  'dolor',
  'sit',
  'amet',
  'consectetur',
  'adipiscing',
  'elit',
  'sed',
  'do',
  'eiusmod',
  'tempor',
  'incididunt',
  'ut',
  'labore',
  'et',
  'dolore',
  'magna',
  'aliqua',
  'ut',
  'enim',
  'ad',
  'minim',
  'veniam',
  'quis',
  'nostrud',
  'exercitation',
  'ullamco',
  'laboris',
  'nisi',
  'ut',
  'aliquip',
  'ex',
  'ea',
  'commodo',
  'consequat',
  'duis',
  'aute',
  'irure',
  'dolor',
  'in',
  'reprehenderit',
  'in',
  'voluptate',
  'velit',
  'esse',
  'cillum',
  'dolore',
  'eu',
  'fugiat',
  'nulla',
  'pariatur',
  'excepteur',
  'sint',
  'occaecat',
  'cupidatat',
  'non',
  'proident',
  'sunt',
  'in',
  'culpa',
  'qui',
  'officia',
  'deserunt',
  'mollit',
  'anim',
  'id',
  'est',
  'laborum',
];

const sentence = (wordCount: number): string => {
  const start = Math.floor(Math.random() * (WORDS.length - wordCount));
  const words = WORDS.slice(start, start + wordCount);
  const line = words.join(' ');
  return line.charAt(0).toUpperCase() + line.slice(1) + '.';
};

const paragraph = (sentences: number): string =>
  Array.from({ length: sentences }, () =>
    sentence(8 + Math.floor(Math.random() * 6))
  ).join(' ');

const generate = (paragraphs: number): string =>
  Array.from({ length: paragraphs }, () =>
    paragraph(3 + Math.floor(Math.random() * 4))
  ).join('\n\n');

export const LoremIpsumModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [count, setCount] = useState(3);
  const [copied, setCopied] = useState(false);

  const text = useMemo(() => generate(count), [count]);

  const handleCount = (delta: number) => {
    setCount((c) => Math.max(1, Math.min(20, c + delta)));
  };

  const copy = useCallback(async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }, [text]);

  const chars = text.length;
  const words = text.split(/\s+/).length;

  return (
    <ModalWrapper
      onClose={onClose}
      title="Lorem Ipsum"
      subtitle="Dummy text · Generator"
      footerNote="Copy to clipboard · Click outside to close"
      size="max-w-2xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleCount(-1)}
            disabled={count <= 1}
            className="btn btn-outline btn-xs font-mono">
            −
          </button>
          <span className="badge badge-ghost font-mono text-xs">
            {count} {count === 1 ? 'paragraph' : 'paragraphs'}
          </span>
          <button
            onClick={() => handleCount(1)}
            disabled={count >= 20}
            className="btn btn-outline btn-xs font-mono">
            +
          </button>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCount(1)}
            className="btn btn-ghost btn-xs border-base-300 border">
            ×1
          </button>
          <button
            onClick={() => setCount(3)}
            className="btn btn-ghost btn-xs border-base-300 border">
            ×3
          </button>
          <button
            onClick={() => setCount(5)}
            className="btn btn-ghost btn-xs border-base-300 border">
            ×5
          </button>
        </div>
      </div>

      <textarea
        className="textarea textarea-bordered mt-3 h-64 w-full resize-y text-sm leading-relaxed"
        value={text}
        readOnly
      />

      <div className="flex items-center justify-between">
        <div className="flex gap-3 text-xs opacity-50">
          <span className="font-mono">{chars.toLocaleString()} chars</span>
          <span className="font-mono">{words.toLocaleString()} words</span>
        </div>
        <button
          className={`btn btn-sm ${copied ? 'btn-success' : 'btn-primary'}`}
          onClick={copy}>
          {copied ? '✓ Copied' : 'Copy'}
        </button>
      </div>
    </ModalWrapper>
  );
};
