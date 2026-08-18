import { fireEvent, render, screen } from '@testing-library/react';
import { Score, TimeClass } from '@chess/ts';
import { RatingTab } from '../RatingTab';
import { Formula } from '../types';

const buildFormula = (overrides?: Partial<Formula>): Formula => ({
  ratingPlayer: 1000,
  ratingOpponent: 1000,
  ratingNew: 1000,
  score: Score.DRAW,
  timeClass: TimeClass.CLASSICAL,
  lessThan30Games: false,
  overRating2400: false,
  overAge18: true,
  ...overrides,
});

describe('RatingTab', () => {
  it('renders with initial values', () => {
    const formula = buildFormula();
    render(<RatingTab formula={formula} setFormula={jest.fn()} />);
    expect(screen.getByText('Your Rating')).toBeInTheDocument();
    expect(screen.getByText('Opponent Rating')).toBeInTheDocument();
    expect(screen.getByText('Score')).toBeInTheDocument();
    expect(screen.getByText('Calculate Rating')).toBeInTheDocument();
    expect(screen.getByText('New Rating')).toBeInTheDocument();
  });

  it('renders three inputs with value 1000', () => {
    const formula = buildFormula();
    render(<RatingTab formula={formula} setFormula={jest.fn()} />);
    const inputs = screen.getAllByDisplayValue('1000');
    expect(inputs).toHaveLength(3);
  });

  it('updates player rating', () => {
    const formula = buildFormula();
    const setFormula = jest.fn();
    render(<RatingTab formula={formula} setFormula={setFormula} />);
    const inputs = screen.getAllByDisplayValue('1000');
    fireEvent.change(inputs[0], { target: { value: '1200' } });
    expect(setFormula).toHaveBeenCalledWith({
      ...formula,
      ratingPlayer: 1200,
    });
  });

  it('updates opponent rating', () => {
    const formula = buildFormula();
    const setFormula = jest.fn();
    render(<RatingTab formula={formula} setFormula={setFormula} />);
    const inputs = screen.getAllByDisplayValue('1000');
    fireEvent.change(inputs[1], { target: { value: '1500' } });
    expect(setFormula).toHaveBeenCalledWith({
      ...formula,
      ratingOpponent: 1500,
    });
  });

  it('updates score selection', () => {
    const formula = buildFormula();
    const setFormula = jest.fn();
    render(<RatingTab formula={formula} setFormula={setFormula} />);
    const select = screen.getByDisplayValue('Draw');
    fireEvent.change(select, { target: { value: Score.WIN } });
    expect(setFormula).toHaveBeenCalledWith({
      ...formula,
      score: Score.WIN,
    });
  });

  it('calculates new rating on button click', () => {
    const formula = buildFormula();
    const setFormula = jest.fn();
    render(<RatingTab formula={formula} setFormula={setFormula} />);
    fireEvent.click(screen.getByText('Calculate Rating'));
    expect(setFormula).toHaveBeenCalledWith({
      ...formula,
      ratingNew: 1020,
    });
  });

  it('displays new rating value', () => {
    const formula = buildFormula({ ratingNew: 1500 });
    render(<RatingTab formula={formula} setFormula={jest.fn()} />);
    const newRatingInput = screen.getByDisplayValue('1500');
    expect(newRatingInput).toBeInTheDocument();
    expect(newRatingInput).toHaveAttribute('readonly');
  });

  it('displays all score options', () => {
    const formula = buildFormula();
    render(<RatingTab formula={formula} setFormula={jest.fn()} />);
    expect(screen.getByText('Win')).toBeInTheDocument();
    expect(screen.getByText('Draw')).toBeInTheDocument();
    expect(screen.getByText('Loss')).toBeInTheDocument();
  });
});
