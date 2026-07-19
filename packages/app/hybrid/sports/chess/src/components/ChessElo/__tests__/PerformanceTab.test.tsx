import { fireEvent, render, screen } from '@testing-library/react';
import { Score } from '@chess/ts';
import { PerformanceTab } from '../PerformanceTab';
import { GameRow } from '../types';

describe('PerformanceTab', () => {
  const defaultGames: GameRow[] = [
    { ratingOpponent: 1800, score: Score.WIN },
    { ratingOpponent: 1600, score: Score.DRAW },
  ];

  it('renders with initial games', () => {
    render(
      <PerformanceTab
        games={defaultGames}
        performance={0}
        updateGame={jest.fn()}
        addGame={jest.fn()}
        calcPerformance={jest.fn()}
      />
    );
    expect(screen.getByText('Calculate Performance')).toBeInTheDocument();
    expect(screen.getByText('Add Game')).toBeInTheDocument();
    expect(screen.getByText('Performance')).toBeInTheDocument();
  });

  it('renders game rows with numbers', () => {
    render(
      <PerformanceTab
        games={defaultGames}
        performance={0}
        updateGame={jest.fn()}
        addGame={jest.fn()}
        calcPerformance={jest.fn()}
      />
    );
    expect(screen.getByText('1.')).toBeInTheDocument();
    expect(screen.getByText('2.')).toBeInTheDocument();
  });

  it('calls addGame when add game button is clicked', () => {
    const addGame = jest.fn();
    render(
      <PerformanceTab
        games={defaultGames}
        performance={0}
        updateGame={jest.fn()}
        addGame={addGame}
        calcPerformance={jest.fn()}
      />
    );
    fireEvent.click(screen.getByText('Add Game'));
    expect(addGame).toHaveBeenCalledTimes(1);
  });

  it('calls calcPerformance when calculate button is clicked', () => {
    const calcPerformance = jest.fn();
    render(
      <PerformanceTab
        games={defaultGames}
        performance={0}
        updateGame={jest.fn()}
        addGame={jest.fn()}
        calcPerformance={calcPerformance}
      />
    );
    fireEvent.click(screen.getByText('Calculate Performance'));
    expect(calcPerformance).toHaveBeenCalledTimes(1);
  });

  it('calls updateGame when opponent rating changes', () => {
    const updateGame = jest.fn();
    render(
      <PerformanceTab
        games={defaultGames}
        performance={0}
        updateGame={updateGame}
        addGame={jest.fn()}
        calcPerformance={jest.fn()}
      />
    );
    const inputs = screen.getAllByDisplayValue('1800');
    fireEvent.change(inputs[0], { target: { value: '2000' } });
    expect(updateGame).toHaveBeenCalledWith(0, 'ratingOpponent', 2000);
  });

  it('calls updateGame when score changes', () => {
    const updateGame = jest.fn();
    render(
      <PerformanceTab
        games={defaultGames}
        performance={0}
        updateGame={updateGame}
        addGame={jest.fn()}
        calcPerformance={jest.fn()}
      />
    );
    const selects = screen.getAllByDisplayValue('Win');
    fireEvent.change(selects[0], { target: { value: Score.LOSS } });
    expect(updateGame).toHaveBeenCalledWith(0, 'score', Score.LOSS);
  });

  it('displays the calculated performance value', () => {
    render(
      <PerformanceTab
        games={defaultGames}
        performance={1850}
        updateGame={jest.fn()}
        addGame={jest.fn()}
        calcPerformance={jest.fn()}
      />
    );
    const perfInput = screen.getByDisplayValue('1850');
    expect(perfInput).toBeInTheDocument();
    expect(perfInput).toHaveAttribute('readonly');
  });

  it('displays performance value of 0 initially', () => {
    render(
      <PerformanceTab
        games={defaultGames}
        performance={0}
        updateGame={jest.fn()}
        addGame={jest.fn()}
        calcPerformance={jest.fn()}
      />
    );
    expect(screen.getByDisplayValue('0')).toBeInTheDocument();
  });

  it('displays all score options in select', () => {
    render(
      <PerformanceTab
        games={defaultGames}
        performance={0}
        updateGame={jest.fn()}
        addGame={jest.fn()}
        calcPerformance={jest.fn()}
      />
    );
    const winOptions = screen.getAllByText('Win');
    const drawOptions = screen.getAllByText('Draw');
    const lossOptions = screen.getAllByText('Loss');
    expect(winOptions.length).toBeGreaterThanOrEqual(1);
    expect(drawOptions.length).toBeGreaterThanOrEqual(1);
    expect(lossOptions.length).toBeGreaterThanOrEqual(1);
  });
});
