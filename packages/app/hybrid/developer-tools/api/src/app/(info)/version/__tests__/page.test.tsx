import { render, screen } from '@testing-library/react';
import VersionPage from '@/app/(info)/version/page';

describe('VersionPage', () => {
  it('renders the current build version', () => {
    render(<VersionPage />);
    expect(screen.getByText('Copy version')).toBeInTheDocument();
  });
});
