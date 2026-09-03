import { render, screen } from '@testing-library/react';

jest.mock('@/styles/globals.css', () => ({}));
jest.mock('@/providers/NativeProvider', () => ({
  NativeProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));
jest.mock('@/providers/QueryProvider', () => ({
  QueryProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));
jest.mock('@/providers/SWProvider', () => ({
  SWProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));
jest.mock('@/components/organisms/Header', () => ({
  Header: () => <div data-testid="header">Header</div>,
}));

import RootLayout, { metadata, viewport } from '../layout';

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
    expect(document.documentElement).toHaveAttribute('data-theme', 'foody');
  });

  it('renders header', () => {
    render(
      <RootLayout>
        <div />
      </RootLayout>,
    );
    expect(screen.getByTestId('header')).toBeInTheDocument();
  });
});

describe('metadata', () => {
  it('has correct title', () => {
    expect(metadata.title).toBe('Foody');
  });

  it('has manifest', () => {
    expect(metadata.manifest).toBe('/manifest.json');
  });
});
