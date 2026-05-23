import { morse } from '../constants';

export const morsify = (text: string): string =>
  text
    .split('')
    .map((ch) => morse[ch.toLowerCase()]?.code ?? '')
    .filter(Boolean)
    .join(' ');

export const playMorse = (text: string, onDone: () => void) => {
  const AudioCtx =
    window.AudioContext ??
    (window as unknown as { webkitAudioContext: typeof AudioContext })
      .webkitAudioContext;
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
