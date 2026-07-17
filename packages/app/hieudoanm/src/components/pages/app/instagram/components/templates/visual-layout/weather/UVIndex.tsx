import type { FC } from 'react';
import type { TemplateProps } from '../../common';

export const UVIndex: FC<TemplateProps> = ({ data }) => {
  const title = (data.title as string) ?? 'UV Index';
  const value = (data.value as string) ?? '7';
  const level = (data.level as string) ?? 'High';
  const tips = (data.tips as string[]) ?? [
    'Wear sunscreen (SPF 30+)',
    'Seek shade during midday hours',
    'Wear protective clothing and sunglasses',
  ];
  const peakTime = (data.peakTime as string) ?? '11:00 AM – 3:00 PM';

  const levelColor = (l: string) => {
    if (l === 'Extreme') return 'bg-[#8b5cf6] text-white';
    if (l === 'Very High') return 'bg-[#ff0030] text-white';
    if (l === 'High') return 'bg-[#d90029] text-white';
    if (l === 'Moderate') return 'bg-[#f59e0b] text-white';
    return 'bg-[#22c55e] text-white';
  };

  return (
    <div className="bg-base-100 flex h-full w-full flex-col items-center justify-center p-8">
      <span className="text-accent mb-2 text-xs font-bold tracking-[0.2em] uppercase">
        {title}
      </span>

      <div className="mt-2 text-center">
        <span className="text-accent text-4xl font-black">{value}</span>
        <div className="mt-2 flex justify-center">
          <span
            className={`rounded-full px-2 py-1 text-xs font-bold tracking-[0.1em] uppercase ${levelColor(level)}`}>
            {level}
          </span>
        </div>
      </div>

      <div className="bg-base-200 mt-2 rounded-2xl px-2 py-1 text-center">
        <span className="text-neutral text-xs font-bold tracking-[0.15em] uppercase">
          Peak Time
        </span>
        <span className="text-base-content mt-1 block text-xs font-semibold">
          {peakTime}
        </span>
      </div>

      <div className="mt-2 w-full">
        <span className="text-neutral text-xs font-bold tracking-[0.15em] uppercase">
          Protection Tips
        </span>
        <div className="mt-2 flex flex-col gap-2">
          {tips.map((tip, i) => (
            <div key={i} className="flex items-start gap-2">
              <span className="bg-accent mt-0.5 h-1.5 w-1.5 flex-shrink-0 rounded-full" />
              <span className="text-base-content text-xs leading-relaxed">
                {tip}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

UVIndex.displayName = 'UVIndex';
