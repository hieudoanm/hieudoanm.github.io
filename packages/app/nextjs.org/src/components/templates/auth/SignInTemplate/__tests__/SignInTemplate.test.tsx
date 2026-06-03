import { render, screen, fireEvent } from '@testing-library/react';
import { SignInTemplate } from '../SignInTemplate';

describe('SignInTemplate', () => {
  it('to match snapshot', () => {
    const { container } = render(<SignInTemplate />);
    expect(container).toMatchSnapshot();
  });

  it('renders nav with brand name', () => {
    render(<SignInTemplate />);
    expect(screen.getAllByText('Forma').length).toBeGreaterThan(0);
  });

  it('renders sign in form', () => {
    render(<SignInTemplate />);
    expect(screen.getByText(/Welcome back/)).toBeInTheDocument();
  });

  it('renders email input', () => {
    render(<SignInTemplate />);
    expect(screen.getByPlaceholderText('jane@forma.io')).toBeInTheDocument();
  });

  it('renders password input', () => {
    render(<SignInTemplate />);
    expect(screen.getByPlaceholderText('••••••••')).toBeInTheDocument();
  });

  it('renders home link in nav', () => {
    render(<SignInTemplate />);
    expect(screen.getByText('Home')).toBeInTheDocument();
  });

  it('renders footer', () => {
    render(<SignInTemplate />);
    expect(screen.getByText(/Built with care/)).toBeInTheDocument();
  });

  it('renders forgot password link', () => {
    render(<SignInTemplate />);
    expect(screen.getByText(/Forgot password/)).toBeInTheDocument();
  });

  it('renders sign up link', () => {
    render(<SignInTemplate />);
    expect(screen.getByText('Create one free')).toBeInTheDocument();
  });

  it('calls onSignUpClick when sign up link is clicked', () => {
    const onSignUpClick = jest.fn();
    render(<SignInTemplate onSignUpClick={onSignUpClick} />);
    fireEvent.click(screen.getByText('Create one free'));
    expect(onSignUpClick).toHaveBeenCalledTimes(1);
  });

  it('calls onForgotPasswordClick when forgot password link is clicked', () => {
    const onForgotPasswordClick = jest.fn();
    render(<SignInTemplate onForgotPasswordClick={onForgotPasswordClick} />);
    fireEvent.click(screen.getByText(/Forgot password/));
    expect(onForgotPasswordClick).toHaveBeenCalledTimes(1);
  });

  it('shows error when email is empty on submit', () => {
    render(<SignInTemplate />);
    fireEvent.click(screen.getByText('Sign in'));
    expect(screen.getByText(/enter your email/)).toBeInTheDocument();
  });
});
