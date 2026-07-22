import { fireEvent, render, screen } from '@testing-library/react';
import { Braille } from '../index';

Object.assign(navigator, {
  clipboard: { writeText: jest.fn().mockResolvedValue(undefined) },
});

describe('Braille', () => {
  it('renders with title and input', () => {
    render(<Braille onClose={jest.fn()} />);
    expect(screen.getByText('Braille')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/Type or paste text/)
    ).toBeInTheDocument();
  });

  it('shows Braille output when typing', () => {
    render(<Braille onClose={jest.fn()} />);
    const textarea = screen.getByPlaceholderText(
      /Type or paste text/
    ) as HTMLTextAreaElement;
    fireEvent.change(textarea, { target: { value: 'a' } });
    expect(screen.getByText('⠁')).toBeInTheDocument();
  });

  it('loads a sample when sample button clicked', () => {
    render(<Braille onClose={jest.fn()} />);
    const sampleBtn = screen.getByText('Hello world');
    fireEvent.click(sampleBtn);
    expect(
      (screen.getByPlaceholderText(/Type or paste text/) as HTMLTextAreaElement)
        .value
    ).toBe('Hello world');
  });

  it('clears input when Clear button clicked', () => {
    render(<Braille onClose={jest.fn()} />);
    const textarea = screen.getByPlaceholderText(
      /Type or paste text/
    ) as HTMLTextAreaElement;
    fireEvent.change(textarea, { target: { value: 'test' } });
    const clearBtn = screen.getByText('Clear');
    fireEvent.click(clearBtn);
    expect(textarea.value).toBe('');
  });

  it('shows char count', () => {
    render(<Braille onClose={jest.fn()} />);
    const textarea = screen.getByPlaceholderText(
      /Type or paste text/
    ) as HTMLTextAreaElement;
    fireEvent.change(textarea, { target: { value: 'test' } });
    expect(screen.getAllByText('4 chars').length).toBeGreaterThanOrEqual(1);
  });

  it('shows placeholder when no output', () => {
    render(<Braille onClose={jest.fn()} />);
    expect(
      screen.getByText(/Braille output will appear here/)
    ).toBeInTheDocument();
  });

  it('copy button copies output', async () => {
    render(<Braille onClose={jest.fn()} />);
    const textarea = screen.getByPlaceholderText(
      /Type or paste text/
    ) as HTMLTextAreaElement;
    fireEvent.change(textarea, { target: { value: 'a' } });
    const copyBtn = screen.getByText('Copy');
    fireEvent.click(copyBtn);
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('⠁');
  });

  it('shows character map when chars are present', () => {
    render(<Braille onClose={jest.fn()} />);
    const textarea = screen.getByPlaceholderText(
      /Type or paste text/
    ) as HTMLTextAreaElement;
    fireEvent.change(textarea, { target: { value: 'ab' } });
    const mapBtn = screen.getByText(/Char map/);
    fireEvent.click(mapBtn);
    expect(screen.getByText(/Char/)).toBeInTheDocument();
    expect(screen.getAllByText(/Unicode/).length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText(/Dots/)).toBeInTheDocument();
  });

  it('hides character map on toggle', () => {
    render(<Braille onClose={jest.fn()} />);
    const textarea = screen.getByPlaceholderText(
      /Type or paste text/
    ) as HTMLTextAreaElement;
    fireEvent.change(textarea, { target: { value: 'ab' } });
    const mapBtn = screen.getByText(/Char map/);
    fireEvent.click(mapBtn);
    fireEvent.click(mapBtn);
    expect(screen.queryByText(/Dots/)).not.toBeInTheDocument();
  });

  it('calls onClose when close button clicked', () => {
    const onClose = jest.fn();
    render(<Braille onClose={onClose} />);
    const closeBtns = screen.getAllByText('✕');
    fireEvent.click(closeBtns[0]);
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
