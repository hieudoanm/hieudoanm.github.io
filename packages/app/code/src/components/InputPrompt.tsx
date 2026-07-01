import { useCallback, useEffect, useState } from 'react';

interface InputPromptProps {
  open: boolean;
  title: string;
  placeholder?: string;
  defaultValue?: string;
  submitLabel?: string;
  onSubmit: (value: string) => void;
  onCancel: () => void;
}

export const InputPrompt = ({
  open,
  title,
  placeholder,
  defaultValue,
  submitLabel,
  onSubmit,
  onCancel,
}: InputPromptProps) => {
  const [value, setValue] = useState('');

  useEffect(() => {
    if (open) {
      setValue(defaultValue ?? '');
    }
  }, [open, defaultValue]);

  const handleSubmit = useCallback(() => {
    if (value.trim()) {
      onSubmit(value.trim());
      setValue('');
    }
  }, [value, onSubmit]);

  const handleCancel = useCallback(() => {
    setValue('');
    onCancel();
  }, [onCancel]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-base-100 mx-4 w-full max-w-sm rounded-lg p-5 shadow-xl">
        <h3 className="text-base-content mb-4 text-base font-semibold">
          {title}
        </h3>
        <input
          autoFocus
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSubmit();
            if (e.key === 'Escape') handleCancel();
          }}
          placeholder={placeholder}
          className="input input-bordered input-sm mb-4 w-full"
        />
        <div className="flex justify-end gap-2">
          <button onClick={handleCancel} className="btn btn-ghost btn-sm">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="btn btn-primary btn-sm"
            disabled={!value.trim()}>
            {submitLabel ?? 'Create'}
          </button>
        </div>
      </div>
    </div>
  );
};
