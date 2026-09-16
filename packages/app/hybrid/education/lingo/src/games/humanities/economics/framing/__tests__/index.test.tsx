import { fireEvent, render, screen } from '@testing-library/react';
import { FramingGame } from '../index';

const answerClassicPattern = () => {
  fireEvent.click(screen.getByTestId('choice-x-A'));
  fireEvent.click(screen.getByTestId('choice-y-B'));
};

describe('FramingGame', () => {
  it('shows the gains scenario first', () => {
    render(<FramingGame />);
    expect(screen.getByText(/Scenario A/)).toBeInTheDocument();
    expect(
      screen.getByText(/Program X: 200 people will be saved/)
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Program X \(sure\)/ })
    ).toBeInTheDocument();
  });

  it('moves to the losses scenario after the first choice', () => {
    render(<FramingGame />);
    fireEvent.click(screen.getByTestId('choice-x-A'));
    expect(screen.getByText(/Scenario B/)).toBeInTheDocument();
    expect(
      screen.getByText(/Program X: 400 people will DIE/)
    ).toBeInTheDocument();
  });

  it('reveals the classic pattern after both choices', () => {
    render(<FramingGame />);
    answerClassicPattern();
    expect(screen.getByText(/reflection effect/)).toBeInTheDocument();
    expect(screen.getByText(/X in gains · Y in losses/)).toBeInTheDocument();
  });

  it('shows the classic score on the results screen', () => {
    render(<FramingGame />);
    answerClassicPattern();
    fireEvent.click(screen.getByRole('button', { name: /See Results/ }));
    expect(screen.getByText(/Your score:/)).toBeInTheDocument();
    expect(screen.getByText(/1 \/ 1/)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Play Again' })
    ).toBeInTheDocument();
  });

  it('scores zero for a non-classic pattern', () => {
    render(<FramingGame />);
    fireEvent.click(screen.getByTestId('choice-x-A'));
    fireEvent.click(screen.getByTestId('choice-x-B'));
    fireEvent.click(screen.getByRole('button', { name: /See Results/ }));
    expect(screen.getByText(/0 \/ 1/)).toBeInTheDocument();
  });

  it('restarts from the results screen', () => {
    render(<FramingGame />);
    answerClassicPattern();
    fireEvent.click(screen.getByRole('button', { name: /See Results/ }));
    fireEvent.click(screen.getByRole('button', { name: 'Play Again' }));
    expect(screen.getByText(/Scenario A/)).toBeInTheDocument();
  });
});
