export type Period = 'monthly' | 'annual';
export type SalaryMode = 'gross' | 'net';

export interface TaxBracket {
  limit: number;
  rate: number;
}
export interface TaxBreakdownItem {
  rate: number;
  taxable: number;
  tax: number;
}
