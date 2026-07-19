import { render, screen } from '@testing-library/react';
import { EditorialCard } from '../EditorialCard';

describe('EditorialCard', () => {
  it('renders the title and editorial badge', () => {
    render(<EditorialCard title="A fairer tax system" />);
    expect(screen.getByText('A fairer tax system')).toBeInTheDocument();
    expect(screen.getByText('Editorial')).toBeInTheDocument();
  });

  it('renders author and date when provided', () => {
    render(
      <EditorialCard
        title="Tax reform"
        author="Editorial Board"
        date="Feb 2, 2024"
      />
    );
    expect(screen.getByText('Editorial Board')).toBeInTheDocument();
    expect(screen.getByText('Feb 2, 2024')).toBeInTheDocument();
  });

  it('applies the support stance badge class', () => {
    render(<EditorialCard title="Reform" stance="support" />);
    expect(screen.getByText('support')).toHaveClass('badge-success');
  });

  it('renders a link when href is provided', () => {
    render(<EditorialCard title="Reform" href="/opinion/reform" />);
    expect(screen.getByRole('link', { name: 'Reform' })).toHaveAttribute(
      'href',
      '/opinion/reform'
    );
  });
});
