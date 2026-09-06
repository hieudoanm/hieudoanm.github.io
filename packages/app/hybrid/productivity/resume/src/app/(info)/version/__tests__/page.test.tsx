import { render, screen } from '@testing-library/react';
import VersionPage from '../page';

describe('VersionPage', () => {
  it('renders the version heading', () => {
    render(<VersionPage />);
    expect(screen.getByText('Version')).toBeInTheDocument();
  });

  it('renders the copy version button', () => {
    render(<VersionPage />);
    expect(
      screen.getByRole('button', { name: /copy version/i })
    ).toBeInTheDocument();
  });

  it('renders the build version', async () => {
    render(<VersionPage />);
    expect(await screen.findByText(/\d{4}\.\d{2}\.\d{2}/)).toBeInTheDocument();
  });
});
