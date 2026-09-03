import { render, screen } from '@testing-library/react';

jest.mock('@/styles/globals.css', () => ({}));
jest.mock('@/components/organisms/Header', () => () => (
  <div data-testid="header">Header</div>
));

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

  it('renders the header', () => {
    render(
      <RootLayout>
        <div />
      </RootLayout>,
    );
    expect(screen.getByTestId('header')).toBeInTheDocument();
  });

  it('sets html data-theme', () => {
    render(
      <RootLayout>
        <div />
      </RootLayout>,
    );
    expect(document.documentElement).toHaveAttribute('data-theme', 'dim');
  });
});

describe('metadata', () => {
  it('has correct title', () => {
    expect(metadata.title).toBe('Menu');
  });

  it('has manifest', () => {
    expect(metadata.manifest).toBe('/manifest.json');
  });

  it('has appleWebApp config', () => {
    const app = metadata.appleWebApp as { capable: boolean; title: string };
    expect(app.capable).toBe(true);
    expect(app.title).toBe('Menu');
  });
});
