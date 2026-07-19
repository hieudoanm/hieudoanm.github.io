import { render, screen } from '@testing-library/react';
import { TechnologySection } from '../TechnologySection';

const articles = [
  {
    title: 'Chip makers expand capacity',
    tag: 'Hardware',
    readTime: '6 min',
    imageAlt: 'Wafer fab',
  },
  {
    title: 'Open source hits a milestone',
    tag: 'Software',
    readTime: '4 min',
    imageAlt: 'Terminal window',
  },
];

describe('TechnologySection', () => {
  it('renders articles with tags and read times', () => {
    render(<TechnologySection articles={articles} />);
    expect(screen.getByText('Chip makers expand capacity')).toBeInTheDocument();
    expect(screen.getByText('Hardware')).toBeInTheDocument();
    expect(screen.getByText('6 min')).toBeInTheDocument();
    expect(
      screen.getByText('Open source hits a milestone')
    ).toBeInTheDocument();
  });

  it('renders the section title', () => {
    render(<TechnologySection articles={articles} title="Innovation" />);
    expect(screen.getByText('Innovation')).toBeInTheDocument();
  });

  it('handles an empty articles array', () => {
    render(<TechnologySection articles={[]} />);
    expect(screen.getByTestId('technology-section')).toBeInTheDocument();
    expect(screen.queryAllByRole('article')).toHaveLength(0);
  });
});
