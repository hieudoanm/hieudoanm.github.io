// components/modals/MorseModal.tsx
import { FC, useCallback, useState } from 'react';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';

// ── MORSE MAP ────────────────────────────────────────────────────────────────

const morse: Record<string, { code: string; pattern: string }> = {
  a: { code: '.-', pattern: 'di-dah' },
  b: { code: '-...', pattern: 'dah-di-di-dit' },
  c: { code: '-.-.', pattern: 'dah-di-dah-dit' },
  d: { code: '-..', pattern: 'dah-di-dit' },
  e: { code: '.', pattern: 'dit' },
  f: { code: '..-.', pattern: 'di-di-dah-dit' },
  g: { code: '--.', pattern: 'dah-dah-dit' },
  h: { code: '....', pattern: 'di-di-di-dit' },
  i: { code: '..', pattern: 'di-dit' },
  j: { code: '.---', pattern: 'di-dah-dah-dah' },
  k: { code: '-.-', pattern: 'dah-di-dah' },
  l: { code: '.-..', pattern: 'di-dah-di-dit' },
  m: { code: '--', pattern: 'dah-dah' },
  n: { code: '-.', pattern: 'dah-dit' },
  o: { code: '---', pattern: 'dah-dah-dah' },
  p: { code: '.--.', pattern: 'di-dah-dah-dit' },
  q: { code: '--.-', pattern: 'dah-dah-di-dah' },
  r: { code: '.-.', pattern: 'di-dah-dit' },
  s: { code: '...', pattern: 'di-di-dit' },
  t: { code: '-', pattern: 'dah' },
  u: { code: '..-', pattern: 'di-di-dah' },
  v: { code: '...-', pattern: 'di-di-di-dah' },
  w: { code: '.--', pattern: 'di-dah-dah' },
  x: { code: '-..-', pattern: 'dah-di-di-dah' },
  y: { code: '-.--', pattern: 'dah-di-dah-dah' },
  z: { code: '--..', pattern: 'dah-dah-di-dit' },
  '1': { code: '.----', pattern: 'di-dah-dah-dah-dah' },
  '2': { code: '..---', pattern: 'di-di-dah-dah-dah' },
  '3': { code: '...--', pattern: 'di-di-di-dah-dah' },
  '4': { code: '....-', pattern: 'di-di-di-di-dah' },
  '5': { code: '.....', pattern: 'di-di-di-di-dit' },
  '6': { code: '-....', pattern: 'dah-di-di-di-dit' },
  '7': { code: '--...', pattern: 'dah-dah-di-di-dit' },
  '8': { code: '---..', pattern: 'dah-dah-dah-di-dit' },
  '9': { code: '----.', pattern: 'dah-dah-dah-dah-dit' },
  '0': { code: '-----', pattern: 'dah-dah-dah-dah-dah' },
  '.': { code: '.-.-.-', pattern: 'di-dah-di-dah-di-dah' },
  ',': { code: '--..--', pattern: 'dah-dah-di-di-dah-dah' },
  '?': { code: '..--..', pattern: 'di-di-dah-dah-di-dit' },
  "'": { code: '.----.', pattern: 'di-dah-dah-dah-dah-dit' },
  '!': { code: '-.-.--', pattern: 'dah-di-dah-di-dah-dah' },
  '/': { code: '-..-.', pattern: 'dah-di-di-dah-dit' },
  ' ': { code: '/', pattern: 'word-space' },
};

// ── HELPERS ──────────────────────────────────────────────────────────────────

const morsify = (text: string): string =>
  text
    .split('')
    .map((ch) => morse[ch.toLowerCase()]?.code ?? '')
    .filter(Boolean)
    .join(' ');

const playMorse = (text: string, onDone: () => void) => {
  const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
  const ctx = new AudioCtx();
  const unit = 0.08;
  const freq = 600;
  const morseStr = morsify(text);
  let time = ctx.currentTime + 0.1;

  const beep = (dur: number) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.4, time);
    osc.start(time);
    osc.stop(time + dur);
    time += dur;
  };
  const gap = (dur: number) => {
    time += dur;
  };

  for (const ch of morseStr) {
    if (ch === '.') {
      beep(unit);
      gap(unit);
    } else if (ch === '-') {
      beep(unit * 3);
      gap(unit);
    } else if (ch === ' ') {
      gap(unit * 3);
    } else if (ch === '/') {
      gap(unit * 7);
    }
  }

  const totalMs =
    morseStr.split('').reduce((acc, ch) => {
      if (ch === '.') return acc + unit * 2;
      if (ch === '-') return acc + unit * 4;
      if (ch === ' ') return acc + unit * 3;
      if (ch === '/') return acc + unit * 7;
      return acc;
    }, 0) * 1000;

  setTimeout(onDone, totalMs + 300);
};

const SAMPLES = ['Hello world', 'SOS', 'CQ CQ DE'];

// ── MODAL ────────────────────────────────────────────────────────────────────

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
                <th className="text-base-content/40 font-medium">Char</th>
                <th className="text-base-content/40 font-medium">Code</th>
                <th className="text-base-content/40 hidden font-medium sm:table-cell">
                  Pattern
                </th>
              </tr>
            </thead>
            <tbody>
              {uniqueChars.map((ch) => {
                const entry = morse[ch];
                return (
                  <tr key={ch} className="border-base-300 border-t">
                    <td className="font-mono font-medium uppercase">
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
