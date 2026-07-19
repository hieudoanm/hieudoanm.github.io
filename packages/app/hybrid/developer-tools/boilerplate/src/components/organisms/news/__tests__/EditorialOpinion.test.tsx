import { render, screen } from '@testing-library/react';
import { EditorialOpinion } from '../EditorialOpinion';

const columns = [
  {
    author: 'Jane Doe',
    role: 'Editor',
    initials: 'JD',
    title: 'The case for renewal',
    excerpt: 'Why the next decade demands fresh thinking.',
  },
  {
    author: 'Ali Khan',
    role: 'Columnist',
    initials: 'AK',
    title: 'Beyond the numbers',
    excerpt: 'A closer look at what the data hides.',
  },
];

describe('EditorialOpinion', () => {
  it('renders columns with authors and roles', () => {
    render(<EditorialOpinion columns={columns} />);
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
    expect(screen.getByText('Editor')).toBeInTheDocument();
    expect(screen.getByText('Ali Khan')).toBeInTheDocument();
  });

  it('renders column headlines and excerpts', () => {
    render(<EditorialOpinion columns={columns} />);
    expect(screen.getByText('The case for renewal')).toBeInTheDocument();
    expect(
      screen.getByText('Why the next decade demands fresh thinking.')
    ).toBeInTheDocument();
  });

  it('renders author initials as avatars', () => {
    render(<EditorialOpinion columns={columns} />);
    expect(screen.getByText('JD')).toBeInTheDocument();
    expect(screen.getByText('AK')).toBeInTheDocument();
  });

  it('handles an empty columns list', () => {
    render(<EditorialOpinion columns={[]} />);
    expect(screen.getByTestId('editorial-opinion')).toBeInTheDocument();
    expect(screen.queryAllByRole('article')).toHaveLength(0);
  });
});
