export interface Preset {
  label: string;
  work: number;
  break: number;
}
export type Phase = 'work' | 'break';

export const PRESETS: Preset[] = [
  { label: '25 / 5', work: 25, break: 5 },
  { label: '50 / 10', work: 50, break: 10 },
  { label: '90 / 20', work: 90, break: 20 },
];

export const fmt = (s: number): string => {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
};
