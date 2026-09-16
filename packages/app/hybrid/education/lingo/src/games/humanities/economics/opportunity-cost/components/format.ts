export const formatCurrency = (n: number): string =>
  `$${n.toLocaleString('en-US')}`;
