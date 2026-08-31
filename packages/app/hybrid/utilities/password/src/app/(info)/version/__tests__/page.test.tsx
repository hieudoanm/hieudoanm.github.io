import { render, screen, waitFor } from '@testing-library/react';
import VersionPage from '@/app/(info)/version/page';

describe('VersionPage', () => {
  it('renders the version header and copy button', () => {
    render(<VersionPage />);
    expect(
      screen.getByRole('heading', { name: 'Password Version' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Copy version' })
    ).toBeInTheDocument();
  });

  it('formats the current timestamp as a version', async () => {
    render(<VersionPage />);
    await waitFor(() =>
      expect(
        screen.getByText(/^\d{4}\.\d{2}\.\d{2}\.\d{2}\.\d{2}\.\d{2}$/)
      ).toBeInTheDocument()
    );
  });
});
