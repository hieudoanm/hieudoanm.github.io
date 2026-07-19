import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ClockApp } from '../ClockApp';

describe('ClockApp', () => {
  const defaultProps = {
    activeApp: 'watchface' as const,
    onNavigate: jest.fn(),
    children: <div>child content</div>,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders children', () => {
    render(<ClockApp {...defaultProps} />);
    expect(screen.getByText('child content')).toBeInTheDocument();
  });

  it('renders all app buttons in footer', () => {
    render(<ClockApp {...defaultProps} />);
    expect(screen.getByText('Watchface')).toBeInTheDocument();
    expect(screen.getByText('World Clock')).toBeInTheDocument();
    expect(screen.getByText('Timer')).toBeInTheDocument();
    expect(screen.getByText('Stopwatch')).toBeInTheDocument();
    expect(screen.getByText('Pomodoro')).toBeInTheDocument();
  });

  it('calls onNavigate when an app button is clicked', async () => {
    const user = userEvent.setup();
    const onNavigate = jest.fn();
    render(<ClockApp {...defaultProps} onNavigate={onNavigate} />);
    await user.click(screen.getByText('Timer'));
    expect(onNavigate).toHaveBeenCalledWith('timer');
  });

  it('calls onNavigate for Pomodoro', async () => {
    const user = userEvent.setup();
    const onNavigate = jest.fn();
    render(<ClockApp {...defaultProps} onNavigate={onNavigate} />);
    await user.click(screen.getByText('Pomodoro'));
    expect(onNavigate).toHaveBeenCalledWith('pomodoro');
  });

  it('highlights the active app button', () => {
    render(<ClockApp {...defaultProps} activeApp="timer" />);
    const timerBtn = screen.getByText('Timer').closest('button');
    expect(timerBtn?.className).toContain('text-primary');
  });

  it('does not highlight inactive app buttons', () => {
    render(<ClockApp {...defaultProps} activeApp="timer" />);
    const watchfaceBtn = screen.getByText('Watchface').closest('button');
    expect(watchfaceBtn?.className).toContain('text-base-content/40');
  });
});
