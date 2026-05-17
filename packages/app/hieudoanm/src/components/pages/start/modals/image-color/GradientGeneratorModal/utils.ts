export type ColorStop = { color: string; position: number };

export type GradientType = 'linear' | 'radial';

export const DIRECTION_LABELS: { value: string; label: string }[] = [
  { value: 'to bottom', label: '↓' },
  { value: 'to top', label: '↑' },
  { value: 'to right', label: '→' },
  { value: 'to left', label: '←' },
  { value: 'to bottom right', label: '↘' },
  { value: 'to bottom left', label: '↙' },
  { value: 'to top right', label: '↗' },
  { value: 'to top left', label: '↖' },
];

export const INITIAL_STOPS: ColorStop[] = [
  { color: '#6366f1', position: 0 },
  { color: '#ec4899', position: 100 },
];

export const buildGradientCSS = (
  type: GradientType,
  stops: ColorStop[],
  direction: string,
  angle: number
): string => {
  const sorted = [...stops].sort((a, b) => a.position - b.position);
  const stopsStr = sorted.map((s) => `${s.color} ${s.position}%`).join(', ');

  if (type === 'radial') {
    return `radial-gradient(circle, ${stopsStr})`;
  }
  return `linear-gradient(${angle}deg, ${stopsStr})`;
};
