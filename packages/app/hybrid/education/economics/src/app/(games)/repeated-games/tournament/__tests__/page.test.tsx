import RepeatedDilemmaPage from '@/app/(games)/repeated-games/tournament/page';
import { render, screen } from '@testing-library/react';

describe('RepeatedDilemmaPage', () => {
  it('renders the repeated dilemma tournament', () => {
    render(<RepeatedDilemmaPage />);
    expect(
      screen.getByRole('heading', { name: /Repeated Dilemma Tournament/ })
    ).toBeInTheDocument();
    expect(screen.getByText('Choose an opponent:')).toBeInTheDocument();
  });
});
