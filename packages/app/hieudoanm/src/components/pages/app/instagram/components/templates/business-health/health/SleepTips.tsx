import type { FC } from 'react';
import type { TemplateProps } from '../../common';

export const SleepTips: FC<TemplateProps> = ({ data }) => {
  const title = (data.title as string) ?? '';
  const tip = (data.tip as string) ?? '';
  const tips = (data.tips as string[]) ?? [];
  const quote = (data.quote as string) ?? '';

  return (
    <div className="bg-base-100 flex h-full w-full flex-col p-12">
      <span className="text-accent text-[10px] font-bold tracking-[0.2em] uppercase">
        Sleep Hygiene
      </span>
      <h1 className="text-base-content mt-2 text-xl font-bold">{title}</h1>
      {tip && (
        <div className="bg-accent/5 rounded-box mt-4 px-4 py-3">
          <span className="text-accent text-[10px] font-bold">Today's Tip</span>
          <p className="text-base-content mt-1 text-sm">{tip}</p>
        </div>
      )}
      {tips.length > 0 && (
        <div className="mt-5 flex flex-col gap-2">
          {tips.map((t, i) => (
            <div key={i} className="flex items-start gap-3">
              <span className="text-accent mt-0.5 text-sm">•</span>
              <p className="text-base-content text-sm">{t}</p>
            </div>
          ))}
        </div>
      )}
      {quote && (
        <p className="text-neutral mt-5 text-xs italic">
          &ldquo;{quote}&rdquo;
        </p>
      )}
    </div>
  );
};

SleepTips.displayName = 'SleepTips';
