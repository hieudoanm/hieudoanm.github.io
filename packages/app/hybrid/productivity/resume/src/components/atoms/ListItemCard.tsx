import type { FC, ReactNode } from 'react';

interface ListItemCardProps {
  title: string;
  onRemove: () => void;
  children: ReactNode;
}

export const ListItemCard: FC<ListItemCardProps> = ({
  title,
  onRemove,
  children,
}) => (
  <div className="border-base-content/10 space-y-2 rounded-xl border p-3">
    <div className="flex items-center justify-between gap-2">
      <span className="text-base-content/60 truncate text-xs font-bold">
        {title}
      </span>
      <button type="button" className="btn btn-error btn-xs" onClick={onRemove}>
        Remove
      </button>
    </div>
    {children}
  </div>
);

ListItemCard.displayName = 'ListItemCard';

interface AddButtonProps {
  onClick: () => void;
  label: string;
}

export const AddButton: FC<AddButtonProps> = ({ onClick, label }) => (
  <button
    type="button"
    className="btn btn-outline btn-xs w-full"
    onClick={onClick}>
    + {label}
  </button>
);

AddButton.displayName = 'AddButton';
