import { createMemo, createSignal } from 'solid-js';
import { ModalWrapper } from '@hieudoanm/components/atoms/ModalWrapper';

export const HouseModal = ({ onClose }: { onClose: () => void }) => {
  const [name, setName] = createSignal('House');
  const letters = createMemo(() => name().trim().toUpperCase().split(''));

  return (
    <ModalWrapper
      onClose={onClose}
      title="House, M.D."
      subtitle="Name → Badge"
      size="max-w-lg"
      footerNote="Click outside to close · First letter gets full border">
      <div class="mb-2 flex items-center gap-2">
        <button
          onClick={() => setName('House')}
          class="btn btn-outline btn-xs font-mono tracking-widest">
          Reset
        </button>
      </div>

      <input
        type="text"
        placeholder="e.g. Gregory"
        class="input input-bordered input-sm w-full font-mono tracking-widest"
        value={name()}
        onChange={(e) => setName(e.target.value)}
      />

      <div class="bg-base-200 border-base-300 flex min-h-36 items-center justify-center overflow-x-auto rounded-xl border p-6">
        {letters().length > 0 && (
          <div class="relative flex items-center">
            {letters().map((letter, index) => {
              const isFirst = index === 0;
              return (
                <div
                  key={`${letter}-${index}`}
                  class={`border-base-content flex h-16 w-16 items-center justify-center text-4xl font-bold ${
                    isFirst ? 'mr-3 border-4' : 'border-b-4'
                  }`}>
                  {letter}
                </div>
              );
            })}
            <div class="absolute -right-12 -bottom-1 font-mono text-xs font-bold tracking-[0.3em] opacity-60">
              M.D.
            </div>
          </div>
        )}
      </div>
    </ModalWrapper>
  );
};
