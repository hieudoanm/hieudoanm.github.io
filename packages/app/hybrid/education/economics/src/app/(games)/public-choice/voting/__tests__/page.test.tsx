import VotingPage from '@/app/(games)/public-choice/voting/page';
import { render, screen } from '@testing-library/react';

describe('VotingPage', () => {
  it('renders the voting power lab', () => {
    render(<VotingPage />);
    expect(
      screen.getByRole('heading', { name: /Voting Power Lab/ })
    ).toBeInTheDocument();
    expect(screen.getByTestId('policy-line')).toBeInTheDocument();
  });
});
