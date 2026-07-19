import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { IncomingCallModal } from '@/components/organisms/IncomingCallModal';
import type { Call } from '@/types';

jest.mock('@/components/atoms/Avatar', () => ({
  Avatar: ({ name }: { name: string; color: string; size: string }) => (
    <div data-testid="avatar">{name}</div>
  ),
}));

const makeCall = (overrides: Partial<Call> = {}): Call => ({
  id: 'call1',
  chatId: 'c1',
  type: 'voice',
  status: 'ringing',
  participants: [
    {
      userId: 'alice',
      name: 'Alice',
      avatarColor: '#4da3ff',
      audioMuted: false,
      videoOff: false,
      joinedAt: 1000,
    },
    {
      userId: 'me',
      name: 'You',
      avatarColor: '#ff0030',
      audioMuted: false,
      videoOff: false,
      joinedAt: 1000,
    },
  ],
  startedAt: Date.now(),
  isGroup: false,
  ...overrides,
});

describe('IncomingCallModal', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('shows caller name', () => {
    render(
      <IncomingCallModal
        call={makeCall()}
        onAnswer={jest.fn()}
        onDecline={jest.fn()}
      />
    );
    expect(screen.getByRole('heading', { name: 'Alice' })).toBeInTheDocument();
  });

  it('answer button calls onAnswer', () => {
    const onAnswer = jest.fn();
    render(
      <IncomingCallModal
        call={makeCall()}
        onAnswer={onAnswer}
        onDecline={jest.fn()}
      />
    );
    fireEvent.click(screen.getByLabelText('Answer'));
    expect(onAnswer).toHaveBeenCalledWith('call1');
  });

  it('decline button calls onDecline', () => {
    const onDecline = jest.fn();
    render(
      <IncomingCallModal
        call={makeCall()}
        onAnswer={jest.fn()}
        onDecline={onDecline}
      />
    );
    fireEvent.click(screen.getByLabelText('Decline'));
    expect(onDecline).toHaveBeenCalledWith('call1');
  });

  it('auto-declines after 30s timeout', () => {
    const onDecline = jest.fn();
    render(
      <IncomingCallModal
        call={makeCall()}
        onAnswer={jest.fn()}
        onDecline={onDecline}
      />
    );
    act(() => {
      jest.advanceTimersByTime(30000);
    });
    expect(onDecline).toHaveBeenCalledWith('call1');
  });

  it('returns null when no caller found', () => {
    const { container } = render(
      <IncomingCallModal
        call={makeCall({ participants: [] })}
        onAnswer={jest.fn()}
        onDecline={jest.fn()}
      />
    );
    expect(container.innerHTML).toBe('');
  });
});
