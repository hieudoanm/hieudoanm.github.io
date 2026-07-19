import type { VaultItem } from '@/types';

const now = Date.now();
const day = 86400000;

export const MOCK_ITEMS: VaultItem[] = [
  {
    id: 'v-1',
    type: 'login',
    title: 'GitHub',
    username: 'user@gmail.com',
    password: 'Sup3r!Secret',
    url: 'https://github.com',
    favorite: true,
    tags: ['dev', 'work'],
    createdAt: now - day * 30,
    updatedAt: now - day * 5,
    lastUsed: now - 3600000,
  },
  {
    id: 'v-2',
    type: 'login',
    title: 'Google',
    username: 'user@gmail.com',
    password: 'G00gl3Pass!',
    url: 'https://google.com',
    favorite: true,
    tags: ['personal'],
    createdAt: now - day * 60,
    updatedAt: now - day * 10,
    lastUsed: now - 7200000,
  },
  {
    id: 'v-3',
    type: 'login',
    title: 'Twitter',
    username: '@user',
    password: 'Tw1tter#2024',
    url: 'https://twitter.com',
    favorite: false,
    tags: ['social'],
    createdAt: now - day * 20,
    updatedAt: now - day * 3,
    lastUsed: now - 86400000,
  },
  {
    id: 'v-4',
    type: 'card',
    title: 'Visa ending 4242',
    cardNumber: '4242424242424242',
    cardholder: 'John Doe',
    expiry: '12/28',
    cvv: '123',
    password: '',
    favorite: false,
    tags: ['finance'],
    createdAt: now - day * 90,
    updatedAt: now - day * 90,
  },
  {
    id: 'v-5',
    type: 'card',
    title: 'Mastercard ending 8888',
    cardNumber: '5555555555558888',
    cardholder: 'John Doe',
    expiry: '06/27',
    cvv: '456',
    password: '',
    favorite: false,
    tags: ['finance'],
    createdAt: now - day * 45,
    updatedAt: now - day * 45,
  },
  {
    id: 'v-6',
    type: 'identity',
    title: 'Personal Identity',
    username: 'john.doe@email.com',
    password: '',
    notes: 'Full name: John Doe\nPhone: +1 555-0123',
    favorite: true,
    tags: ['personal'],
    createdAt: now - day * 120,
    updatedAt: now - day * 120,
  },
  {
    id: 'v-7',
    type: 'note',
    title: 'WiFi Password',
    notes: 'Home: MyW1f1P@ss\nOffice: 0ff1c3!Secure',
    password: '',
    favorite: false,
    tags: ['home'],
    createdAt: now - day * 15,
    updatedAt: now - day * 2,
  },
  {
    id: 'v-8',
    type: 'login',
    title: 'AWS Console',
    username: 'admin@company.com',
    password: 'Aws!C0ns0le#2024',
    url: 'https://aws.amazon.com',
    favorite: false,
    tags: ['work', 'dev'],
    createdAt: now - day * 10,
    updatedAt: now - day * 1,
    lastUsed: now - 1800000,
  },
  {
    id: 'v-9',
    type: 'ssh',
    title: 'Production Server',
    username: 'deploy',
    notes: 'Key: ssh-rsa AAAA...',
    password: 'K3yP@ss!2024',
    favorite: false,
    tags: ['work', 'devops'],
    createdAt: now - day * 25,
    updatedAt: now - day * 8,
  },
  {
    id: 'v-10',
    type: 'login',
    title: 'Netflix',
    username: 'user@gmail.com',
    password: 'N3tfl1x!Pass',
    url: 'https://netflix.com',
    favorite: false,
    tags: ['entertainment'],
    createdAt: now - day * 40,
    updatedAt: now - day * 20,
    lastUsed: now - 172800000,
  },
];

export const generatePassword = (
  length: number,
  options: {
    upper: boolean;
    lower: boolean;
    numbers: boolean;
    symbols: boolean;
  }
): string => {
  let chars = '';
  if (options.lower) chars += 'abcdefghijklmnopqrstuvwxyz';
  if (options.upper) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  if (options.numbers) chars += '0123456789';
  if (options.symbols) chars += '!@#$%^&*()_+-=';
  if (!chars) chars = 'abcdefghijklmnopqrstuvwxyz';
  return Array.from(
    { length },
    () => chars[Math.floor(Math.random() * chars.length)]
  ).join('');
};

export const checkStrength = (
  password: string
): { score: number; label: string } => {
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  const labels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong', 'Very Strong'];
  return { score: Math.min(score, 5), label: labels[Math.min(score, 5)] };
};
