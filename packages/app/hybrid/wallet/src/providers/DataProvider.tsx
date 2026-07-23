'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from 'react';
import { db } from '@/lib/db';
import type {
  Account,
  Transaction,
  Card,
  RecurringBill,
  Notification,
  BudgetCategory,
  CurrencyRate,
  User,
} from '@/types';
import {
  user as seedUser,
  accounts as seedAccounts,
  transactions as seedTransactions,
  cards as seedCards,
  recurringBills as seedRecurringBills,
  notifications as seedNotifications,
  budgetCategories as seedBudgetCategories,
  currencyRates as seedCurrencyRates,
} from '@/data/mock';

interface DataContextValue {
  user: User | null;
  accounts: Account[];
  transactions: Transaction[];
  cards: Card[];
  recurringBills: RecurringBill[];
  notifications: Notification[];
  budgetCategories: BudgetCategory[];
  currencyRates: CurrencyRate[];
  loading: boolean;
  isAuthenticated: boolean;

  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateUser: (user: User) => Promise<void>;
  updateAccount: (account: Account) => Promise<void>;
  addTransaction: (transaction: Transaction) => Promise<void>;
  updateCard: (card: Card) => Promise<void>;
  updateRecurringBill: (bill: RecurringBill) => Promise<void>;
  markNotificationRead: (id: string) => Promise<void>;
  updateBudgetCategory: (category: BudgetCategory) => Promise<void>;
}

const DataContext = createContext<DataContextValue | null>(null);

export function DataProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(seedUser);
  const [accounts, setAccounts] = useState<Account[]>(seedAccounts);
  const [transactions, setTransactions] =
    useState<Transaction[]>(seedTransactions);
  const [cards, setCards] = useState<Card[]>(seedCards);
  const [recurringBills, setRecurringBills] =
    useState<RecurringBill[]>(seedRecurringBills);
  const [notifications, setNotifications] =
    useState<Notification[]>(seedNotifications);
  const [budgetCategories, setBudgetCategories] =
    useState<BudgetCategory[]>(seedBudgetCategories);
  const [currencyRates, setCurrencyRates] =
    useState<CurrencyRate[]>(seedCurrencyRates);
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('wallet-auth');
    if (stored === 'true') setIsAuthenticated(true);
  }, []);

  useEffect(() => {
    const sync = async () => {
      setLoading(true);
      try {
        const seed = await db.needsSeed();

        if (seed) {
          await db.put(db.STORES.user, seedUser);
          await db.putAll(db.STORES.accounts, seedAccounts);
          await db.putAll(db.STORES.transactions, seedTransactions);
          await db.putAll(db.STORES.cards, seedCards);
          await db.putAll(db.STORES.recurringBills, seedRecurringBills);
          await db.putAll(db.STORES.notifications, seedNotifications);
          await db.putAll(db.STORES.budgetCategories, seedBudgetCategories);
          await db.putAll(db.STORES.currencyRates, seedCurrencyRates);
        }

        const [u, accs, txs, crds, bills, notifs, cats, rates] =
          await Promise.all([
            db.getAll<User>(db.STORES.user),
            db.getAll<Account>(db.STORES.accounts),
            db.getAll<Transaction>(db.STORES.transactions),
            db.getAll<Card>(db.STORES.cards),
            db.getAll<RecurringBill>(db.STORES.recurringBills),
            db.getAll<Notification>(db.STORES.notifications),
            db.getAll<BudgetCategory>(db.STORES.budgetCategories),
            db.getAll<CurrencyRate>(db.STORES.currencyRates),
          ]);

        if (u[0]) setUser(u[0]);
        if (accs.length) setAccounts(accs);
        if (txs.length) setTransactions(txs);
        if (crds.length) setCards(crds);
        if (bills.length) setRecurringBills(bills);
        if (notifs.length) setNotifications(notifs);
        if (cats.length) setBudgetCategories(cats);
        if (rates.length) setCurrencyRates(rates);
      } catch {
        // IndexedDB unavailable — use seed data as-is
      } finally {
        setLoading(false);
      }
    };

    sync();
  }, []);

  const login = useCallback(async (email: string, _password: string) => {
    if (!email) return false;
    localStorage.setItem('wallet-auth', 'true');
    setIsAuthenticated(true);
    return true;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('wallet-auth');
    setIsAuthenticated(false);
  }, []);

  const updateUser = useCallback(async (updated: User) => {
    setUser(updated);
    try {
      await db.put(db.STORES.user, updated);
    } catch {
      // silent
    }
  }, []);

  const updateAccount = useCallback(async (updated: Account) => {
    setAccounts((prev) => prev.map((a) => (a.id === updated.id ? updated : a)));
    try {
      await db.put(db.STORES.accounts, updated);
    } catch {
      // silent
    }
  }, []);

  const addTransaction = useCallback(async (tx: Transaction) => {
    setTransactions((prev) => [tx, ...prev]);
    try {
      await db.put(db.STORES.transactions, tx);
    } catch {
      // silent
    }
  }, []);

  const updateCard = useCallback(async (updated: Card) => {
    setCards((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
    try {
      await db.put(db.STORES.cards, updated);
    } catch {
      // silent
    }
  }, []);

  const updateRecurringBill = useCallback(async (updated: RecurringBill) => {
    setRecurringBills((prev) =>
      prev.map((b) => (b.id === updated.id ? updated : b))
    );
    try {
      await db.put(db.STORES.recurringBills, updated);
    } catch {
      // silent
    }
  }, []);

  const markNotificationRead = useCallback(
    async (id: string) => {
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, read: true } : n))
      );
      try {
        const updated = notifications.find((n) => n.id === id);
        if (updated) {
          await db.put(db.STORES.notifications, { ...updated, read: true });
        }
      } catch {
        // silent
      }
    },
    [notifications]
  );

  const updateBudgetCategory = useCallback(async (updated: BudgetCategory) => {
    setBudgetCategories((prev) =>
      prev.map((c) => (c.id === updated.id ? updated : c))
    );
    try {
      await db.put(db.STORES.budgetCategories, updated);
    } catch {
      // silent
    }
  }, []);

  return (
    <DataContext.Provider
      value={{
        user,
        accounts,
        transactions,
        cards,
        recurringBills,
        notifications,
        budgetCategories,
        currencyRates,
        loading,
        isAuthenticated,
        login,
        logout,
        updateUser,
        updateAccount,
        addTransaction,
        updateCard,
        updateRecurringBill,
        markNotificationRead,
        updateBudgetCategory,
      }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData(): DataContextValue {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error('useData must be used within DataProvider');
  return ctx;
}
