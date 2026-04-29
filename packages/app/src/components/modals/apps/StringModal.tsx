import { FC, useState } from 'react';
import { FormatStyle, strings } from '@hieudoanm/utils/string';

const STRING_STYLES: { value: FormatStyle; label: string }[] = [
  { value: FormatStyle.Capitalise, label: 'Capitalise' },
  { value: FormatStyle.Deburr, label: 'deburr' },
  { value: FormatStyle.Kebabcase, label: 'kebab-case' },
  { value: FormatStyle.Lowercase, label: 'lowercase' },
  { value: FormatStyle.Snakecase, label: 'snake_case' },
  { value: FormatStyle.Uppercase, label: 'UPPERCASE' },
];

export const StringModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [from, setFrom] = useState('Hello, World!');
  const [style, setStyle] = useState<FormatStyle>(FormatStyle.Capitalise);
  const [copied, setCopied] = useState(false);

  const to = strings(from).format(style);

  const copy = () => {
    navigator.clipboard.writeText(to);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
      onClick={onClose}>
      <div
        className="card bg-base-100 border-base-300 w-full max-w-2xl border shadow-2xl"
        onClick={(e) => e.stopPropagation()}>
        <div className="card-body gap-5 p-6">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-lg font-black tracking-tight">
                String Formatter
              </h2>
              <p className="text-base-content/40 mt-0.5 font-mono text-[10px] tracking-widest uppercase">
                Transform · Format · Convert
              </p>
            </div>
            <button
              onClick={onClose}
              className="btn btn-ghost btn-xs btn-square text-base">
              ✕
            </button>
          </div>

          <div className="flex flex-col gap-1.5">
            <p className="text-base-content/40 font-mono text-[10px] tracking-widest uppercase">
              Formatting style
            </p>
            <select
              className="select select-bordered select-sm w-full font-mono text-sm font-bold"
              value={style}
              onChange={(e) => setStyle(e.target.value as FormatStyle)}>
              {STRING_STYLES.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-base-200 border-base-300 flex flex-col gap-2 rounded-xl border p-4">
              <p className="text-base-content/40 font-mono text-[10px] tracking-widest uppercase">
                Input
              </p>
              <textarea
                placeholder="Enter your text..."
                value={from}
                className="textarea textarea-bordered bg-base-100 h-40 w-full resize-none text-sm leading-relaxed"
                onChange={(e) => setFrom(e.target.value)}
              />
            </div>
            <div className="bg-base-200 border-base-300 flex flex-col gap-2 rounded-xl border p-4">
              <div className="flex items-center justify-between">
                <p className="text-base-content/40 font-mono text-[10px] tracking-widest uppercase">
                  Output
                </p>
                <button
                  onClick={copy}
                  className={`btn btn-xs font-mono ${copied ? 'btn-success' : 'btn-ghost border-base-300 border'}`}>
                  {copied ? '✓ Copied' : 'Copy'}
                </button>
              </div>
              <textarea
                value={to}
                readOnly
                placeholder="Formatted result..."
                className="textarea textarea-bordered bg-base-100 h-40 w-full resize-none font-mono text-sm leading-relaxed"
              />
            </div>
          </div>

          <p className="text-base-content/20 text-center font-mono text-[10px] tracking-widest uppercase">
            Click outside to close · Result updates as you type
          </p>
        </div>
      </div>
    </div>
  );
};
