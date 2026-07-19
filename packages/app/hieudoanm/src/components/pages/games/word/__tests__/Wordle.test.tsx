import { render, fireEvent, screen } from '@testing-library/react';
import { Wordle } from '../Wordle';

jest.mock(
  '@hieudoanm.github.io/components/pages/games/word/data/wordle',
  () => ({
    words: ['apple', 'train', 'house', 'music', 'piano'],
  })
);

describe('Wordle', () => {
  beforeEach(() => {
    jest.spyOn(Math, 'random').mockReturnValue(0);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should render correctly', () => {
    const { container } = render(<Wordle onClose={jest.fn()} />);
    expect(container).toMatchSnapshot();
  });

  it('shows error for short word', () => {
    render(<Wordle onClose={jest.fn()} />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'ap' } });
    fireEvent.click(screen.getByText('Enter'));
    expect(screen.getByText('Word length mismatch!')).toBeInTheDocument();
  });

  it('shows error for word not in list', () => {
    render(<Wordle onClose={jest.fn()} />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'zzzzz' } });
    fireEvent.click(screen.getByText('Enter'));
    expect(screen.getByText('Not in word list')).toBeInTheDocument();
  });

  it('accepts a valid guess', () => {
    render(<Wordle onClose={jest.fn()} />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'apple' } });
    fireEvent.click(screen.getByText('Enter'));
    expect(screen.queryByText('Not in word list')).not.toBeInTheDocument();
  });

  it('supports Enter key to submit', () => {
    render(<Wordle onClose={jest.fn()} />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'apple' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(screen.queryByText('Not in word list')).not.toBeInTheDocument();
  });

  it('starts new game', () => {
    render(<Wordle onClose={jest.fn()} />);
    fireEvent.click(screen.getByText('New Game'));
    expect(screen.getByPlaceholderText('5-letter word')).toBeInTheDocument();
  });
});
