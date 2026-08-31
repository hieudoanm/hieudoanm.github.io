import { render, screen } from '@testing-library/react';
import { SWProvider } from '@/providers/SWProvider';

jest.mock('next/font/google', () => ({
  Inter: jest.fn(() => ({ variable: '--font-sans' })),
  JetBrains_Mono: jest.fn(() => ({ variable: '--font-mono' })),
  Lora: jest.fn(() => ({ variable: '--font-serif' })),
}));

jest.mock('@/components/markdown/VaultApp', () => ({
  VaultApp: () => <div>vault-app-mock</div>,
}));

import RootLayout, { metadata } from '@/app/layout';

describe('RootLayout', () => {
  it('exports app metadata', () => {
    expect(metadata.title).toBe('Markdown - Minimal Obsidian');
    expect(metadata.manifest).toBe('/manifest.json');
    expect((metadata.appleWebApp as { capable?: boolean }).capable).toBe(true);
  });

  it('renders children inside the themed html shell', () => {
    render(
      <RootLayout>
        <main>hello page</main>
      </RootLayout>
    );
    const html = document.documentElement;
    expect(html).toHaveAttribute('data-theme', 'nothing');
    expect(html!.className).toContain('--font-sans');
    expect(html!.className).toContain('--font-mono');
    expect(html!.className).toContain('--font-serif');
    expect(screen.getByText('hello page')).toBeInTheDocument();
  });
});
