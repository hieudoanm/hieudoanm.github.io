import { fireEvent, render, screen } from '@testing-library/react';
import { TooltipsTemplate } from '../TooltipsTemplate';

describe('TooltipsTemplate', () => {
  it('renders tooltip buttons and the popover trigger', () => {
    render(<TooltipsTemplate />);
    expect(
      screen.getAllByRole('heading', { name: 'Tooltips' }).length
    ).toBeGreaterThan(0);
    expect(screen.getByRole('button', { name: 'Copy' })).toHaveAttribute(
      'data-tip',
      'Copy to clipboard'
    );
    expect(screen.getByRole('button', { name: 'Download' })).toHaveAttribute(
      'data-tip',
      'Download file'
    );
    expect(screen.getByRole('button', { name: 'Delete' })).toHaveAttribute(
      'data-tip',
      'Delete item'
    );
    expect(
      screen.getByRole('button', { name: 'Show popover' })
    ).toBeInTheDocument();
    expect(screen.queryByText('Quick actions')).not.toBeInTheDocument();
  });

  it('opens and closes the controlled popover', () => {
    render(<TooltipsTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Show popover' }));
    expect(screen.getByText('Quick actions')).toBeInTheDocument();
    expect(
      screen.getByText('This popover is toggled by React state.')
    ).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Close popover' }));
    expect(screen.queryByText('Quick actions')).not.toBeInTheDocument();
  });
});
