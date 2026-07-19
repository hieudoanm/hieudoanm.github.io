import { fireEvent, render, screen } from '@testing-library/react';
import { WaterTracker } from '../WaterTracker';

describe('WaterTracker', () => {
  it('renders current and target glasses', () => {
    render(<WaterTracker glasses={4} target={8} />);
    expect(screen.getByTestId('water-count')).toHaveTextContent(
      '4 / 8 glasses'
    );
  });

  it('increments glasses on add', () => {
    const onAdd = jest.fn();
    render(<WaterTracker glasses={4} target={8} onAdd={onAdd} />);
    fireEvent.click(screen.getByRole('button', { name: 'Add glass' }));
    expect(screen.getByTestId('water-count')).toHaveTextContent(
      '5 / 8 glasses'
    );
    expect(onAdd).toHaveBeenCalledWith(5);
  });

  it('decrements glasses on remove', () => {
    const onRemove = jest.fn();
    render(<WaterTracker glasses={4} target={8} onRemove={onRemove} />);
    fireEvent.click(screen.getByRole('button', { name: 'Remove glass' }));
    expect(screen.getByTestId('water-count')).toHaveTextContent(
      '3 / 8 glasses'
    );
    expect(onRemove).toHaveBeenCalledWith(3);
  });

  it('does not go below zero glasses', () => {
    render(<WaterTracker glasses={0} target={8} />);
    fireEvent.click(screen.getByRole('button', { name: 'Remove glass' }));
    expect(screen.getByTestId('water-count')).toHaveTextContent(
      '0 / 8 glasses'
    );
  });
});
