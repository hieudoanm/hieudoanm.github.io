import { createSignal } from 'solid-js';
import html2canvas from 'html2canvas-pro';
import { ModalWrapper } from '@hieudoanm/components/atoms/ModalWrapper';

/* ------------------------------------------------------------------ */
/* Data — inline minimal periodic table types                           */
/* ------------------------------------------------------------------ */

// These are imported from your existing data/utils — keep imports as-is
import {
  periodicTable,
  specificNameColorMap,
} from '@hieudoanm/data/periodic-table';
import { capitalise, kebabcase } from '@hieudoanm/utils/string';

/* ------------------------------------------------------------------ */
/* Types                                                                */
/* ------------------------------------------------------------------ */

export type Align = 'left' | 'center' | 'right';

/* ------------------------------------------------------------------ */
/* highlightElement                                                     */
/* ------------------------------------------------------------------ */

const periodicTableSymbols: Set<string> = new Set(Object.keys(periodicTable));

const highlightElement = (
  word: string
): { before: string[]; tile?: string; after: string[] } => {
  if (!word) return { before: [], after: [] };

  const lower = word.toLowerCase();
  let bestMatch: { idx: number; symbol: string } | null = null;

  for (const symbol of periodicTableSymbols) {
    const idx = lower.indexOf(symbol.toLowerCase());
    if (idx === -1) continue;
    if (idx === 0) {
      if (
        !bestMatch ||
        bestMatch.idx !== 0 ||
        symbol.length > bestMatch.symbol.length
      )
        bestMatch = { idx, symbol };
      continue;
    }
    if (bestMatch?.idx === 0) continue;
    if (
      !bestMatch ||
      symbol.length > bestMatch.symbol.length ||
      (symbol.length === bestMatch.symbol.length && idx < bestMatch.idx)
    )
      bestMatch = { idx, symbol };
  }

  if (!bestMatch) return { before: word.split(''), after: [] };

  const { idx, symbol } = bestMatch;
  return {
    before: word.slice(0, idx).toLowerCase().split(''),
    tile: capitalise(word.slice(idx, idx + symbol.length)),
    after: word
      .slice(idx + symbol.length)
      .toLowerCase()
      .split(''),
  };
};

/* ------------------------------------------------------------------ */
/* Preview                                                              */
/* ------------------------------------------------------------------ */

const alignClassMap: Record<Align, string> = {
  left: 'items-start text-left',
  center: 'items-center text-center',
  right: 'items-end text-right',
};

const Preview = ({
  isColored = false,
  isMultiline = false,
  align = 'center',
  text = '',
}: {
  isColored?: boolean;
  isMultiline?: boolean;
  align?: Align;
  text?: string;
}) => {
  let captureRef: HTMLDivElement | undefined;
  const words = text.split(/\s+/);
  const multilineClass = isMultiline
    ? 'flex-col gap-y-2'
    : 'flex-row flex-wrap gap-x-4';

  const handleDownload = async ({
    withBackground,
  }: {
    withBackground: boolean;
  }) => {
    if (!captureRef) return;
    try {
      const canvas = await html2canvas(captureRef.current, {
        backgroundColor: withBackground ? '#1d232a' : null,
        scrollY: -window.scrollY,
      });
      const a = document.createElement('a');
      a.href = canvas.toDataURL('image/png');
      a.download = `${kebabcase(text)}.png`;
      a.click();
    } catch (err) {
      console.error('Failed to capture image', err);
    }
  };

  return (
    <div class="flex flex-col gap-y-2">
      <div
        ref={(el) => (captureRef = el)}
        class={`flex h-fit w-fit gap-2 p-4 ${multilineClass} ${alignClassMap[align]}`}>
        {words.map((word, wordIdx) => {
          const { before, tile, after } = highlightElement(word);
          const { specificName } = periodicTable[tile ?? ''] ?? {};
          const bgColorClass = isColored
            ? specificNameColorMap[specificName]
            : 'bg-base-content';
          const textColorClass = isColored
            ? 'text-base-content'
            : 'text-base-100';

          return (
            <div
              key={wordIdx}
              class="flex flex-wrap items-center gap-1 text-4xl font-bold">
              {before.map((letter, idx) => (
                <span
                  key={`b-${idx}`}
                  class="text-base-content text-4xl font-semibold">
                  {letter}
                </span>
              ))}
              {tile && (
                <div
                  class={`${bgColorClass} ${textColorClass} relative flex h-16 w-16 flex-col items-center justify-center rounded`}>
                  <span class="absolute top-1 right-1 text-xs">
                    {periodicTable[tile].number ?? 0}
                  </span>
                  <span class="text-4xl">{tile}</span>
                </div>
              )}
              {after.map((letter, idx) => (
                <span
                  key={`a-${idx}`}
                  class="text-base-content text-4xl font-semibold">
                  {letter}
                </span>
              ))}
            </div>
          );
        })}
      </div>

      <div class="dropdown mx-auto">
        <label tabIndex={0} class="btn btn-ghost btn-sm">
          💾 Download
        </label>
        <ul
          tabIndex={0}
          class="menu dropdown-content rounded-box bg-neutral z-50 w-56 p-2 shadow">
          <li>
            <button
              type="button"
              class="btn btn-ghost justify-start"
              onClick={() => {
                handleDownload({ withBackground: true });
                (document.activeElement as HTMLElement | null)?.blur();
              }}>
              💾 With Background
            </button>
          </li>
          <li>
            <button
              type="button"
              class="btn btn-ghost justify-start"
              onClick={() => {
                handleDownload({ withBackground: false });
                (document.activeElement as HTMLElement | null)?.blur();
              }}>
              💾 Without Background
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Presets                                                              */
/* ------------------------------------------------------------------ */

const PRESETS = [
  'Breaking Bad',
  'Walter White',
  'Jesse Pinkman',
  'Heisenberg',
  'Saul Goodman',
  'Los Pollos',
];

/* ------------------------------------------------------------------ */
/* Modal                                                                */
/* ------------------------------------------------------------------ */

export const BreakingBadModal = ({ onClose }: { onClose: () => void }) => {
  const [state, setState] = createSignal<{
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
      {/* Presets */}
      <div class="mb-4 flex flex-wrap gap-2">
        {PRESETS.map((preset) => (
          <button
            key={preset}
            class={`btn btn-xs ${state().name === preset ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => set({ name: preset })}>
            {preset}
          </button>
        ))}
      </div>

      {/* Input */}
      <input
        placeholder="✨ Your Name"
        class="input input-bordered mb-4 w-full"
        value={state().name}
        onChange={(e) => set({ name: e.target.value })}
      />

      {/* Toggles + alignment */}
      <div class="mb-4 flex flex-wrap items-center gap-4">
        <label class="label cursor-pointer justify-start gap-2">
          <input
            type="checkbox"
            checked={state().isColored}
            class="toggle toggle-primary toggle-sm"
            onChange={(e) => set({ isColored: e.target.checked })}
          />
          Colored
        </label>
        <label class="label cursor-pointer justify-start gap-2">
          <input
            type="checkbox"
            checked={state().isMultiline}
            class="toggle toggle-primary toggle-sm"
            onChange={(e) => set({ isMultiline: e.target.checked })}
          />
          Multiline
        </label>
        {state().isMultiline && (
          <div class="join">
            {(['left', 'center', 'right'] as Align[]).map((a) => (
              <button
                key={a}
                type="button"
                class={`join-item btn btn-sm btn-soft ${state().align === a ? 'btn-primary' : ''}`}
                onClick={() => set({ align: a })}>
                {a.charAt(0).toUpperCase() + a.slice(1)}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Preview */}
      <div class="bg-base-200 flex min-h-40 items-center justify-center overflow-auto rounded-xl p-4">
        <Preview
          align={state().align}
          isColored={state().isColored}
          isMultiline={state().isMultiline}
          text={state().name}
        />
      </div>
    </ModalWrapper>
  );
};
