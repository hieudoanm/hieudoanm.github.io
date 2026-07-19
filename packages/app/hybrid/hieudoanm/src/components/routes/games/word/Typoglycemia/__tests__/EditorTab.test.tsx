import { render, fireEvent, screen, act } from '@testing-library/react';
import { EditorTab } from '../EditorTab';

const mockOnChange = jest.fn();

describe('EditorTab', () => {
  beforeEach(() => {
    mockOnChange.mockClear();
    Object.assign(navigator, {
      clipboard: {
        writeText: jest.fn().mockResolvedValue(undefined),
        readText: jest.fn().mockResolvedValue('pasted text'),
      },
    });
  });

  it('renders textarea with value', () => {
    render(<EditorTab value="hello world" onChange={mockOnChange} />);
    expect(screen.getByDisplayValue('hello world')).toBeInTheDocument();
  });

  it('shows word count', () => {
    render(<EditorTab value="hello world" onChange={mockOnChange} />);
    expect(screen.getByText('2 words')).toBeInTheDocument();
  });

  it('shows zero words for empty input', () => {
    render(<EditorTab value="" onChange={mockOnChange} />);
    expect(screen.getByText('0 words')).toBeInTheDocument();
  });

  it('calls navigator.clipboard.writeText on copy', async () => {
    render(<EditorTab value="hello world" onChange={mockOnChange} />);
    const copyBtn = screen.getByText('Copy');
    await act(async () => {
      fireEvent.click(copyBtn);
    });
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('hello world');
  });

  it('calls navigator.clipboard.readText on paste', async () => {
    render(<EditorTab value="hello" onChange={mockOnChange} />);
    const pasteBtn = screen.getByText('Paste');
    await act(async () => {
      fireEvent.click(pasteBtn);
    });
    expect(mockOnChange).toHaveBeenCalled();
  });

  it('calls onChange when textarea value changes', () => {
    render(<EditorTab value="hello" onChange={mockOnChange} />);
    const ta = screen.getByRole('textbox');
    fireEvent.change(ta, { target: { value: 'world' } });
    expect(mockOnChange).toHaveBeenCalled();
  });

  it('shows selected word count when text is selected', () => {
    render(<EditorTab value="hello world foo bar" onChange={mockOnChange} />);
    const ta = screen.getByRole('textbox') as HTMLTextAreaElement;
    Object.defineProperty(ta, 'selectionStart', { value: 0 });
    Object.defineProperty(ta, 'selectionEnd', { value: 11 });
    fireEvent.select(ta);
    expect(screen.getByText(/2 selected/)).toBeInTheDocument();
  });

  it('falls back to execCommand when clipboard copy fails', async () => {
    const writeText = jest.fn().mockRejectedValue(new Error('fail'));
    Object.assign(navigator, { clipboard: { writeText } });
    const execCommand = jest.fn();
    document.execCommand = execCommand;
    render(<EditorTab value="hello world" onChange={mockOnChange} />);
    await act(async () => {
      fireEvent.click(screen.getByText('Copy'));
    });
    expect(execCommand).toHaveBeenCalledWith('copy');
  });

  it('logs error when clipboard paste fails', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
    Object.assign(navigator, {
      clipboard: {
        readText: jest.fn().mockRejectedValue(new Error('fail')),
      },
    });
    render(<EditorTab value="hello" onChange={mockOnChange} />);
    await act(async () => {
      fireEvent.click(screen.getByText('Paste'));
    });
    expect(consoleSpy).toHaveBeenCalled();
    consoleSpy.mockRestore();
  });
});
