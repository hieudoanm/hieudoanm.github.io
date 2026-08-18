'use client';

import { Cart } from '@/components/organisms/Cart';
import { DailySummary } from '@/components/organisms/DailySummary';
import { DigitalReceipt } from '@/components/organisms/DigitalReceipt';
import { DiscountManager } from '@/components/organisms/DiscountManager';
import { GiftCardManager } from '@/components/organisms/GiftCardManager';
import { Header } from '@/components/organisms/Header';
import { InventoryManager } from '@/components/organisms/InventoryManager';
import { ItemCatalog } from '@/components/organisms/ItemCatalog';
import { PaymentPanel } from '@/components/organisms/PaymentPanel';
import { ReportingDashboard } from '@/components/organisms/ReportingDashboard';
import { ShiftManager } from '@/components/organisms/ShiftManager';
import { TaxConfigPanel } from '@/components/organisms/TaxConfigPanel';
import { TransactionHistory } from '@/components/organisms/TransactionHistory';
import { UserManager } from '@/components/organisms/UserManager';
import { DEFAULT_ITEMS } from '@/data/items';
import type {
  CartItem,
  Transaction,
  TaxConfig,
  Item,
  InventoryAdjustment,
  Discount,
  GiftCard,
  User,
  Shift,
  PaymentSplit,
} from '@/types/pos';
import { type NextPage } from 'next';
import { useCallback, useState } from 'react';

type View =
  | 'sale'
  | 'payment'
  | 'receipt'
  | 'history'
  | 'daily'
  | 'reports'
  | 'inventory'
  | 'tax'
  | 'discounts'
  | 'gift-cards'
  | 'users'
  | 'shifts';

const HomePage: NextPage = () => {
  const [view, setView] = useState<View>('sale');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const [items, setItems] = useState<Item[]>(DEFAULT_ITEMS);
  const [adjustments, setAdjustments] = useState<InventoryAdjustment[]>([]);

  const [taxConfig, setTaxConfig] = useState<TaxConfig>({
    name: 'Sales Tax',
    rate: 8.5,
    enabled: true,
  });

  const [discounts, setDiscounts] = useState<Discount[]>([]);
  const [giftCards, setGiftCards] = useState<GiftCard[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [shifts, setShifts] = useState<Shift[]>([]);
  const [currentShift, setCurrentShift] = useState<Shift | null>(null);

  const subtotal = cartItems.reduce(
    (s, ci) => s + ci.item.price * ci.quantity,
    0
  );
  const tax = taxConfig.enabled ? subtotal * (taxConfig.rate / 100) : 0;
  const total = subtotal + tax;

  const addItem = useCallback((item: Item) => {
    setCartItems((prev) => {
      const existing = prev.find((ci) => ci.item.id === item.id);
      if (existing) {
        return prev.map((ci) =>
          ci.item.id === item.id ? { ...ci, quantity: ci.quantity + 1 } : ci
        );
      }
      return [...prev, { item, quantity: 1, discount: 0 }];
    });
  }, []);

  const updateQuantity = useCallback((itemId: string, quantity: number) => {
    if (quantity <= 0) {
      setCartItems((prev) => prev.filter((ci) => ci.item.id !== itemId));
      return;
    }
    setCartItems((prev) =>
      prev.map((ci) => (ci.item.id === itemId ? { ...ci, quantity } : ci))
    );
  }, []);

  const removeItem = useCallback((itemId: string) => {
    setCartItems((prev) => prev.filter((ci) => ci.item.id !== itemId));
  }, []);

  const completePayment = useCallback(
    (payments: PaymentSplit[]) => {
      const tx: Transaction = {
        id: crypto.randomUUID(),
        items: cartItems,
        subtotal,
        tax,
        total,
        payments,
        status: 'completed',
        createdAt: new Date().toISOString(),
        cashierId: currentUser?.id,
      };
      setTransactions((prev) => [tx, ...prev]);
      setTransaction(tx);
      setCartItems([]);
      setView('receipt');
    },
    [cartItems, subtotal, tax, total, currentShift, currentUser]
  );

  const voidTransaction = useCallback((id: string) => {
    setTransactions((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: 'voided' as const } : t))
    );
  }, []);

  const updateStock = useCallback(
    (itemId: string, newStock: number, reason: string) => {
      const item = items.find((i) => i.id === itemId);
      if (!item) return;
      const adj: InventoryAdjustment = {
        id: crypto.randomUUID(),
        itemId,
        previousStock: item.stock,
        newStock,
        reason,
        createdAt: new Date().toISOString(),
        adjustedBy: currentUser?.name ?? 'system',
      };
      setAdjustments((prev) => [adj, ...prev]);
      setItems((prev) =>
        prev.map((i) => (i.id === itemId ? { ...i, stock: newStock } : i))
      );
    },
    [items, currentUser]
  );

  const newSale = () => {
    setTransaction(null);
    setView('sale');
  };

  return (
    <div className="bg-base-100 flex h-screen flex-col overflow-hidden">
      <Header />
      {view === 'sale' && (
        <main className="container mx-auto flex min-h-0 flex-1 flex-col overflow-y-auto p-4 md:p-8">
          <div className="flex flex-wrap items-center gap-2 pb-4">
            <button
              className="btn btn-ghost btn-xs"
              onClick={() => setView('history')}>
              History
            </button>
            <button
              className="btn btn-ghost btn-xs"
              onClick={() => setView('daily')}>
              Daily
            </button>
            <button
              className="btn btn-ghost btn-xs"
              onClick={() => setView('reports')}>
              Reports
            </button>
            <button
              className="btn btn-ghost btn-xs"
              onClick={() => setView('inventory')}>
              Inventory
            </button>
            <button
              className="btn btn-ghost btn-xs"
              onClick={() => setView('tax')}>
              Tax
            </button>
            <button
              className="btn btn-ghost btn-xs"
              onClick={() => setView('discounts')}>
              Discounts
            </button>
            <button
              className="btn btn-ghost btn-xs"
              onClick={() => setView('gift-cards')}>
              Gift Cards
            </button>
            <button
              className="btn btn-ghost btn-xs"
              onClick={() => setView('users')}>
              Users
            </button>
            <button
              className="btn btn-ghost btn-xs"
              onClick={() => setView('shifts')}>
              Shifts
            </button>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="col-span-1 md:col-span-2">
              <ItemCatalog items={items} onAdd={addItem} />
            </div>
            <div className="col-span-1">
              <Cart
                items={cartItems}
                onUpdateQuantity={updateQuantity}
                onRemove={removeItem}
                onCheckout={() => setView('payment')}
              />
            </div>
          </div>
        </main>
      )}
      {view === 'payment' && (
        <PaymentPanel
          total={total}
          giftCards={giftCards}
          discounts={discounts}
          onPayment={completePayment}
          onBack={() => setView('sale')}
        />
      )}
      {view === 'receipt' && transaction && (
        <DigitalReceipt transaction={transaction} onNewSale={newSale} />
      )}
      {view === 'history' && (
        <TransactionHistory
          transactions={transactions}
          onBack={() => setView('sale')}
          onVoid={voidTransaction}
        />
      )}
      {view === 'daily' && (
        <DailySummary
          transactions={transactions}
          onBack={() => setView('sale')}
        />
      )}
      {view === 'reports' && (
        <ReportingDashboard
          transactions={transactions}
          onBack={() => setView('sale')}
        />
      )}
      {view === 'inventory' && (
        <InventoryManager
          items={items}
          adjustments={adjustments}
          onUpdateStock={updateStock}
          onBack={() => setView('sale')}
        />
      )}
      {view === 'tax' && (
        <div className="container mx-auto max-w-md p-4 md:p-8">
          <TaxConfigPanel config={taxConfig} onSave={setTaxConfig} />
          <button
            className="btn btn-ghost btn-sm mt-4"
            onClick={() => setView('sale')}>
            Back
          </button>
        </div>
      )}
      {view === 'discounts' && (
        <DiscountManager
          discounts={discounts}
          onAdd={(d) => setDiscounts((prev) => [...prev, d])}
          onRemove={(id) =>
            setDiscounts((prev) => prev.filter((d) => d.id !== id))
          }
          onBack={() => setView('sale')}
        />
      )}
      {view === 'gift-cards' && (
        <GiftCardManager
          giftCards={giftCards}
          onAdd={(gc) => setGiftCards((prev) => [...prev, gc])}
          onRemove={(id) =>
            setGiftCards((prev) => prev.filter((g) => g.id !== id))
          }
          onBack={() => setView('sale')}
        />
      )}
      {view === 'users' && (
        <UserManager
          users={users}
          currentUser={currentUser}
          onAdd={(u) => setUsers((prev) => [...prev, u])}
          onRemove={(id) => setUsers((prev) => prev.filter((u) => u.id !== id))}
          onBack={() => setView('sale')}
        />
      )}
      {view === 'shifts' && (
        <ShiftManager
          shifts={shifts}
          currentShift={currentShift}
          onOpen={(openBalance) => {
            const shift: Shift = {
              id: crypto.randomUUID(),
              cashierId: currentUser?.id ?? 'unknown',
              openBalance,
              status: 'open',
              startedAt: new Date().toISOString(),
            };
            setShifts((prev) => [...prev, shift]);
            setCurrentShift(shift);
          }}
          onClose={(closeBalance) => {
            if (currentShift) {
              setShifts((prev) =>
                prev.map((s) =>
                  s.id === currentShift.id
                    ? {
                        ...s,
                        closeBalance,
                        status: 'closed' as const,
                        endedAt: new Date().toISOString(),
                      }
                    : s
                )
              );
              setCurrentShift(null);
            }
          }}
          onBack={() => setView('sale')}
        />
      )}
    </div>
  );
};

export default HomePage;
