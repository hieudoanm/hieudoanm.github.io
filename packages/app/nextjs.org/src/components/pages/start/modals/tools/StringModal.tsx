import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';
import {
  capitalize,
  deburr,
  kebabCase,
  lowerCase,
  snakeCase,
  upperCase,
} from '@lodash/rs';
import { FC, useState } from 'react';

type Style =
  | 'capitalize'
  | 'deburr'
  | 'kebabCase'
  | 'lowerCase'
  | 'snakeCase'
  | 'upperCase';

const STRING_STYLES: { value: Style; label: string }[] = [
  { value: 'capitalize', label: 'Capitalise' },
  { value: 'deburr', label: 'deburr' },
  { value: 'kebabCase', label: 'kebab-case' },
  { value: 'lowerCase', label: 'lowercase' },
  { value: 'snakeCase', label: 'snake_case' },
  { value: 'upperCase', label: 'UPPERCASE' },
];

const STYLE_FN: Record<Style, (s: string) => string> = {
  capitalize,
  deburr,
  kebabCase,
  lowerCase,
  snakeCase,
  upperCase,
};

export const StringModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [from, setFrom] = useState('Hello, World!');
  const [style, setStyle] = useState<Style>('capitalize');
  const [copied, setCopied] = useState(false);

  const to = STYLE_FN[style](from);

  const copy = () => {
    navigator.clipboard.writeText(to);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <ModalWrapper
      onClose={onClose}
      title="String Formatter"
      subtitle="Transform · Format · Convert"
      footerNote="Click outside to close · Result updates as you type"
      size="max-w-2xl">
      <div className="flex flex-col gap-1.5">
        <p className="text-base-content/40 font-mono text-[10px] tracking-widest uppercase">
          Formatting style
        </p>
        <select
          className="select select-bordered select-sm w-full font-mono text-sm font-bold"
          value={style}
          onChange={(e) => setStyle(e.target.value as Style)}>
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
    </ModalWrapper>
  );
};
