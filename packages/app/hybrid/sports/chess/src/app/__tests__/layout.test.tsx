import { render, screen } from '@testing-library/react';

jest.mock('@/lib/fonts', () => ({
  sans: { variable: '--font-sans' },
  mono: { variable: '--font-mono' },
}));

jest.mock('@/styles/globals.css', () => ({}));

import RootLayout, { metadata } from '../layout';

describe('RootLayout', () => {
  it('renders children', () => {
    render(
      <RootLayout>
        <div>child</div>
      </RootLayout>,
    );
    expect(screen.getByText('child')).toBeInTheDocument();
  });

  it('sets html data-theme', () => {
    render(
      <RootLayout>
        <div />
      </RootLayout>,
    );
    expect(document.documentElement).toHaveAttribute('data-theme', 'chess-light');
  });
});

describe('metadata', () => {
  it('has correct title', () => {
    expect(metadata.title).toBe('Chess - Chess Tools');
  });

  it('has manifest', () => {
    expect(metadata.manifest).toBe('/manifest.json');
  });

  it('has appleWebApp config', () => {
    const app = metadata.appleWebApp as { capable: boolean; title: string };
    expect(app.capable).toBe(true);
    expect(app.title).toBe('Chess');
  });
});
