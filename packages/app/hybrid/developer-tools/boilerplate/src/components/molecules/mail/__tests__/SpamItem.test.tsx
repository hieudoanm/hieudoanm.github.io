import { fireEvent, render, screen } from '@testing-library/react';
import { SpamItem } from '../SpamItem';

describe('SpamItem', () => {
  it('renders sender, subject and actions', () => {
    render(
      <SpamItem
        from="Unknown"
        subject="Win a prize"
        preview="Click now"
        time="10:00"
      />
    );
    const item = screen.getByTestId('spam-item');
    expect(item).toHaveTextContent('Unknown');
    expect(item).toHaveTextContent('Win a prize');
    expect(
      screen.getByRole('button', { name: 'Move to inbox' })
    ).toBeInTheDocument();
  });

  it('shows flagged badge when flagged', () => {
    render(
      <SpamItem from="Unknown" subject="S" preview="P" time="10:00" flagged />
    );
    expect(screen.getByText('Flagged')).toBeInTheDocument();
  });

  it('does not show flagged badge by default', () => {
    render(<SpamItem from="Unknown" subject="S" preview="P" time="10:00" />);
    expect(screen.queryByText('Flagged')).not.toBeInTheDocument();
  });

  it('calls callbacks', () => {
    const onMoveToInbox = jest.fn();
    const onReport = jest.fn();
    render(
      <SpamItem
        from="Unknown"
        subject="S"
        preview="P"
        time="10:00"
        onMoveToInbox={onMoveToInbox}
        onReport={onReport}
      />
    );
    fireEvent.click(screen.getByRole('button', { name: 'Move to inbox' }));
    fireEvent.click(screen.getByRole('button', { name: 'Report' }));
    expect(onMoveToInbox).toHaveBeenCalledTimes(1);
    expect(onReport).toHaveBeenCalledTimes(1);
  });
});
