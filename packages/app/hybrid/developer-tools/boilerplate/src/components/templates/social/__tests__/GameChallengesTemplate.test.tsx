import { fireEvent, render, screen } from '@testing-library/react';
import { GameChallengesTemplate } from '../GameChallengesTemplate';

describe('GameChallengesTemplate', () => {
  it('renders challenges with descriptions and rewards', () => {
    render(<GameChallengesTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Challenges' })
    ).toBeInTheDocument();
    expect(screen.getByText('Daily and weekly quests.')).toBeInTheDocument();
    expect(screen.getByText('4 challenges')).toBeInTheDocument();
    expect(screen.getByText('Win 3 matches')).toBeInTheDocument();
    expect(
      screen.getByText('Earn a victory in any ranked queue three times.')
    ).toBeInTheDocument();
    expect(screen.getByText('500 XP')).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: 'Claim' })).toHaveLength(4);
  });

  it('claims a challenge and updates the count', () => {
    render(<GameChallengesTemplate />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Claim' })[0]);
    expect(screen.getByRole('button', { name: 'Claimed' })).toBeInTheDocument();
    expect(screen.getAllByText('Claimed')).toHaveLength(2);
    expect(screen.getByText('3 challenges')).toBeInTheDocument();
  });

  it('shows the empty state after claiming every challenge', () => {
    render(<GameChallengesTemplate />);
    while (screen.queryAllByRole('button', { name: 'Claim' }).length > 0) {
      fireEvent.click(screen.getAllByRole('button', { name: 'Claim' })[0]);
    }
    expect(screen.getByText('0 challenges')).toBeInTheDocument();
    expect(screen.getByText('No challenges available')).toBeInTheDocument();
  });
});
