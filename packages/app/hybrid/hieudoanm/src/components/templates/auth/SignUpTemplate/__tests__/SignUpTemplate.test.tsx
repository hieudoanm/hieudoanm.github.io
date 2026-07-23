import { render, screen, fireEvent } from '@testing-library/react';
import { SignUpTemplate } from '../SignUpTemplate';

describe('SignUpTemplate', () => {
  it('to match snapshot', () => {
    const { container } = render(<SignUpTemplate />);
    expect(container).toMatchSnapshot();
  });

  it('renders nav with brand name', () => {
    render(<SignUpTemplate />);
    expect(screen.getAllByText('DaisyX').length).toBeGreaterThan(0);
  });

  it('renders sign up form', () => {
    render(<SignUpTemplate />);
    expect(screen.getByText('Create your free account')).toBeInTheDocument();
  });

  it('renders name input', () => {
    render(<SignUpTemplate />);
    expect(screen.getByPlaceholderText('Jane')).toBeInTheDocument();
  });

  it('renders email input', () => {
    render(<SignUpTemplate />);
    expect(screen.getByPlaceholderText('jane@forma.io')).toBeInTheDocument();
  });

  it('renders home link in nav', () => {
    render(<SignUpTemplate />);
    expect(screen.getByText('Home')).toBeInTheDocument();
  });

  it('renders footer', () => {
    render(<SignUpTemplate />);
    expect(screen.getByText(/Built with care/)).toBeInTheDocument();
  });

  it('renders sign in link', () => {
    render(<SignUpTemplate />);
    expect(screen.getByText('Sign in')).toBeInTheDocument();
  });

  it('renders terms checkbox', () => {
    render(<SignUpTemplate />);
    expect(screen.getByText(/I agree to the/)).toBeInTheDocument();
  });

  it('calls onSignInClick when sign in link is clicked', () => {
    const onSignInClick = jest.fn();
    render(<SignUpTemplate onSignInClick={onSignInClick} />);
    fireEvent.click(screen.getByText('Sign in'));
    expect(onSignInClick).toHaveBeenCalledTimes(1);
  });

  it('shows error when name is empty on submit', () => {
    render(<SignUpTemplate />);
    fireEvent.click(screen.getByText('Create account'));
    expect(screen.getByText(/Please enter your name/)).toBeInTheDocument();
  });
});
