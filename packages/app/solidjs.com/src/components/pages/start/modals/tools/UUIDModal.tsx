import { createSignal } from 'solid-js';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';
import { v1, v4, v7 } from 'uuid';

type UUIDVersion = 'v1' | 'v4' | 'v7';

const generate = (version: UUIDVersion): string =>
  version === 'v1' ? v1() : version === 'v4' ? v4() : v7();

const UUID_ITEMS: { key: UUIDVersion; label: string; description: string }[] = [
  { key: 'v1', label: 'UUID v1', description: 'Timestamp + MAC address' },
  { key: 'v4', label: 'UUID v4', description: 'Cryptographically random' },
  { key: 'v7', label: 'UUID v7', description: 'Unix timestamp + random' },
];

export const UUIDModal = (props: { onClose: () => void }) => {
  const [uuids, setUuids] = createSignal({ v1: v1(), v4: v4(), v7: v7() });
  const [copied, setCopied] = createSignal<string | null>(null);

  const regenerate = (version: UUIDVersion) =>
    setUuids((prev) => ({ ...prev, [version]: generate(version) }));

  const regenerateAll = () => setUuids({ v1: v1(), v4: v4(), v7: v7() });

  const copy = (value: string, key: string) => {
    navigator.clipboard.writeText(value);
    setCopied(key);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <ModalWrapper
      onClose={props.onClose}
      title="UUID Generator"
      subtitle="v1 · v4 · v7"
      footerNote="Click outside to close · Regenerate any version independently"
      size="max-w-lg">
      <div class="mb-2 flex justify-end">
        <button
          onClick={regenerateAll}
          class="btn btn-outline btn-xs font-mono tracking-widest">
          ↺ All
        </button>
      </div>

      <div class="flex flex-col gap-3">
        {UUID_ITEMS.map(({ key, label, description }) => (
          <div
            key={key}
            class="bg-base-200 border-base-300 rounded-xl border p-3">
            <div class="mb-2 flex items-center justify-between">
              <div>
                <span class="text-xs font-bold tracking-widest uppercase">
                  {label}
                </span>
                <span class="text-base-content/30 ml-2 font-mono text-[10px]">
                  {description}
                </span>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <input
                readOnly
                value={uuids()[key]}
                class="input input-bordered input-xs flex-1 font-mono text-xs tracking-wider"
              />
              <button
                onClick={() => regenerate(key)}
                class="btn btn-ghost btn-xs btn-square"
                title="Regenerate">
                ↺
              </button>
              <button
                onClick={() => copy(uuids()[key], key)}
                class={`btn btn-xs font-mono ${copied() === key ? 'btn-success' : 'btn-primary'}`}>
                {copied() === key ? '✓' : 'Copy'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </ModalWrapper>
  );
};
