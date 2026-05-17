import { render, fireEvent, screen } from '@testing-library/react';
import { RegexModal } from '..';

Object.assign(navigator, {
  clipboard: { writeText: jest.fn() },
});

jest.mock('../utils/regex', () => ({
  generateRegex: jest.fn((strings: string[]) => {
    if (strings.includes('test@example.com')) return '\\w+@\\w+\\.\\w+';
    return null;
  }),
  testRegex: jest.fn((pattern: string, flags: string, lines: string[]) => {
    return lines.map(() => true);
  }),
}));

describe('RegexModal', () => {
  const onClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders modal title', () => {
    render(<RegexModal onClose={onClose} />);
    expect(screen.getByText('Regex Generator')).toBeInTheDocument();
  });

  it('renders sample strings textarea', () => {
    render(<RegexModal onClose={onClose} />);
    expect(screen.getByDisplayValue(/user@example\.com/)).toBeInTheDocument();
  });

  it('renders pattern input', () => {
    render(<RegexModal onClose={onClose} />);
    expect(
      screen.getByPlaceholderText(/Generated or custom/)
    ).toBeInTheDocument();
  });

  it('renders test strings textarea', () => {
    render(<RegexModal onClose={onClose} />);
    expect(screen.getByPlaceholderText(/not-an-email/)).toBeInTheDocument();
  });

  it('generates pattern when sample strings change', () => {
    render(<RegexModal onClose={onClose} />);
    const textarea = screen.getByDisplayValue(/user@example\.com/);
    fireEvent.change(textarea, {
      target: { value: 'test@example.com\nother@test.com' },
    });
    const patternInput = screen.getByPlaceholderText(/Generated or custom/);
    expect(patternInput).toHaveValue('\\w+@\\w+\\.\\w+');
  });

  it('allows custom pattern input', () => {
    render(<RegexModal onClose={onClose} />);
    const patternInput = screen.getByPlaceholderText(/Generated or custom/);
    fireEvent.change(patternInput, { target: { value: 'custom' } });
    expect(patternInput).toHaveValue('custom');
  });

  it('copies pattern on button click', () => {
    render(<RegexModal onClose={onClose} />);
    const patternInput = screen.getByPlaceholderText(/Generated or custom/);
    fireEvent.change(patternInput, { target: { value: 'test-pattern' } });
    fireEvent.click(screen.getByText('Copy'));
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('test-pattern');
  });

  it('disables copy when pattern is empty', () => {
    render(<RegexModal onClose={onClose} />);
    const patternInput = screen.getByPlaceholderText(/Generated or custom/);
    fireEvent.change(patternInput, { target: { value: '' } });
    expect(screen.getByText('Copy').closest('button')).toBeDisabled();
  });

  it('accepts flag changes', () => {
    render(<RegexModal onClose={onClose} />);
    const flagsInput = screen.getByDisplayValue('g');
    fireEvent.change(flagsInput, { target: { value: 'gi' } });
    expect(flagsInput).toHaveValue('gi');
  });

  it('shows test results when test strings entered', () => {
    render(<RegexModal onClose={onClose} />);
    const patternInput = screen.getByPlaceholderText(/Generated or custom/);
    fireEvent.change(patternInput, { target: { value: '\\w+@\\w+' } });
    const testInput = screen.getByPlaceholderText(/not-an-email/);
    fireEvent.change(testInput, { target: { value: 'test@test.com' } });
    expect(screen.getByText('✓')).toBeInTheDocument();
  });
});
