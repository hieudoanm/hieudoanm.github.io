import { fireEvent, render, screen } from '@testing-library/react';
import { QuizSection } from '../QuizSection';

const questions = [
  { question: '2 + 2?', options: ['3', '4', '5'], answer: 1 },
  {
    question: 'Capital of France?',
    options: ['Rome', 'Paris', 'Lyon'],
    answer: 1,
  },
];

describe('QuizSection', () => {
  it('renders the first question and options', () => {
    render(<QuizSection questions={questions} />);
    expect(screen.getByText('2 + 2?')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('advances through questions and shows the score', () => {
    render(<QuizSection questions={questions} />);
    fireEvent.click(screen.getAllByTestId('quiz-option')[1]);
    fireEvent.click(screen.getByTestId('quiz-next'));
    expect(screen.getByText('Capital of France?')).toBeInTheDocument();
    fireEvent.click(screen.getAllByTestId('quiz-option')[1]);
    fireEvent.click(screen.getByTestId('quiz-next'));
    expect(screen.getByTestId('quiz-score')).toHaveTextContent(
      'You scored 2 out of 2'
    );
  });

  it('does not reveal next button until an answer is chosen', () => {
    render(<QuizSection questions={questions} />);
    expect(screen.queryByTestId('quiz-next')).not.toBeInTheDocument();
    fireEvent.click(screen.getAllByTestId('quiz-option')[1]);
    expect(screen.getByTestId('quiz-next')).toBeInTheDocument();
  });

  it('renders nothing for empty questions', () => {
    const { container } = render(<QuizSection questions={[]} />);
    expect(container).toBeEmptyDOMElement();
  });
});
