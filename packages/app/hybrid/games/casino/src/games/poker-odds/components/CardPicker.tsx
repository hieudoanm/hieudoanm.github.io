'use client';

import type { FC } from 'react';
import type { Card, PokerSuit } from '../types';
import { RANK_STR, SUITS, SUIT_COLORS, SUIT_SYMBOLS } from '../constants';

interface CardPickerProps {
  label: string;
  cards: (Card | null)[];
  onChange: (index: number, card: Card) => void;
}

/** Dropdown-based hole/board card selector. */
export const CardPicker: FC<CardPickerProps> = ({ label, cards, onChange }) => (
  <div className="mb-3">
    <p className="mb-1 text-xs opacity-50">{label}</p>
    <div className="flex gap-2">
      {cards.map((card, index) => (
        <select
          key={`${label}-${index}`}
          value={card ? `${card.rank}${card.suit}` : ''}
          onChange={(event) => {
            const raw = event.target.value;
            if (!raw) return;
            const match = raw.match(/^(\d+)([hdcs])$/);
            if (!match) return;
            onChange(index, {
              rank: Number(match[1]),
              suit: match[2] as PokerSuit,
            });
          }}
          className="select select-bordered select-xs w-20"
          data-testid={`poker-select-${label}-${index}`}>
          <option value="">--</option>
          {RANK_STR &&
            Object.entries(RANK_STR).flatMap(([rank, rankStr]) =>
              SUITS.map((suit) => (
                <option key={`${rank}${suit}`} value={`${rank}${suit}`}>
                  {rankStr}
                  {SUIT_SYMBOLS[suit]}
                </option>
              ))
            )}
        </select>
      ))}
    </div>
  </div>
);

interface ChipProps {
  card: Card;
  small?: boolean;
}

export const CardChip: FC<ChipProps> = ({ card, small }) => (
  <span
    className={`inline-flex items-center justify-center rounded-md font-mono font-normal shadow-sm ${small ? 'h-8 w-6 text-[9px]' : 'h-10 w-8 text-xs'}`}
    style={{
      backgroundColor: '#1e293b',
      color: SUIT_COLORS[card.suit],
    }}>
    {RANK_STR[card.rank]}
    {SUIT_SYMBOLS[card.suit]}
  </span>
);

interface MeterBarProps {
  pct: number;
}

export const MeterBar: FC<MeterBarProps> = ({ pct }) => (
  <progress
    className="progress progress-primary w-full"
    value={Math.round(pct)}
    max={100}
    data-testid="poker-meter"
  />
);
