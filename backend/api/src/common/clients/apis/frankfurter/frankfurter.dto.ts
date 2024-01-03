export class FrankfurterLatestRequest {
  amount: number;
  base: string;
  to: string[];
}

export class FrankfurterLatestResponse {
  amount: number;
  base: string;
  date: string;
  rates: Record<string, number>;
}

export type CurrenciesResponse = Record<string, string>;
