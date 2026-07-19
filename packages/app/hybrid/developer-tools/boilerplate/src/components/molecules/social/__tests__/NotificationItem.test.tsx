import { render, screen } from '@testing-library/react';
import { NotificationItem } from '../NotificationItem';

describe('NotificationItem', () => {
  it('renders the message and time', () => {
    render(<NotificationItem message="Anna liked your post" time="2m" />);
    expect(screen.getByText('Anna liked your post')).toBeInTheDocument();
    expect(screen.getByText('2m')).toBeInTheDocument();
  });

  it('marks unread items with the unread indicator', () => {
    const { container } = render(
      <NotificationItem message="New comment" read={false} />
    );
    expect(screen.getByLabelText('Unread')).toBeInTheDocument();
    expect(container.querySelector('.bg-primary\\/5')).toBeInTheDocument();
  });

  it('does not show the unread indicator when read', () => {
    render(<NotificationItem message="New comment" read />);
    expect(screen.queryByLabelText('Unread')).not.toBeInTheDocument();
  });
});
