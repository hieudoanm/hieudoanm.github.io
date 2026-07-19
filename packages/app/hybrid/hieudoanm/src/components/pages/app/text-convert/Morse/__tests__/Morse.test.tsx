import { fireEvent, render, screen } from '@testing-library/react';
import { Morse } from '../index';

Object.assign(navigator, {
  clipboard: { writeText: jest.fn().mockResolvedValue(undefined) },
});

const mockOsc = {
  connect: jest.fn(),
  start: jest.fn(),
  stop: jest.fn(),
  frequency: { value: 0 },
};
const mockGain = {
  connect: jest.fn(),
  gain: { setValueAtTime: jest.fn() },
};
const mockCtx = {
  currentTime: 0,
  destination: {},
  createOscillator: jest.fn(() => mockOsc),
  createGain: jest.fn(() => mockGain),
};
(globalThis as any).AudioContext = jest.fn(() => mockCtx);

(URL as any).createObjectURL = jest.fn(() => 'blob:test');
(URL as any).revokeObjectURL = jest.fn();

describe('Morse', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders with title and input', () => {
    render(<Morse onClose={jest.fn()} />);
    expect(screen.getByText('Morse Code')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/Type or paste text/)
    ).toBeInTheDocument();
  });

  it('shows Morse output when typing', () => {
    render(<Morse onClose={jest.fn()} />);
    const textarea = screen.getByPlaceholderText(
      /Type or paste text/
    ) as HTMLTextAreaElement;
    fireEvent.change(textarea, { target: { value: 'SOS' } });
    expect(screen.getByText('... --- ...')).toBeInTheDocument();
  });

  it('loads a sample when sample button clicked', () => {
    render(<Morse onClose={jest.fn()} />);
    const sampleBtn = screen.getByText('SOS');
    fireEvent.click(sampleBtn);
    expect(
      (screen.getByPlaceholderText(/Type or paste text/) as HTMLTextAreaElement)
        .value
    ).toBe('SOS');
  });

  it('clears input when Clear button clicked', () => {
    render(<Morse onClose={jest.fn()} />);
    const textarea = screen.getByPlaceholderText(
      /Type or paste text/
    ) as HTMLTextAreaElement;
    fireEvent.change(textarea, { target: { value: 'test' } });
    const clearBtn = screen.getByText('Clear');
    fireEvent.click(clearBtn);
    expect(textarea.value).toBe('');
  });

  it('shows char count and symbol count', () => {
    render(<Morse onClose={jest.fn()} />);
    const textarea = screen.getByPlaceholderText(
      /Type or paste text/
    ) as HTMLTextAreaElement;
    fireEvent.change(textarea, { target: { value: 'hi' } });
    expect(screen.getByText('2 chars')).toBeInTheDocument();
    expect(screen.getByText('6 symbols')).toBeInTheDocument();
  });

  it('shows placeholder when no output', () => {
    render(<Morse onClose={jest.fn()} />);
    expect(
      screen.getByText(/Morse output will appear here/)
    ).toBeInTheDocument();
  });

  it('copy button copies output', async () => {
    render(<Morse onClose={jest.fn()} />);
    const textarea = screen.getByPlaceholderText(
      /Type or paste text/
    ) as HTMLTextAreaElement;
    fireEvent.change(textarea, { target: { value: 'SOS' } });
    const copyBtn = screen.getByText('Copy');
    fireEvent.click(copyBtn);
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('... --- ...');
  });

  it('play button triggers playback', () => {
    render(<Morse onClose={jest.fn()} />);
    const textarea = screen.getByPlaceholderText(
      /Type or paste text/
    ) as HTMLTextAreaElement;
    fireEvent.change(textarea, { target: { value: 'SOS' } });
    const playBtn = screen.getByText('▶ Play');
    fireEvent.click(playBtn);
    expect(screen.getByText(/Playing/)).toBeInTheDocument();
  });

  it('shows character map when chars are present', () => {
    render(<Morse onClose={jest.fn()} />);
    const textarea = screen.getByPlaceholderText(
      /Type or paste text/
    ) as HTMLTextAreaElement;
    fireEvent.change(textarea, { target: { value: 'hi' } });
    const mapBtn = screen.getByText(/Char map/);
    fireEvent.click(mapBtn);
    expect(screen.getByText(/Char/)).toBeInTheDocument();
    expect(screen.getAllByText(/Code/).length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText(/Pattern/)).toBeInTheDocument();
  });

  it('hides character map on toggle', () => {
    render(<Morse onClose={jest.fn()} />);
    const textarea = screen.getByPlaceholderText(
      /Type or paste text/
    ) as HTMLTextAreaElement;
    fireEvent.change(textarea, { target: { value: 'hi' } });
    const mapBtn = screen.getByText(/Char map/);
    fireEvent.click(mapBtn);
    fireEvent.click(mapBtn);
    expect(screen.queryByText('Code')).not.toBeInTheDocument();
  });

  it('shows space char correctly in map', () => {
    render(<Morse onClose={jest.fn()} />);
    const textarea = screen.getByPlaceholderText(
      /Type or paste text/
    ) as HTMLTextAreaElement;
    fireEvent.change(textarea, { target: { value: 'a b' } });
    const mapBtn = screen.getByText(/Char map/);
    fireEvent.click(mapBtn);
    expect(screen.getByText('␣')).toBeInTheDocument();
  });

  it('copy button calls clipboard and shows Copied', async () => {
    render(<Morse onClose={jest.fn()} />);
    const textarea = screen.getByPlaceholderText(
      /Type or paste text/
    ) as HTMLTextAreaElement;
    fireEvent.change(textarea, { target: { value: 'SOS' } });
    const copyBtn = screen.getByText('Copy');
    fireEvent.click(copyBtn);
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('... --- ...');
  });

  it('download button is enabled when input is present', () => {
    render(<Morse onClose={jest.fn()} />);
    const textarea = screen.getByPlaceholderText(
      /Type or paste text/
    ) as HTMLTextAreaElement;
    fireEvent.change(textarea, { target: { value: 'SOS' } });
    const downloadBtn = screen.getByText(/↓ \.morse/);
    expect(downloadBtn).not.toBeDisabled();
  });

  it('download button does nothing when input is empty', () => {
    render(<Morse onClose={jest.fn()} />);
    const downloadBtn = screen.getByText(/↓ \.morse/);
    expect(downloadBtn).toBeDisabled();
  });

  it('play button does nothing when input is empty', () => {
    render(<Morse onClose={jest.fn()} />);
    const playBtn = screen.getByText('▶ Play');
    expect(playBtn).toBeDisabled();
  });

  it('download button creates a download link', () => {
    render(<Morse onClose={jest.fn()} />);
    const textarea = screen.getByPlaceholderText(
      /Type or paste text/
    ) as HTMLTextAreaElement;
    fireEvent.change(textarea, { target: { value: 'SOS' } });
    const downloadBtn = screen.getByText(/↓ \.morse/);
    fireEvent.click(downloadBtn);
    expect(URL.createObjectURL).toHaveBeenCalled();
  });

  it('calls onClose when close button clicked', () => {
    const onClose = jest.fn();
    render(<Morse onClose={onClose} />);
    const closeBtns = screen.getAllByText('✕');
    fireEvent.click(closeBtns[0]);
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
