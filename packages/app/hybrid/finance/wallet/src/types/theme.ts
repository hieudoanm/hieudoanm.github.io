export const themes = [
  { name: 'Wallet Light', value: 'wallet-light' },
  { name: 'Wallet Dark', value: 'wallet-dark' },
] as const;

export type Theme = (typeof themes)[number]['value'];
