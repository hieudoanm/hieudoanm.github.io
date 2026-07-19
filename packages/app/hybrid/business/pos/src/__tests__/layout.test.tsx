import { render, screen } from '@testing-library/react';
import RootLayout from '@/app/layout';

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn(), replace: jest.fn() }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
}));

describe('RootLayout', () => {
  it('renders children inside layout', () => {
    render(
      <RootLayout>
        <div>test content</div>
      </RootLayout>
    );
    expect(screen.getByText('test content')).toBeInTheDocument();
  });

  it('renders the header', () => {
    render(
      <RootLayout>
        <div>content</div>
      </RootLayout>
    );
    expect(screen.getByText('POS')).toBeInTheDocument();
  });

  it('renders main element with flex-1', () => {
    const { container } = render(
      <RootLayout>
        <div>content</div>
      </RootLayout>
    );
    const main = container.querySelector('main');
    expect(main).toBeTruthy();
    expect(main?.className).toContain('flex-1');
  });
});
