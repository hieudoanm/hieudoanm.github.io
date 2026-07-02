import { calculateSettlements } from '../utils/calculate';
import { PersonRow } from '../types';

describe('calculateSettlements', () => {
  it('returns empty array for empty persons', () => {
    expect(calculateSettlements([])).toEqual([]);
  });

  it('returns empty array for single person', () => {
    const persons: PersonRow[] = [{ name: 'Alice', paid: 100, owes: 50 }];
    expect(calculateSettlements(persons)).toEqual([]);
  });

  it('calculates one-way settlement', () => {
    const persons: PersonRow[] = [
      { name: 'Alice', paid: 100, owes: 0 },
      { name: 'Bob', paid: 0, owes: 100 },
    ];
    const result = calculateSettlements(persons);
    expect(result).toHaveLength(1);
    expect(result[0]).toEqual({ from: 'Bob', to: 'Alice', amount: 100 });
  });

  it('handles three persons with net balance', () => {
    const persons: PersonRow[] = [
      { name: 'Alice', paid: 100, owes: 25 },
      { name: 'Bob', paid: 0, owes: 40 },
      { name: 'Carol', paid: 0, owes: 35 },
    ];
    const result = calculateSettlements(persons);
    expect(result).toHaveLength(2);
    expect(result[0].from).toBe('Bob');
    expect(result[0].to).toBe('Alice');
    expect(result[1].from).toBe('Carol');
    expect(result[1].to).toBe('Alice');
  });

  it('handles exactly balanced persons', () => {
    const persons: PersonRow[] = [
      { name: 'Alice', paid: 50, owes: 50 },
      { name: 'Bob', paid: 30, owes: 30 },
    ];
    expect(calculateSettlements(persons)).toEqual([]);
  });

  it('trims whitespace from names', () => {
    const persons: PersonRow[] = [
      { name: '  Alice  ', paid: 100, owes: 0 },
      { name: ' Bob ', paid: 0, owes: 100 },
    ];
    const result = calculateSettlements(persons);
    expect(result[0].from).toBe('Bob');
    expect(result[0].to).toBe('Alice');
  });

  it('handles zero paid and zero owes', () => {
    const persons: PersonRow[] = [
      { name: 'Alice', paid: 0, owes: 0 },
      { name: 'Bob', paid: 0, owes: 0 },
    ];
    expect(calculateSettlements(persons)).toEqual([]);
  });

  it('handles partial payments', () => {
    const persons: PersonRow[] = [
      { name: 'Alice', paid: 60, owes: 30 },
      { name: 'Bob', paid: 0, owes: 30 },
    ];
    const result = calculateSettlements(persons);
    expect(result).toHaveLength(1);
    expect(result[0]).toEqual({ from: 'Bob', to: 'Alice', amount: 30 });
  });

  it('handles multiple debtors to one creditor', () => {
    const persons: PersonRow[] = [
      { name: 'Alice', paid: 100, owes: 0 },
      { name: 'Bob', paid: 0, owes: 60 },
      { name: 'Carol', paid: 0, owes: 40 },
    ];
    const result = calculateSettlements(persons);
    expect(result).toHaveLength(2);
    expect(result[0]).toEqual({ from: 'Bob', to: 'Alice', amount: 60 });
    expect(result[1]).toEqual({ from: 'Carol', to: 'Alice', amount: 40 });
  });

  it('handles one debtor to multiple creditors', () => {
    const persons: PersonRow[] = [
      { name: 'Alice', paid: 30, owes: 0 },
      { name: 'Bob', paid: 70, owes: 0 },
      { name: 'Carol', paid: 0, owes: 100 },
    ];
    const result = calculateSettlements(persons);
    expect(result).toHaveLength(2);
    expect(result[0]).toEqual({ from: 'Carol', to: 'Bob', amount: 70 });
    expect(result[1]).toEqual({ from: 'Carol', to: 'Alice', amount: 30 });
  });
});
