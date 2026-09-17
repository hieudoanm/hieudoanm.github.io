import { fireEvent, render, screen } from '@testing-library/react';
import { RepeatedDilemmaGame } from '../index';

const revealText = (): string => {
  const reveal = screen.getByTestId('reveal');
  return reveal.textContent ?? '';
};

const summaryText = (): string => {
  const summary = screen.getByTestId('summary');
  return summary.textContent ?? '';
};

const playToRoundFiveCooperating = () => {
  fireEvent.click(screen.getByTestId('opponent-tit-for-tat'));
  for (let i = 0; i < 4; i++) {
    fireEvent.click(screen.getByTestId('action-c'));
    fireEvent.click(screen.getByTestId('next-round'));
  }
  fireEvent.click(screen.getByTestId('action-c'));
};

const playFullMatch = () => {
  playToRoundFiveCooperating();
  fireEvent.click(screen.getByTestId('next-round'));
  fireEvent.click(screen.getByTestId('action-d'));
  fireEvent.click(screen.getByTestId('next-round'));
  fireEvent.click(screen.getByTestId('action-c'));
  fireEvent.click(screen.getByTestId('next-round'));
  for (let i = 0; i < 3; i++) {
    fireEvent.click(screen.getByTestId('action-c'));
    fireEvent.click(screen.getByTestId('next-round'));
  }
};

describe('RepeatedDilemmaGame', () => {
  it('shows every opponent on the selection screen', () => {
    render(<RepeatedDilemmaGame />);
    expect(screen.getByText('Choose an opponent:')).toBeInTheDocument();
    for (const id of [
      'tit-for-tat',
      'grim-trigger',
      'forgiving-tit-for-tat',
      'random',
      'always-defect',
      'mostly-cooperate',
    ]) {
      expect(screen.getByTestId(`opponent-${id}`)).toBeInTheDocument();
    }
  });

  it('accumulates 15 after five cooperations and gets punished for defecting', () => {
    render(<RepeatedDilemmaGame />);
    playToRoundFiveCooperating();
    expect(revealText()).toContain('Cumulative: 15');
    expect(screen.getByTestId('reveal-opponent').textContent).toBe('C');
    expect(screen.getByTestId('round-5').textContent).toContain('C');

    fireEvent.click(screen.getByTestId('next-round'));
    fireEvent.click(screen.getByTestId('action-d'));
    expect(revealText()).toContain('Payoff: +5');
    expect(revealText()).toContain('Cumulative: 20');
    expect(screen.getByTestId('reveal-opponent').textContent).toBe('C');

    fireEvent.click(screen.getByTestId('next-round'));
    fireEvent.click(screen.getByTestId('action-c'));
    expect(screen.getByTestId('reveal-opponent').textContent).toBe('D');
  });

  it('reaches the summary with score, tallies, and a lesson', () => {
    render(<RepeatedDilemmaGame />);
    playFullMatch();
    expect(screen.getByText('Tournament over')).toBeInTheDocument();
    expect(summaryText()).toContain('Total score: 29');
    expect(summaryText()).toContain('Mutual cooperation: 8 / 10');
    expect(summaryText()).toContain('Your defections: 1');
    expect(summaryText()).toContain('5 + 9 = 14');
    expect(screen.getAllByTestId(/^round-/)).toHaveLength(10);
  });

  it('restarts the game from the summary screen', () => {
    render(<RepeatedDilemmaGame />);
    playFullMatch();
    fireEvent.click(screen.getByTestId('play-again'));
    expect(screen.getByText('Choose an opponent:')).toBeInTheDocument();
    expect(screen.queryByTestId('summary')).toBeNull();
  });

  it('plays using the C, D, and Enter keyboard shortcuts', () => {
    render(<RepeatedDilemmaGame />);
    fireEvent.click(screen.getByTestId('opponent-tit-for-tat'));
    const container = screen.getByTestId('game-container');

    fireEvent.keyDown(container, { key: 'c' });
    expect(screen.getByTestId('reveal-opponent').textContent).toBe('C');
    expect(revealText()).toContain('Cumulative: 3');

    fireEvent.keyDown(container, { key: 'Enter' });
    expect(screen.getByTestId('action-c')).toBeInTheDocument();

    fireEvent.keyDown(container, { key: 'd' });
    expect(revealText()).toContain('Payoff: +5');
  });
});
