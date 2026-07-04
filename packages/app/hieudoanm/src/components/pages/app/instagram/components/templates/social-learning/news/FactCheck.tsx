import type { FC } from 'react';
import type { TemplateProps } from '../../common';

const VERDICT_STYLES: Record<
  string,
  { bg: string; text: string; label: string }
> = {
  true: { bg: 'bg-success', text: 'text-success-content', label: 'TRUE' },
  false: { bg: 'bg-error', text: 'text-error-content', label: 'FALSE' },
  partial: {
    bg: 'bg-warning',
    text: 'text-warning-content',
    label: 'PARTIALLY TRUE',
  },
};

export const FactCheck: FC<TemplateProps> = ({ data }) => {
  const claim = (data.claim as string) ?? '';
  const verdict = (data.verdict as string) ?? 'false';
  const source = (data.source as string) ?? '';
  const explanation = (data.explanation as string) ?? '';

  const style = VERDICT_STYLES[verdict] ?? VERDICT_STYLES.false;

  return (
    <div className="bg-base-100 flex h-full w-full flex-col p-10">
      <div className="mb-4 text-center">
        <div className="text-accent text-[10px] font-bold tracking-[0.2em] uppercase">
          Fact Check
        </div>
      </div>
      <div className="border-base-300 rounded border p-6 text-center">
        <div className="text-neutral mb-3 text-[10px] font-semibold tracking-wider uppercase">
          The Claim
        </div>
        <div className="text-base-content text-sm leading-relaxed italic">
          "{claim}"
        </div>
      </div>
      <div className="mt-4 flex flex-1 flex-col items-center justify-center gap-3">
        <span
          className={`${style.bg} ${style.text} rounded px-4 py-1.5 text-xs font-black tracking-wider`}>
          {style.label}
        </span>
        {explanation && (
          <p className="text-neutral max-w-md text-center text-xs leading-relaxed">
            {explanation}
          </p>
        )}
        {source && (
          <div className="text-neutral text-[10px]">Source: {source}</div>
        )}
      </div>
    </div>
  );
};

FactCheck.displayName = 'FactCheck';
