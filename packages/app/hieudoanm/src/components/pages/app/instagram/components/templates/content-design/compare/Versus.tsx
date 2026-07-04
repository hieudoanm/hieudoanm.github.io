import type { FC } from 'react';
import type { TemplateProps } from '../../common';

interface OptionDef {
  label: string;
  desc: string;
}

export const Versus: FC<TemplateProps> = ({ data }) => {
  const headline = (data.headline as string) ?? '';
  const optionA = (data.optionA as OptionDef) ?? {
    label: 'Option A',
    desc: '',
  };
  const optionB = (data.optionB as OptionDef) ?? {
    label: 'Option B',
    desc: '',
  };
  const features =
    (data.features as { a: string; b: string; label?: string }[]) ?? [];
  const rows =
    features.length > 0
      ? features
      : [
          { a: 'Free', b: 'Paid', label: 'Price' },
          { a: 'Basic', b: 'Advanced', label: 'Features' },
          { a: '1 user', b: 'Unlimited', label: 'Users' },
        ];

  return (
    <div className="flex h-full w-full flex-col">
      <div className="bg-accent/10 px-10 py-5">
        <h1 className="text-base-content text-center text-2xl font-bold tracking-tight">
          {headline || 'Versus'}
        </h1>
      </div>
      <div className="flex items-center justify-center gap-4 px-10 py-4">
        <span className="text-base-content text-lg font-bold">
          {optionA.label}
        </span>
        <span className="text-primary text-sm font-bold">VS</span>
        <span className="text-base-content text-lg font-bold">
          {optionB.label}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-3 px-10 pb-8">
        {rows.map((row, i) => (
          <div
            key={i}
            className="rounded-box bg-accent/5 flex flex-col gap-1 px-5 py-3">
            {row.label && (
              <span className="text-neutral text-[10px] font-medium tracking-wider uppercase">
                {row.label}
              </span>
            )}
            <div className="flex items-center justify-between gap-4">
              <span className="text-base-content flex-1 text-sm">{row.a}</span>
              <span className="text-neutral text-xs">|</span>
              <span className="text-base-content flex-1 text-right text-sm">
                {row.b}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

Versus.displayName = 'Versus';
