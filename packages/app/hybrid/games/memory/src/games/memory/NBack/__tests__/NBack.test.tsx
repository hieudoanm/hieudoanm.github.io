import { fireEvent, render, screen } from '@testing-library/react';
import { NBack } from '..';

jest.useFakeTimers();

const onClose = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
});

afterEach(() => {
  jest.useRealTimers();
});

describe('NBack', () => {
  it('renders N-back label', () => {
    render(<NBack onClose={onClose} />);
    expect(screen.getByText('N-back')).toBeInTheDocument();
  });

  it('renders default n value buttons', () => {
    render(<NBack onClose={onClose} />);
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('renders Start button in ready phase', () => {
    render(<NBack onClose={onClose} />);
    expect(screen.getByText('Start')).toBeInTheDocument();
  });

  it('renders instructions in ready phase', () => {
    render(<NBack onClose={onClose} />);
    expect(screen.getByText(/Watch the grid/)).toBeInTheDocument();
  });

  it('renders key hint', () => {
    render(<NBack onClose={onClose} />);
    expect(
      screen.getByText('A match · L no match · Esc close')
    ).toBeInTheDocument();
  });

  it('calls onClose on Escape key', () => {
    render(<NBack onClose={onClose} />);
    const container = screen.getByText('N-back').closest('div[tabindex]');
    fireEvent.keyDown(container!, { key: 'Escape' });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('starts game when Start clicked', () => {
    render(<NBack onClose={onClose} />);
    fireEvent.click(screen.getByText('Start'));
    expect(screen.queryByText('Start')).not.toBeInTheDocument();
    expect(screen.getByText('Match (A)')).toBeInTheDocument();
    expect(screen.getByText('No Match (L)')).toBeInTheDocument();
  });

  it('shows grid during running phase', () => {
    render(<NBack onClose={onClose} />);
    fireEvent.click(screen.getByText('Start'));
    expect(screen.getByText('1/20')).toBeInTheDocument();
  });

  it('responds to match button click', () => {
    render(<NBack onClose={onClose} />);
    fireEvent.click(screen.getByText('Start'));
    fireEvent.click(screen.getByText('Match (A)'));
    expect(screen.getByText('2/20')).toBeInTheDocument();
  });

  it('responds to no-match button click', () => {
    render(<NBack onClose={onClose} />);
    fireEvent.click(screen.getByText('Start'));
    fireEvent.click(screen.getByText('No Match (L)'));
    expect(screen.getByText('2/20')).toBeInTheDocument();
  });

  it('responds to A key for match', () => {
    render(<NBack onClose={onClose} />);
    fireEvent.click(screen.getByText('Start'));
    const container = screen.getByText('N-back').closest('div[tabindex]');
    fireEvent.keyDown(container!, { key: 'a' });
    expect(screen.getByText('2/20')).toBeInTheDocument();
  });

  it('responds to L key for no-match', () => {
    render(<NBack onClose={onClose} />);
    fireEvent.click(screen.getByText('Start'));
    const container = screen.getByText('N-back').closest('div[tabindex]');
    fireEvent.keyDown(container!, { key: 'l' });
    expect(screen.getByText('2/20')).toBeInTheDocument();
  });

  it('can change n value before starting', () => {
    render(<NBack onClose={onClose} />);
    fireEvent.click(screen.getByText('3'));
    expect(screen.getByText(/3 steps ago/)).toBeInTheDocument();
  });

  it('shows result after completing all trials', () => {
    render(<NBack onClose={onClose} />);
    fireEvent.click(screen.getByText('Start'));

    for (let i = 0; i < 20; i++) {
      fireEvent.click(screen.getByText('No Match (L)'));
    }

    expect(screen.getByText(/Great!|Keep practicing/)).toBeInTheDocument();
    expect(screen.getByText('Play Again')).toBeInTheDocument();
  });

  it('shows Play Again button in result phase', () => {
    render(<NBack onClose={onClose} />);
    fireEvent.click(screen.getByText('Start'));
    for (let i = 0; i < 20; i++) {
      fireEvent.click(screen.getByText('No Match (L)'));
    }
    fireEvent.click(screen.getByText('Play Again'));
    expect(screen.getByText('Match (A)')).toBeInTheDocument();
  });

  it('has displayName', () => {
    expect(NBack.displayName).toBe('NBack');
  });
});
