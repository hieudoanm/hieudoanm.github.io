import { render, screen } from '@testing-library/react';
import DividendIncomePage from '@/app/(templates)/finance/dividends/page';

describe('DividendIncomePage', () => {
  it('renders the DividendIncomePage', () => {
    render(<DividendIncomePage />);
    expect(
      screen.getByRole('heading', { name: 'Dividend Income' })
    ).toBeInTheDocument();
    expect(screen.getByText('$874.10')).toBeInTheDocument();
  });
});
