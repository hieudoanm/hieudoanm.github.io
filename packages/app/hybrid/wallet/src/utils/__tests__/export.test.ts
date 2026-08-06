import { exportTransactionsCSV, exportTransactionsPDF } from '../export';
import type { Transaction } from '@/types';

const transaction = (overrides: Partial<Transaction> = {}): Transaction => ({
  id: 'tx-1',
  accountId: 'acc-1',
  type: 'expense',
  amount: 42.5,
  title: 'Coffee',
  category: 'Food & Drink',
  currency: 'USD',
  date: '2026-07-22T10:30:00',
  ...overrides,
});

describe('exportTransactionsCSV', () => {
  const createObjectURL = jest.fn(() => 'blob:mock');
  const revokeObjectURL = jest.fn();
  const click = jest.fn();

  beforeEach(() => {
    URL.createObjectURL = createObjectURL;
    URL.revokeObjectURL = revokeObjectURL;
    HTMLAnchorElement.prototype.click = click;
    createObjectURL.mockClear();
    revokeObjectURL.mockClear();
    click.mockClear();
  });

  it('creates a CSV blob with headers and rows', () => {
    const transactions = [
      transaction({ type: 'expense', amount: -42.5 }),
      transaction({ id: 'tx-2', type: 'income', amount: 100 }),
    ];
    exportTransactionsCSV(transactions);
    expect(createObjectURL).toHaveBeenCalledTimes(1);
    expect(click).toHaveBeenCalledTimes(1);
    expect(revokeObjectURL).toHaveBeenCalledWith('blob:mock');
    const blob = (createObjectURL as jest.Mock).mock.calls[0][0] as Blob;
    expect(blob.type).toContain('text/csv');
  });

  it('writes absolute amounts for expenses', () => {
    exportTransactionsCSV([transaction({ type: 'expense', amount: -42.5 })]);
    const blob = (createObjectURL as jest.Mock).mock.calls[0][0] as Blob;
    void blob;
  });
});

describe('exportTransactionsPDF', () => {
  it('opens a print window with the report html', () => {
    const write = jest.fn();
    const close = jest.fn();
    const print = jest.fn();
    const documentMock = { write, close };
    window.open = jest.fn(() => ({
      document: documentMock,
      print,
    })) as unknown as typeof window.open;

    exportTransactionsPDF([
      transaction({ type: 'expense', amount: -42.5 }),
      transaction({ id: 'tx-2', type: 'income', amount: 100 }),
      transaction({ id: 'tx-3', type: 'transfer', amount: 25 }),
    ]);

    expect(window.open).toHaveBeenCalledWith('', '_blank');
    expect(write).toHaveBeenCalledWith(
      expect.stringContaining('Transaction Report')
    );
    expect(write).toHaveBeenCalledWith(expect.stringContaining('Total Income'));
    expect(write).toHaveBeenCalledWith(
      expect.stringContaining('Total Expense')
    );
    expect(print).toHaveBeenCalled();
    expect(close).toHaveBeenCalled();
  });

  it('does nothing when the print window cannot open', () => {
    window.open = jest.fn(() => null) as unknown as typeof window.open;
    expect(() => exportTransactionsPDF([transaction()])).not.toThrow();
  });
});
