import { act, fireEvent, render, screen } from '@testing-library/react';
import { SessionTimeout } from '../SessionTimeout';

afterEach(() => {
  jest.useRealTimers();
});

describe('SessionTimeout', () => {
  it('renders the remaining time', () => {
    render(
      <SessionTimeout
        timeoutSeconds={300}
        onSignOut={jest.fn()}
        onExtend={jest.fn()}
      />
    );
    expect(screen.getByText('Session active')).toBeInTheDocument();
    expect(screen.getByText('5:00')).toBeInTheDocument();
  });

  it('shows a warning below the threshold', () => {
    render(
      <SessionTimeout
        timeoutSeconds={30}
        warningThresholdSeconds={60}
        onSignOut={jest.fn()}
        onExtend={jest.fn()}
      />
    );
    expect(screen.getByText('Session expiring')).toBeInTheDocument();
  });

  it('extends the session and fires onExtend', () => {
    jest.useFakeTimers();
    const onExtend = jest.fn();
    render(
      <SessionTimeout
        timeoutSeconds={5}
        warningThresholdSeconds={10}
        onSignOut={jest.fn()}
        onExtend={onExtend}
      />
    );
    act(() => {
      jest.advanceTimersByTime(2000);
    });
    expect(screen.getByText('0:03')).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('session-extend'));
    expect(onExtend).toHaveBeenCalled();
    expect(screen.getByText('0:05')).toBeInTheDocument();
  });

  it('signs out when the timer reaches zero', () => {
    jest.useFakeTimers();
    const onSignOut = jest.fn();
    render(
      <SessionTimeout
        timeoutSeconds={2}
        onSignOut={onSignOut}
        onExtend={jest.fn()}
      />
    );
    act(() => {
      jest.advanceTimersByTime(2000);
    });
    expect(onSignOut).toHaveBeenCalledTimes(1);
  });
});
