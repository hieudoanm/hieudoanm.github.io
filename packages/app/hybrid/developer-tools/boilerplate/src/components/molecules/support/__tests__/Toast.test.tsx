import { act, fireEvent, render, screen } from '@testing-library/react';
import { Toast } from '../Toast';

describe('Toast', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders message with default info variant', () => {
    render(<Toast message="Saved" />);
    expect(screen.getByText('Saved')).toBeInTheDocument();
    expect(screen.getByText('Saved').parentElement).toHaveClass('alert-info');
  });

  it('applies variant class', () => {
    render(<Toast message="Oops" variant="error" />);
    expect(screen.getByText('Oops').parentElement).toHaveClass('alert-error');
  });

  it('auto-dismisses after duration and calls onClose', () => {
    const onClose = jest.fn();
    render(<Toast message="Saved" duration={500} onClose={onClose} />);
    expect(screen.getByText('Saved')).toBeInTheDocument();
    act(() => {
      jest.advanceTimersByTime(500);
    });
    expect(screen.queryByText('Saved')).not.toBeInTheDocument();
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('dismisses on close button click', () => {
    const onClose = jest.fn();
    render(<Toast message="Saved" onClose={onClose} />);
    fireEvent.click(screen.getByRole('button'));
    expect(screen.queryByText('Saved')).not.toBeInTheDocument();
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
