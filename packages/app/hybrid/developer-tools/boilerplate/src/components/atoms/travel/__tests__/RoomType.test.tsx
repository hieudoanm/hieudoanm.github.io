import { render, screen } from '@testing-library/react';
import { RoomType } from '../RoomType';

describe('RoomType', () => {
  it('renders the room type label', () => {
    render(<RoomType label="Deluxe King" />);
    expect(screen.getByTestId('room-type')).toHaveTextContent('Deluxe King');
  });

  it('applies the outline badge class', () => {
    render(<RoomType label="Family Room" />);
    expect(screen.getByTestId('room-type')).toHaveClass('badge-outline');
  });

  it('renders a custom label with numbers', () => {
    render(<RoomType label="Room 204" />);
    expect(screen.getByTestId('room-type')).toHaveTextContent('Room 204');
  });
});
