import type { FC } from 'react';

export const ErrorState: FC<{
  symbol: string;
  message: string;
  backHref?: string;
  backLabel?: string;
}> = ({ symbol, message, backHref, backLabel }) => (
  <div className="mx-auto flex min-h-screen max-w-5xl items-center justify-center bg-neutral-950 px-4">
    <div className="text-center">
      <div className="font-serif text-6xl font-bold text-neutral-800">
        {symbol}
      </div>
      <div className="mt-2 text-lg text-neutral-500">{message}</div>
      {backHref && backLabel && (
        <a
          href={backHref}
          className="mt-4 inline-block text-sm text-amber-400/70 transition-colors hover:text-amber-400">
          ← {backLabel}
        </a>
      )}
    </div>
  </div>
);
