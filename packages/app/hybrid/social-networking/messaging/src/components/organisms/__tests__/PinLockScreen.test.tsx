import { render, screen, fireEvent, act } from '@testing-library/react';
import { PinLockScreen } from '@/components/organisms/PinLockScreen';

beforeEach(() => {
  jest.clearAllMocks();
});

describe('PinLockScreen', () => {
  it('shows PIN input', () => {
    render(<PinLockScreen onUnlock={jest.fn()} />);
    expect(screen.getByPlaceholderText('••••')).toBeInTheDocument();
  });

  it('calls onUnlock with entered PIN', async () => {
    const onUnlock = jest.fn().mockResolvedValue(true);
    render(<PinLockScreen onUnlock={onUnlock} />);
    fireEvent.change(screen.getByPlaceholderText('••••'), {
      target: { value: '1234' },
    });
    fireEvent.click(screen.getByText('Unlock'));
    await act(async () => {});
    expect(onUnlock).toHaveBeenCalledWith('1234');
  });

  it('shows "Incorrect PIN" on failure', async () => {
    const onUnlock = jest.fn().mockResolvedValue(false);
    render(<PinLockScreen onUnlock={onUnlock} />);
    fireEvent.change(screen.getByPlaceholderText('••••'), {
      target: { value: '0000' },
    });
    await act(async () => {
      fireEvent.click(screen.getByText('Unlock'));
    });
    expect(await screen.findByText('Incorrect PIN')).toBeInTheDocument();
  });

  it('setup mode shows two-step flow', () => {
    const onSetup = jest.fn();
    render(<PinLockScreen onUnlock={jest.fn()} onSetup={onSetup} isSetup />);
    expect(screen.getByText('Set Up PIN')).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();
  });

  it('setup validates PIN match in confirm step', async () => {
    const onSetup = jest.fn();
    render(<PinLockScreen onUnlock={jest.fn()} onSetup={onSetup} isSetup />);
    fireEvent.change(screen.getByPlaceholderText('••••'), {
      target: { value: '1234' },
    });
    fireEvent.click(screen.getByText('Next'));
    expect(screen.getByText('Unlock')).toBeInTheDocument();
    fireEvent.change(screen.getByPlaceholderText('••••'), {
      target: { value: '9999' },
    });
    await act(async () => {
      fireEvent.click(screen.getByText('Unlock'));
    });
    expect(await screen.findByText('PINs do not match')).toBeInTheDocument();
    expect(onSetup).not.toHaveBeenCalled();
  });

  it('button disabled when PIN is too short', async () => {
    render(<PinLockScreen onUnlock={jest.fn()} />);
    const btn = screen.getByText('Unlock');
    expect(btn).toBeDisabled();
    fireEvent.change(screen.getByPlaceholderText('••••'), {
      target: { value: '12' },
    });
    expect(btn).toBeDisabled();
    fireEvent.change(screen.getByPlaceholderText('••••'), {
      target: { value: '1234' },
    });
    expect(btn).not.toBeDisabled();
  });

  it('Enter key triggers submit', async () => {
    const onUnlock = jest.fn().mockResolvedValue(true);
    render(<PinLockScreen onUnlock={onUnlock} />);
    const input = screen.getByPlaceholderText('••••');
    fireEvent.change(input, { target: { value: '5678' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    await act(async () => {});
    expect(onUnlock).toHaveBeenCalledWith('5678');
  });
});
