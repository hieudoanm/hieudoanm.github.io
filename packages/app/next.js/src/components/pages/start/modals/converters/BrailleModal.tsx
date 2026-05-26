// components/modals/BrailleModal.tsx
import { FC, useCallback, useState } from 'react';
import { ModalWrapper } from '@hieudoanm/components/atoms/ModalWrapper';

// ── BRAILLE MAP ──────────────────────────────────────────────────────────────

const braille: Record<
  string,
  { unicode: string; dots: string; character: string }
> = {
  a: { unicode: 'U+2801', dots: '1', character: '⠁' },
  b: { unicode: 'U+2803', dots: '1-2', character: '⠃' },
  c: { unicode: 'U+2809', dots: '1-4', character: '⠉' },
  d: { unicode: 'U+2819', dots: '1-4-5', character: '⠙' },
  e: { unicode: 'U+2811', dots: '1-5', character: '⠑' },
  f: { unicode: 'U+280B', dots: '1-2-4', character: '⠋' },
  g: { unicode: 'U+281B', dots: '1-2-4-5', character: '⠛' },
  h: { unicode: 'U+2813', dots: '1-2-5', character: '⠓' },
  i: { unicode: 'U+280A', dots: '2-4', character: '⠊' },
  j: { unicode: 'U+281A', dots: '2-4-5', character: '⠚' },
  k: { unicode: 'U+2805', dots: '1-3', character: '⠅' },
  l: { unicode: 'U+2807', dots: '1-2-3', character: '⠇' },
  m: { unicode: 'U+280D', dots: '1-3-4', character: '⠍' },
  n: { unicode: 'U+281D', dots: '1-3-4-5', character: '⠝' },
  o: { unicode: 'U+2815', dots: '1-3-5', character: '⠕' },
  p: { unicode: 'U+280F', dots: '1-2-3-4', character: '⠏' },
  q: { unicode: 'U+281F', dots: '1-2-3-4-5', character: '⠟' },
  r: { unicode: 'U+2817', dots: '1-2-3-5', character: '⠗' },
  s: { unicode: 'U+280E', dots: '2-3-4', character: '⠎' },
  t: { unicode: 'U+281E', dots: '2-3-4-5', character: '⠞' },
  u: { unicode: 'U+2825', dots: '1-3-6', character: '⠥' },
  v: { unicode: 'U+2827', dots: '1-2-3-6', character: '⠧' },
  w: { unicode: 'U+283A', dots: '2-4-5-6', character: '⠺' },
  x: { unicode: 'U+282D', dots: '1-3-4-6', character: '⠭' },
  y: { unicode: 'U+283D', dots: '1-3-4-5-6', character: '⠽' },
  z: { unicode: 'U+2835', dots: '1-3-5-6', character: '⠵' },
  '1': { unicode: 'U+2801', dots: '1', character: '⠁' },
  '2': { unicode: 'U+2803', dots: '1-2', character: '⠃' },
  '3': { unicode: 'U+2809', dots: '1-4', character: '⠉' },
  '4': { unicode: 'U+2819', dots: '1-4-5', character: '⠙' },
  '5': { unicode: 'U+2811', dots: '1-5', character: '⠑' },
  '6': { unicode: 'U+280B', dots: '1-2-4', character: '⠋' },
  '7': { unicode: 'U+281B', dots: '1-2-4-5', character: '⠛' },
  '8': { unicode: 'U+2813', dots: '1-2-5', character: '⠓' },
  '9': { unicode: 'U+280A', dots: '2-4', character: '⠊' },
  '0': { unicode: 'U+281A', dots: '2-4-5', character: '⠚' },
  '.': { unicode: 'U+2832', dots: '2-5-6', character: '⠲' },
  ',': { unicode: 'U+2802', dots: '2', character: '⠂' },
  ';': { unicode: 'U+2806', dots: '2-3', character: '⠆' },
  ':': { unicode: 'U+2812', dots: '2-5', character: '⠒' },
  '!': { unicode: 'U+2816', dots: '2-3-5', character: '⠖' },
  '?': { unicode: 'U+2826', dots: '2-3-6', character: '⠦' },
  "'": { unicode: 'U+2804', dots: '3', character: '⠄' },
  '-': { unicode: 'U+2824', dots: '3-6', character: '⠤' },
  '(': { unicode: 'U+2828', dots: '4-6', character: '⠨' },
  ')': { unicode: 'U+2838', dots: '4-5-6', character: '⠸' },
  '"': { unicode: 'U+2810', dots: '5', character: '⠐' },
  '/': { unicode: 'U+282C', dots: '3-4-6', character: '⠬' },
  ' ': { unicode: 'U+2800', dots: '', character: '⠀' },
};

// ── HELPERS ──────────────────────────────────────────────────────────────────

const braillify = (text: string): string =>
  text
    .split('')
    .map((ch) => braille[ch.toLowerCase()]?.character ?? ch)
    .join('');

const downloadBrf = (text: string) => {
  const out = braillify(text);
  const charsPerLine = 40;
  const lines: string[] = [];
  for (let i = 0; i < out.length; i += charsPerLine)
    lines.push(out.slice(i, i + charsPerLine));
  const blob = new Blob([lines.join('\n')], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'output.brf';
  a.click();
  URL.revokeObjectURL(url);
};

const SAMPLES = ['Hello world', 'Braille 101', 'The quick brown fox'];

// ── MODAL ────────────────────────────────────────────────────────────────────

export const BrailleModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [input, setInput] = useState('');
  const [copied, setCopied] = useState(false);
  const [showMap, setShowMap] = useState(false);

  const output = braillify(input);
  const uniqueChars = Array.from(new Set(input.toLowerCase().split(''))).filter(
    (ch) => braille[ch]
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
      title="Braille"
      subtitle="Grade 1 · Unicode · BRF export"
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
              {s}
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
            Braille output
          </span>
          <span className="badge badge-ghost font-mono text-xs">
            {output.length} chars
          </span>
        </div>
        <div className="bg-base-200 border-base-300 min-h-[64px] overflow-auto rounded-xl border p-4">
          {output.trim() ? (
            <p className="text-primary font-mono text-2xl leading-loose tracking-widest break-all">
              {output}
            </p>
          ) : (
            <p className="text-base-content/20 text-sm">
              Braille output will appear here…
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
        <button
          className="btn btn-ghost btn-sm border-base-300 border"
          onClick={() => downloadBrf(input)}
          disabled={!input}>
          ↓ .brf
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
                <th className="text-base-content/40 font-medium">Braille</th>
                <th className="text-base-content/40 hidden font-medium sm:table-cell">
                  Unicode
                </th>
                <th className="text-base-content/40 hidden font-medium sm:table-cell">
                  Dots
                </th>
              </tr>
            </thead>
            <tbody>
              {uniqueChars.map((ch) => {
                const entry = braille[ch];
                return (
                  <tr key={ch} className="border-base-300 border-t">
                    <td className="font-mono font-medium uppercase">
                      {ch === ' ' ? '␣' : ch}
                    </td>
                    <td className="text-primary font-mono text-xl">
                      {entry.character}
                    </td>
                    <td className="text-base-content/40 hidden font-mono text-xs sm:table-cell">
                      {entry.unicode}
                    </td>
                    <td className="text-base-content/40 hidden font-mono text-xs sm:table-cell">
                      {entry.dots || '—'}
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
