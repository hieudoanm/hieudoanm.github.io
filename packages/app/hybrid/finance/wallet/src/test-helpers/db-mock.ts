export const STORES = {
  user: 'user',
  accounts: 'accounts',
  transactions: 'transactions',
  cards: 'cards',
  recurringBills: 'recurringBills',
  notifications: 'notifications',
  budgetCategories: 'budgetCategories',
  currencyRates: 'currencyRates',
  contacts: 'contacts',
  paymentRequests: 'paymentRequests',
  recurringTransfers: 'recurringTransfers',
  currencyAlerts: 'currencyAlerts',
  loans: 'loans',
  fixedDeposits: 'fixedDeposits',
  recurringDeposits: 'recurringDeposits',
  savingsGoals: 'savingsGoals',
  insurance: 'insurance',
  cardRewards: 'cardRewards',
};

export const db = {
  STORES,
  needsSeed: jest.fn().mockResolvedValue(false),
  getAll: jest.fn().mockResolvedValue([]),
  put: jest.fn().mockResolvedValue(undefined),
  putAll: jest.fn().mockResolvedValue(undefined),
  count: jest.fn().mockResolvedValue(0),
};

export const mockDbModule = { db };
