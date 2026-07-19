import type { FC } from 'react';

export const FooterNote: FC = () => (
  <p className="mx-auto mt-5 max-w-lg text-center text-xs leading-relaxed text-neutral-400 opacity-80">
    Click any <b className="font-semibold text-stone-200">amber-outlined</b>{' '}
    team to advance them. The winner&apos;s path is drawn in red.
  </p>
);
