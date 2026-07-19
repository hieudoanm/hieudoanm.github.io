import type { FC } from 'react';

export interface YearInfo {
  year: number;
  host: string;
  champion: string | null;
  runnerUp: string | null;
  available: boolean;
}

export const YearCard: FC<{ info: YearInfo; href: string }> = ({
  info,
  href,
}) => (
  <a
    href={href}
    className={`block rounded-xl border p-4 text-center transition-all duration-200 ${
      info.available
        ? 'border-amber-400/30 bg-amber-900/10 hover:-translate-y-1 hover:border-amber-400 hover:bg-amber-900/30'
        : 'border-neutral-700 bg-neutral-900/60 hover:-translate-y-0.5 hover:bg-neutral-800/80'
    }`}>
    <div className="font-serif text-2xl font-bold tracking-tight text-stone-200">
      {info.year}
    </div>
    <div className="mt-0.5 text-xs text-neutral-500">{info.host}</div>
    {info.champion && (
      <div className="mt-1.5 text-xs font-medium text-amber-400/70">
        🏆 {info.champion}
      </div>
    )}
    {info.runnerUp && (
      <div className="mt-0.5 text-xs text-neutral-500">2nd {info.runnerUp}</div>
    )}
    {!info.champion && info.available && (
      <div className="mt-1.5 text-xs text-neutral-500 italic">Upcoming</div>
    )}
  </a>
);
