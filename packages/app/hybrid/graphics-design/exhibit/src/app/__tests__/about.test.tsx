import AboutPage from '@/app/(info)/about/page';
import { buildVersion } from '@/content/version';
import { render, screen } from '@testing-library/react';

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn(), replace: jest.fn() }),
  usePathname: () => '/about',
  useSearchParams: () => new URLSearchParams(),
}));

describe('AboutPage', () => {
  it('renders the about template', () => {
    render(<AboutPage />);
    expect(screen.getByText('Exibit')).toBeInTheDocument();
  });

  it('displays framework info', () => {
    render(<AboutPage />);
    expect(screen.getByText('Next.js 16.+')).toBeInTheDocument();
  });

  it('displays version', () => {
    render(<AboutPage />);
    expect(screen.getByText(buildVersion)).toBeInTheDocument();
  });
});
