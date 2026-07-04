import type { FC } from 'react';
import type { TemplateProps } from '../../common';

export const ChordChart: FC<TemplateProps> = ({ data }) => {
  const title = (data.title as string) ?? 'Chord Chart';
  const chords = (data.chords as { name: string; fingers: string }[]) ?? [];
  const difficulty = (data.difficulty as string) ?? '';
  const tip = (data.tip as string) ?? '';

  return (
    <div className="bg-base-100 flex h-full w-full flex-col items-center justify-center p-8 text-center">
      <span className="text-accent text-[10px] font-bold tracking-[0.2em] uppercase">
        Chord Chart
      </span>
      <h1 className="text-base-content mt-1 text-xl font-bold">{title}</h1>
      {difficulty && (
        <span className="bg-secondary/10 text-secondary mt-2 rounded-full px-3 py-0.5 text-[10px] font-bold">
          {difficulty}
        </span>
      )}
      <div className="mt-5 grid grid-cols-3 gap-4">
        {chords.map((chord, i) => (
          <div key={i} className="flex flex-col items-center">
            <div className="bg-base-200 border-base-300 flex h-16 w-14 flex-col items-center justify-center rounded border">
              <span className="text-base-content text-sm font-bold">
                {chord.name}
              </span>
            </div>
            <p className="text-neutral mt-1 text-[9px] leading-tight">
              {chord.fingers}
            </p>
          </div>
        ))}
      </div>
      {tip && (
        <div className="bg-accent/10 text-accent mt-5 max-w-xs rounded-lg px-4 py-2 text-xs">
          💡 {tip}
        </div>
      )}
    </div>
  );
};
ChordChart.displayName = 'ChordChart';
