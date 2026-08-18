import { render, screen } from '@testing-library/react';
import { ContactCard } from '../ContactCard';

describe('ContactCard', () => {
  it('renders name, title, company and status', () => {
    render(
      <ContactCard
        name="Alice Smith"
        email="alice@example.com"
        title="CTO"
        company="Acme"
        status="Active"
      />
    );
    expect(screen.getByText('Alice Smith')).toBeInTheDocument();
    expect(screen.getByText('CTO at Acme')).toBeInTheDocument();
    expect(screen.getByText('Active')).toBeInTheDocument();
  });

  it('renders the email as a mailto link', () => {
    render(<ContactCard name="Alice" email="alice@example.com" />);
    expect(
      screen.getByRole('link', { name: 'alice@example.com' })
    ).toHaveAttribute('href', 'mailto:alice@example.com');
  });

  it('shows the avatar fallback initial', () => {
    render(<ContactCard name="Alice" email="a@example.com" />);
    expect(screen.getByText('A')).toBeInTheDocument();
  });
});
