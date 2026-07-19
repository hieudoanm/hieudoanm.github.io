import { fireEvent, render, screen } from '@testing-library/react';
import { PasswordResetForm } from '../PasswordResetForm';

describe('PasswordResetForm', () => {
  it('renders the reset form', () => {
    render(<PasswordResetForm onSubmit={jest.fn()} />);
    expect(screen.getByTestId('reset-form')).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: 'Email' })).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Send reset link' })
    ).toBeInTheDocument();
  });

  it('submits the email address', () => {
    const onSubmit = jest.fn();
    render(<PasswordResetForm onSubmit={onSubmit} />);
    fireEvent.change(screen.getByRole('textbox', { name: 'Email' }), {
      target: { value: 'ada@example.com' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Send reset link' }));
    expect(onSubmit).toHaveBeenCalledWith('ada@example.com');
  });

  it('shows the success state after submitting', () => {
    const onSubmit = jest.fn();
    render(<PasswordResetForm onSubmit={onSubmit} />);
    fireEvent.change(screen.getByRole('textbox', { name: 'Email' }), {
      target: { value: 'ada@example.com' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Send reset link' }));
    expect(screen.getByTestId('reset-success')).toBeInTheDocument();
    expect(screen.getByText('Request sent')).toBeInTheDocument();
  });
});
