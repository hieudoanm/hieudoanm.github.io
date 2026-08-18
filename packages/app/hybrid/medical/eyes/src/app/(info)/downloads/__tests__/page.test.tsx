import { render, screen } from '@testing-library/react';
import DownloadsPage from '@/app/(info)/downloads/page';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
    prefetch: jest.fn(),
  }),
}));

describe('DownloadsPage', () => {
  it('renders installers for each supported platform', () => {
    render(<DownloadsPage />);
    expect(
      screen.getByRole('heading', { name: 'Installers' })
    ).toBeInTheDocument();
    expect(screen.getByText('Linux')).toBeInTheDocument();
    expect(screen.getByText('macOS')).toBeInTheDocument();
    expect(screen.getByText('Windows')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Download .dmg' })).toHaveAttribute(
      'href',
      expect.stringContaining('/eyes_aarch64.dmg')
    );
  });
});
