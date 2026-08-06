import { render, screen } from '@testing-library/react';
import RootLayout from '@/app/layout';

jest.mock('@/components/SWProvider', () => ({
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
    expect(document.documentElement).toHaveAttribute('data-theme', 'nothing');
    expect(
      document.querySelector('link[rel="apple-touch-icon"]')
    ).toHaveAttribute('href', '/icons/icon-192.png');
  });
});
