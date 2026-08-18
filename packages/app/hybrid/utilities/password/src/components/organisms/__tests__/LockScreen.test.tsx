import { render, screen, fireEvent } from '@testing-library/react';
import { LockScreen } from '@/components/organisms/LockScreen';

describe('LockScreen', () => {
  it('renders the unlock form', () => {
    render(<LockScreen onUnlock={jest.fn()} />);
    expect(
      screen.getByRole('heading', { name: 'Vault Locked' })
    ).toBeInTheDocument();
    expect(screen.getByLabelText('Master password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Unlock' })).toBeDisabled();
  });

  it('calls onUnlock with the entered password', async () => {
    const onUnlock = jest.fn().mockResolvedValue(true);
    render(<LockScreen onUnlock={onUnlock} />);
    fireEvent.change(screen.getByLabelText('Master password'), {
      target: { value: 'secret' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Unlock' }));
    await screen.findByText('Vault Locked');
    expect(onUnlock).toHaveBeenCalledWith('secret');
  });

  it('submits via Enter key', async () => {
    const onUnlock = jest.fn().mockResolvedValue(true);
    render(<LockScreen onUnlock={onUnlock} />);
    const input = screen.getByLabelText('Master password');
    fireEvent.change(input, { target: { value: 'secret' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    await screen.findByText('Vault Locked');
    expect(onUnlock).toHaveBeenCalledWith('secret');
  });

  it('renders the error message', () => {
    render(<LockScreen onUnlock={jest.fn()} error="Incorrect password" />);
    expect(screen.getByText('Incorrect password')).toBeInTheDocument();
  });

  it('hides the biometric button unless enabled', () => {
    const onBiometric = jest.fn().mockResolvedValue(true);
    const { rerender } = render(
      <LockScreen onUnlock={jest.fn()} onBiometric={onBiometric} />
    );
    expect(
      screen.queryByRole('button', { name: /Unlock with biometrics/ })
    ).not.toBeInTheDocument();
    rerender(
      <LockScreen
        onUnlock={jest.fn()}
        onBiometric={onBiometric}
        biometricEnabled
      />
    );
    fireEvent.click(
      screen.getByRole('button', { name: /Unlock with biometrics/ })
    );
    expect(onBiometric).toHaveBeenCalled();
  });
});
