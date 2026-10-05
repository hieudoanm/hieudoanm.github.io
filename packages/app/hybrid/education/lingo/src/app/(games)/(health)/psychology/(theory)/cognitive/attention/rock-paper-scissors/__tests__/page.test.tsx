import { render, screen } from '@testing-library/react';

import RockPaperScissorsPage from '@/app/(games)/(health)/psychology/(theory)/cognitive/attention/rock-paper-scissors/page';

describe('RockPaperScissorsPage', () => {
  it('names the exercise', () => {
    render(<RockPaperScissorsPage />);

    expect(
      screen.getByRole('heading', { name: 'Rock Paper Scissors' })
    ).toBeInTheDocument();
  });

  it('states the machine-first twist', () => {
    render(<RockPaperScissorsPage />);

    expect(screen.getByText(/reaction time and accuracy/i)).toBeInTheDocument();
  });

  it('links back to the attention topic', () => {
    render(<RockPaperScissorsPage />);

    expect(
      screen.getByRole('link', { name: '← Back to Attention' })
    ).toHaveAttribute('href', '/psychology/cognitive/attention');
  });

  it('mounts the game inside the page', () => {
    render(<RockPaperScissorsPage />);

    expect(
      screen.getByRole('button', { name: /Start block/i })
    ).toBeInTheDocument();
  });
});
