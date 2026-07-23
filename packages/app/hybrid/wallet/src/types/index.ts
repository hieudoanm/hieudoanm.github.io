export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  country: string;
  timezone: string;
  avatar: string;
  currency: string;
}

export interface Account {
  id: string;
  name: string;
  type: 'checking' | 'savings' | 'credit';
  balance: number;
  currency: string;
  accountNumber: string;
  color: string;
}

export interface Transaction {
  id: string;
  accountId: string;
  title: string;
  category: string;
  amount: number;
  currency: string;
  date: string;
  type: 'income' | 'expense' | 'transfer';
}

export interface Card {
  id: string;
  name: string;
  number: string;
  expiry: string;
  type: 'visa' | 'mastercard' | 'amex';
  color: string;
  frozen: boolean;
}

export interface RecurringBill {
  id: string;
  name: string;
  amount: number;
  currency: string;
  frequency: 'weekly' | 'monthly' | 'yearly';
  nextDue: string;
  paid: boolean;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  date: string;
  read: boolean;
  type: 'transaction' | 'alert' | 'promotion' | 'system';
}

export interface BudgetCategory {
  id: string;
  name: string;
  spent: number;
  limit: number;
  color: string;
}

export interface CurrencyRate {
  code: string;
  name: string;
  rate: number;
  symbol: string;
}

export type { Theme } from './theme';
export { themes } from './theme';
