import { render, screen } from '@testing-library/react';
import VersionPage from '@/app/(info)/version/page';

describe('VersionPage', () => {
  it('renders the version details', () => {
    render(<VersionPage />);
    expect(screen.getAllByText('Version').length).toBeGreaterThan(0);
    expect(screen.getByText('0.0.1')).toBeInTheDocument();
    expect(screen.getByText('Phase 1 complete')).toBeInTheDocument();
    expect(
      screen.getByText('app-hybrid-social-networking-messaging-latest')
    ).toBeInTheDocument();
  });
});
