// ── LEET MAP ─────────────────────────────────────────────────────────────────

export const leet: Record<string, { symbol: string; description: string }> = {
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

export const leetify = (text: string): string =>
  text
    .split('')
    .map((ch) => leet[ch.toLowerCase()]?.symbol ?? ch)
    .join('');

export const SAMPLES = [
  'This message serves to prove how our minds do amazing things! Impressive things! In the beginning it was hard but now, on this line your mind is reading it automatically without even thinking about it, be proud! Only certain people can read this. Please forward if you can read this.',
  'Hello world',
  'The quick brown fox',
];

// ── MODAL ────────────────────────────────────────────────────────────────────
