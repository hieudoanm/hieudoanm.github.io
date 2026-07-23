import { render, screen } from '@testing-library/react';
import { GoogleSignInModal } from '../GoogleSignInModal';

describe('GoogleSignInModal', () => {
  it('renders modal heading', () => {
    render(<GoogleSignInModal />);
    expect(screen.getByText('Welcome back')).toBeInTheDocument();
  });

  it('renders sign-in button', () => {
    render(<GoogleSignInModal />);
    expect(screen.getByText('Sign in with Google')).toBeInTheDocument();
  });

  it('renders cancel button', () => {
    render(<GoogleSignInModal />);
    expect(screen.getByText('Cancel')).toBeInTheDocument();
  });

  it('renders create account link', () => {
    render(<GoogleSignInModal />);
    expect(screen.getByText('Create one free')).toBeInTheDocument();
  });

  it('to match snapshot', () => {
    const { container } = render(<GoogleSignInModal />);
    expect(container).toMatchSnapshot();
  });
});
