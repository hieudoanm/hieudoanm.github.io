import { render, screen } from '@testing-library/react';
import { TrackNumber } from '../TrackNumber';

describe('TrackNumber', () => {
  it('zero-pads track numbers', () => {
    render(<TrackNumber number={1} />);
    expect(screen.getByTestId('track-number')).toHaveTextContent('01');
  });

  it('renders double digit numbers as-is', () => {
    render(<TrackNumber number={42} />);
    expect(screen.getByTestId('track-number')).toHaveTextContent('42');
  });

  it('clamps negative numbers to 00', () => {
    render(<TrackNumber number={-5} />);
    expect(screen.getByTestId('track-number')).toHaveTextContent('00');
  });
});
