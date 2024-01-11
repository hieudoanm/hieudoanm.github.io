export class FixerLatestResponse {
  success: boolean;
  timestamp: number;
  base: string;
  date: string;
  rates: Record<string, number>;
}

export class SymbolsResponse {
  success: boolean;
  symbols: Record<string, string>;
}
