import { fireEvent, render, screen } from '@testing-library/react';
import { SimilarArtists } from '../SimilarArtists';

const artists = [{ id: '1', name: 'Artist A', followers: '500K' }];

describe('SimilarArtists', () => {
  it('renders artists with follower counts', () => {
    render(<SimilarArtists artists={artists} />);
    expect(screen.getByText('Artist A')).toBeInTheDocument();
    expect(screen.getByText('500K followers')).toBeInTheDocument();
  });

  it('renders an empty container when no artists', () => {
    render(<SimilarArtists artists={[]} />);
    expect(screen.getByTestId('similar-artists')).toBeEmptyDOMElement();
  });

  it('calls onSelect with the artist id', () => {
    const onSelect = jest.fn();
    render(<SimilarArtists artists={artists} onSelect={onSelect} />);
    fireEvent.click(screen.getByText('Artist A'));
    expect(onSelect).toHaveBeenCalledWith('1');
  });
});
