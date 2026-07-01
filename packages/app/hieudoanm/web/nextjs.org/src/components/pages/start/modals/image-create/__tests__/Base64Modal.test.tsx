import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { Base64Modal } from '../Base64Modal';

let clipboardWriteText = jest.fn();
Object.assign(navigator, {
  clipboard: { writeText: clipboardWriteText },
});

URL.createObjectURL = jest.fn();

const mockFileReader = (result: string) => {
  const reader = {
    readAsDataURL: jest.fn(),
    onerror: null as any,
    onload: null as any,
    result,
  };
  jest.spyOn(window, 'FileReader').mockImplementation(() => reader as any);
  return reader;
};

describe('Base64Modal', () => {
  const onClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
    clipboardWriteText = jest.fn();
    Object.assign(navigator, { clipboard: { writeText: clipboardWriteText } });
  });

  it('renders modal title', () => {
    render(<Base64Modal onClose={onClose} />);
    expect(screen.getByText('Base64')).toBeInTheDocument();
  });

  it('renders decode tab by default', () => {
    render(<Base64Modal onClose={onClose} />);
    expect(screen.getAllByText('Decode').length).toBeGreaterThanOrEqual(1);
  });

  it('switches to encode tab', () => {
    render(<Base64Modal onClose={onClose} />);
    fireEvent.click(screen.getByText('Encode'));
    expect(
      screen.getByText('Drop a file here or click to browse')
    ).toBeInTheDocument();
  });

  it('switches back to decode tab', () => {
    render(<Base64Modal onClose={onClose} />);
    fireEvent.click(screen.getByText('Encode'));
    fireEvent.click(screen.getByText('Decode'));
    expect(screen.getByPlaceholderText(/Paste Base64/)).toBeInTheDocument();
  });

  it('decodes base64 input on decode click', () => {
    render(<Base64Modal onClose={onClose} />);
    const textarea = screen.getByPlaceholderText(/Paste Base64/);
    fireEvent.change(textarea, { target: { value: 'SGVsbG8=' } });
    fireEvent.click(screen.getAllByText('Decode')[1]);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });

  it('encodes text on encode tab', () => {
    render(<Base64Modal onClose={onClose} />);
    fireEvent.click(screen.getByText('Encode'));
    const textarea = screen.getByPlaceholderText(/Type text to encode/);
    fireEvent.change(textarea, { target: { value: 'Hello' } });
    fireEvent.click(screen.getAllByText('Encode')[1]);
    expect(screen.getByText('SGVsbG8=')).toBeInTheDocument();
  });

  it('shows error for invalid base64', () => {
    render(<Base64Modal onClose={onClose} />);
    const textarea = screen.getByPlaceholderText(/Paste Base64/);
    fireEvent.change(textarea, { target: { value: '!!!' } });
    fireEvent.click(screen.getAllByText('Decode')[1]);
    expect(screen.getByText('Invalid Base64 input')).toBeInTheDocument();
  });

  it('disable decode button when input empty', () => {
    render(<Base64Modal onClose={onClose} />);
    expect(screen.getAllByText('Decode')[1].closest('button')).toBeDisabled();
  });

  it('enabled decode button when input has text', () => {
    render(<Base64Modal onClose={onClose} />);
    const textarea = screen.getByPlaceholderText(/Paste Base64/);
    fireEvent.change(textarea, { target: { value: 'SGVsbG8=' } });
    expect(
      screen.getAllByText('Decode')[1].closest('button')
    ).not.toBeDisabled();
  });

  it('calls clipboard copy when copy button clicked', () => {
    render(<Base64Modal onClose={onClose} />);
    const textarea = screen.getByPlaceholderText(/Paste Base64/);
    fireEvent.change(textarea, { target: { value: 'SGVsbG8=' } });
    fireEvent.click(screen.getAllByText('Decode')[1]);
    fireEvent.click(screen.getByText('Copy'));
    expect(clipboardWriteText).toHaveBeenCalledWith('Hello');
  });

  it('encode tab shows upload area', () => {
    render(<Base64Modal onClose={onClose} />);
    fireEvent.click(screen.getByText('Encode'));
    expect(
      screen.getByText('Drop a file here or click to browse')
    ).toBeInTheDocument();
  });

  it('uploads file via file input change', async () => {
    render(<Base64Modal onClose={onClose} />);
    fireEvent.click(screen.getByText('Encode'));
    const fr = mockFileReader('data:text/plain;base64,SGVsbG8=');
    const fileInput = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;
    const file = new File(['Hello'], 'hello.txt', { type: 'text/plain' });
    Object.defineProperty(fileInput, 'files', { value: [file] });
    fireEvent.change(fileInput);
    fr.onload();
    await waitFor(() => {
      expect(screen.getByText(/hello\.txt/)).toBeInTheDocument();
    });
  });

  it('uploads file via drag and drop', async () => {
    render(<Base64Modal onClose={onClose} />);
    fireEvent.click(screen.getByText('Encode'));
    const fr = mockFileReader('data:text/plain;base64,SGVsbG8=');
    const file = new File(['Hello'], 'hello.txt', { type: 'text/plain' });
    const dropZone = screen
      .getByText('Drop a file here or click to browse')
      .closest('div')!;
    fireEvent.dragOver(dropZone);
    fireEvent.dragLeave(dropZone);
    fireEvent.drop(dropZone, { dataTransfer: { files: [file] } });
    fr.onload();
    await waitFor(() => {
      expect(screen.getByText(/hello\.txt/)).toBeInTheDocument();
    });
  });

  it('handles Cmd+Enter keydown to decode', () => {
    render(<Base64Modal onClose={onClose} />);
    const textarea = screen.getByPlaceholderText(/Paste Base64/);
    fireEvent.change(textarea, { target: { value: 'SGVsbG8=' } });
    fireEvent.keyDown(textarea, { key: 'Enter', metaKey: true });
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });

  it('handles Cmd+Enter keydown to encode', () => {
    render(<Base64Modal onClose={onClose} />);
    fireEvent.click(screen.getByText('Encode'));
    const textarea = screen.getByPlaceholderText(/Type text to encode/);
    fireEvent.change(textarea, { target: { value: 'Hello' } });
    fireEvent.keyDown(textarea, { key: 'Enter', metaKey: true });
    expect(screen.getByText('SGVsbG8=')).toBeInTheDocument();
  });

  it('shows error for encode with non-Latin1 characters', () => {
    render(<Base64Modal onClose={onClose} />);
    fireEvent.click(screen.getByText('Encode'));
    const textarea = screen.getByPlaceholderText(/Type text to encode/);
    fireEvent.change(textarea, { target: { value: '✓' } });
    fireEvent.click(screen.getAllByText('Encode')[1]);
    expect(
      screen.getByText('Invalid input — check for non-Latin1 characters')
    ).toBeInTheDocument();
  });

  it('clears state when switching tabs', () => {
    render(<Base64Modal onClose={onClose} />);
    const textarea = screen.getByPlaceholderText(/Paste Base64/);
    fireEvent.change(textarea, { target: { value: 'SGVsbG8=' } });
    fireEvent.click(screen.getAllByText('Decode')[1]);
    expect(screen.getByText('Hello')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Encode'));
    expect(screen.getByPlaceholderText(/Type text to encode/)).toHaveValue('');
  });
});
