import { render, screen } from '@testing-library/react';
import ScoresPage from '@/app/(templates)/news/scores/page';

describe('ScoresPage', () => {
  it('renders the scores page', () => {
    render(<ScoresPage />);
    expect(
      screen.getByRole('heading', { name: 'Live Scores' })
    ).toBeInTheDocument();
    expect(screen.getByText('4 matches live')).toBeInTheDocument();
  });
});
