import { fireEvent, render, screen } from '@testing-library/react';
import { SignUpForm } from '../SignUpForm';

describe('SignUpForm', () => {
  it('submits the signup payload', () => {
    const onSubmit = jest.fn();
    render(<SignUpForm onSubmit={onSubmit} />);
    fireEvent.change(screen.getByRole('textbox', { name: 'Full name' }), {
      target: { value: 'Ada Lovelace' },
    });
    fireEvent.change(screen.getByRole('textbox', { name: 'Email' }), {
      target: { value: 'ada@example.com' },
    });
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'secret123' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Create account' }));
    expect(onSubmit).toHaveBeenCalledWith({
      name: 'Ada Lovelace',
      email: 'ada@example.com',
      password: 'secret123',
    });
  });

  it('rejects a short password', () => {
    const onSubmit = jest.fn();
    render(<SignUpForm onSubmit={onSubmit} />);
    fireEvent.change(screen.getByRole('textbox', { name: 'Full name' }), {
      target: { value: 'Ada' },
    });
    fireEvent.change(screen.getByRole('textbox', { name: 'Email' }), {
      target: { value: 'ada@example.com' },
    });
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: '123' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Create account' }));
    expect(screen.getByText(/at least 8 characters/)).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('shows an external error', () => {
    render(<SignUpForm onSubmit={jest.fn()} error="Email already exists" />);
    expect(screen.getByText('Email already exists')).toBeInTheDocument();
  });
});
