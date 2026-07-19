import { fireEvent, render, screen } from '@testing-library/react';
import { AccountRecovery } from '../AccountRecovery';

describe('AccountRecovery', () => {
  it('submits with the email method', () => {
    const onSubmit = jest.fn();
    render(<AccountRecovery onSubmit={onSubmit} />);
    fireEvent.change(screen.getByRole('textbox', { name: 'Email address' }), {
      target: { value: 'ada@example.com' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Send recovery link' }));
    expect(onSubmit).toHaveBeenCalledWith({
      method: 'email',
      identifier: 'ada@example.com',
    });
  });

  it('switches to the phone method', () => {
    const onSubmit = jest.fn();
    render(<AccountRecovery onSubmit={onSubmit} />);
    fireEvent.click(screen.getByTestId('method-phone'));
    expect(
      screen.getByRole('textbox', { name: 'Phone number' })
    ).toBeInTheDocument();
    fireEvent.change(screen.getByRole('textbox', { name: 'Phone number' }), {
      target: { value: '+1 555 000 1234' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Send recovery link' }));
    expect(onSubmit).toHaveBeenCalledWith({
      method: 'phone',
      identifier: '+1 555 000 1234',
    });
  });

  it('does not submit an empty identifier', () => {
    const onSubmit = jest.fn();
    render(<AccountRecovery onSubmit={onSubmit} />);
    fireEvent.click(screen.getByRole('button', { name: 'Send recovery link' }));
    expect(onSubmit).not.toHaveBeenCalled();
  });
});
