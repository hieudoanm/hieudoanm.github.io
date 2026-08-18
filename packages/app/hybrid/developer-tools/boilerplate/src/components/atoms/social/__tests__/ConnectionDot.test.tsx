import { render, screen } from '@testing-library/react';
import { ConnectionDot } from '../ConnectionDot';

describe('ConnectionDot', () => {
  it('renders online dot', () => {
    render(<ConnectionDot status="online" />);
    expect(screen.getByTestId('connection-dot')).toHaveClass('bg-success');
  });

  it('renders busy dot with error class', () => {
    render(<ConnectionDot status="busy" />);
    expect(screen.getByTestId('connection-dot')).toHaveClass('bg-error');
  });

  it('applies size class', () => {
    render(<ConnectionDot status="online" size="sm" />);
    expect(screen.getByTestId('connection-dot')).toHaveClass('h-2');
  });
});
