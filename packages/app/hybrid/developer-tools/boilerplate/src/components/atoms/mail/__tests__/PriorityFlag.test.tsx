import { render, screen } from '@testing-library/react';
import { PriorityFlag } from '../PriorityFlag';

describe('PriorityFlag', () => {
  it('renders high priority with an error badge', () => {
    render(<PriorityFlag priority="high" />);
    const flag = screen.getByTestId('priority-flag');
    expect(flag).toHaveTextContent('High');
    expect(flag).toHaveClass('badge-error');
  });

  it('renders normal priority with a warning badge', () => {
    render(<PriorityFlag priority="normal" />);
    expect(screen.getByTestId('priority-flag')).toHaveClass('badge-warning');
  });

  it('renders low priority with a ghost badge', () => {
    render(<PriorityFlag priority="low" />);
    expect(screen.getByTestId('priority-flag')).toHaveTextContent('Low');
    expect(screen.getByTestId('priority-flag')).toHaveClass('badge-ghost');
  });
});
