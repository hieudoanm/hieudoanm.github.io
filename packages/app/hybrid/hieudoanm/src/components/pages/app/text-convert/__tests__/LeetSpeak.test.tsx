import { render, fireEvent, screen } from '@testing-library/react';
import { LeetSpeak } from '../LeetSpeakModal';

Object.assign(navigator, {
  clipboard: { writeText: jest.fn() },
});

describe('LeetSpeak', () => {
  const onClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders modal title', () => {
    render(<LeetSpeak onClose={onClose} />);
    expect(screen.getByText('Leet Speak')).toBeInTheDocument();
  });

  it('renders textarea', () => {
    render(<LeetSpeak onClose={onClose} />);
    expect(
      screen.getByPlaceholderText('Type or paste text…')
    ).toBeInTheDocument();
  });

  it('updates output when input changes', () => {
    render(<LeetSpeak onClose={onClose} />);
    const textarea = screen.getByPlaceholderText('Type or paste text…');
    fireEvent.change(textarea, { target: { value: 'hello' } });
    expect(screen.getByText('h3110')).toBeInTheDocument();
  });

  it('shows sample buttons', () => {
    render(<LeetSpeak onClose={onClose} />);
    expect(screen.getByText('Hello world')).toBeInTheDocument();
  });

  it('loads sample on click', () => {
    render(<LeetSpeak onClose={onClose} />);
    fireEvent.click(screen.getByText('Hello world'));
    expect(screen.getByText('H3110 w0r1d')).toBeInTheDocument();
  });

  it('shows clear button when input exists', () => {
    render(<LeetSpeak onClose={onClose} />);
    const textarea = screen.getByPlaceholderText('Type or paste text…');
    fireEvent.change(textarea, { target: { value: 'test' } });
    expect(screen.getByText('Clear')).toBeInTheDocument();
  });

  it('clears input on clear click', () => {
    render(<LeetSpeak onClose={onClose} />);
    const textarea = screen.getByPlaceholderText('Type or paste text…');
    fireEvent.change(textarea, { target: { value: 'test' } });
    fireEvent.click(screen.getByText('Clear'));
    expect(
      screen.getByText('Leet output will appear here…')
    ).toBeInTheDocument();
  });

  it('copy button is disabled when output is empty', () => {
    render(<LeetSpeak onClose={onClose} />);
    expect(screen.getByText('Copy').closest('button')).toBeDisabled();
  });

  it('copy button is enabled when output exists', () => {
    render(<LeetSpeak onClose={onClose} />);
    const textarea = screen.getByPlaceholderText('Type or paste text…');
    fireEvent.change(textarea, { target: { value: 'test' } });
    expect(screen.getByText('Copy').closest('button')).not.toBeDisabled();
  });

  it('shows char map when chars are present', () => {
    render(<LeetSpeak onClose={onClose} />);
    const textarea = screen.getByPlaceholderText('Type or paste text…');
    fireEvent.change(textarea, { target: { value: 'test' } });
    fireEvent.click(screen.getByText(/Char map/));
    expect(screen.getByText('Char')).toBeInTheDocument();
  });

  it('displays char count', () => {
    render(<LeetSpeak onClose={onClose} />);
    const textarea = screen.getByPlaceholderText('Type or paste text…');
    fireEvent.change(textarea, { target: { value: 'test' } });
    const badges = screen.getAllByText('4 chars');
    expect(badges).toHaveLength(2);
  });
});
