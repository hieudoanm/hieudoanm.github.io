import { render, screen } from '@testing-library/react';
import { WorldNews } from '../WorldNews';

const articles = [
  {
    title: 'Summit reaches deal',
    region: 'Europe',
    excerpt: 'Leaders agreed on a new framework.',
    imageAlt: 'Summit hall',
  },
  {
    title: 'Election results',
    region: 'Asia',
    excerpt: 'Voters head to the polls.',
    imageAlt: 'Ballot boxes',
  },
];

describe('WorldNews', () => {
  it('renders articles with region badges', () => {
    render(<WorldNews articles={articles} />);
    expect(screen.getByText('Summit reaches deal')).toBeInTheDocument();
    expect(screen.getByText('Europe')).toBeInTheDocument();
    expect(screen.getByText('Election results')).toBeInTheDocument();
    expect(screen.getByText('Asia')).toBeInTheDocument();
  });

  it('renders excerpts', () => {
    render(<WorldNews articles={articles} />);
    expect(
      screen.getByText('Leaders agreed on a new framework.')
    ).toBeInTheDocument();
  });

  it('renders the section title', () => {
    render(<WorldNews articles={articles} title="Global Desk" />);
    expect(screen.getByText('Global Desk')).toBeInTheDocument();
  });

  it('renders images with descriptive labels', () => {
    render(<WorldNews articles={articles} />);
    expect(screen.getByLabelText('Summit hall')).toBeInTheDocument();
    expect(screen.getByLabelText('Ballot boxes')).toBeInTheDocument();
  });
});
