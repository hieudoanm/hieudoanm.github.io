import { FC } from 'react';
import type { Card } from '@/types';
import { FiCreditCard } from 'react-icons/fi';

const cardColorStyles: Record<string, string> = {
  primary: 'bg-primary text-primary-content',
  secondary: 'bg-secondary text-secondary-content',
  accent: 'bg-accent text-accent-content',
};

interface CardItemProps {
  card: Card;
  selected: boolean;
  onSelect: (id: string) => void;
}

const CardItem: FC<CardItemProps> = ({ card, selected, onSelect }) => {
  return (
    <button
      className={`card min-w-[260px] shrink-0 shadow-md transition-all ${
        selected ? 'ring-primary ring-2' : 'opacity-60 hover:opacity-100'
      }`}
      onClick={() => onSelect(card.id)}>
      <div
        className={`card-body ${cardColorStyles[card.color] ?? 'bg-primary text-primary-content'}`}>
        <div className="flex items-start justify-between">
          <p className="text-sm font-medium">{card.name}</p>
          <FiCreditCard className="text-xl" />
        </div>
        <p className="text-lg tracking-wider">{card.number}</p>
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs opacity-60">Expires</p>
            <p className="text-sm">{card.expiry}</p>
          </div>
          {card.frozen && <span className="badge badge-ghost">Frozen</span>}
        </div>
      </div>
    </button>
  );
};

export default CardItem;
