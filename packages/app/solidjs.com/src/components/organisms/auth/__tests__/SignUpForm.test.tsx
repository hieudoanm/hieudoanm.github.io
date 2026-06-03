import { render, screen, fireEvent } from '@solidjs/testing-library';
import { SignUpForm } from '../SignUpForm';

describe('SignUpForm', () => {
  it('renders heading', () => {
    render(() => <SignUpForm />);
    expect(screen.getByText('Forma')).toBeInTheDocument();
  });

  it('renders subtitle', () => {
    render(() => <SignUpForm />);
    expect(screen.getByText('Create your free account')).toBeInTheDocument();
  });

  it('renders name input', () => {
    render(() => <SignUpForm />);
    expect(screen.getByPlaceholderText('Jane')).toBeInTheDocument();
  });

  it('renders email input', () => {
    render(() => <SignUpForm />);
    expect(screen.getByPlaceholderText('jane@forma.io')).toBeInTheDocument();
  });

  it('renders password input', () => {
    render(() => <SignUpForm />);
    expect(
      screen.getByPlaceholderText('At least 8 characters')
    ).toBeInTheDocument();
  });

  it('renders terms checkbox', () => {
    render(() => <SignUpForm />);
    expect(screen.getByText(/I agree to the/)).toBeInTheDocument();
  });

  it('shows error when name is empty on submit', () => {
    render(() => <SignUpForm />);
    fireEvent.click(screen.getByText('Create account'));
    expect(screen.getByText(/Please enter your name/)).toBeInTheDocument();
  });

  it('shows error when email is empty on submit', () => {
    render(() => <SignUpForm />);
    const nameInput = screen.getByPlaceholderText('Jane');
    fireEvent.input(nameInput, { target: { value: 'Test' } });
    fireEvent.click(screen.getByText('Create account'));
    expect(screen.getByText(/Please enter your email/)).toBeInTheDocument();
  });

  it('shows error alert when password is too short on submit', () => {
    render(() => <SignUpForm />);
    const nameInput = screen.getByPlaceholderText('Jane') as HTMLInputElement;
    nameInput.value = 'Test';
    nameInput.dispatchEvent(new Event('input', { bubbles: true }));
    const emailInput = screen.getByPlaceholderText(
      'jane@forma.io'
    ) as HTMLInputElement;
    emailInput.value = 'test@test.com';
    emailInput.dispatchEvent(new Event('input', { bubbles: true }));
    fireEvent.click(screen.getByText('Create account'));
    expect(
      screen.getByText('Password must be at least 8 characters.')
    ).toBeInTheDocument();
  });

  it('shows error when terms not agreed on submit', () => {
    render(() => <SignUpForm />);
    const nameInput = screen.getByPlaceholderText('Jane');
    fireEvent.input(nameInput, { target: { value: 'Test' } });
    const emailInput = screen.getByPlaceholderText('jane@forma.io');
    fireEvent.input(emailInput, { target: { value: 'test@test.com' } });
    const passwordInput = screen.getByPlaceholderText('At least 8 characters');
    fireEvent.input(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(screen.getByText('Create account'));
    expect(screen.getByText(/agree to the terms/)).toBeInTheDocument();
  });

  it('renders Google sign up button', () => {
    render(() => <SignUpForm />);
    expect(screen.getByText(/Sign up with Google/)).toBeInTheDocument();
  });

  it('renders sign in link', () => {
    render(() => <SignUpForm />);
    expect(screen.getByText('Sign in')).toBeInTheDocument();
  });

  it('calls onSignInClick when sign in link is clicked', () => {
    const onSignInClick = vi.fn();
    render(() => <SignUpForm onSignInClick={onSignInClick} />);
    fireEvent.click(screen.getByText('Sign in'));
    expect(onSignInClick).toHaveBeenCalledOnce();
  });
});
