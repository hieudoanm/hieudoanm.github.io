import { FC } from 'react';

import { Card } from '../types';
import { RANK_STR, SUIT_COLORS, SUIT_SYMBOLS } from '../constants';

export const CardChip: FC<{ card: Card; small?: boolean }> = ({
  card,
  small,
}) => (
  <span
    className={`inline-flex items-center justify-center rounded-md font-mono font-bold shadow-sm ${small ? 'h-8 w-6 text-[9px]' : 'h-10 w-8 text-xs'}`}
    style={{
      backgroundColor: '#1e293b',
      color: SUIT_COLORS[card.suit],
      border: '1px solid rgba(255,255,255,0.12)',
    }}>
    {RANK_STR[card.rank]}
    {SUIT_SYMBOLS[card.suit]}
  </span>
);
