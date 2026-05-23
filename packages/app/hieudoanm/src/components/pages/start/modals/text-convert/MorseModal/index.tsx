import { FC, useCallback, useState } from 'react';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';

import { SAMPLES, morse } from './constants';
import { morsify, playMorse } from './utils/morse';

export const MorseModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [input, setInput] = useState('');
  const [copied, setCopied] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [showMap, setShowMap] = useState(false);

  const output = morsify(input);
  const charCount = input.length;
  const symbolCount = output.replace(/[ /]/g, '').length;

  const copy = useCallback(async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }, [output]);

  const handlePlay = useCallback(() => {
    if (!input || playing) return;
    setPlaying(true);
    playMorse(input, () => setPlaying(false));
  }, [input, playing]);

  const download = () => {
    if (!input) return;
    const blob = new Blob([output], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'output.morse';
    a.click();
    URL.revokeObjectURL(url);
  };

  const uniqueChars = Array.from(new Set(input.toLowerCase().split(''))).filter(
    (ch) => morse[ch]
  );

  return (
    <ModalWrapper
      onClose={onClose}
      title="Morse Code"
      subtitle="ITU standard · Audio playback · .morse export"
      size="max-w-2xl">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="text-base-content/50 text-xs tracking-widest uppercase">
            Input
          </span>
          <span className="badge badge-ghost font-mono text-xs">
            {charCount} chars
          </span>
        </div>
        <textarea
          className="textarea textarea-bordered h-24 w-full resize-none font-sans text-sm leading-relaxed"
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
            Morse output
          </span>
          <span className="badge badge-ghost font-mono text-xs">
            {symbolCount} symbols
          </span>
        </div>
        <div className="bg-base-200 border-base-300 min-h-[64px] overflow-auto rounded-xl border p-4">
          {output ? (
            <p className="text-primary font-mono text-base leading-loose tracking-widest break-all">
              {output}
            </p>
          ) : (
            <p className="text-base-content/20 text-sm">
              Morse output will appear here…
            </p>
          )}
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        <button
          className={`btn btn-sm ${playing ? 'btn-warning' : 'btn-primary'}`}
          onClick={handlePlay}
          disabled={!output || playing}>
          {playing ? (
            <>
              <span className="loading loading-spinner loading-xs" /> Playing…
            </>
          ) : (
            '▶ Play'
          )}
        </button>
        <button
          className={`btn btn-sm ${copied ? 'btn-success' : 'btn-ghost border-base-300 border'}`}
          onClick={copy}
          disabled={!output}>
          {copied ? '✓ Copied' : 'Copy'}
        </button>
        <button
          className="btn btn-ghost btn-sm border-base-300 border"
          onClick={download}
          disabled={!input}>
          ↓ .morse
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
                <th className="text-base-content/40 font-normal">Char</th>
                <th className="text-base-content/40 font-normal">Code</th>
                <th className="text-base-content/40 hidden font-normal sm:table-cell">
                  Pattern
                </th>
              </tr>
            </thead>
            <tbody>
              {uniqueChars.map((ch) => {
                const entry = morse[ch];
                return (
                  <tr key={ch} className="border-base-300 border-t">
                    <td className="font-mono font-normal uppercase">
                      {ch === ' ' ? '␣' : ch}
                    </td>
                    <td className="text-primary font-mono tracking-widest">
                      {entry.code}
                    </td>
                    <td className="text-base-content/40 hidden font-mono text-xs sm:table-cell">
                      {entry.pattern}
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
MorseModal.displayName = 'MorseModal';
