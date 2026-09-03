import { render, screen } from '@testing-library/react';

jest.mock('@/styles/globals.css', () => ({}));
jest.mock('@/components/organisms/Header', () => ({
  Header: () => <div data-testid="header">Header</div>,
}));

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
    expect(metadata.title).toBe('POS');
  });

  it('has appleWebApp config', () => {
    const app = metadata.appleWebApp as { capable: boolean; title: string };
    expect(app.capable).toBe(true);
    expect(app.title).toBe('POS');
  });
});
