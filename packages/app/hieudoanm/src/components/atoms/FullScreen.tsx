import { FC, ReactNode } from 'react';

interface FullScreenProps {
  onClose: () => void;
  title: string;
  subtitle?: string;
  footerNote?: string;
  centered?: boolean;
  children: ReactNode;
}

export const FullScreen: FC<FullScreenProps> = ({
  onClose,
  title,
  subtitle,
  footerNote,
  centered = false,
  children,
}) => {
  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <div className="border-base-300 flex shrink-0 items-center justify-between border-b px-4 py-3">
        <h2 className="text-sm font-normal tracking-tight">{title}</h2>
        {subtitle && (
          <p className="text-base-content/40 font-mono text-[10px] tracking-widest uppercase">
            {subtitle}
          </p>
        )}
        <button
          onClick={onClose}
          className="btn btn-ghost btn-xs btn-square text-base opacity-60 hover:opacity-100">
          ✕
        </button>
      </div>
      <div
        className={
          centered
            ? 'flex flex-1 flex-col items-center justify-center overflow-y-auto p-8'
            : 'flex-1 overflow-y-auto p-8'
        }>
        {children}
      </div>
      {footerNote && (
        <p className="text-base-content/20 shrink-0 text-center font-mono text-[10px] tracking-widest uppercase">
          {footerNote}
        </p>
      )}
    </div>
  );
};

FullScreen.displayName = 'FullScreen';
