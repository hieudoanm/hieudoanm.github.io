import { render, screen } from '@testing-library/react';
import { PasswordStrength } from '../PasswordStrength';

describe('PasswordStrength', () => {
  it('renders the label and a very weak score for empty input', () => {
    render(<PasswordStrength value="" />);
    expect(screen.getByText('Password strength')).toBeInTheDocument();
    expect(screen.getByText('Very weak')).toBeInTheDocument();
  });

  it('scores a strong password as Excellent', () => {
    render(<PasswordStrength value="P@ssw0rd!" />);
    expect(screen.getByText('Excellent')).toBeInTheDocument();
  });

  it('scores a four-criteria password as Strong', () => {
    render(<PasswordStrength value="Password1" />);
    expect(screen.getByText('Strong')).toBeInTheDocument();
  });

  it('renders the check list items', () => {
    render(<PasswordStrength value="abc" label="Strength" />);
    expect(screen.getByText('Strength')).toBeInTheDocument();
    expect(screen.getByText(/8\+ characters/)).toBeInTheDocument();
    expect(screen.getByText(/Uppercase/)).toBeInTheDocument();
  });
});
