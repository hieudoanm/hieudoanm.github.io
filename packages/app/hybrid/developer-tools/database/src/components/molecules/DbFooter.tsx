import type { FC } from 'react';

interface DbFooterProps {
  hasDb: boolean;
  status: string;
}

export const DbFooter: FC<DbFooterProps> = ({ hasDb, status }) => {
  return (
    <footer className="bg-base-200 border-base-300 flex flex-shrink-0 items-center gap-3 border-t px-4 py-1.5">
      {hasDb && (
        <span className="bg-primary inline-block h-2 w-2 flex-shrink-0 animate-pulse rounded-full" />
      )}
      <span className="text-base-content/40 truncate font-mono text-[11px]">
        {status}
      </span>
      <span className="text-base-content/20 ml-auto font-mono text-[11px]">
        SQLite WASM · OPFS
      </span>
    </footer>
  );
};
