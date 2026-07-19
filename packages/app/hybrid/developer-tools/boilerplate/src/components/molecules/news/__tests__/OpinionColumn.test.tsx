import { render, screen } from '@testing-library/react';
import { OpinionColumn } from '../OpinionColumn';

const columnists = [
  { id: '1', name: 'Anna Kim', headline: 'The case for a shorter week' },
  { id: '2', name: 'Leo Tran', headline: 'Why cities must go green' },
];

describe('OpinionColumn', () => {
  it('renders the default title and columnists', () => {
    render(<OpinionColumn columnists={columnists} />);
    expect(screen.getByText('Opinion')).toBeInTheDocument();
    expect(screen.getByText('Anna Kim')).toBeInTheDocument();
    expect(screen.getByText('The case for a shorter week')).toBeInTheDocument();
  });

  it('renders a custom title', () => {
    render(<OpinionColumn columnists={columnists} title="Views" />);
    expect(screen.getByText('Views')).toBeInTheDocument();
  });

  it('renders excerpt when present', () => {
    render(
      <OpinionColumn
        columnists={[
          {
            id: '1',
            name: 'Anna Kim',
            headline: 'Op-ed',
            excerpt: 'Deep dive.',
          },
        ]}
      />
    );
    expect(screen.getByText('Deep dive.')).toBeInTheDocument();
  });

  it('renders an empty state when no columnists', () => {
    render(<OpinionColumn columnists={[]} />);
    expect(screen.getByText('No opinions yet.')).toBeInTheDocument();
  });
});
