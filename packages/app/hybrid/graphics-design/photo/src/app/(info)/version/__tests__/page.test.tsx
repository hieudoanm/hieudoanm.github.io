import { render, screen } from '@testing-library/react';
import VersionPage from '@/app/(info)/version/page';

describe('VersionPage', () => {
  it('renders the version page with a generated timestamp', async () => {
    render(<VersionPage />);
    expect(
      await screen.findByText(/^\d{4}\.\d{2}\.\d{2}\.\d{2}\.\d{2}\.\d{2}$/)
    ).toBeInTheDocument();
  });
});
