import { render, screen } from '@testing-library/react';
import RootLayout from '@/app/layout';

jest.mock('@/providers/SWProvider', () => ({
  SWProvider: ({ children }: { children: React.ReactNode }) => children,
}));

describe('RootLayout', () => {
  it('renders children inside html and body', () => {
    render(
      <RootLayout>
        <main>Hello world</main>
      </RootLayout>
    );
    expect(screen.getByText('Hello world')).toBeInTheDocument();
    expect(document.documentElement).toHaveAttribute('lang', 'en');
    expect(document.documentElement).toHaveAttribute('data-theme', 'pdf-light');
    expect(
      document.querySelector('link[rel="apple-touch-icon"]')
    ).toHaveAttribute('href', '/icons/icon-192x192.png');
  });
});
