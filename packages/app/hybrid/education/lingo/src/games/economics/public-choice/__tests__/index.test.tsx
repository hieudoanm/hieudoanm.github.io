import { fireEvent, render, screen } from '@testing-library/react';
import { VotingPowerLab } from '../index';

jest.mock('../game', () => {
  const actual = jest.requireActual('../game');
  return {
    ...actual,
    drawWin: () => true,
  };
});

const playPlan = () => {
  if (screen.queryByTestId('policy-line')) {
    fireEvent.click(screen.getByTestId('check'));
  } else if (screen.queryByTestId('agenda')) {
    fireEvent.click(screen.getByTestId('support-A'));
    fireEvent.click(screen.getByTestId('pair-b-c'));
    fireEvent.click(screen.getByTestId('check'));
  } else {
    fireEvent.change(screen.getByTestId('rent-spend-a'), {
      target: { value: '30000' },
    });
    fireEvent.click(screen.getByTestId('check'));
  }
};

describe('VotingPowerLab', () => {
  it('starts on the median voter round', () => {
    render(<VotingPowerLab />);
    expect(screen.getByTestId('policy-line')).toBeInTheDocument();
    expect(screen.getByTestId('my-platform')).toBeInTheDocument();
    expect(screen.getByTestId('median')).toBeInTheDocument();
    expect(screen.getByTestId('bot-platform')).toBeInTheDocument();
    expect(screen.getByTestId('voters')).toBeInTheDocument();
  });

  it('picks the median and wins the simulated election', () => {
    render(<VotingPowerLab />);
    fireEvent.click(screen.getByTestId('check'));
    expect(screen.getByText('You won the election')).toBeInTheDocument();
    expect(screen.getByTestId('winner')).toBeInTheDocument();
    expect(screen.getByTestId('next')).toBeInTheDocument();
  });

  it('requires a full agenda before checking the paradox round', () => {
    render(<VotingPowerLab />);
    fireEvent.click(screen.getByTestId('check'));
    fireEvent.click(screen.getByTestId('next'));
    expect(screen.getByTestId('agenda')).toBeInTheDocument();
    expect(screen.getByTestId('check')).toBeDisabled();
    fireEvent.click(screen.getByTestId('support-A'));
    fireEvent.click(screen.getByTestId('pair-b-c'));
    expect(screen.getByTestId('check')).toBeEnabled();
    fireEvent.click(screen.getByTestId('check'));
    expect(screen.getByTestId('option-order')).toBeInTheDocument();
    expect(screen.getByTestId('winner')).toHaveTextContent('Final winner');
    expect(screen.queryByTestId('check')).toBeNull();
  });

  it('resolves the rent-seeking contest with a Tullock payoff', () => {
    render(<VotingPowerLab />);
    playPlan();
    fireEvent.click(screen.getByTestId('next'));
    playPlan();
    fireEvent.click(screen.getByTestId('next'));
    expect(screen.getByTestId('prize')).toBeInTheDocument();
    expect(screen.getByTestId('rent-spend-a')).toBeInTheDocument();
    expect(screen.getByTestId('rent-spend-b')).toBeInTheDocument();
    playPlan();
    expect(screen.getByTestId('payoff')).toHaveTextContent('Expected payoff');
    expect(screen.getByText('Your group won the subsidy')).toBeInTheDocument();
  });

  it('reaches the results screen after all rounds', () => {
    render(<VotingPowerLab />);
    for (let round = 0; round < 9; round++) {
      playPlan();
      fireEvent.click(screen.getByTestId('next'));
    }
    expect(screen.getByText('Voting Power Lab results')).toBeInTheDocument();
    expect(screen.getByTestId('reset')).toBeInTheDocument();
  });

  it('restarts from the results screen', () => {
    render(<VotingPowerLab />);
    for (let round = 0; round < 9; round++) {
      playPlan();
      fireEvent.click(screen.getByTestId('next'));
    }
    fireEvent.click(screen.getByTestId('reset'));
    expect(screen.getByTestId('policy-line')).toBeInTheDocument();
  });
});
