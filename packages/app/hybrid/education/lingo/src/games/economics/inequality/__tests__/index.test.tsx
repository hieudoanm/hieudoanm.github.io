import { fireEvent, render, screen } from '@testing-library/react';
import { InequalityGame } from '../index';

const submitRate = (rate: string) => {
  fireEvent.change(screen.getByTestId('tax-input'), {
    target: { value: rate },
  });
  fireEvent.click(screen.getByRole('button', { name: 'Apply' }));
};

const advance = () =>
  fireEvent.click(
    screen.getByRole('button', { name: /Next Round|See Final Score/ })
  );

const byFullText = (text: string) => (_content: string, node: Element | null) =>
  node?.textContent?.replace(/\s+/g, ' ').trim() === text;

describe('InequalityGame', () => {
  it('shows the round header, incomes, and initial Gini readouts', () => {
    render(<InequalityGame />);
    expect(screen.getByText(byFullText('Round 1 / 5'))).toBeInTheDocument();
    expect(screen.getByText('20')).toBeInTheDocument();
    expect(screen.getByText('120')).toBeInTheDocument();
    expect(screen.getByTestId('base-gini').textContent).toBe('0.306');
    expect(screen.getByTestId('target-gini').textContent).toBe('0.250');
    expect(screen.getByTestId('preview-gini').textContent).toBe('0.306');
    expect(screen.getByTestId('lorenz-chart')).toBeInTheDocument();
    expect(screen.getByTestId('lorenz-polyline')).toBeInTheDocument();
  });

  it('updates the preview Gini as the tax rate changes', () => {
    render(<InequalityGame />);
    fireEvent.change(screen.getByTestId('tax-input'), {
      target: { value: '0.25' },
    });
    expect(screen.getByTestId('preview-gini').textContent).toBe('0.229');
    expect(screen.getByRole('button', { name: 'Apply' })).toBeEnabled();
  });

  it('disables Apply for an out-of-range tax rate', () => {
    render(<InequalityGame />);
    fireEvent.change(screen.getByTestId('tax-input'), {
      target: { value: '70' },
    });
    expect(screen.getByRole('button', { name: 'Apply' })).toBeDisabled();
  });

  it('reveals the outcome after applying a winning rate', () => {
    render(<InequalityGame />);
    submitRate('0.25');
    expect(screen.getByText('Round 1 outcome')).toBeInTheDocument();
    expect(
      screen.getByText(byFullText('Rebate per person: $13.25k'))
    ).toBeInTheDocument();
    expect(
      screen.getByText(byFullText('Poverty at $30k: 20% → 10%'))
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        byFullText('Your tax rate was 25% — this round scores 3 points.')
      )
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Next Round' })
    ).toBeInTheDocument();
  });

  it('reaches the final score screen after all rounds', () => {
    render(<InequalityGame />);
    for (let round = 0; round < 5; round++) {
      if (round === 4) {
        expect(screen.getByText('Surprise income vector')).toBeInTheDocument();
      }
      submitRate('0.25');
      advance();
    }
    expect(screen.getByText('Final score: 5 / 15')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Play Again' })
    ).toBeInTheDocument();
  });

  it('restarts the game from the final screen', () => {
    render(<InequalityGame />);
    for (let round = 0; round < 5; round++) {
      submitRate('0.25');
      advance();
    }
    fireEvent.click(screen.getByRole('button', { name: 'Play Again' }));
    expect(screen.getByText(byFullText('Round 1 / 5'))).toBeInTheDocument();
    expect(screen.getByTestId('base-gini').textContent).toBe('0.306');
  });
});
