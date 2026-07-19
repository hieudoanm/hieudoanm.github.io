import { render, screen } from '@testing-library/react';
import { UsernameLabel } from '../UsernameLabel';

describe('UsernameLabel', () => {
  it('renders the username', () => {
    render(<UsernameLabel username="jane" />);
    expect(screen.getByTestId('username-label')).toHaveTextContent('jane');
  });

  it('renders display name and handle when distinct', () => {
    render(<UsernameLabel username="jane" displayName="Jane Doe" />);
    expect(screen.getByTestId('username-label')).toHaveTextContent('Jane Doe');
    expect(screen.getByTestId('username-label')).toHaveTextContent('@jane');
  });

  it('renders verified icon when verified', () => {
    render(<UsernameLabel username="jane" verified />);
    expect(screen.getByLabelText('Verified')).toBeInTheDocument();
  });
});
