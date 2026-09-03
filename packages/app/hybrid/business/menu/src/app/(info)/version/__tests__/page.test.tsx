import { render, screen } from '@testing-library/react';
import VersionPage from '../page';

describe('VersionPage', () => {
  it('renders a version stamp after mounting', async () => {
    render(<VersionPage />);
    expect(
      screen.getByRole('heading', { name: 'Version' })
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/\d{4}\.\d{2}\.\d{2}\.\d{2}\.\d{2}\.\d{2}/)
    ).toBeInTheDocument();
  });
});
