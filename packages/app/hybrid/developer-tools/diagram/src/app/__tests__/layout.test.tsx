import { render, screen } from '@testing-library/react';

jest.mock('next/font/google', () => ({
  Inter: jest.fn(() => ({ variable: '--font-sans' })),
  JetBrains_Mono: jest.fn(() => ({ variable: '--font-mono' })),
}));

jest.mock('@/components/editor/Editor', () => ({
  __esModule: true,
  default: () => <div>diagram-app-mock</div>,
}));

import RootLayout, { metadata } from '@/app/layout';

describe('RootLayout', () => {
  it('exports app metadata', () => {
    expect(metadata.title).toBe('Diagram - Minimal Diagram Editor');
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
    expect(html).toHaveAttribute('data-theme', 'diagram');
    expect(html!.className).toContain('--font-sans');
    expect(html!.className).toContain('--font-mono');
    expect(screen.getByText('hello page')).toBeInTheDocument();
  });
});
