import { render, screen } from '@testing-library/react';
import MeetingsPage from '@/app/(templates)/app/meetings/page';

describe('MeetingsPage', () => {
  it('renders the MeetingsPage', () => {
    render(<MeetingsPage />);
    expect(screen.getByText('Product sync')).toBeInTheDocument();
  });
});
