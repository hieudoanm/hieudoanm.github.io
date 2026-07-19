import { render, screen } from '@testing-library/react';
import { AmenityList } from '../AmenityList';

describe('AmenityList', () => {
  it('renders the title and each amenity', () => {
    render(<AmenityList amenities={['Wi-Fi', 'Pool', 'Gym']} />);
    expect(screen.getByText('Amenities')).toBeInTheDocument();
    expect(screen.getByText('Wi-Fi')).toBeInTheDocument();
    expect(screen.getByText('Pool')).toBeInTheDocument();
    expect(screen.getByText('Gym')).toBeInTheDocument();
  });

  it('renders a custom title', () => {
    render(<AmenityList amenities={['Wi-Fi']} title="Room facilities" />);
    expect(screen.getByText('Room facilities')).toBeInTheDocument();
  });

  it('renders an empty list for no amenities', () => {
    const { container } = render(<AmenityList amenities={[]} />);
    expect(container.querySelectorAll('li').length).toBe(0);
  });
});
