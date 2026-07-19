import { fireEvent, render, screen } from '@testing-library/react';
import { SignInForm } from '../SignInForm';

describe('SignInForm', () => {
  it('renders email and password fields', () => {
    render(<SignInForm onSubmit={jest.fn()} />);
    expect(screen.getByRole('textbox', { name: 'Email' })).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Sign in' })).toBeInTheDocument();
  });

  it('submits the email and password payload', () => {
    const onSubmit = jest.fn();
    render(<SignInForm onSubmit={onSubmit} />);
    fireEvent.change(screen.getByRole('textbox', { name: 'Email' }), {
      target: { value: 'ada@example.com' },
    });
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'secret1' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Sign in' }));
    expect(onSubmit).toHaveBeenCalledWith({
      email: 'ada@example.com',
      password: 'secret1',
    });
  });

  it('shows an external error', () => {
    render(<SignInForm onSubmit={jest.fn()} error="Invalid credentials" />);
    expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
  });

  it('disables the submit button while loading', () => {
    render(<SignInForm onSubmit={jest.fn()} loading />);
    expect(screen.getByTestId('signin-submit')).toBeDisabled();
  });
});
