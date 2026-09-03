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
    expect(document.documentElement).toHaveAttribute('data-theme', 'economics-light');
  });
});

describe('metadata', () => {
  it('has correct title', () => {
    expect(metadata.title).toBe('Economics');
  });

  it('has manifest', () => {
    expect(metadata.manifest).toBe('/manifest.json');
  });

  it('has appleWebApp config', () => {
    const app = metadata.appleWebApp as { capable: boolean; title: string };
    expect(app.capable).toBe(true);
    expect(app.title).toBe('Economics');
  });
});

describe('viewport', () => {
  it('has correct width', () => {
    expect(viewport.width).toBe('device-width');
  });
});
