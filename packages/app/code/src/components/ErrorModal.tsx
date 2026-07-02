import { type FC, useCallback, useState } from 'react';
import { LuCircleX, LuClipboardCopy, LuCheck } from 'react-icons/lu';
import type { ErrorInfo } from '../utils/try-catch';

interface ErrorModalProps {
  error: ErrorInfo | null;
  onClose: () => void;
}

export const ErrorModal: FC<ErrorModalProps> = ({ error, onClose }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    if (!error) return;
    const text = error.detail
      ? `${error.message}\n\n${error.detail}`
      : error.message;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API not available
    }
  }, [error]);

  if (!error) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-base-100 w-full max-w-md rounded-lg p-6 shadow-xl">
        <div className="mb-4 flex items-center gap-2">
          <LuCircleX className="text-error h-6 w-6" />
          <h3 className="text-base-content text-lg font-semibold">Error</h3>
        </div>
        <p className="text-base-content mb-1 text-sm">{error.message}</p>
        {error.detail && (
          <pre className="bg-base-200 text-base-content/70 mt-2 max-h-32 overflow-auto rounded p-2 text-xs">
            {error.detail}
          </pre>
        )}
        <div className="mt-4 flex justify-end gap-2">
          <button
            onClick={handleCopy}
            className="btn btn-ghost btn-sm flex items-center gap-1">
            {copied ? (
              <LuCheck className="text-success h-4 w-4" />
            ) : (
              <LuClipboardCopy className="h-4 w-4" />
            )}
            {copied ? 'Copied' : 'Copy'}
          </button>
          <button onClick={onClose} className="btn btn-primary btn-sm">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
