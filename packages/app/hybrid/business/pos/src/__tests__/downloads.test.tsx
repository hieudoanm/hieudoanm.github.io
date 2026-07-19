import { render, screen } from '@testing-library/react';
import DownloadsPage from '@/app/(info)/downloads/page';
import { buildVersion } from '@/content/version';

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn(), replace: jest.fn() }),
  usePathname: () => '/downloads',
  useSearchParams: () => new URLSearchParams(),
}));

describe('DownloadsPage', () => {
  it('renders the downloads template', () => {
    render(<DownloadsPage />);
    expect(screen.getByText('Downloads')).toBeInTheDocument();
  });

  it('displays download items', () => {
    render(<DownloadsPage />);
    expect(screen.getAllByText('.apk').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('.dmg').length).toBeGreaterThanOrEqual(1);
  });

  it('displays version', () => {
    render(<DownloadsPage />);
    expect(screen.getByText(buildVersion)).toBeInTheDocument();
  });
});
