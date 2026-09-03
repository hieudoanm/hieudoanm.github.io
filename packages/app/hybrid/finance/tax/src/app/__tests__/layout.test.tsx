import { render, screen } from '@testing-library/react';
import RootLayout, { metadata } from '../layout';

jest.mock('@/providers/Providers', () => ({
  Providers: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

jest.mock('@/components/organisms/Header', () => ({
  Header: () => <div data-testid="header">Header</div>,
}));

describe('layout', () => {
  it('exports app metadata', () => {
    expect(metadata.title).toBe('Tax');
    expect(metadata.manifest).toBe('/manifest.json');
    expect((metadata.appleWebApp as { capable?: boolean }).capable).toBe(true);
  });

  it('renders children in providers', () => {
    render(
      <RootLayout>
        <div>Layout Content</div>
      </RootLayout>
    );
    expect(screen.getByText('Layout Content')).toBeTruthy();
  });

  it('renders the header', () => {
    render(
      <RootLayout>
        <div>Content</div>
      </RootLayout>
    );
    expect(screen.getByTestId('header')).toBeTruthy();
  });

  it('sets correct html attributes', () => {
    render(
      <RootLayout>
        <div>Content</div>
      </RootLayout>
    );
    expect(document.documentElement.getAttribute('lang')).toBe('vi');
    expect(document.documentElement.getAttribute('data-theme')).toBe(
      'tax-dark'
    );
  });
});
