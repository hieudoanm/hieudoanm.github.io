import { LuTriangleAlert } from 'react-icons/lu';

interface ConfirmModalProps {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmModal = ({
  open,
  title,
  message,
  confirmLabel = 'Delete',
  cancelLabel = 'Cancel',
  onConfirm,
  onCancel,
}: ConfirmModalProps) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-base-100 mx-4 w-full max-w-md rounded-lg p-5 shadow-xl">
        <div className="mb-3 flex items-center gap-2">
          <LuTriangleAlert className="text-warning h-5 w-5 shrink-0" />
          <h3 className="text-base-content text-base font-semibold">{title}</h3>
        </div>
        <p className="text-base-content/80 mb-5 text-sm">{message}</p>
        <div className="flex justify-end gap-2">
          <button onClick={onCancel} className="btn btn-ghost btn-sm">
            {cancelLabel}
          </button>
          <button onClick={onConfirm} className="btn btn-error btn-sm">
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};
