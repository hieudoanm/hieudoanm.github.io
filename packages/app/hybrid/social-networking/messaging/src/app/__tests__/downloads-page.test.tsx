import { render, screen } from '@testing-library/react';
import DownloadsPage from '@/app/(info)/downloads/page';

describe('DownloadsPage', () => {
  it('lists all platforms with download links', () => {
    render(<DownloadsPage />);
    expect(screen.getByText('Downloads')).toBeInTheDocument();
    expect(screen.getByText('Web (PWA)')).toBeInTheDocument();
    expect(screen.getByText('Desktop')).toBeInTheDocument();
    expect(screen.getByText('Android')).toBeInTheDocument();
    expect(screen.getByText('iOS')).toBeInTheDocument();
    expect(screen.getAllByText('Download').length).toBeGreaterThan(0);
  });
});
