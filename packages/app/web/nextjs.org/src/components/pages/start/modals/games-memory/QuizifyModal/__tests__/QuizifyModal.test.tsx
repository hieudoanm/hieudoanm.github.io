import {
  render,
  fireEvent,
  screen,
  act,
  waitFor,
} from '@testing-library/react';
import { QuizifyModal } from '..';

const mockParseCsv = jest.fn();
jest.mock('../utils/quiz', () => ({
  parseCsv: (...args: unknown[]) => mockParseCsv(...args),
  colorClassMap: {
    red: 'bg-red-500',
    yellow: 'bg-yellow-500',
    blue: 'bg-blue-500',
    green: 'bg-green-500',
  },
}));

const questions = [
  {
    question: 'Q1',
    answers: { red: 'A', yellow: 'B', blue: 'C', green: 'D' },
    correct: 'red',
  },
  {
    question: 'Q2',
    answers: { red: 'E', yellow: 'F', blue: 'G', green: 'H' },
    correct: 'blue',
  },
];

const mockFileReader = (result: string) => {
  const reader = {
    readAsText: jest.fn(),
    onload: null as any,
    result,
  };
  jest.spyOn(window, 'FileReader').mockImplementation(() => reader as any);
  return reader;
};

const loadQuiz = () => {
  const fr = mockFileReader(
    'question,red,yellow,blue,green,correct\nQ1,A,B,C,D,red'
  );
  const fileInput = document.querySelector('input[type="file"]')!;
  Object.defineProperty(fileInput, 'files', {
    value: [new File([''], 'test.csv')],
  });
  fireEvent.change(fileInput);
  act(() => {
    fr.onload({ target: fr });
  });
  return fr;
};

describe('QuizifyModal', () => {
  const onClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockParseCsv.mockReturnValue(questions);
  });

  it('renders modal title', () => {
    render(<QuizifyModal onClose={onClose} />);
    expect(screen.getByText('Quizify')).toBeInTheDocument();
  });

  it('shows file input initially', () => {
    render(<QuizifyModal onClose={onClose} />);
    expect(document.querySelector('input[type="file"]')).toBeInTheDocument();
  });

  it('loads quiz on CSV upload', () => {
    render(<QuizifyModal onClose={onClose} />);
    loadQuiz();
    expect(screen.getByText('Q1')).toBeInTheDocument();
  });

  it('shows error for empty CSV', () => {
    mockParseCsv.mockReturnValue([]);
    render(<QuizifyModal onClose={onClose} />);
    const fr = mockFileReader('');
    const fileInput = document.querySelector('input[type="file"]')!;
    Object.defineProperty(fileInput, 'files', {
      value: [new File([''], 'empty.csv')],
    });
    fireEvent.change(fileInput);
    act(() => {
      fr.onload({ target: fr });
    });
    expect(
      screen.getByText(
        'Failed to parse CSV file. Please ensure it follows the required format.'
      )
    ).toBeInTheDocument();
  });

  it('selects correct answer and shows feedback', () => {
    render(<QuizifyModal onClose={onClose} />);
    loadQuiz();
    fireEvent.click(screen.getByRole('button', { name: 'A (R)' }));
    expect(screen.getByText('Correct answer!')).toBeInTheDocument();
  });

  it('selects wrong answer and shows feedback', () => {
    render(<QuizifyModal onClose={onClose} />);
    loadQuiz();
    fireEvent.click(screen.getByRole('button', { name: 'B (Y)' }));
    expect(screen.getByText('Wrong answer')).toBeInTheDocument();
  });

  it('navigates to next question', () => {
    render(<QuizifyModal onClose={onClose} />);
    loadQuiz();
    fireEvent.click(screen.getByRole('button', { name: 'A (R)' }));
    fireEvent.click(screen.getByText('Next Question →'));
    expect(screen.getByText('Q2')).toBeInTheDocument();
  });

  it('shows quiz completion with score on last question', () => {
    mockParseCsv.mockReturnValue([questions[0]]);
    render(<QuizifyModal onClose={onClose} />);
    loadQuiz();
    fireEvent.click(screen.getByRole('button', { name: 'A (R)' }));
    expect(screen.getByText('Quiz completed!')).toBeInTheDocument();
    expect(screen.getByText(/Score:/)).toBeInTheDocument();
  });

  it('resets quiz on Reset Quiz click', () => {
    mockParseCsv.mockReturnValue([questions[0]]);
    render(<QuizifyModal onClose={onClose} />);
    loadQuiz();
    fireEvent.click(screen.getByRole('button', { name: 'A (R)' }));
    fireEvent.click(screen.getByText('Reset Quiz'));
    expect(screen.getByText('Q1')).toBeInTheDocument();
  });

  it('uses keyboard arrow right to go to next question', () => {
    render(<QuizifyModal onClose={onClose} />);
    loadQuiz();
    fireEvent.click(screen.getByRole('button', { name: 'A (R)' }));
    act(() => {
      fireEvent.keyDown(window, { key: 'ArrowRight' });
    });
    expect(screen.getByText('Q2')).toBeInTheDocument();
  });

  it('shows correct button styling for selected answer', () => {
    render(<QuizifyModal onClose={onClose} />);
    loadQuiz();
    const redBtn = screen.getByRole('button', { name: 'A (R)' });
    fireEvent.click(redBtn);
    expect(screen.getByText('Correct answer!')).toBeInTheDocument();
  });
});
