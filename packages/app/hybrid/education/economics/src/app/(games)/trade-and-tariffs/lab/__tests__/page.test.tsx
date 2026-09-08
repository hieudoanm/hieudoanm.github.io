import TradeTariffLabPage from '@/app/(games)/trade-and-tariffs/lab/page';
import { render, screen } from '@testing-library/react';

describe('TradeTariffLabPage', () => {
  it('renders the trade and tariff lab', () => {
    render(<TradeTariffLabPage />);
    expect(
      screen.getByRole('heading', { name: 'Trade & Tariff Lab' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /Back to Theory/ })
    ).toHaveAttribute('href', '/trade-and-tariffs');
    expect(screen.getByTestId('world-price')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Start the tariff game' })
    ).toBeInTheDocument();
  });
});
