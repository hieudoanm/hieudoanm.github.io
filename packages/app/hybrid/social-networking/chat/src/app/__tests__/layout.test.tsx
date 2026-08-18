import { render, screen } from '@testing-library/react';
import RootLayout from '../layout';

jest.mock('@/styles/globals.css', () => ({}));

jest.mock('@/components/SWProvider', () => ({
  SWProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

describe('RootLayout', () => {
  it('renders the html shell with children', () => {
    render(
      <RootLayout>
        <div>Page content</div>
      </RootLayout>
    );
    expect(screen.getByText('Page content')).toBeInTheDocument();
    expect(document.documentElement).toHaveAttribute('lang', 'en');
    expect(document.documentElement).toHaveAttribute('data-theme', 'nothing');
  });
});
