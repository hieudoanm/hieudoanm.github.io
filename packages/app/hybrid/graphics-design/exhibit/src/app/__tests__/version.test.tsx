import { render, screen } from '@testing-library/react';
import VersionPage from '@/app/(info)/version/page';

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn(), replace: jest.fn() }),
  usePathname: () => '/version',
  useSearchParams: () => new URLSearchParams(),
}));

describe('VersionPage', () => {
  it('renders version template', () => {
    render(<VersionPage />);
    expect(
      screen.getByRole('heading', { name: 'Version' })
    ).toBeInTheDocument();
  });

  it('displays a timestamp format version', () => {
    render(<VersionPage />);
    expect(
      screen.getByText(/\d{4}\.\d{2}\.\d{2}\.\d{2}\.\d{2}\.\d{2}/)
    ).toBeInTheDocument();
  });
});
