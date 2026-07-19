import { render, screen } from '@testing-library/react';
import { HotelStar } from '../HotelStar';

describe('HotelStar', () => {
  it('renders five radios by default', () => {
    const { container } = render(<HotelStar value={4} />);
    expect(container.querySelectorAll('input[type="radio"]')).toHaveLength(5);
  });

  it('marks the correct number of stars as filled', () => {
    const { container } = render(<HotelStar value={3} />);
    expect(container.querySelectorAll('input:checked')).toHaveLength(3);
  });

  it('floors fractional values', () => {
    const { container } = render(<HotelStar value={4.8} />);
    expect(container.querySelectorAll('input:checked')).toHaveLength(4);
  });

  it('renders a custom maximum', () => {
    const { container } = render(<HotelStar value={3} max={6} />);
    expect(container.querySelectorAll('input[type="radio"]')).toHaveLength(6);
  });
});
