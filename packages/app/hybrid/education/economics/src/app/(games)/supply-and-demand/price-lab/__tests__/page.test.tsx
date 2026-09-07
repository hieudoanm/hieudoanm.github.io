import PriceLabPage from '@/app/(games)/supply-and-demand/price-lab/page';
import { render, screen } from '@testing-library/react';

describe('PriceLabPage', () => {
  it('renders the price lab simulator', () => {
    render(<PriceLabPage />);
    expect(
      screen.getByRole('heading', { name: /Price Lab/ })
    ).toBeInTheDocument();
    expect(screen.getByTestId('price-slider')).toBeInTheDocument();
  });
});
