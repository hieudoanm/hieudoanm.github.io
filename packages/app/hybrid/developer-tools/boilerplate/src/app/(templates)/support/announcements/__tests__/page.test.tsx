import { render, screen } from '@testing-library/react';
import AnnouncementsPage from '@/app/(templates)/support/announcements/page';

describe('AnnouncementsPage', () => {
  it('renders the AnnouncementsPage', () => {
    render(<AnnouncementsPage />);
    expect(screen.getByText('5 announcements')).toBeInTheDocument();
  });
});
