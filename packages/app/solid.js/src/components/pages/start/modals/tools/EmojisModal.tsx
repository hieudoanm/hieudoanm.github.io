import { createSignal, createMemo } from 'solid-js';
import { emojis } from '@hieudoanm/data/emojis';
import { ModalWrapper } from '@hieudoanm/components/atoms/ModalWrapper';

type EmojiMap = Record<string, string>;

const IMAGES_BASE =
  'https://raw.githubusercontent.com/hieudoanm/hieudoanm/refs/heads/master/packages/data/emojis/images';

export const EmojisModal = (props: { onClose: () => void }) => {
  const [query, setQuery] = createSignal('');
  const [copied, setCopied] = createSignal<string | null>(null);

  const filtered = createMemo(() => {
    const entries = Object.entries(emojis as EmojiMap);
    if (!query()) return entries;
    return entries.filter(([key]) =>
      key.toLowerCase().includes(query().toLowerCase())
    );
  });

  const handleCopy = async (value: string, key: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(key);
      setTimeout(() => setCopied(null), 1200);
    } catch {
      alert('Failed to copy');
    }
  };

  return (
    <ModalWrapper
      onClose={props.onClose}
      title="Emoji Explorer"
      size="max-w-3xl">
      <p class="text-base-content/40 -mt-2 mb-1 text-[11px]">
        {filtered().length} emoji{filtered().length !== 1 ? 's' : ''}
      </p>

      <div class="border-base-300 -mx-6 shrink-0 border-b px-4 py-3">
        <input
          type="text"
          placeholder="Search emoji…"
          class="input input-bordered input-sm w-full"
          value={query()}
          onChange={(e: Event) =>
            setQuery((e.target as HTMLInputElement).value)
          }
          autoFocus
        />
      </div>

      <div class="-mx-6 overflow-y-auto px-4 py-3">
        {filtered().length === 0 ? (
          <p class="text-base-content/25 py-12 text-center text-sm">
            No emojis found.
          </p>
        ) : (
          <div
            class="grid gap-1"
            style={
              {
                gridTemplateColumns: 'repeat(auto-fill, minmax(56px, 1fr))',
              } as any
            }>
            {filtered().map(([key, value]) => {
              const isUnicode = !value.startsWith('http');
              const isCopied = copied() === key;
              return (
                <button
                  key={key}
                  title={`:${key}:`}
                  onClick={() => handleCopy(value, key)}
                  class={`hover:bg-base-300 flex flex-col items-center gap-1 rounded-lg p-2 text-center transition-colors ${
                    isCopied ? 'bg-success/10' : ''
                  }`}>
                  <span class="text-2xl leading-none">
                    {isUnicode ? (
                      value
                    ) : (
                      <img
                        src={`${IMAGES_BASE}/${key}.png`}
                        alt={key}
                        class="h-6 w-6"
                      />
                    )}
                  </span>
                  {isCopied && (
                    <span class="text-success text-[9px] font-bold">✓</span>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </ModalWrapper>
  );
};
