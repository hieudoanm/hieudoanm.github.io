import { render, screen } from '@testing-library/react';
import { MapPreview } from '../MapPreview';

describe('MapPreview', () => {
  it('renders place name and map label', () => {
    render(<MapPreview placeName="Ba Na Hills" />);
    expect(screen.getByText('Ba Na Hills')).toBeInTheDocument();
    expect(screen.getByText('Map preview')).toBeInTheDocument();
  });

  it('renders the address when provided', () => {
    render(<MapPreview placeName="Ba Na Hills" address="Hoa Ninh, Da Nang" />);
    expect(screen.getByText('Hoa Ninh, Da Nang')).toBeInTheDocument();
  });

  it('renders a custom label', () => {
    render(<MapPreview placeName="Ba Na Hills" label="Interactive map" />);
    expect(screen.getByText('Interactive map')).toBeInTheDocument();
  });
});
