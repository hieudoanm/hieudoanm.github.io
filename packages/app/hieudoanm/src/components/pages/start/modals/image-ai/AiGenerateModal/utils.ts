export const STYLES = [
  'Realistic',
  'Anime',
  'Oil Painting',
  'Watercolor',
  'Pixel Art',
  'Sketch',
  '3D Render',
  'Cyberpunk',
];

export const SIZES = ['256×256', '512×512', '1024×1024'];

export const ASPECTS = ['1:1 Square', '16:9 Landscape', '9:16 Portrait'];

export const downloadBlob = (blob: Blob, name: string) => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  a.click();
  URL.revokeObjectURL(url);
};

export const generatePattern = (
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  prompt: string
) => {
  const seed = prompt.split('').reduce((s, c) => s + c.charCodeAt(0), 0);
  const rng = (max: number) =>
    (((seed * 9301 + 49297) % 233280) / 233280) * max;

  ctx.fillStyle = `hsl(${seed % 360}, 30%, 15%)`;
  ctx.fillRect(0, 0, w, h);

  const count = 20 + (seed % 30);
  for (let i = 0; i < count; i++) {
    const cx = rng(w);
    const cy = rng(h);
    const radius = 20 + rng(Math.min(w, h) * 0.3);
    const hue = (seed + i * 37) % 360;
    const sat = 50 + rng(50);
    const lig = 40 + rng(30);
    const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
    grad.addColorStop(0, `hsla(${hue}, ${sat}%, ${lig}%, 0.4)`);
    grad.addColorStop(1, 'transparent');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);
  }

  for (let i = 0; i < count * 2; i++) {
    const x = rng(w);
    const y = rng(h);
    const size = 1 + rng(3);
    ctx.fillStyle = `hsla(${(seed + i * 53) % 360}, 70%, 60%, 0.3)`;
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fill();
  }
};
