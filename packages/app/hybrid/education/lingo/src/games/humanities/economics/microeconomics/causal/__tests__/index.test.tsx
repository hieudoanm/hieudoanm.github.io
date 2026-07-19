import { fireEvent, render, screen } from '@testing-library/react';
import { CausationChallenge } from '../index';

describe('CausationChallenge', () => {
  it('renders the first scenario with full investigation budget', () => {
    render(<CausationChallenge />);
    expect(screen.getByTestId('scenario')).toBeInTheDocument();
    expect(screen.getByText('Ice Cream & Drowning')).toBeInTheDocument();
    expect(screen.getByTestId('investigation-balance')).toHaveTextContent(
      '3 / 3'
    );
  });

  it('spends budget and reveals a hint when investigating', () => {
    render(<CausationChallenge />);
    fireEvent.click(screen.getByTestId('investigate-randomized-trial'));
    expect(screen.getByTestId('investigation-balance')).toHaveTextContent(
      '2 / 3'
    );
    expect(
      screen.getByText(/randomly assign the treatment/)
    ).toBeInTheDocument();
  });

  it('shows a verdict and explanation after answering', () => {
    render(<CausationChallenge />);
    fireEvent.click(screen.getByTestId('option-correlated-not-causal'));
    expect(screen.getByTestId('answer')).toBeInTheDocument();
    expect(screen.getByText('✅ Correct!')).toBeInTheDocument();
    expect(
      screen.getByText(/Temperature is the confounder/)
    ).toBeInTheDocument();
  });

  it('disables investigation once the budget runs out', () => {
    render(<CausationChallenge />);
    for (let i = 0; i < 3; i++) {
      fireEvent.click(screen.getByTestId('investigate-control-confounders'));
    }
    expect(screen.getByTestId('investigation-balance')).toHaveTextContent(
      '0 / 3'
    );
    expect(
      screen.getByTestId('investigate-control-confounders')
    ).toBeDisabled();
  });

  it('completes all scenarios and shows the report', () => {
    render(<CausationChallenge />);
    for (let i = 0; i < 6; i++) {
      fireEvent.click(screen.getByTestId('option-correlated-not-causal'));
      fireEvent.click(
        screen.getByRole('button', { name: /Next Scenario|See Results/ })
      );
    }
    expect(screen.getByText('Investigation report')).toBeInTheDocument();
    expect(screen.getByTestId('score')).toHaveTextContent('30');
  });

  it('restarts from the report screen', () => {
    render(<CausationChallenge />);
    for (let i = 0; i < 6; i++) {
      fireEvent.click(screen.getByTestId('option-correlated-not-causal'));
      fireEvent.click(
        screen.getByRole('button', { name: /Next Scenario|See Results/ })
      );
    }
    fireEvent.click(screen.getByTestId('reset'));
    expect(screen.getByTestId('scenario')).toBeInTheDocument();
    expect(screen.getByTestId('investigation-balance')).toHaveTextContent(
      '3 / 3'
    );
  });
});
