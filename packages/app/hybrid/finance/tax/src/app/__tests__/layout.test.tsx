import { render, screen } from '@testing-library/react';
import RootLayout from '../layout';

jest.mock('@/providers/Providers', () => ({
  Providers: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

describe('layout', () => {
  it('renders children in providers', () => {
    render(
      <RootLayout>
        <div>Layout Content</div>
      </RootLayout>
    );
    expect(screen.getByText('Layout Content')).toBeTruthy();
  });

  it('sets correct html attributes', () => {
    render(
      <RootLayout>
        <div>Content</div>
      </RootLayout>
    );
    expect(document.documentElement.getAttribute('lang')).toBe('vi');
    expect(document.documentElement.getAttribute('data-theme')).toBe('nothing');
  });
});
