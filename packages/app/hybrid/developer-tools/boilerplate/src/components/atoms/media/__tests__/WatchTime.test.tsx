import { render, screen } from '@testing-library/react';
import { WatchTime } from '../WatchTime';

describe('WatchTime', () => {
  it('formats hours and minutes', () => {
    render(<WatchTime minutes={135} />);
    expect(screen.getByTestId('watch-time')).toHaveTextContent('2h 15m');
  });

  it('formats minutes only', () => {
    render(<WatchTime minutes={45} />);
    expect(screen.getByTestId('watch-time')).toHaveTextContent('45m');
  });

  it('formats zero minutes', () => {
    render(<WatchTime minutes={0} />);
    expect(screen.getByTestId('watch-time')).toHaveTextContent('0m');
  });
});
