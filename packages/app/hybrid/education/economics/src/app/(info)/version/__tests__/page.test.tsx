import { render, screen } from '@testing-library/react';
import VersionPage from '@/app/(info)/version/page';

describe('VersionPage', () => {
  it('version page renders segments', () => {
    render(<VersionPage />);
    expect(screen.getByText('Year')).toBeInTheDocument();
  });
});
