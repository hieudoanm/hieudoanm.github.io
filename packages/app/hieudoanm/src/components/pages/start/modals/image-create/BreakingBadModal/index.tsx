import { FC, useState } from 'react';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';

import { Preview } from './components/Preview';
import { PRESETS } from './constants';
import { Align } from './types';

export const BreakingBadModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [{ align, isColored, isMultiline, name }, setState] = useState<{
    align: Align;
    isColored: boolean;
    isMultiline: boolean;
    name: string;
  }>({
    align: 'center',
    isColored: true,
    isMultiline: false,
    name: 'Breaking Bad',
  });
  const set = (
    patch: Partial<{
      align: Align;
      isColored: boolean;
      isMultiline: boolean;
      name: string;
    }>
  ) => setState((p) => ({ ...p, ...patch }));

  return (
    <ModalWrapper onClose={onClose} title="Breaking Bad Text" size="max-w-2xl">
      <div className="mb-4 flex flex-wrap gap-2">
        {PRESETS.map((preset) => (
          <button
            key={preset}
            className={`btn btn-xs ${name === preset ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => set({ name: preset })}>
            {preset}
          </button>
        ))}
      </div>
      <input
        placeholder="✨ Your Name"
        className="input input-bordered mb-4 w-full"
        value={name}
        onChange={(e) => set({ name: e.target.value })}
      />
      <div className="mb-4 flex flex-wrap items-center gap-4">
        <label className="label cursor-pointer justify-start gap-2">
          <input
            type="checkbox"
            checked={isColored}
            className="toggle toggle-primary toggle-sm"
            onChange={(e) => set({ isColored: e.target.checked })}
          />
          Colored
        </label>
        <label className="label cursor-pointer justify-start gap-2">
          <input
            type="checkbox"
            checked={isMultiline}
            className="toggle toggle-primary toggle-sm"
            onChange={(e) => set({ isMultiline: e.target.checked })}
          />
          Multiline
        </label>
        {isMultiline && (
          <div className="join">
            {(['left', 'center', 'right'] as Align[]).map((a) => (
              <button
                key={a}
                type="button"
                className={`join-item btn btn-sm btn-soft ${align === a ? 'btn-primary' : ''}`}
                onClick={() => set({ align: a })}>
                {a.charAt(0).toUpperCase() + a.slice(1)}
              </button>
            ))}
          </div>
        )}
      </div>
      <div className="bg-base-200 flex min-h-40 items-center justify-center overflow-auto rounded-xl p-4">
        <Preview
          align={align}
          isColored={isColored}
          isMultiline={isMultiline}
          text={name}
        />
      </div>
    </ModalWrapper>
  );
};
BreakingBadModal.displayName = 'BreakingBadModal';
