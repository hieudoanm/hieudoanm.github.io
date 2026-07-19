import { render, fireEvent, screen } from '@testing-library/react';
import { LanguagesEnglishModal } from '../EnglishModal';

const mockUseQuery = jest.fn();
jest.mock('@tanstack/react-query', () => ({
  useQuery: (...args: unknown[]) => mockUseQuery(...args),
}));

const mockData = {
  word: 'hello',
  results: [
    {
      definition: 'a greeting',
      partOfSpeech: 'noun',
      synonyms: ['hi', 'hey'],
      anonyms: ['bye'],
      usageOf: [],
      typeOf: [],
    },
  ],
};

describe('LanguagesEnglishModal', () => {
  const onClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseQuery.mockReturnValue({
      isFetching: false,
      isPending: false,
      data: null,
      error: null,
    });
  });

  it('renders modal title', () => {
    render(<LanguagesEnglishModal onClose={onClose} />);
    expect(screen.getByText('English Dictionary')).toBeInTheDocument();
  });

  it('renders input with default word', () => {
    render(<LanguagesEnglishModal onClose={onClose} />);
    expect(screen.getByDisplayValue('example')).toBeInTheDocument();
  });

  it('accepts word input change', () => {
    render(<LanguagesEnglishModal onClose={onClose} />);
    const input = screen.getByDisplayValue('example');
    fireEvent.change(input, { target: { value: 'hello' } });
    expect(screen.getByDisplayValue('hello')).toBeInTheDocument();
  });

  it('shows loading when fetching', () => {
    mockUseQuery.mockReturnValue({
      isFetching: true,
      isPending: true,
      data: null,
      error: null,
    });
    render(<LanguagesEnglishModal onClose={onClose} />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('shows error message', () => {
    mockUseQuery.mockReturnValue({
      isFetching: false,
      isPending: false,
      data: null,
      error: new Error('Fetch Error'),
    });
    render(<LanguagesEnglishModal onClose={onClose} />);
    expect(screen.getByText('Word not found')).toBeInTheDocument();
  });

  it('shows raw error message for non-fetch errors', () => {
    mockUseQuery.mockReturnValue({
      isFetching: false,
      isPending: false,
      data: null,
      error: new Error('JSON Error'),
    });
    render(<LanguagesEnglishModal onClose={onClose} />);
    expect(screen.getByText('JSON Error')).toBeInTheDocument();
  });

  it('shows no data message when data is null', () => {
    render(<LanguagesEnglishModal onClose={onClose} />);
    expect(screen.getByText('No data found')).toBeInTheDocument();
  });

  it('renders word data and results', () => {
    mockUseQuery.mockReturnValue({
      isFetching: false,
      isPending: false,
      data: mockData,
      error: null,
    });
    render(<LanguagesEnglishModal onClose={onClose} />);
    expect(screen.getByText('hello')).toBeInTheDocument();
    expect(screen.getByText('noun')).toBeInTheDocument();
    expect(screen.getByText('a greeting')).toBeInTheDocument();
  });

  it('renders synonyms and clicks to search', () => {
    mockUseQuery.mockReturnValue({
      isFetching: false,
      isPending: false,
      data: mockData,
      error: null,
    });
    render(<LanguagesEnglishModal onClose={onClose} />);
    expect(screen.getByText('hi')).toBeInTheDocument();
    fireEvent.click(screen.getByText('hi'));
    expect(screen.getByDisplayValue('hi')).toBeInTheDocument();
  });

  it('renders antonyms and clicks to search', () => {
    mockUseQuery.mockReturnValue({
      isFetching: false,
      isPending: false,
      data: mockData,
      error: null,
    });
    render(<LanguagesEnglishModal onClose={onClose} />);
    expect(screen.getByText('bye')).toBeInTheDocument();
    fireEvent.click(screen.getByText('bye'));
    expect(screen.getByDisplayValue('bye')).toBeInTheDocument();
  });
});
