import { render, screen } from '@testing-library/react';
import VersionPage from '@/app/(info)/version/page';

describe('VersionPage', () => {
  it('renders date segments', () => {
    render(<VersionPage />);
    expect(screen.getByText('Year')).toBeInTheDocument();
  });
});
