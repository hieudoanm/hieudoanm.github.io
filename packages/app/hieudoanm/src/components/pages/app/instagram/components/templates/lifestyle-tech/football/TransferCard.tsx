import type { FC } from 'react';
import type { TemplateProps } from '../../common';

export const TransferCard: FC<TemplateProps> = ({ data }) => {
  const player = (data.player as string) ?? '';
  const from = (data.from as string) ?? '';
  const to = (data.to as string) ?? '';
  const fee = (data.fee as string) ?? '';
  const contractLength = (data.contractLength as string) ?? '';
  const date = (data.date as string) ?? '';

  return (
    <div className="bg-base-100 flex h-full w-full flex-col p-8">
      <div className="mb-4 text-center">
        <div className="text-accent text-xs font-bold tracking-[0.2em] uppercase">
          Transfer
        </div>
      </div>
      <div className="flex flex-1 flex-col items-center justify-center gap-4">
        <div className="text-center">
          <div className="text-base-content text-lg font-black">{player}</div>
          {date && <div className="text-neutral mt-1 text-xs">{date}</div>}
        </div>
        <div className="flex items-center gap-4">
          <div className="w-24 text-right">
            <div className="text-base-content text-base font-bold">{from}</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-primary text-primary-content rounded px-3 py-1 text-xs font-black">
              {fee}
            </div>
            <div className="text-primary mt-1 text-xs">→</div>
          </div>
          <div className="w-24 text-left">
            <div className="text-base-content text-base font-bold">{to}</div>
          </div>
        </div>
        {contractLength && (
          <div className="border-base-300 rounded border px-3 py-1 text-xs">
            <span className="text-neutral">Contract: </span>
            <span className="text-base-content font-semibold">
              {contractLength}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

TransferCard.displayName = 'TransferCard';
