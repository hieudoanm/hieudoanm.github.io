import LemonsPage from '@/app/(games)/adverse-selection/lemons/page';
import { render, screen } from '@testing-library/react';

describe('LemonsPage', () => {
  it('renders the market for lemons game', () => {
    render(<LemonsPage />);
    expect(
      screen.getByRole('heading', { name: /The Market for Lemons/ })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Post one price for a used car/)
    ).toBeInTheDocument();
  });
});
