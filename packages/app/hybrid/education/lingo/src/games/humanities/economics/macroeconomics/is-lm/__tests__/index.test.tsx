import { fireEvent, render, screen } from '@testing-library/react';
import { ISLMExplorer } from '../index';

const startQuiz = () => {
  fireEvent.click(screen.getByTestId('start-quiz'));
};

const answer = (isShift: string, lmShift: string) => {
  fireEvent.click(screen.getByTestId(`is-shift-${isShift}`));
  fireEvent.click(screen.getByTestId(`lm-shift-${lmShift}`));
  fireEvent.click(screen.getByTestId('check'));
};

describe('ISLMExplorer', () => {
  it('shows the explorer with sliders and equilibrium', () => {
    render(<ISLMExplorer />);
    expect(screen.getByTestId('autonomous')).toBeInTheDocument();
    expect(screen.getByTestId('money-supply')).toBeInTheDocument();
    expect(screen.getByTestId('equilibrium-output')).toHaveTextContent('4.17');
    expect(screen.getByTestId('equilibrium-rate')).toHaveTextContent('2.67');
  });

  it('updates the equilibrium as sliders change', () => {
    render(<ISLMExplorer />);
    fireEvent.change(screen.getByTestId('autonomous'), {
      target: { value: '10' },
    });
    expect(screen.getByTestId('equilibrium-output')).toHaveTextContent('7.50');
  });

  it('presents a scenario and scores a correct answer', () => {
    render(<ISLMExplorer />);
    startQuiz();
    expect(screen.getByTestId('scenario')).toHaveTextContent('Recession');
    answer('right', 'right');
    expect(screen.getByText(/You scored/)).toHaveTextContent('2');
  });

  it('reaches the summary after all scenarios', () => {
    render(<ISLMExplorer />);
    startQuiz();
    answer('right', 'right');
    fireEvent.click(screen.getByTestId('next'));
    answer('left', 'left');
    fireEvent.click(screen.getByTestId('next'));
    answer('none', 'left');
    fireEvent.click(screen.getByTestId('next'));
    answer('right', 'none');
    fireEvent.click(screen.getByTestId('next'));
    answer('none', 'right');
    fireEvent.click(screen.getByTestId('next'));
    expect(screen.getByTestId('summary-score')).toHaveTextContent('10');
  });

  it('resets from the summary screen', () => {
    render(<ISLMExplorer />);
    startQuiz();
    for (let i = 0; i < 5; i++) {
      answer('right', 'right');
      fireEvent.click(screen.getByTestId('next'));
    }
    fireEvent.click(screen.getByTestId('reset'));
    expect(screen.getByTestId('autonomous')).toBeInTheDocument();
  });
});
