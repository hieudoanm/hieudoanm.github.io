import { render, screen } from '@testing-library/react';

jest.mock('next/font/google', () => ({
  Inter: jest.fn(() => ({ variable: '--font-sans' })),
  JetBrains_Mono: jest.fn(() => ({ variable: '--font-mono' })),
  Lora: jest.fn(() => ({ variable: '--font-serif' })),
}));

jest.mock('@/components/markdown/VaultApp', () => ({
  VaultApp: () => <div>vault-app-mock</div>,
}));

import HomePage from '@/app/page';

describe('HomePage', () => {
  it('renders the vault app', () => {
    render(<HomePage />);
    expect(screen.getByText('vault-app-mock')).toBeInTheDocument();
  });
});
