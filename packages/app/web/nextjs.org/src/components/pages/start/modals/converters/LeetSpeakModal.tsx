// components/modals/LeetSpeakModal.tsx
import { FC, useCallback, useState } from 'react';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';

// ── LEET MAP ─────────────────────────────────────────────────────────────────

const leet: Record<string, { symbol: string; description: string }> = {
  a: { symbol: '4', description: '4' },
  b: { symbol: '8', description: '8' },
  e: { symbol: '3', description: '3' },
  g: { symbol: '9', description: '9' },
  i: { symbol: '1', description: '1' },
  l: { symbol: '1', description: '1' },
  o: { symbol: '0', description: '0' },
  s: { symbol: '5', description: '5' },
  t: { symbol: '7', description: '7' },
  z: { symbol: '2', description: '2' },
};

// ── HELPERS ──────────────────────────────────────────────────────────────────

const leetify = (text: string): string =>
  text
    .split('')
    .map((ch) => leet[ch.toLowerCase()]?.symbol ?? ch)
    .join('');

const SAMPLES = [
  'This message serves to prove how our minds do amazing things! Impressive things! In the beginning it was hard but now, on this line your mind is reading it automatically without even thinking about it, be proud! Only certain people can read this. Please forward if you can read this.',
  'Hello world',
  'The quick brown fox',
];

// ── MODAL ────────────────────────────────────────────────────────────────────

export const LeetSpeakModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [input, setInput] = useState('');
  const [copied, setCopied] = useState(false);
  const [showMap, setShowMap] = useState(false);

  const output = leetify(input);
  const uniqueChars = Array.from(new Set(input.toLowerCase().split(''))).filter(
    (ch) => leet[ch]
  );

  const copy = useCallback(async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }, [output]);

  return (
    <ModalWrapper
      onClose={onClose}
      title="Leet Speak"
      subtitle="1337 · Character substitution · Copy"
      size="max-w-2xl">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="text-base-content/50 text-xs tracking-widest uppercase">
            Input
          </span>
          <span className="badge badge-ghost font-mono text-xs">
            {input.length} chars
          </span>
        </div>
        <textarea
          className="textarea textarea-bordered h-24 w-full resize-none text-sm leading-relaxed"
          placeholder="Type or paste text…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <div className="flex flex-wrap gap-2">
          {SAMPLES.map((s) => (
            <button
              key={s}
              className="btn btn-ghost btn-xs border-base-300 border"
              onClick={() => setInput(s)}>
              {s.length > 30 ? s.slice(0, 30) + '…' : s}
            </button>
          ))}
          {input && (
            <button
              className="btn btn-ghost btn-xs border-base-300 ml-auto border"
              onClick={() => setInput('')}>
              Clear
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="text-base-content/50 text-xs tracking-widest uppercase">
            Leet output
          </span>
          <span className="badge badge-ghost font-mono text-xs">
            {output.length} chars
          </span>
        </div>
        <div className="bg-base-200 border-base-300 min-h-[64px] overflow-auto rounded-xl border p-4">
          {output.trim() ? (
            <p className="text-primary font-mono text-lg leading-loose tracking-widest break-all">
              {output}
            </p>
          ) : (
            <p className="text-base-content/20 text-sm">
              Leet output will appear here…
            </p>
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          className={`btn btn-sm ${copied ? 'btn-success' : 'btn-primary'}`}
          onClick={copy}
          disabled={!output.trim()}>
          {copied ? '✓ Copied' : 'Copy'}
        </button>
        {uniqueChars.length > 0 && (
          <button
            className="btn btn-ghost btn-sm border-base-300 ml-auto border"
            onClick={() => setShowMap((v) => !v)}>
            {showMap ? '▲ Hide map' : '▼ Char map'}
          </button>
        )}
      </div>

      {showMap && uniqueChars.length > 0 && (
        <div className="border-base-300 overflow-hidden rounded-xl border">
          <table className="table-sm table w-full text-sm">
            <thead className="bg-base-200">
              <tr>
                <th className="text-base-content/40 font-medium">Char</th>
                <th className="text-base-content/40 font-medium">Leet</th>
                <th className="text-base-content/40 hidden font-medium sm:table-cell">
                  Description
                </th>
              </tr>
            </thead>
            <tbody>
              {uniqueChars.map((ch) => {
                const entry = leet[ch];
                return (
                  <tr key={ch} className="border-base-300 border-t">
                    <td className="font-mono font-medium uppercase">
                      {ch === ' ' ? '␣' : ch}
                    </td>
                    <td className="text-primary font-mono tracking-widest">
                      {entry.symbol}
                    </td>
                    <td className="text-base-content/40 hidden font-mono text-xs sm:table-cell">
                      {entry.description}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </ModalWrapper>
  );
};
LeetSpeakModal.displayName = 'LeetSpeakModal';
