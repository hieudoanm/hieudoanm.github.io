import { render, screen } from '@testing-library/react';

jest.mock('../styles/globals.css', () => ({}));
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

  it('sets html data-theme', () => {
    render(
      <RootLayout>
        <div />
      </RootLayout>,
    );
    expect(document.documentElement).toHaveAttribute('data-theme', 'store-dark');
  });
});

describe('metadata', () => {
  it('has correct title', () => {
    expect(metadata.title).toBe('Store');
  });

  it('has manifest', () => {
    expect(metadata.manifest).toBe('/manifest.json');
  });

  it('has appleWebApp config', () => {
    const app = metadata.appleWebApp as { capable: boolean; title: string };
    expect(app.capable).toBe(true);
    expect(app.title).toBe('Store');
  });

  it('has openGraph config', () => {
    const og = metadata.openGraph as { title: string; type: string };
    expect(og.title).toBe('Store');
    expect(og.type).toBe('website');
  });
});
