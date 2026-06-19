export type Period = 'monthly' | 'annual';
export type SalaryMode = 'gross' | 'net';

export type TaxBracket = { limit: number; rate: number };
export type TaxBreakdownItem = { rate: number; taxable: number; tax: number };
