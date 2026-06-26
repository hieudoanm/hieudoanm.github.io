import { FC, ReactNode } from 'react';

interface ModalWrapperProps {
  onClose: () => void;
  title: string;
  subtitle?: string;
  footerNote?: string;
  size?: string;
  fullHeight?: boolean;
  children: ReactNode;
}

export const ModalWrapper: FC<ModalWrapperProps> = ({
  onClose,
  title,
  subtitle,
  footerNote,
  size = 'max-w-sm',
  fullHeight = false,
  children,
}) => {
  if (fullHeight) {
    return (
      <dialog
        open
        className="modal modal-open"
        style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}>
        <div
          className={`modal-box border-base-content/15 flex h-[90vh] w-full ${size} flex-col overflow-hidden border p-0`}>
          <div className="border-base-300 flex items-center justify-between border-b px-4 py-3">
            <h3 className="text-sm font-bold">{title}</h3>
            <button
              onClick={onClose}
              className="btn btn-sm btn-circle btn-ghost opacity-60 hover:opacity-100">
              ✕
            </button>
          </div>
          {children}
        </div>
        <div className="modal-backdrop" onClick={onClose} />
      </dialog>
    );
  }

  return (
    <dialog
      open
      className="modal modal-open"
      style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}>
      <div
        className={`card bg-base-100 border-base-300 w-full ${size} border shadow-2xl`}>
        <div className="card-body gap-5 p-6">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-lg font-black tracking-tight">{title}</h2>
              {subtitle && (
                <p className="text-base-content/40 mt-0.5 font-mono text-[10px] tracking-widest uppercase">
                  {subtitle}
                </p>
              )}
            </div>
            <button
              onClick={onClose}
              className="btn btn-ghost btn-xs btn-square text-base opacity-60 hover:opacity-100">
              ✕
            </button>
          </div>
          {children}
          {footerNote && (
            <p className="text-base-content/20 text-center font-mono text-[10px] tracking-widest uppercase">
              {footerNote}
            </p>
          )}
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={onClose}>close</button>
      </form>
    </dialog>
  );
};

ModalWrapper.displayName = 'ModalWrapper';
