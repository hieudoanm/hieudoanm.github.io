import type { FC } from 'react';
import { CartItem } from '@/types/pos';
import { FiMinus, FiPlus, FiTrash2 } from 'react-icons/fi';

export const Cart: FC<{
  items: CartItem[];
  onUpdateQuantity: (itemId: string, quantity: number) => void;
  onRemove: (itemId: string) => void;
  onCheckout: () => void;
}> = ({ items, onUpdateQuantity, onRemove, onCheckout }) => {
  const subtotal = items.reduce(
    (sum, ci) => sum + ci.item.price * ci.quantity,
    0
  );

  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-sm font-bold">Cart</h2>
      {items.length === 0 ? (
        <p className="text-base-content/50 text-sm">Cart is empty</p>
      ) : (
        <>
          <div className="flex flex-col gap-2">
            {items.map((ci) => (
              <div
                key={ci.item.id}
                className="border-base-300 bg-base-200 flex items-center justify-between gap-2 rounded-lg border px-3 py-2">
                <div className="flex flex-col">
                  <span className="text-sm font-bold">{ci.item.name}</span>
                  <span className="text-primary font-mono text-xs">
                    ${ci.item.price.toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() =>
                      onUpdateQuantity(ci.item.id, ci.quantity - 1)
                    }
                    className="btn btn-ghost btn-xs">
                    <FiMinus className="h-3 w-3" />
                  </button>
                  <span className="w-6 text-center text-sm font-bold">
                    {ci.quantity}
                  </span>
                  <button
                    onClick={() =>
                      onUpdateQuantity(ci.item.id, ci.quantity + 1)
                    }
                    className="btn btn-ghost btn-xs">
                    <FiPlus className="h-3 w-3" />
                  </button>
                  <button
                    onClick={() => onRemove(ci.item.id)}
                    className="btn btn-ghost btn-xs text-error">
                    <FiTrash2 className="h-3 w-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="border-base-300 border-t pt-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold">Subtotal</span>
              <span className="text-primary font-mono text-sm font-bold">
                ${subtotal.toFixed(2)}
              </span>
            </div>
          </div>
          <button onClick={onCheckout} className="btn btn-primary btn-sm w-full">
            Checkout
          </button>
        </>
      )}
    </div>
  );
};

Cart.displayName = 'Cart';
