import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ChatSearchBar } from '@/components/molecules/ChatSearchBar';

jest.mock('react-icons/fa', () => ({
  FaSearch: () => <span data-testid="icon-search" />,
  FaTimes: () => <span data-testid="icon-close" />,
}));

const defaultProps = {
  query: '',
  onChange: jest.fn(),
  resultCount: 0,
  currentIndex: 0,
  onPrev: jest.fn(),
  onNext: jest.fn(),
};

describe('ChatSearchBar', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders search input with the given value', () => {
    render(<ChatSearchBar {...defaultProps} query="hello" />);
    expect(screen.getByLabelText('Search in chat')).toHaveValue('hello');
  });

  it('calls onChange when input value changes', () => {
    render(<ChatSearchBar {...defaultProps} />);
    fireEvent.change(screen.getByLabelText('Search in chat'), {
      target: { value: 'test' },
    });
    expect(defaultProps.onChange).toHaveBeenCalledWith('test');
  });

  it('shows result count when query is non-empty', () => {
    render(
      <ChatSearchBar
        {...defaultProps}
        query="hi"
        resultCount={5}
        currentIndex={2}
      />
    );
    expect(screen.getByText('3/5')).toBeInTheDocument();
  });

  it('shows "No results" when resultCount is 0 and query is non-empty', () => {
    render(<ChatSearchBar {...defaultProps} query="nothing" resultCount={0} />);
    expect(screen.getByText('No results')).toBeInTheDocument();
  });

  it('does not show result count or navigation when query is empty', () => {
    render(<ChatSearchBar {...defaultProps} query="" resultCount={3} />);
    expect(screen.queryByText('3/3')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Previous result')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Next result')).not.toBeInTheDocument();
  });

  it('calls onPrev when previous button is clicked', () => {
    render(
      <ChatSearchBar
        {...defaultProps}
        query="hi"
        resultCount={3}
        currentIndex={1}
      />
    );
    fireEvent.click(screen.getByLabelText('Previous result'));
    expect(defaultProps.onPrev).toHaveBeenCalledTimes(1);
  });

  it('calls onNext when next button is clicked', () => {
    render(
      <ChatSearchBar
        {...defaultProps}
        query="hi"
        resultCount={3}
        currentIndex={1}
      />
    );
    fireEvent.click(screen.getByLabelText('Next result'));
    expect(defaultProps.onNext).toHaveBeenCalledTimes(1);
  });

  it('disables navigation buttons when no results', () => {
    render(<ChatSearchBar {...defaultProps} query="hi" resultCount={0} />);
    expect(screen.getByLabelText('Previous result')).toBeDisabled();
    expect(screen.getByLabelText('Next result')).toBeDisabled();
  });

  it('clears query when close button is clicked', () => {
    render(<ChatSearchBar {...defaultProps} query="hello" />);
    fireEvent.click(screen.getByLabelText('Close search'));
    expect(defaultProps.onChange).toHaveBeenCalledWith('');
  });
});
