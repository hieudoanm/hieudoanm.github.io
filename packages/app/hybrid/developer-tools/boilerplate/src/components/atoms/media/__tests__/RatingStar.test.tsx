import { fireEvent, render, screen } from '@testing-library/react';
import { RatingStar } from '../RatingStar';

describe('RatingStar', () => {
  it('renders five stars with the rating filled', () => {
    render(<RatingStar rating={3} />);
    expect(screen.getAllByRole('button')).toHaveLength(5);
    expect(screen.getByTestId('rating-star-1')).toHaveClass('fill-yellow-500');
    expect(screen.getByTestId('rating-star-4')).not.toHaveClass(
      'fill-yellow-500'
    );
  });

  it('marks the selected stars as pressed', () => {
    render(<RatingStar rating={2} />);
    expect(screen.getByRole('button', { name: 'Rate 2 of 5' })).toHaveAttribute(
      'aria-pressed',
      'true'
    );
    expect(screen.getByRole('button', { name: 'Rate 3 of 5' })).toHaveAttribute(
      'aria-pressed',
      'false'
    );
  });

  it('calls onChange with the clicked rating', () => {
    const onChange = jest.fn();
    render(<RatingStar rating={0} onChange={onChange} />);
    fireEvent.click(screen.getByRole('button', { name: 'Rate 4 of 5' }));
    expect(onChange).toHaveBeenCalledWith(4);
  });

  it('renders a custom max', () => {
    render(<RatingStar rating={1} max={3} />);
    expect(screen.getAllByRole('button')).toHaveLength(3);
  });
});
