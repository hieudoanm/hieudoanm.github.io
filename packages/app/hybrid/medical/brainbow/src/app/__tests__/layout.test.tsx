import { render, screen } from '@testing-library/react';
import RootLayout, { metadata, viewport } from '@/app/layout';

jest.mock('@/hooks/useSWRegister', () => ({
  useSWRegister: jest.fn(),
}));

jest.mock('@/hooks/useUpdater', () => ({
  useUpdater: jest.fn(),
}));

jest.mock('@/hooks/useOffline', () => ({
  useOffline: jest.fn(() => false),
}));

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({
    href,
    children,
  }: {
    href: string;
    children: React.ReactNode;
  }) => <a href={href}>{children}</a>,
}));

describe('RootLayout', () => {
  it('exposes layout metadata', () => {
    expect(metadata).toMatchObject({
      title: 'Brainbow',
      description: 'Brainbow microscopy image viewer and annotator',
      manifest: '/manifest.json',
    });
    expect(metadata.appleWebApp).toMatchObject({
      capable: true,
      title: 'Brainbow',
    });
  });

  it('exposes a fixed viewport', () => {
    expect(viewport).toEqual({
      width: 'device-width',
      initialScale: 1,
      maximumScale: 1,
    });
  });

  it('renders children inside the providers', () => {
    render(
      <RootLayout>
        <div data-testid="page">page content</div>
      </RootLayout>
    );
    expect(screen.getByTestId('page')).toBeInTheDocument();
    expect(document.documentElement).toHaveAttribute('lang', 'en');
    expect(document.documentElement).toHaveAttribute('data-theme', 'nothing');
  });
});
