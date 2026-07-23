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
  forgotPassword: (email: string) => Promise<boolean>;
  resetPassword: (token: string, newPassword: string) => Promise<boolean>;
  updateUser: (user: User) => Promise<void>;
  updateAccount: (account: Account) => Promise<void>;
  addAccount: (account: Account) => Promise<void>;
  addTransaction: (transaction: Transaction) => Promise<void>;
  updateCard: (card: Card) => Promise<void>;
  addRecurringBill: (bill: RecurringBill) => Promise<void>;
  updateRecurringBill: (bill: RecurringBill) => Promise<void>;
  markNotificationRead: (id: string) => Promise<void>;
  updateBudgetCategory: (category: BudgetCategory) => Promise<void>;
}

const DataContext = createContext<DataContextValue | null>(null);

export const DataProvider = ({ children }: { children: ReactNode }) => {
  console.log('[DataProvider] render');
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
    console.log('[DataProvider] auth check', { stored });
    if (stored === 'true') setIsAuthenticated(true);
  }, []);

  useEffect(() => {
    const sync = async () => {
      console.log('[DataProvider] sync start');
      setLoading(true);
      try {
        const seed = await db.needsSeed();

        if (seed) {
          console.log('[DataProvider] seeding database');
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

        console.log('[DataProvider] sync loaded', {
          user: u.length,
          accounts: accs.length,
          transactions: txs.length,
          cards: crds.length,
          bills: bills.length,
          notifications: notifs.length,
          categories: cats.length,
          rates: rates.length,
        });

        if (u[0]) setUser(u[0]);
        if (accs.length) setAccounts(accs);
        if (txs.length) setTransactions(txs);
        if (crds.length) setCards(crds);
        if (bills.length) setRecurringBills(bills);
        if (notifs.length) setNotifications(notifs);
        if (cats.length) setBudgetCategories(cats);
        if (rates.length) setCurrencyRates(rates);
      } catch (err) {
        console.warn('[DataProvider] sync failed, using seed data', err);
      } finally {
        setLoading(false);
        console.log('[DataProvider] sync complete');
      }
    };

    sync();
  }, []);

  const login = useCallback(async (email: string, _password: string) => {
    console.log('[DataProvider] login', { email });
    if (!email) return false;
    localStorage.setItem('wallet-auth', 'true');
    setIsAuthenticated(true);
    return true;
  }, []);

  const logout = useCallback(() => {
    console.log('[DataProvider] logout');
    localStorage.removeItem('wallet-auth');
    setIsAuthenticated(false);
  }, []);

  const forgotPassword = useCallback(async (email: string) => {
    console.log('[DataProvider] forgotPassword', { email });
    if (!email) return false;
    return true;
  }, []);

  const resetPassword = useCallback(
    async (token: string, _newPassword: string) => {
      console.log('[DataProvider] resetPassword', { token });
      if (!token) return false;
      return true;
    },
    []
  );

  const updateUser = useCallback(async (updated: User) => {
    console.log('[DataProvider] updateUser', updated.id);
    setUser(updated);
    try {
      await db.put(db.STORES.user, updated);
    } catch (err) {
      console.warn('[DataProvider] updateUser failed', err);
    }
  }, []);

  const updateAccount = useCallback(async (updated: Account) => {
    console.log('[DataProvider] updateAccount', updated.id);
    setAccounts((prev) => prev.map((a) => (a.id === updated.id ? updated : a)));
    try {
      await db.put(db.STORES.accounts, updated);
    } catch (err) {
      console.warn('[DataProvider] updateAccount failed', err);
    }
  }, []);

  const addAccount = useCallback(async (account: Account) => {
    console.log('[DataProvider] addAccount', account.id);
    setAccounts((prev) => [...prev, account]);
    try {
      await db.put(db.STORES.accounts, account);
    } catch (err) {
      console.warn('[DataProvider] addAccount failed', err);
    }
  }, []);

  const addTransaction = useCallback(async (tx: Transaction) => {
    console.log('[DataProvider] addTransaction', tx.id);
    setTransactions((prev) => [tx, ...prev]);
    try {
      await db.put(db.STORES.transactions, tx);
    } catch (err) {
      console.warn('[DataProvider] addTransaction failed', err);
    }
  }, []);

  const updateCard = useCallback(async (updated: Card) => {
    console.log('[DataProvider] updateCard', updated.id);
    setCards((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
    try {
      await db.put(db.STORES.cards, updated);
    } catch (err) {
      console.warn('[DataProvider] updateCard failed', err);
    }
  }, []);

  const updateRecurringBill = useCallback(async (updated: RecurringBill) => {
    console.log('[DataProvider] updateRecurringBill', updated.id);
    setRecurringBills((prev) =>
      prev.map((b) => (b.id === updated.id ? updated : b))
    );
    try {
      await db.put(db.STORES.recurringBills, updated);
    } catch (err) {
      console.warn('[DataProvider] updateRecurringBill failed', err);
    }
  }, []);

  const addRecurringBill = useCallback(async (bill: RecurringBill) => {
    console.log('[DataProvider] addRecurringBill', bill.id);
    setRecurringBills((prev) => [...prev, bill]);
    try {
      await db.put(db.STORES.recurringBills, bill);
    } catch (err) {
      console.warn('[DataProvider] addRecurringBill failed', err);
    }
  }, []);

  const markNotificationRead = useCallback(async (id: string) => {
    console.log('[DataProvider] markNotificationRead', id);
    let updated: Notification | undefined;
    setNotifications((prev) => {
      updated = prev.find((n) => n.id === id);
      return prev.map((n) => (n.id === id ? { ...n, read: true } : n));
    });
    try {
      if (updated) {
        await db.put(db.STORES.notifications, { ...updated, read: true });
      }
    } catch (err) {
      console.warn('[DataProvider] markNotificationRead failed', err);
    }
  }, []);

  const updateBudgetCategory = useCallback(async (updated: BudgetCategory) => {
    console.log('[DataProvider] updateBudgetCategory', updated.id);
    setBudgetCategories((prev) =>
      prev.map((c) => (c.id === updated.id ? updated : c))
    );
    try {
      await db.put(db.STORES.budgetCategories, updated);
    } catch (err) {
      console.warn('[DataProvider] updateBudgetCategory failed', err);
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
        forgotPassword,
        resetPassword,
        updateUser,
        updateAccount,
        addAccount,
        addTransaction,
        updateCard,
        addRecurringBill,
        updateRecurringBill,
        markNotificationRead,
        updateBudgetCategory,
      }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = (): DataContextValue => {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error('useData must be used within DataProvider');
  return ctx;
};
