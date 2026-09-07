import EndowmentTradePage from '@/app/(games)/endowment-effect/trade/page';
import { render, screen } from '@testing-library/react';

describe('EndowmentTradePage', () => {
  it('renders the endowment experiment', () => {
    render(<EndowmentTradePage />);
    expect(
      screen.getByRole('heading', { name: /Endowment Experiment/ })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/minimum price you'd accept to sell it/i)
    ).toBeInTheDocument();
  });
});
