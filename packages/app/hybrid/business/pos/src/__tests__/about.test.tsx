import { render, screen } from '@testing-library/react';
import AboutPage from '@/app/(info)/about/page';

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn(), replace: jest.fn() }),
  usePathname: () => '/about',
  useSearchParams: () => new URLSearchParams(),
}));

describe('AboutPage', () => {
  it('renders the about template', () => {
    render(<AboutPage />);
    expect(screen.getByText('POS')).toBeInTheDocument();
  });

  it('displays framework info', () => {
    render(<AboutPage />);
    expect(screen.getByText('Next.js 16')).toBeInTheDocument();
  });

  it('displays version', () => {
    render(<AboutPage />);
    expect(screen.getByText('v0.0.1')).toBeInTheDocument();
  });
});
