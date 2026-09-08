import HeuristicsLabPage from '@/app/(games)/behavioral-heuristics/lab/page';
import { render, screen } from '@testing-library/react';

describe('HeuristicsLabPage', () => {
  it('renders the heuristics lab', () => {
    render(<HeuristicsLabPage />);
    expect(
      screen.getByRole('heading', { name: /Heuristics Lab/ })
    ).toBeInTheDocument();
    expect(
      screen.getByText('How many countries are in Africa?')
    ).toBeInTheDocument();
  });
});
