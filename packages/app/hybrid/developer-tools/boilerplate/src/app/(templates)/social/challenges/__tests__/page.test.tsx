import { render, screen } from '@testing-library/react';
import ChallengesPage from '@/app/(templates)/social/challenges/page';

describe('ChallengesPage', () => {
  it('renders the challenges page', () => {
    render(<ChallengesPage />);
    expect(
      screen.getByRole('heading', { name: 'Challenges' })
    ).toBeInTheDocument();
    expect(screen.getByText('4 challenges')).toBeInTheDocument();
  });
});
