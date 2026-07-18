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

  const citation = (data.citation as string) ?? '';
  return (
    <div className="bg-base-100 flex h-full w-full flex-col items-center justify-center p-8 text-center">
      <h2 className="text-accent mb-1 text-xs font-bold tracking-[0.2em] uppercase">
        Lighting
      </h2>
      <h1 className="text-base-content mb-1 text-4xl font-bold">{title}</h1>
      {setup && (
        <span className="text-primary mb-1 text-xs font-bold">{setup}</span>
      )}
      {description && (
        <p className="text-neutral mb-1 max-w-sm text-xs leading-relaxed">
          {description}
        </p>
      )}
      {tips.length > 0 && (
        <ul className="mt-1 grid w-full max-w-md grid-cols-2 gap-1">
          {tips.map((tip, i) => (
            <li
              key={i}
              className="border-base-300 rounded border p-1 text-left">
              <strong className="text-primary text-xs font-bold">
                {tip.label}
              </strong>
              <p className="text-neutral mt-1 text-xs leading-relaxed">
                {tip.desc}
              </p>
            </li>
          ))}
        </ul>
      )}
      {citation && (
        <p className="text-base-content/40 mt-auto pt-4 text-center text-[10px]">
          {citation}
        </p>
      )}
    </div>
  );
};

LightingTips.displayName = 'LightingTips';
