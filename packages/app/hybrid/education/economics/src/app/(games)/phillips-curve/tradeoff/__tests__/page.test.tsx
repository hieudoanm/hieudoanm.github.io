import PhillipsTradeoffPage from '@/app/(games)/phillips-curve/tradeoff/page';
import { render, screen } from '@testing-library/react';

describe('PhillipsTradeoffPage', () => {
  it('renders the Phillips Curve Lab', () => {
    render(<PhillipsTradeoffPage />);
    expect(
      screen.getByRole('heading', { name: /Phillips Curve Lab/ })
    ).toBeInTheDocument();
    expect(screen.getByText(/Round/)).toBeInTheDocument();
  });
});
