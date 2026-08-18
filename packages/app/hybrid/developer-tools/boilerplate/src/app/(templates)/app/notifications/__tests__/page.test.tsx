import { render, screen } from '@testing-library/react';
import NotificationsPage from '@/app/(templates)/app/notifications/page';

describe('NotificationsPage', () => {
  it('renders the NotificationsPage', () => {
    render(<NotificationsPage />);
    expect(screen.getByText('Welcome to the workspace')).toBeInTheDocument();
  });
});
