import UltimatumPage from '@/app/(games)/bargaining-theory/ultimatum/page';
import { render, screen } from '@testing-library/react';

describe('UltimatumPage', () => {
  it('renders the ultimatum split heading', () => {
    render(<UltimatumPage />);
    expect(
      screen.getByRole('heading', { name: /Ultimatum Split/ })
    ).toBeInTheDocument();
  });

  it('renders a stable text from the game', () => {
    render(<UltimatumPage />);
    expect(screen.getByText(/You are the proposer/)).toBeInTheDocument();
  });
});
