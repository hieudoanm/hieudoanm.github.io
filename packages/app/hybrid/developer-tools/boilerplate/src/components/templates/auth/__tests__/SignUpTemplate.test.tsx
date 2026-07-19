import { fireEvent, render, screen } from '@testing-library/react';
import { SignUpTemplate } from '../SignUpTemplate';

describe('SignUpTemplate', () => {
  const fillForm = () => {
    fireEvent.change(screen.getByPlaceholderText('John Doe'), {
      target: { value: 'Jane Doe' },
    });
    fireEvent.change(screen.getByPlaceholderText('you@example.com'), {
      target: { value: 'jane@test.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('At least 8 characters'), {
      target: { value: 'password123' },
    });
    fireEvent.change(screen.getByPlaceholderText('Repeat your password'), {
      target: { value: 'password123' },
    });
    fireEvent.submit(document.querySelector('form')!);
  };

  it('submits valid data', () => {
    const onSubmit = jest.fn();
    render(<SignUpTemplate onSubmit={onSubmit} />);
    fillForm();
    expect(onSubmit).toHaveBeenCalledWith({
      name: 'Jane Doe',
      email: 'jane@test.com',
      password: 'password123',
    });
  });

  it('rejects mismatched passwords', () => {
    const onSubmit = jest.fn();
    render(<SignUpTemplate onSubmit={onSubmit} />);
    fireEvent.change(screen.getByPlaceholderText('At least 8 characters'), {
      target: { value: 'password123' },
    });
    fireEvent.change(screen.getByPlaceholderText('Repeat your password'), {
      target: { value: 'different' },
    });
    fireEvent.submit(document.querySelector('form')!);
    expect(screen.getByText('Passwords do not match')).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('rejects short passwords', () => {
    const onSubmit = jest.fn();
    render(<SignUpTemplate onSubmit={onSubmit} />);
    fireEvent.change(screen.getByPlaceholderText('At least 8 characters'), {
      target: { value: 'short' },
    });
    fireEvent.change(screen.getByPlaceholderText('Repeat your password'), {
      target: { value: 'short' },
    });
    fireEvent.submit(document.querySelector('form')!);
    expect(
      screen.getByText('Password must be at least 8 characters')
    ).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('displays prop error and shows loading state', () => {
    render(<SignUpTemplate onSubmit={jest.fn()} error="Email taken" loading />);
    expect(screen.getByText('Email taken')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Creating account...' })
    ).toBeDisabled();
  });

  it('toggles password visibility', () => {
    render(<SignUpTemplate onSubmit={jest.fn()} />);
    const input = screen.getByPlaceholderText('At least 8 characters');
    expect(input).toHaveAttribute('type', 'password');
    fireEvent.click(screen.getByRole('button', { name: '' }));
    expect(input).toHaveAttribute('type', 'text');
  });

  it('links to sign-in', () => {
    render(<SignUpTemplate onSubmit={jest.fn()} />);
    expect(screen.getByRole('link', { name: 'Sign in' })).toHaveAttribute(
      'href',
      '/auth/sign-in'
    );
  });
});
