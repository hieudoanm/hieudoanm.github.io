import { render, screen } from '@testing-library/react';
import PortfolioSettingsPage from '@/app/(templates)/finance/settings/page';

describe('PortfolioSettingsPage', () => {
  it('renders the PortfolioSettingsPage', () => {
    render(<PortfolioSettingsPage />);
    expect(
      screen.getByRole('heading', { name: 'Portfolio Settings' })
    ).toBeInTheDocument();
    expect(screen.getByText('4 preferences')).toBeInTheDocument();
  });
});
