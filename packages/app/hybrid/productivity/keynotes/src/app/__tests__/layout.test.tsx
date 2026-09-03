import { render, screen } from '@testing-library/react';

jest.mock('@/styles/globals.css', () => ({}));
jest.mock('@/providers/Providers', () => ({
  Providers: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));
jest.mock('@/components/PwaRegister', () => ({
  PwaRegister: () => null,
}));
jest.mock('@/components/atoms/SkipLink', () => ({
  SkipLink: () => null,
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
    expect(document.documentElement).toHaveAttribute('data-theme', 'night');
  });
});

describe('metadata', () => {
  it('has correct title', () => {
    expect(metadata.title).toBe('Keynotes — Presentation editor');
  });
});

describe('viewport', () => {
  it('has correct width', () => {
    expect(viewport.width).toBe('device-width');
  });

  it('has themeColor', () => {
    expect(viewport.themeColor).toBe('#0b1020');
  });
});
