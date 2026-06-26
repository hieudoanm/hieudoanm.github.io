import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';
import { FC, useCallback, useState } from 'react';

import { SAMPLES, braille, braillify, downloadBrf } from './braille';

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
BrailleModal.displayName = 'BrailleModal';
