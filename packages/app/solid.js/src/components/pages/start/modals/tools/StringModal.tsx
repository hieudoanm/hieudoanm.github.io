import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';
import {
  capitalize,
  deburr,
  kebabCase,
  lowerCase,
  snakeCase,
  upperCase,
} from '@lodash/ts';
import { createSignal } from 'solid-js';

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

export const StringModal = (props: { onClose: () => void }) => {
  const [from, setFrom] = createSignal('Hello, World!');
  const [style, setStyle] = createSignal<Style>('capitalize');
  const [copied, setCopied] = createSignal(false);

  const to = () => STYLE_FN[style()](from());

  const copy = () => {
    navigator.clipboard.writeText(to());
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <ModalWrapper
      onClose={props.onClose}
      title="String Formatter"
      subtitle="Transform · Format · Convert"
      footerNote="Click outside to close · Result updates as you type"
      size="max-w-2xl">
      <div class="flex flex-col gap-1.5">
        <p class="text-base-content/40 font-mono text-[10px] tracking-widest uppercase">
          Formatting style
        </p>
        <select
          class="select select-bordered select-sm w-full font-mono text-sm font-bold"
          value={style()}
          onChange={(e: Event) =>
            setStyle((e.target as HTMLSelectElement).value as Style)
          }>
          {STRING_STYLES.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>

      <div class="grid grid-cols-2 gap-4">
        <div class="bg-base-200 border-base-300 flex flex-col gap-2 rounded-xl border p-4">
          <p class="text-base-content/40 font-mono text-[10px] tracking-widest uppercase">
            Input
          </p>
          <textarea
            placeholder="Enter your text..."
            value={from()}
            class="textarea textarea-bordered bg-base-100 h-40 w-full resize-none text-sm leading-relaxed"
            onChange={(e: Event) =>
              setFrom((e.target as HTMLTextAreaElement).value)
            }
          />
        </div>
        <div class="bg-base-200 border-base-300 flex flex-col gap-2 rounded-xl border p-4">
          <div class="flex items-center justify-between">
            <p class="text-base-content/40 font-mono text-[10px] tracking-widest uppercase">
              Output
            </p>
            <button
              onClick={copy}
              class={`btn btn-xs font-mono ${copied() ? 'btn-success' : 'btn-ghost border-base-300 border'}`}>
              {copied() ? '✓ Copied' : 'Copy'}
            </button>
          </div>
          <textarea
            value={to()}
            readOnly
            placeholder="Formatted result..."
            class="textarea textarea-bordered bg-base-100 h-40 w-full resize-none font-mono text-sm leading-relaxed"
          />
        </div>
      </div>
    </ModalWrapper>
  );
};
