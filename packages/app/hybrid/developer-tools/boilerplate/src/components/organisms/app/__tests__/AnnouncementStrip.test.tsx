import { fireEvent, render, screen } from '@testing-library/react';
import { AnnouncementStrip } from '../AnnouncementStrip';

describe('AnnouncementStrip', () => {
  it('renders the message and variant badge', () => {
    render(
      <AnnouncementStrip message="Scheduled maintenance" variant="warning" />
    );
    expect(screen.getByText('Scheduled maintenance')).toBeInTheDocument();
    expect(screen.getByText('warning')).toHaveClass('badge-warning');
  });

  it('fires the action callback', () => {
    const onClick = jest.fn();
    render(
      <AnnouncementStrip
        message="New features shipped"
        action={{ label: 'Learn more', onClick }}
      />
    );
    fireEvent.click(screen.getByTestId('announcement-action'));
    expect(onClick).toHaveBeenCalled();
  });

  it('dismisses and fires onDismiss', () => {
    const onDismiss = jest.fn();
    render(
      <AnnouncementStrip message="Hello" dismissible onDismiss={onDismiss} />
    );
    fireEvent.click(screen.getByTestId('announcement-dismiss'));
    expect(screen.queryByTestId('announcement-strip')).not.toBeInTheDocument();
    expect(onDismiss).toHaveBeenCalled();
  });
});
