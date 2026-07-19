import { fireEvent, render, screen } from '@testing-library/react';
import { ArtistCard } from '../ArtistCard';

describe('ArtistCard', () => {
  it('renders name and followers', () => {
    render(<ArtistCard name="Ari" followers="1.2M" />);
    expect(screen.getByText('Ari')).toBeInTheDocument();
    expect(screen.getByText('1.2M followers')).toBeInTheDocument();
  });

  it('renders a verified badge when verified', () => {
    render(<ArtistCard name="Ari" verified />);
    expect(screen.getByText('✓')).toBeInTheDocument();
  });

  it('omits followers when missing', () => {
    render(<ArtistCard name="Ari" />);
    expect(screen.queryByText(/followers/)).not.toBeInTheDocument();
  });

  it('calls onOpen when clicked', () => {
    const onOpen = jest.fn();
    render(<ArtistCard name="Ari" onOpen={onOpen} />);
    fireEvent.click(screen.getByTestId('artist-card'));
    expect(onOpen).toHaveBeenCalledTimes(1);
  });
});
