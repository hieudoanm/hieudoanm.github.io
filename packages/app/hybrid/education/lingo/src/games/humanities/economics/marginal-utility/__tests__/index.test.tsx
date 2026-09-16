import { fireEvent, render, screen } from '@testing-library/react';
import { MarginalUtilityLab } from '../index';
import { optimalBundle } from '../game';
import { SCENARIOS, TOTAL_ROUNDS } from '../constants';

const clickTimes = (testid: string, times: number): void => {
  for (let i = 0; i < times; i++) {
    fireEvent.click(screen.getByTestId(testid));
  }
};

const optimalIndex = (round: number): number => {
  const scenario = SCENARIOS[round - 1];
  const optimal = optimalBundle(scenario.pa, scenario.pc, scenario.income);
  return scenario.options.findIndex(
    (option) =>
      option.apples === optimal.apples && option.cookies === optimal.cookies
  );
};

describe('MarginalUtilityLab', () => {
  it('renders the lab with price, income and allocation controls', () => {
    render(<MarginalUtilityLab />);
    expect(screen.getByTestId('apple-price')).toBeInTheDocument();
    expect(screen.getByTestId('cookie-price')).toBeInTheDocument();
    expect(screen.getByTestId('income')).toBeInTheDocument();
    expect(screen.getByTestId('buy-apple')).toBeInTheDocument();
    expect(screen.getByTestId('buy-cookie')).toBeInTheDocument();
    expect(screen.getByTestId('check')).toBeInTheDocument();
    expect(screen.getByTestId('reset')).toBeInTheDocument();
  });

  it('accumulates utility as units are bought', () => {
    render(<MarginalUtilityLab />);
    clickTimes('buy-apple', 2);
    clickTimes('buy-cookie', 3);
    expect(screen.getByTestId('apples')).toHaveTextContent('2');
    expect(screen.getByTestId('cookies')).toHaveTextContent('3');
    expect(screen.getByTestId('total-utility')).toHaveTextContent(
      String(20 + 12 + 15 + 10 + 8)
    );
    expect(screen.getByTestId('mu-apple')).toHaveTextContent('12');
    expect(screen.getByTestId('mu-p-apple')).toHaveTextContent('6');
    expect(screen.getByTestId('mu-cookie')).toHaveTextContent('8');
  });

  it('prevents overspending the income', () => {
    render(<MarginalUtilityLab />);
    clickTimes('buy-apple', 5);
    expect(screen.getByTestId('buy-apple')).toBeDisabled();
    expect(screen.getByTestId('apples')).toHaveTextContent('5');
    expect(screen.getByText('Budget used: 10 / 10')).toBeInTheDocument();
  });

  it('rewards the utility-maximizing allocation with a perfect score', () => {
    render(<MarginalUtilityLab />);
    clickTimes('buy-apple', 3);
    clickTimes('buy-cookie', 4);
    fireEvent.click(screen.getByTestId('check'));
    expect(screen.getByTestId('result')).toHaveTextContent(
      'Optimal allocation!'
    );
    expect(screen.getByTestId('optimal-utility')).toHaveTextContent('77');
  });

  it('clears the check result when the allocation changes', () => {
    render(<MarginalUtilityLab />);
    fireEvent.click(screen.getByTestId('check'));
    expect(screen.getByTestId('result')).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('buy-apple'));
    expect(screen.queryByTestId('result')).toBeNull();
  });

  it('re-scores after price changes', () => {
    render(<MarginalUtilityLab />);
    fireEvent.change(screen.getByTestId('apple-price'), {
      target: { value: '3' },
    });
    clickTimes('buy-apple', 2);
    clickTimes('buy-cookie', 4);
    fireEvent.click(screen.getByTestId('check'));
    expect(screen.getByTestId('result')).toHaveTextContent(
      'Optimal allocation!'
    );
  });

  it('resets the allocation back to empty', () => {
    render(<MarginalUtilityLab />);
    clickTimes('buy-apple', 2);
    fireEvent.click(screen.getByTestId('reset'));
    expect(screen.getByTestId('apples')).toHaveTextContent('0');
    expect(screen.getByTestId('cookies')).toHaveTextContent('0');
  });

  it('completes a challenge round and advances', () => {
    render(<MarginalUtilityLab />);
    fireEvent.click(screen.getByTestId('mode-challenge'));
    expect(screen.getByText(/pa = 2, pc = 1, M = 10/)).toBeInTheDocument();
    fireEvent.click(screen.getByTestId(`option-${optimalIndex(1)}`));
    fireEvent.click(screen.getByTestId('submit-challenge'));
    expect(screen.getByText('🎯 Correct optimum!')).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('next-round'));
    expect(screen.getByText('Challenge 2 / 5')).toBeInTheDocument();
  });

  it('reaches the challenge summary after all rounds', () => {
    render(<MarginalUtilityLab />);
    fireEvent.click(screen.getByTestId('mode-challenge'));
    for (let round = 1; round <= TOTAL_ROUNDS; round++) {
      fireEvent.click(screen.getByTestId(`option-${optimalIndex(round)}`));
      fireEvent.click(screen.getByTestId('submit-challenge'));
      fireEvent.click(screen.getByTestId('next-round'));
    }
    expect(screen.getByText('Challenge complete')).toBeInTheDocument();
    expect(
      screen.getByText(`${TOTAL_ROUNDS} / ${TOTAL_ROUNDS}`)
    ).toBeInTheDocument();
  });
});
