import { render, screen } from '@testing-library/react';

jest.mock('@/styles/globals.css', () => ({}));
jest.mock('next/link', () => ({
  __esModule: true,
  default: ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => <a href={href}>{children}</a>,
}));
jest.mock('react-icons/fi', () => ({
  FiClock: () => null,
  FiDownload: () => null,
  FiInfo: () => null,
  FiMenu: () => null,
  FiMoon: () => null,
  FiSun: () => null,
}));

import RootLayout, { metadata } from '../layout';

describe('RootLayout', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders children', () => {
    render(
      <RootLayout>
        <div>child</div>
      </RootLayout>
    );
    expect(screen.getByText('child')).toBeInTheDocument();
  });

  it('renders nav links', () => {
    render(
      <RootLayout>
        <div />
      </RootLayout>
    );
    expect(screen.getAllByText('About')[0]).toHaveAttribute('href', '/about');
    expect(screen.getAllByText('Downloads')[0]).toHaveAttribute(
      'href',
      '/downloads'
    );
    expect(screen.getAllByText('Version')[0]).toHaveAttribute(
      'href',
      '/version'
    );
  });
});

describe('metadata', () => {
  it('has correct title', () => {
    expect(metadata.title).toBe('Football Manager');
  });

  it('has manifest', () => {
    expect(metadata.manifest).toBe('/manifest.json');
  });
});
