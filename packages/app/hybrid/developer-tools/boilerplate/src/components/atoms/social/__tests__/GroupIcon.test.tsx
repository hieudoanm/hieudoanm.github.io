import { render, screen } from '@testing-library/react';
import { GroupIcon } from '../GroupIcon';

describe('GroupIcon', () => {
  it('renders public group by default', () => {
    render(<GroupIcon />);
    expect(screen.getByTestId('group-icon')).toHaveAttribute(
      'aria-label',
      'public group'
    );
  });

  it('renders private group icon', () => {
    render(<GroupIcon type="private" />);
    expect(screen.getByTestId('group-icon')).toHaveAttribute(
      'aria-label',
      'private group'
    );
  });

  it('renders secret group icon', () => {
    render(<GroupIcon type="secret" />);
    expect(screen.getByTestId('group-icon')).toHaveAttribute(
      'aria-label',
      'secret group'
    );
  });
});
