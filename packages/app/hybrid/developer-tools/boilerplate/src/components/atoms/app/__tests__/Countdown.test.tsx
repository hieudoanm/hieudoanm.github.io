import { render, screen } from '@testing-library/react';
import { Countdown } from '../Countdown';

describe('Countdown', () => {
  it('pads the value to the requested digits', () => {
    const { container } = render(<Countdown value={7} />);
    expect(container.querySelector('.countdown')).toHaveTextContent('07');
  });

  it('renders values above minDigits unpadded', () => {
    render(<Countdown value={123} minDigits={2} />);
    expect(screen.getByText('123')).toBeInTheDocument();
  });

  it('clamps negative values to zero', () => {
    render(<Countdown value={-3} />);
    expect(screen.getByText('00')).toBeInTheDocument();
  });
});
