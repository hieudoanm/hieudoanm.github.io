import { fireEvent, render, screen } from '@testing-library/react';
import { TOTAL_ROUNDS } from '../constants';
import { MonetaryPolicyGame } from '../index';

const checkRate = (value: string) => {
  fireEvent.change(screen.getByTestId('policy-rate'), {
    target: { value },
  });
  fireEvent.click(screen.getByTestId('check'));
};

const playThroughRounds = () => {
  for (let round = 0; round < TOTAL_ROUNDS; round++) {
    checkRate('5');
    fireEvent.click(screen.getByTestId('next'));
  }
};

describe('MonetaryPolicyGame', () => {
  it('shows the economy state for round one', () => {
    render(<MonetaryPolicyGame />);
    expect(screen.getByTestId('scenario')).toHaveTextContent(
      /Overheating boom/
    );
    expect(screen.getByTestId('inflation')).toHaveTextContent('5%');
    expect(screen.getByTestId('output-gap')).toHaveTextContent('+2%');
    expect(screen.getByTestId('policy-rate')).toBeInTheDocument();
    expect(screen.getByTestId('check')).toBeInTheDocument();
    expect(screen.getByTestId('reset')).toBeInTheDocument();
  });

  it('reveals the Taylor rate and deviation after checking', () => {
    render(<MonetaryPolicyGame />);
    checkRate('8.5');
    expect(screen.getByTestId('taylor-rate')).toHaveTextContent('8.5%');
    expect(screen.getByTestId('deviation')).toHaveTextContent('0%');
    expect(screen.getByText(/With lags/)).toBeInTheDocument();
  });

  it('does not check an empty input', () => {
    render(<MonetaryPolicyGame />);
    fireEvent.click(screen.getByTestId('check'));
    expect(screen.getByTestId('policy-rate')).toBeInTheDocument();
    expect(screen.queryByTestId('taylor-rate')).toBeNull();
  });

  it('reaches the tradeoff phase and concludes to a verdict', () => {
    render(<MonetaryPolicyGame />);
    playThroughRounds();
    expect(screen.getByTestId('scenario')).toHaveTextContent(/Tradeoff stage/);
    fireEvent.click(screen.getByTestId('next'));
    expect(screen.getByText('Policy Report')).toBeInTheDocument();
  });

  it('adjusts the policy rate in the tradeoff phase', () => {
    render(<MonetaryPolicyGame />);
    playThroughRounds();
    const before = screen.getByTestId('policy-rate').textContent;
    fireEvent.click(screen.getByTestId('rate-down'));
    expect(screen.getByTestId('policy-rate')).not.toHaveTextContent(
      before as string
    );
  });

  it('restarts after the verdict', () => {
    render(<MonetaryPolicyGame />);
    playThroughRounds();
    fireEvent.click(screen.getByTestId('next'));
    fireEvent.click(screen.getByTestId('reset'));
    expect(screen.getByTestId('scenario')).toHaveTextContent(/Round 1\/7/);
  });
});
