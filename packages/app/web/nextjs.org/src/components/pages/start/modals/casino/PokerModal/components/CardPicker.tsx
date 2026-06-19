import { FC } from 'react';

import { Card } from '../types';
import { SUIT_SYMBOLS, SUIT_COLORS, RANK_STR } from '../constants';

export const CardPicker: FC<{
  label: string;
  cards: (Card | null)[];
  onChange: (i: number, c: Card | null) => void;
  max?: number;
}> = ({ label, cards, onChange, max }) => {
  const fromDeck = (r: number, s: 'h' | 'd' | 'c' | 's'): Card | null => {
    const idx = cards.findIndex((c) => c?.rank === r && c?.suit === s);
    if (idx >= 0 && cards[idx]) return null;
    return { rank: r, suit: s };
  };
  return (
    <div className="mb-2">
      <div className="mb-1 text-xs font-semibold opacity-50">{label}</div>
      <div className="flex flex-wrap gap-1">
        {cards.map((c, i) => (
          <button
            key={i}
            onClick={() => onChange(i, null)}
            className="btn btn-square btn-ghost h-10 w-8 p-0 text-xs">
            {c ? (
              <>
                <span style={{ color: SUIT_COLORS[c.suit] }}>
                  {RANK_STR[c.rank]}
                  {SUIT_SYMBOLS[c.suit]}
                </span>
              </>
            ) : (
              <span className="opacity-20">+</span>
            )}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap gap-0.5">
        {[2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map((r) => (
          <div key={r} className="flex gap-px">
            {(['h', 'd', 'c', 's'] as const).map((s) => {
              const disabled = !fromDeck(r, s);
              const hc = disabled
                ? 'opacity-20'
                : 'opacity-50 hover:opacity-100';
              return (
                <button
                  key={s}
                  disabled={disabled}
                  onClick={() => {
                    const idx = cards.findIndex((c) => c === null);
                    if (idx >= 0) onChange(idx, { rank: r, suit: s });
                  }}
                  className={`${hc} cursor-pointer text-[9px]`}>
                  {RANK_STR[r]}
                  {SUIT_SYMBOLS[s]}
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};
