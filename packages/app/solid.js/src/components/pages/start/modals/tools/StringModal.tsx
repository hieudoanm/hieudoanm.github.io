import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';
import { FormatStyle, strings } from '@hieudoanm/string';
import { createSignal } from 'solid-js';

const STRING_STYLES: { value: FormatStyle; label: string }[] = [
  { value: FormatStyle.Capitalise, label: 'Capitalise' },
  { value: FormatStyle.Deburr, label: 'deburr' },
  { value: FormatStyle.Kebabcase, label: 'kebab-case' },
  { value: FormatStyle.Lowercase, label: 'lowercase' },
  { value: FormatStyle.Snakecase, label: 'snake_case' },
  { value: FormatStyle.Uppercase, label: 'UPPERCASE' },
];

export const StringModal = (props: { onClose: () => void }) => {
  const [from, setFrom] = createSignal('Hello, World!');
  const [style, setStyle] = createSignal<FormatStyle>(FormatStyle.Capitalise);
  const [copied, setCopied] = createSignal(false);

  const to = () => strings(from()).format(style());

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
            setStyle((e.target as HTMLSelectElement).value as FormatStyle)
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
