import { fireEvent, render, screen } from '@testing-library/react';
import { SignUpForm } from '../SignUpForm';

describe('SignUpForm', () => {
  it('to match snapshot', () => {
    const { container } = render(<SignUpForm />);
    expect(container).toMatchSnapshot();
  });

  it('renders heading and description', () => {
    render(<SignUpForm />);
    expect(screen.getByText('DaisyX')).toBeInTheDocument();
    expect(screen.getByText(/Create your free account/)).toBeInTheDocument();
  });

  it('renders all form fields', () => {
    render(<SignUpForm />);
    expect(screen.getByPlaceholderText('Jane')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Doe')).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/jane@forma.io/)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/8 characters/)).toBeInTheDocument();
  });

  it('renders terms checkbox', () => {
    render(<SignUpForm />);
    expect(screen.getByText(/Terms of Service/)).toBeInTheDocument();
    expect(screen.getByText(/Privacy Policy/)).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  it('shows error when submitting empty name', () => {
    render(<SignUpForm />);
    fireEvent.click(screen.getByRole('button', { name: /create account/i }));
    expect(screen.getByText(/please enter your name/i)).toBeInTheDocument();
  });

  it('shows error when submitting empty email', () => {
    render(<SignUpForm />);
    fireEvent.change(screen.getByPlaceholderText('Jane'), {
      target: { value: 'Jane' },
    });
    fireEvent.click(screen.getByRole('button', { name: /create account/i }));
    expect(screen.getByText(/please enter your email/i)).toBeInTheDocument();
  });

  it('shows error when password is too short', () => {
    render(<SignUpForm />);
    fireEvent.change(screen.getByPlaceholderText('Jane'), {
      target: { value: 'Jane' },
    });
    fireEvent.change(screen.getByPlaceholderText(/jane@forma.io/), {
      target: { value: 'jane@test.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/8 characters/), {
      target: { value: 'short' },
    });
    fireEvent.click(screen.getByRole('button', { name: /create account/i }));
    expect(
      screen.getByText(/password must be at least 8 characters/i)
    ).toBeInTheDocument();
  });

  it('shows error when terms not agreed', () => {
    render(<SignUpForm />);
    fireEvent.change(screen.getByPlaceholderText('Jane'), {
      target: { value: 'Jane' },
    });
    fireEvent.change(screen.getByPlaceholderText(/jane@forma.io/), {
      target: { value: 'jane@test.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/8 characters/), {
      target: { value: 'longenoughpassword' },
    });
    fireEvent.click(screen.getByRole('button', { name: /create account/i }));
    expect(screen.getByText(/agree to the terms/i)).toBeInTheDocument();
  });

  it('calls onSuccess after valid submission', async () => {
    const onSuccess = jest.fn();
    render(<SignUpForm onSuccess={onSuccess} />);
    fireEvent.change(screen.getByPlaceholderText('Jane'), {
      target: { value: 'Jane' },
    });
    fireEvent.change(screen.getByPlaceholderText(/jane@forma.io/), {
      target: { value: 'jane@test.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/8 characters/), {
      target: { value: 'longenoughpassword' },
    });
    fireEvent.click(screen.getByRole('checkbox'));
    fireEvent.click(screen.getByRole('button', { name: /create account/i }));
    expect(screen.getByText(/creating account/i)).toBeInTheDocument();
    await screen.findByRole(
      'button',
      { name: /create account/i },
      { timeout: 5000 }
    );
    expect(onSuccess).toHaveBeenCalledTimes(1);
  });

  it('calls onSignInClick when link clicked', () => {
    const onClick = jest.fn();
    render(<SignUpForm onSignInClick={onClick} />);
    fireEvent.click(screen.getByText(/Sign in/));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
