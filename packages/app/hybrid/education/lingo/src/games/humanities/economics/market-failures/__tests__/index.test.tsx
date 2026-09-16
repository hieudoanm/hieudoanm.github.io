import { fireEvent, render, screen } from '@testing-library/react';
import { SCENARIOS } from '../constants';
import { MarketFailuresGame } from '../index';

const answerAllScenarios = () => {
  for (let i = 0; i < SCENARIOS.length; i++) {
    fireEvent.click(screen.getByTestId(`policy-${SCENARIOS[i].bestPolicy}`));
    if (i < SCENARIOS.length - 1) {
      fireEvent.click(screen.getByRole('button', { name: 'Next Scenario' }));
    }
  }
  fireEvent.click(screen.getByRole('button', { name: 'Start Pigouvian Fix' }));
};

describe('MarketFailuresGame', () => {
  it('renders the first scenario with failure type and policy options', () => {
    render(<MarketFailuresGame />);
    expect(screen.getByTestId('scenario')).toHaveTextContent('1');
    expect(screen.getByTestId('failure-type')).toHaveTextContent(
      'Negative externality'
    );
    expect(screen.getByTestId('policy-options')).toBeInTheDocument();
  });

  it('shows feedback after answering and explains the correct policy', () => {
    render(<MarketFailuresGame />);
    fireEvent.click(screen.getByTestId('policy-pigouvian-tax'));
    expect(screen.getByTestId('answer')).toHaveTextContent('Correct!');
    expect(screen.getByTestId('answer')).toHaveTextContent('Failure type');
    expect(screen.getByTestId('answer')).toHaveTextContent('Why this works');
    expect(screen.getByTestId('score')).toHaveTextContent('1');
  });

  it('highlights a wrong answer with the explanation', () => {
    render(<MarketFailuresGame />);
    fireEvent.click(screen.getByTestId('policy-subsidy'));
    expect(screen.getByTestId('answer')).toHaveTextContent('Not quite');
  });

  it('moves to the pollution spend scenario after the quiz', () => {
    render(<MarketFailuresGame />);
    answerAllScenarios();
    expect(screen.getByTestId('gap')).toBeInTheDocument();
    expect(screen.getByTestId('tax')).toBeInTheDocument();
    expect(screen.getByTestId('optimal-output')).toBeInTheDocument();
    expect(screen.getByText(/Bonus: The Pigouvian Fix/)).toBeInTheDocument();
  });

  it('confirms the Pigouvian equilibrium and finishes the game', () => {
    render(<MarketFailuresGame />);
    answerAllScenarios();
    const gap = Number((screen.getByTestId('gap') as HTMLInputElement).value);
    fireEvent.change(screen.getByTestId('tax'), {
      target: { value: String(gap) },
    });
    fireEvent.click(screen.getByTestId('check'));
    expect(screen.getByTestId('optimal-output')).toHaveTextContent(
      'Pigouvian tax hit!'
    );
    expect(screen.getByText('All done!')).toBeInTheDocument();
    expect(screen.getByTestId('reset')).toBeInTheDocument();
  });

  it('resets from the final screen', () => {
    render(<MarketFailuresGame />);
    answerAllScenarios();
    const gap = Number((screen.getByTestId('gap') as HTMLInputElement).value);
    fireEvent.change(screen.getByTestId('tax'), {
      target: { value: String(gap) },
    });
    fireEvent.click(screen.getByTestId('check'));
    fireEvent.click(screen.getByTestId('reset'));
    expect(screen.getByTestId('scenario')).toHaveTextContent('1');
  });
});
