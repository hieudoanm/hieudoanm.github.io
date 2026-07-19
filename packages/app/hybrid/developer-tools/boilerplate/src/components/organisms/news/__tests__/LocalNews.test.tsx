import { render, screen } from '@testing-library/react';
import { LocalNews } from '../LocalNews';

const items = [
  {
    title: 'School board approves budget',
    city: 'Springfield',
    time: '2h ago',
    excerpt: 'The new plan funds three building projects.',
  },
  {
    title: 'Festival returns to the park',
    city: 'Riverside',
    time: 'Yesterday',
    excerpt: 'Tickets go on sale Monday.',
  },
];

describe('LocalNews', () => {
  it('renders local headlines with city badges', () => {
    render(<LocalNews items={items} />);
    expect(
      screen.getByText('School board approves budget')
    ).toBeInTheDocument();
    expect(screen.getByText('Springfield')).toBeInTheDocument();
    expect(
      screen.getByText('Festival returns to the park')
    ).toBeInTheDocument();
  });

  it('renders timestamps and excerpts', () => {
    render(<LocalNews items={items} />);
    expect(screen.getByText('2h ago')).toBeInTheDocument();
    expect(
      screen.getByText('The new plan funds three building projects.')
    ).toBeInTheDocument();
  });

  it('renders the section title', () => {
    render(<LocalNews items={items} title="Your Neighborhood" />);
    expect(screen.getByText('Your Neighborhood')).toBeInTheDocument();
  });

  it('handles an empty list', () => {
    render(<LocalNews items={[]} />);
    expect(screen.getByTestId('local-news')).toBeInTheDocument();
    expect(screen.queryAllByRole('listitem')).toHaveLength(0);
  });
});
