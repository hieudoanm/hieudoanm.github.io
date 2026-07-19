import { fireEvent, render, screen, within } from '@testing-library/react';
import { Connections } from '../index';
import { PUZZLES, puzzleForDate } from '../puzzles';
import type { Puzzle } from '../types';

const FIXED_DATE = '2026-08-22';

const dailyPuzzle = (): Puzzle => {
  const puzzle = PUZZLES.find(
    (candidate) => candidate.id === puzzleForDate(FIXED_DATE).id
  );
  if (!puzzle) throw new Error('puzzle not found');
  return puzzle;
};

const selectMembers = (members: readonly string[]): void => {
  for (const member of members) {
    fireEvent.click(screen.getByTestId(`tile-${member}`));
  }
};

describe('Connections', () => {
  it('renders the grid with sixteen tiles', () => {
    render(<Connections dateKey={FIXED_DATE} />);
    expect(screen.getByText('Country Connections')).toBeInTheDocument();
    expect(screen.getAllByTestId(/^tile-.+$/)).toHaveLength(16);
  });

  it('highlights selected tiles and supports deselect all', () => {
    render(<Connections dateKey={FIXED_DATE} />);
    const [first] = dailyPuzzle().groups[0]!!.members;
    fireEvent.click(screen.getByTestId(`tile-${first}`));
    expect(screen.getByTestId(`tile-${first}`)).toHaveClass('btn-primary');
    expect(screen.getByTestId('connections-deselect')).toBeEnabled();
    fireEvent.click(screen.getByTestId('connections-deselect'));
    expect(screen.getByTestId(`tile-${first}`)).not.toHaveClass('btn-primary');
    expect(screen.getByTestId('connections-deselect')).toBeDisabled();
  });

  it('asks for four selections when submitting early', () => {
    render(<Connections dateKey={FIXED_DATE} />);
    selectMembers([dailyPuzzle().groups[0]!!.members[0]]);
    fireEvent.click(screen.getByTestId('connections-submit'));
    expect(screen.getByTestId('connections-message')).toHaveTextContent(
      'Select four countries'
    );
  });

  it('solves a group and moves its members above the board', () => {
    render(<Connections dateKey={FIXED_DATE} />);
    const group = dailyPuzzle().groups[0]!;
    selectMembers(group.members);
    fireEvent.click(screen.getByTestId('connections-submit'));
    const solvedArea = screen.getByTestId('connections-solved');
    expect(within(solvedArea).getByText(group.label)).toBeInTheDocument();
    expect(
      within(solvedArea).getByText(group.members.join(', '))
    ).toBeInTheDocument();
    expect(screen.getAllByTestId(/^tile-.+$/)).toHaveLength(12);
    expect(screen.getByTestId('connections-message')).toHaveTextContent('');
  });

  it('charges mistakes and shows one-away hints on wrong guesses', () => {
    render(<Connections dateKey={FIXED_DATE} />);
    const groups = dailyPuzzle().groups;
    selectMembers([...groups[0].members.slice(0, 3), groups[1].members[0]]);
    fireEvent.click(screen.getByTestId('connections-submit'));
    expect(screen.getByTestId('connections-message')).toHaveTextContent(
      'One away...'
    );
    expect(screen.getByText(/Mistakes remaining:/)).toHaveTextContent('●●●○');
  });

  it('reveals every group after four mistakes', () => {
    render(<Connections dateKey={FIXED_DATE} />);
    const groups = dailyPuzzle().groups;
    const wrong = [
      ...groups[0].members.slice(0, 2),
      ...groups[1].members.slice(0, 2),
    ];
    for (let attempt = 0; attempt < 4; attempt += 1) {
      selectMembers(wrong);
      fireEvent.click(screen.getByTestId('connections-submit'));
    }
    expect(screen.getByTestId('connections-status')).toBeInTheDocument();
    const solvedArea = screen.getByTestId('connections-solved');
    expect(solvedArea.textContent).toContain(groups[2].label);
    expect(screen.queryAllByTestId(/^tile-.+$/)).toHaveLength(0);
    expect(screen.getByTestId('connections-next-lost')).toBeInTheDocument();
  });

  it('wins and offers the next puzzle after solving every group', () => {
    render(<Connections dateKey={FIXED_DATE} />);
    const groups = dailyPuzzle().groups;
    for (let index = 0; index < groups.length; index += 1) {
      selectMembers(groups[index].members);
      fireEvent.click(screen.getByTestId('connections-submit'));
    }
    expect(screen.getByTestId('connections-status')).toHaveTextContent(
      'Perfect! You found every connection.'
    );
    expect(screen.queryAllByTestId(/^tile-.+$/)).toHaveLength(0);
  });

  it('starts the next puzzle from the win banner', () => {
    render(<Connections dateKey={FIXED_DATE} />);
    const groups = dailyPuzzle().groups;
    for (const group of groups) {
      selectMembers(group.members);
      fireEvent.click(screen.getByTestId('connections-submit'));
    }
    fireEvent.click(
      within(screen.getByTestId('connections-status')).getByText('Next puzzle')
    );
    expect(screen.getAllByTestId(/^tile-.+$/)).toHaveLength(16);
    expect(screen.getByText(/Mistakes remaining:/)).toHaveTextContent('●●●●');
  });

  it('shuffles the board without losing tiles', () => {
    render(<Connections dateKey={FIXED_DATE} />);
    const before = screen
      .getAllByTestId(/^tile-.+$/)
      .map((tile) => tile.textContent)
      .sort();
    fireEvent.click(screen.getByTestId('connections-shuffle'));
    const after = screen
      .getAllByTestId(/^tile-.+$/)
      .map((tile) => tile.textContent)
      .sort();
    expect(after).toEqual(before);
  });

  it('disables board controls once finished', () => {
    render(<Connections dateKey={FIXED_DATE} />);
    const groups = dailyPuzzle().groups;
    for (const group of groups) {
      selectMembers(group.members);
      fireEvent.click(screen.getByTestId('connections-submit'));
    }
    expect(screen.getByTestId('connections-shuffle')).toBeDisabled();
    expect(screen.getByTestId('connections-deselect')).toBeDisabled();
    expect(screen.getByTestId('connections-submit')).toBeDisabled();
  });
});
