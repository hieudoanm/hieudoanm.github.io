import { FC } from 'react';
import type { Card } from '@/types';
import { maskCardNumber } from '@/utils/format';
import { FiLock, FiUnlock, FiCreditCard, FiMoreVertical } from 'react-icons/fi';

interface CardDetailProps {
  card: Card;
  onToggleFreeze?: () => void;
}

const CardDetail: FC<CardDetailProps> = ({ card, onToggleFreeze }) => {
  return (
    <div className="card bg-base-200 shadow-md">
      <div className="card-body">
        <h3 className="card-title">{card.name}</h3>
        <p className="text-base-content/60">{maskCardNumber(card.number)}</p>

        <div className="divider" />

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs opacity-60">Type</p>
            <div className="flex items-center gap-1">
              <FiCreditCard />
              <p className="capitalize">{card.type}</p>
            </div>
          </div>
          <div>
            <p className="text-xs opacity-60">Expires</p>
            <p>{card.expiry}</p>
          </div>
          <div>
            <p className="text-xs opacity-60">Status</p>
            <div className="flex items-center gap-1">
              {card.frozen ? <FiLock /> : <FiUnlock />}
              <p>{card.frozen ? 'Frozen' : 'Active'}</p>
            </div>
          </div>
        </div>

        <div className="divider" />

        <div className="flex gap-2">
          <button
            className="btn btn-primary btn-sm flex-1"
            onClick={onToggleFreeze}>
            {card.frozen ? 'Unfreeze' : 'Freeze'}
          </button>
          <button className="btn btn-neutral btn-sm flex-1">
            PIN Settings
          </button>
          <button
            className="btn btn-neutral btn-sm btn-circle"
            aria-label="More options">
            <FiMoreVertical />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardDetail;
