'use client';

import { Cart } from '@/components/organisms/Cart';
import { Checkout } from '@/components/organisms/Checkout';
import { ItemCatalog } from '@/components/organisms/ItemCatalog';
import { Receipt } from '@/components/organisms/Receipt';
import { SAMPLE_ITEMS } from '@/data/items';
import { CartItem, Transaction } from '@/types/pos';
import { NextPage } from 'next';
import { useState } from 'react';

type View = 'sale' | 'checkout' | 'receipt';

const HomePage: NextPage = () => {
  const [view, setView] = useState<View>('sale');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [transaction, setTransaction] = useState<Transaction | null>(null);

  const addItem = (item: (typeof SAMPLE_ITEMS)[number]) => {
    setCartItems((prev) => {
      const existing = prev.find((ci) => ci.item.id === item.id);
      if (existing) {
        return prev.map((ci) =>
          ci.item.id === item.id ? { ...ci, quantity: ci.quantity + 1 } : ci
        );
      }
      return [...prev, { item, quantity: 1 }];
    });
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      setCartItems((prev) => prev.filter((ci) => ci.item.id !== itemId));
      return;
    }
    setCartItems((prev) =>
      prev.map((ci) => (ci.item.id === itemId ? { ...ci, quantity } : ci))
    );
  };

  const removeItem = (itemId: string) => {
    setCartItems((prev) => prev.filter((ci) => ci.item.id !== itemId));
  };

  const completeTransaction = (tx: Transaction) => {
    setTransaction(tx);
    setView('receipt');
  };

  const newSale = () => {
    setCartItems([]);
    setTransaction(null);
    setView('sale');
  };

  return (
    <main className="container mx-auto flex h-full flex-1 flex-col overflow-y-auto p-4 md:p-8">
      {view === 'sale' && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="col-span-1 md:col-span-2">
            <ItemCatalog items={SAMPLE_ITEMS} onAdd={addItem} />
          </div>
          <div className="col-span-1">
            <Cart
              items={cartItems}
              onUpdateQuantity={updateQuantity}
              onRemove={removeItem}
              onCheckout={() => setView('checkout')}
            />
          </div>
        </div>
      )}
      {view === 'checkout' && (
        <Checkout
          items={cartItems}
          onComplete={completeTransaction}
          onBack={() => setView('sale')}
        />
      )}
      {view === 'receipt' && transaction && (
        <Receipt transaction={transaction} onNewSale={newSale} />
      )}
    </main>
  );
};

export default HomePage;
