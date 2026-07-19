import { render, screen } from '@testing-library/react';
import MatchPage from '@/app/(templates)/news/match/page';

describe('MatchPage', () => {
  it('renders the match page', () => {
    render(<MatchPage />);
    expect(screen.getByRole('heading', { name: 'Match' })).toBeInTheDocument();
    expect(screen.getByText('2 — 1')).toBeInTheDocument();
  });
});
