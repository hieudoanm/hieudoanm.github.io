import { fireEvent, render, screen } from '@testing-library/react';
import { FRAMER_CATEGORIES, SCENARIOS, WIND_FALL_AMOUNT } from '../constants';
import { MentalAccountingGame } from '../index';
import type { Scenario } from '../types';

const rationalTestId = (scenario: Scenario): string =>
  scenario.rational === 'a' ? 'choice-a' : 'choice-b';

const completeScenarios = () => {
  for (let i = 0; i < SCENARIOS.length; i++) {
    fireEvent.click(screen.getByTestId(rationalTestId(SCENARIOS[i])));
    fireEvent.click(screen.getByTestId('next'));
  }
};

const completeFramer = () => {
  const split: Record<string, number> = {
    fun: 300,
    bills: 200,
    savings: 400,
    giving: 100,
  };
  FRAMER_CATEGORIES.forEach((category) => {
    fireEvent.change(screen.getByTestId(`alloc-${category.id}`), {
      target: { value: String(split[category.id]) },
    });
  });
  fireEvent.click(screen.getByTestId('frame-submit'));
};

describe('MentalAccountingGame', () => {
  it('renders the first scenario with two choices and a score', () => {
    render(<MentalAccountingGame />);
    expect(screen.getByTestId('scenario')).toBeInTheDocument();
    expect(screen.getByTestId('choice-a')).toBeInTheDocument();
    expect(screen.getByTestId('choice-b')).toBeInTheDocument();
    expect(screen.getByTestId('score')).toHaveTextContent('0 / 6');
  });

  it('reveals the rational answer and explanation after picking', () => {
    render(<MentalAccountingGame />);
    fireEvent.click(screen.getByTestId(rationalTestId(SCENARIOS[0])));
    expect(screen.getByTestId('rational')).toBeInTheDocument();
    expect(screen.getByTestId('explanation')).toBeInTheDocument();
  });

  it('updates the score when a rational pick is made', () => {
    render(<MentalAccountingGame />);
    fireEvent.click(screen.getByTestId(rationalTestId(SCENARIOS[0])));
    expect(screen.getByTestId('score')).toHaveTextContent('1 / 6');
  });

  it('advances through all six frames and reaches the framer round', () => {
    render(<MentalAccountingGame />);
    completeScenarios();
    expect(screen.getByText('The Framer Round')).toBeInTheDocument();
    expect(screen.getByTestId('score')).toHaveTextContent('6 / 6');
  });

  it('only locks the windfall split when the total matches', () => {
    render(<MentalAccountingGame />);
    completeScenarios();
    const submit = screen.getByTestId('frame-submit');
    expect(submit).toBeDisabled();
    FRAMER_CATEGORIES.forEach((category) => {
      fireEvent.change(screen.getByTestId(`alloc-${category.id}`), {
        target: { value: String(100) },
      });
    });
    expect(submit).toBeDisabled();
  });

  it('finishes the game with a perfect score after a complete allocation', () => {
    render(<MentalAccountingGame />);
    completeScenarios();
    completeFramer();
    expect(screen.getByText('Your mental ledger')).toBeInTheDocument();
    expect(screen.getByTestId('score')).toHaveTextContent('6 / 6');
    expect(screen.getByText(`$${WIND_FALL_AMOUNT}`)).toBeInTheDocument();
  });

  it('resets to the first scenario from the results screen', () => {
    render(<MentalAccountingGame />);
    completeScenarios();
    completeFramer();
    fireEvent.click(screen.getByTestId('reset'));
    expect(screen.getByTestId('scenario')).toBeInTheDocument();
    expect(screen.getByTestId('score')).toHaveTextContent('0 / 6');
  });
});
