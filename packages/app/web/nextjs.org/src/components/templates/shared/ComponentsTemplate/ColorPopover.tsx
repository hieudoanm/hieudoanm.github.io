import { useState } from 'react';

export const ColorPopover = () => {
  const [open, setOpen] = useState(false);
  const colors = [
    { bg: '#c9a84c', label: 'Gold' },
    { bg: '#6fcfa4', label: 'Teal' },
    { bg: '#6fa0cf', label: 'Blue' },
    { bg: '#cf6f6f', label: 'Red' },
    { bg: '#cf9f6f', label: 'Orange' },
    { bg: '#9f6fcf', label: 'Purple' },
  ];
  return (
    <div className="relative">
      <button
        className="btn btn-ghost border-base-300 border"
        onClick={() => setOpen((o) => !o)}>
        Color popover ↓
      </button>
      {open && (
        <div className="bg-base-300 border-base-content/10 absolute top-full left-0 z-50 mt-2 w-56 rounded-2xl border p-4 shadow-xl">
          <p className="text-base-content/50 mb-3 text-xs">
            Choose accent color
          </p>
          <div className="flex flex-wrap gap-2">
            {colors.map(({ bg, label }) => (
              <div
                key={label}
                title={label}
                className="hover:border-base-content h-8 w-8 cursor-pointer rounded-lg border-2 border-transparent transition-colors"
                style={{ background: bg }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
