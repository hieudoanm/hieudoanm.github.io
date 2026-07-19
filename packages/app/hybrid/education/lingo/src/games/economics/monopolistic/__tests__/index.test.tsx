import { fireEvent, render, screen } from '@testing-library/react';
import { MonopolisticCompetitionGame } from '../index';

describe('MonopolisticCompetitionGame', () => {
  it('renders the lab with the required data-testids', () => {
    render(<MonopolisticCompetitionGame />);
    expect(
      screen.getByTestId('monopolistic-competition-game')
    ).toBeInTheDocument();
    expect(screen.getByTestId('mode')).toBeInTheDocument();
    expect(screen.getByTestId('differentiation')).toBeInTheDocument();
    expect(screen.getByTestId('price')).toBeInTheDocument();
    expect(screen.getByTestId('quantity')).toHaveValue('51');
    expect(screen.getByTestId('total-revenue')).toBeInTheDocument();
    expect(screen.getByTestId('total-cost')).toBeInTheDocument();
    expect(screen.getByTestId('profit')).toBeInTheDocument();
    expect(screen.getByTestId('marginal-revenue')).toBeInTheDocument();
    expect(screen.getByTestId('marginal-cost')).toBeInTheDocument();
    expect(screen.getByTestId('best-q')).toHaveTextContent('51 units');
  });

  it('increases pricing power when differentiation rises', () => {
    render(<MonopolisticCompetitionGame />);
    fireEvent.change(screen.getByTestId('differentiation'), {
      target: { value: '100' },
    });
    expect(screen.getByTestId('best-q')).toHaveTextContent('56 units');
  });

  it('derives quantity from a chosen price', () => {
    render(<MonopolisticCompetitionGame />);
    fireEvent.change(screen.getByTestId('price'), {
      target: { value: '60' },
    });
    expect(screen.getByTestId('quantity')).toHaveValue('29');
  });

  it('shows zero profit for a price-taking firm', () => {
    render(<MonopolisticCompetitionGame />);
    fireEvent.click(screen.getByTestId('mode-perfect'));
    expect(screen.getByTestId('profit')).toHaveTextContent('$0');
    expect(screen.getByTestId('marginal-revenue')).toHaveTextContent('$8');
    expect(screen.getByTestId('marginal-cost')).toHaveTextContent('$8');
  });

  it('plays the full quiz and reaches the summary', () => {
    render(<MonopolisticCompetitionGame />);
    fireEvent.click(screen.getByTestId('start-quiz'));
    fireEvent.click(screen.getByTestId('quiz-option-52'));
    fireEvent.click(screen.getByTestId('check'));
    expect(screen.getByTestId('best-q')).toHaveTextContent('52');
    fireEvent.click(screen.getByRole('button', { name: 'Next Question' }));
    fireEvent.click(screen.getByTestId('quiz-option-36'));
    fireEvent.click(screen.getByTestId('check'));
    fireEvent.click(screen.getByRole('button', { name: 'Next Question' }));
    fireEvent.click(screen.getByTestId('quiz-option-26'));
    fireEvent.click(screen.getByTestId('check'));
    fireEvent.click(screen.getByRole('button', { name: 'See Results' }));
    expect(screen.getByTestId('summary')).toBeInTheDocument();
    expect(
      screen.getByText(
        (_, node) =>
          node?.textContent === 'You answered 3 / 3 rounds correctly.'
      )
    ).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('reset'));
    expect(screen.getByTestId('mode')).toBeInTheDocument();
  });
});
