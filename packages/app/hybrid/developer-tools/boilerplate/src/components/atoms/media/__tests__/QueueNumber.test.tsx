import { render, screen } from '@testing-library/react';
import { QueueNumber } from '../QueueNumber';

describe('QueueNumber', () => {
  it('zero-pads single digit positions', () => {
    render(<QueueNumber number={3} />);
    expect(screen.getByTestId('queue-number')).toHaveTextContent('03');
  });

  it('renders double digit positions as-is', () => {
    render(<QueueNumber number={12} />);
    expect(screen.getByTestId('queue-number')).toHaveTextContent('12');
  });

  it('clamps negative numbers to 00', () => {
    render(<QueueNumber number={-1} />);
    expect(screen.getByTestId('queue-number')).toHaveTextContent('00');
  });
});
