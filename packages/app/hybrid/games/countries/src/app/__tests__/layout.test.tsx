import { render, screen } from '@testing-library/react';

jest.mock('@/styles/globals.css', () => ({}));
jest.mock('@/components/organisms/Header', () => ({
  Header: () => <div data-testid="header">Header</div>,
}));
jest.mock('@/components/organisms/Footer', () => ({
  Footer: () => <div data-testid="footer">Footer</div>,
}));

import RootLayout from '../layout';

describe('RootLayout', () => {
  it('renders children', () => {
    render(
      <RootLayout>
        <div>child</div>
      </RootLayout>
    );
    expect(screen.getByText('child')).toBeInTheDocument();
  });

  it('sets html data-theme', () => {
    render(
      <RootLayout>
        <div />
      </RootLayout>
    );
    expect(document.documentElement).toHaveAttribute(
      'data-theme',
      'countries-light'
    );
  });

  it('renders header', () => {
    render(
      <RootLayout>
        <div />
      </RootLayout>
    );
    expect(screen.getByTestId('header')).toBeInTheDocument();
  });

  it('renders footer', () => {
    render(
      <RootLayout>
        <div />
      </RootLayout>
    );
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });
});
