import { render, screen } from '@testing-library/react';
import HoldingsPage from '@/app/(templates)/finance/holdings/page';

describe('HoldingsPage', () => {
  it('renders the HoldingsPage', () => {
    render(<HoldingsPage />);
    expect(
      screen.getByRole('heading', { name: 'Holdings' })
    ).toBeInTheDocument();
    expect(screen.getByText('6 holdings')).toBeInTheDocument();
  });
});
