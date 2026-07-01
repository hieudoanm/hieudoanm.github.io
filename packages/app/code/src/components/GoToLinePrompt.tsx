import { useCallback, useEffect, useRef, useState } from 'react';

interface GoToLinePromptProps {
  open: boolean;
  onSubmit: (line: number) => void;
  onCancel: () => void;
}

export const GoToLinePrompt = ({
  open,
  onSubmit,
  onCancel,
}: GoToLinePromptProps) => {
  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setValue('');
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  const handleSubmit = useCallback(() => {
    const num = parseInt(value, 10);
    if (!isNaN(num) && num > 0) {
      onSubmit(num);
      setValue('');
    }
  }, [value, onSubmit]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-base-100 mx-4 w-full max-w-xs rounded-lg p-5 shadow-xl">
        <h3 className="mb-4 text-base font-semibold">Go to Line</h3>
        <input
          ref={inputRef}
          autoFocus
          type="number"
          min={1}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSubmit();
            if (e.key === 'Escape') onCancel();
          }}
          placeholder="Enter line number..."
          className="input input-bordered input-sm mb-4 w-full"
        />
        <div className="flex justify-end gap-2">
          <button onClick={onCancel} className="btn btn-ghost btn-sm">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="btn btn-primary btn-sm"
            disabled={!value || isNaN(parseInt(value, 10))}>
            Go
          </button>
        </div>
      </div>
    </div>
  );
};
