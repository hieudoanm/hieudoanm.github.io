import { fireEvent, render, screen } from '@testing-library/react';
import { AnnouncementsTemplate } from '../AnnouncementsTemplate';

describe('AnnouncementsTemplate', () => {
  it('renders all announcements and the summary', () => {
    render(<AnnouncementsTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Announcements' })
    ).toBeInTheDocument();
    expect(screen.getByText('5 announcements')).toBeInTheDocument();
    expect(screen.getByText('Dark mode is here')).toBeInTheDocument();
    expect(screen.getByText('Aug 1, 2026')).toBeInTheDocument();
  });

  it('filters announcements by type', () => {
    render(<AnnouncementsTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Maintenance' }));
    expect(
      screen.getByText('Scheduled maintenance on August 9')
    ).toBeInTheDocument();
    expect(screen.getByText('Payment processing upgrade')).toBeInTheDocument();
    expect(screen.queryByText('Dark mode is here')).not.toBeInTheDocument();
    expect(screen.getByText('2 announcements')).toBeInTheDocument();
  });

  it('shows new feature announcements', () => {
    render(<AnnouncementsTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'New feature' }));
    expect(screen.getByText('Dark mode is here')).toBeInTheDocument();
    expect(screen.getByText('New keyboard shortcuts')).toBeInTheDocument();
    expect(
      screen.queryByText('Improved search performance')
    ).not.toBeInTheDocument();
  });
});
