import { render, screen } from '@testing-library/react';
import RootLayout, { metadata } from '@/app/layout';

jest.mock('@/hooks/useSWRegister', () => ({
  useSWRegister: jest.fn(),
}));

describe('RootLayout', () => {
  it('exposes layout metadata', () => {
    expect(metadata).toMatchObject({
      title: 'Database - SQLite Manager',
      description: 'A modern SQLite database manager',
      manifest: '/manifest.json',
    });
    expect(metadata.appleWebApp).toMatchObject({
      capable: true,
      statusBarStyle: 'black-translucent',
      title: 'Database',
    });
  });

  it('renders children inside SWProvider', () => {
    render(
      <RootLayout>
        <div data-testid="page">page content</div>
      </RootLayout>
    );
    expect(screen.getByTestId('page')).toBeInTheDocument();
    expect(screen.getByText('page content')).toBeInTheDocument();
  });
});
