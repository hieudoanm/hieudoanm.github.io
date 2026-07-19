import { render, screen } from '@testing-library/react';
import { ClientLogo } from '../ClientLogo';

describe('ClientLogo', () => {
  it('renders the client name', () => {
    render(<ClientLogo name="Acme Corp" />);
    expect(screen.getByText('Acme Corp')).toBeInTheDocument();
  });

  it('generates initials when no logo is provided', () => {
    render(<ClientLogo name="Acme Corp" />);
    expect(screen.getByText('AC')).toBeInTheDocument();
  });

  it('renders a custom logo glyph when provided', () => {
    render(<ClientLogo name="Acme Corp" logo="A" />);
    expect(screen.getByText('A')).toBeInTheDocument();
    expect(screen.queryByText('AC')).not.toBeInTheDocument();
  });

  it('renders as a link when url is provided', () => {
    render(<ClientLogo name="Acme Corp" url="https://acme.io" />);
    const link = screen.getByTestId('client-logo');
    expect(link.tagName).toBe('A');
    expect(link).toHaveAttribute('href', 'https://acme.io');
  });
});
