import { render, screen } from '@testing-library/react';
import GroupsPage from '@/app/(templates)/social/groups/page';

describe('GroupsPage', () => {
  it('renders the groups page', () => {
    render(<GroupsPage />);
    expect(screen.getByRole('heading', { name: 'Groups' })).toBeInTheDocument();
  });
});
