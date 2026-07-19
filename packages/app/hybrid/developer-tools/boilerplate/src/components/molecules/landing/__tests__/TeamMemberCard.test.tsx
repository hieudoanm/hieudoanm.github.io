import { render, screen } from '@testing-library/react';
import { TeamMemberCard } from '../TeamMemberCard';

const member = {
  name: 'Jane Doe',
  role: 'Product Designer',
  bio: 'Loves minimal interfaces.',
  socials: [
    { label: 'LinkedIn', href: 'https://linkedin.com/jane' },
    { label: 'GitHub', href: 'https://github.com/jane' },
  ],
};

describe('TeamMemberCard', () => {
  it('renders name, role, and bio', () => {
    render(<TeamMemberCard {...member} />);
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
    expect(screen.getByText('Product Designer')).toBeInTheDocument();
    expect(screen.getByText('Loves minimal interfaces.')).toBeInTheDocument();
  });

  it('generates initials from the name', () => {
    render(<TeamMemberCard {...member} />);
    expect(screen.getByText('JD')).toBeInTheDocument();
  });

  it('renders social links', () => {
    render(<TeamMemberCard {...member} />);
    const linkedin = screen.getByRole('link', { name: 'LinkedIn' });
    expect(linkedin).toHaveAttribute('href', 'https://linkedin.com/jane');
    expect(screen.getByRole('link', { name: 'GitHub' })).toBeInTheDocument();
  });

  it('hides socials and bio when omitted', () => {
    render(<TeamMemberCard {...member} bio={undefined} socials={[]} />);
    expect(
      screen.queryByText('Loves minimal interfaces.')
    ).not.toBeInTheDocument();
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });
});
