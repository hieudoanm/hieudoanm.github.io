import { render, screen } from '@testing-library/react';
import { PartnersRow } from '../PartnersRow';

describe('PartnersRow', () => {
  it('renders the title and partner names', () => {
    render(<PartnersRow partners={['Acme', 'Globex']} />);
    expect(screen.getByText('Trusted by')).toBeInTheDocument();
    expect(screen.getByText('Acme')).toBeInTheDocument();
    expect(screen.getByText('Globex')).toBeInTheDocument();
  });

  it('renders a custom title', () => {
    render(<PartnersRow partners={['Acme']} title="Our partners" />);
    expect(screen.getByText('Our partners')).toBeInTheDocument();
  });

  it('renders an empty message when no partners are provided', () => {
    render(<PartnersRow partners={[]} />);
    expect(screen.getByText('No partners')).toBeInTheDocument();
  });
});
