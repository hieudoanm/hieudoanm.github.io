import { fireEvent, render, screen } from '@testing-library/react';
import { CHALLENGES, TOTAL_CHALLENGES } from '../constants';
import { optimalYears } from '../game';
import { HumanCapitalGame } from '../index';

const setYears = (years: string) =>
  fireEvent.change(screen.getByTestId('years'), { target: { value: years } });

const startChallenge = () => {
  fireEvent.click(screen.getByTestId('check'));
  fireEvent.click(screen.getByTestId('start-challenge'));
};

describe('HumanCapitalGame', () => {
  it('renders the sliders and live lifetime readout', () => {
    render(<HumanCapitalGame />);
    expect(screen.getByTestId('years')).toBeInTheDocument();
    expect(screen.getByTestId('discount-rate')).toBeInTheDocument();
    expect(screen.getByTestId('school-cost')).toBeInTheDocument();
    expect(screen.getByTestId('check')).toBeInTheDocument();
    expect(screen.getByTestId('reset')).toBeInTheDocument();
    expect(screen.getByTestId('annual-wage')).toHaveTextContent('$55,528');
    expect(screen.getByTestId('optimal-years')).toHaveTextContent('0');
    expect(screen.getByTestId('npv')).toHaveTextContent('$346,357');
  });

  it('checks a sandbox choice and lets the player keep exploring', () => {
    render(<HumanCapitalGame />);
    setYears('0');
    fireEvent.click(screen.getByTestId('check'));
    expect(screen.getByTestId('feedback')).toBeInTheDocument();
    expect(screen.getByTestId('feedback-optimal')).toHaveTextContent('0');
    fireEvent.click(screen.getByRole('button', { name: 'Keep exploring' }));
    expect(screen.queryByTestId('feedback')).toBeNull();
  });

  it('starts a challenge and scores a perfect pick', () => {
    render(<HumanCapitalGame />);
    startChallenge();
    expect(screen.getByText(/Challenge 1 \/ 5/)).toBeInTheDocument();
    const c = CHALLENGES[0];
    setYears(String(optimalYears(c.w0, c.r, c.costPerYear)));
    fireEvent.click(screen.getByTestId('check'));
    expect(screen.getByTestId('feedback-score')).toHaveTextContent('100 / 100');
    expect(screen.getByTestId('school-cost')).toBeDisabled();
  });

  it('reaches the results screen after all challenges', () => {
    render(<HumanCapitalGame />);
    startChallenge();
    for (let round = 1; round <= TOTAL_CHALLENGES; round += 1) {
      const c = CHALLENGES[round - 1];
      setYears(String(optimalYears(c.w0, c.r, c.costPerYear)));
      fireEvent.click(screen.getByTestId('check'));
      fireEvent.click(screen.getByTestId('next-challenge'));
    }
    expect(screen.getByText('Challenges complete')).toBeInTheDocument();
    expect(screen.getByTestId('done-score')).toHaveTextContent('500');
    fireEvent.click(screen.getByTestId('play-again'));
    expect(screen.getByText('Sandbox')).toBeInTheDocument();
  });

  it('resets to the initial sandbox', () => {
    render(<HumanCapitalGame />);
    startChallenge();
    setYears('16');
    fireEvent.click(screen.getByTestId('reset'));
    expect(screen.getByText('Sandbox')).toBeInTheDocument();
    expect(screen.getByTestId('optimal-years')).toHaveTextContent('0');
    expect(screen.getByTestId('discount-rate')).toBeEnabled();
  });
});
