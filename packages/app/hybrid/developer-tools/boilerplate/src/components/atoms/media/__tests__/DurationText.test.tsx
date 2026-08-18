import { render, screen } from '@testing-library/react';
import { DurationText } from '../DurationText';

describe('DurationText', () => {
  it('formats seconds as m:ss', () => {
    render(<DurationText seconds={125} />);
    expect(screen.getByTestId('duration-text')).toHaveTextContent('2:05');
  });

  it('formats zero as 0:00', () => {
    render(<DurationText seconds={0} />);
    expect(screen.getByTestId('duration-text')).toHaveTextContent('0:00');
  });

  it('formats hours as h:mm:ss', () => {
    render(<DurationText seconds={3661} />);
    expect(screen.getByTestId('duration-text')).toHaveTextContent('1:01:01');
  });

  it('clamps negative values to zero', () => {
    render(<DurationText seconds={-30} />);
    expect(screen.getByTestId('duration-text')).toHaveTextContent('0:00');
  });
});
