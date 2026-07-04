import type { FC } from 'react';
import type { TemplateProps } from '../../common';

interface LightingTip {
  label: string;
  desc: string;
}

export const LightingTips: FC<TemplateProps> = ({ data }) => {
  const title = (data.title as string) ?? 'Lighting Tips';
  const setup = (data.setup as string) ?? '';
  const description = (data.description as string) ?? '';
  const tips = (data.tips as LightingTip[]) ?? [];

  return (
    <div className="bg-base-100 flex h-full w-full flex-col items-center justify-center p-8 text-center">
      <div className="text-accent mb-1 text-xs font-bold tracking-[0.2em] uppercase">
        Lighting
      </div>
      <h1 className="text-base-content mb-1 text-2xl font-bold">{title}</h1>
      {setup && (
        <span className="text-primary mb-2 text-sm font-bold">{setup}</span>
      )}
      {description && (
        <p className="text-neutral mb-4 max-w-sm text-xs leading-relaxed">
          {description}
        </p>
      )}
      {tips.length > 0 && (
        <div className="mt-1 grid w-full max-w-md grid-cols-2 gap-2">
          {tips.map((tip, i) => (
            <div
              key={i}
              className="border-base-300 rounded border p-3 text-left">
              <div className="text-primary text-xs font-bold">{tip.label}</div>
              <div className="text-neutral mt-1 text-[10px] leading-relaxed">
                {tip.desc}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

LightingTips.displayName = 'LightingTips';
