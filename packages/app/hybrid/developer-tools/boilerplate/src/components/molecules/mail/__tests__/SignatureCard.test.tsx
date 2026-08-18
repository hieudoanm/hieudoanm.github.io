import { render, screen } from '@testing-library/react';
import { SignatureCard } from '../SignatureCard';

describe('SignatureCard', () => {
  it('renders name, role and contact details', () => {
    render(
      <SignatureCard
        name="Jane Doe"
        role="Engineer"
        company="ACME"
        email="jane@acme.com"
        phone="+1 555 0100"
        website="acme.com"
      />
    );
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
    expect(screen.getByText('Engineer · ACME')).toBeInTheDocument();
    expect(screen.getByText('jane@acme.com')).toBeInTheDocument();
    expect(screen.getByText('acme.com')).toBeInTheDocument();
  });

  it('renders initials fallback in the avatar', () => {
    render(<SignatureCard name="John" />);
    expect(screen.getByText('J')).toBeInTheDocument();
  });

  it('omits contact list when details are missing', () => {
    render(<SignatureCard name="Jane" />);
    expect(screen.queryByText('jane@acme.com')).not.toBeInTheDocument();
    expect(screen.queryByRole('list')).not.toBeInTheDocument();
  });

  it('omits role line when role and company are missing', () => {
    render(<SignatureCard name="Jane" />);
    expect(screen.queryByText(' · ')).not.toBeInTheDocument();
  });
});
