jest.mock('next/font/google', () => ({
  Inter: jest.fn(() => ({ variable: '--font-sans' })),
  JetBrains_Mono: jest.fn(() => ({ variable: '--font-mono' })),
}));

import { mono, sans } from '@/lib/fonts';

describe('fonts', () => {
  it('exports next/font instances with their css variables', () => {
    expect(sans.variable).toBe('--font-sans');
    expect(mono.variable).toBe('--font-mono');
  });
});
