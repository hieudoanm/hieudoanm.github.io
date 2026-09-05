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
  FiMoon: () => null,
  FiSun: () => null,
}));

import RootLayout, { metadata } from '../layout';

describe('RootLayout', () => {
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
    expect(screen.getByText('About')).toHaveAttribute('href', '/about');
    expect(screen.getByText('Downloads')).toHaveAttribute('href', '/downloads');
    expect(screen.getByText('Version')).toHaveAttribute('href', '/version');
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
