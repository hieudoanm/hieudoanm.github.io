import { render, screen } from '@testing-library/react';
import SprintsPage from '@/app/(templates)/landing/sprints/page';

describe('SprintsPage', () => {
  it('renders the SprintsPage', () => {
    render(<SprintsPage />);
    expect(screen.getByText('Sprint 12')).toBeInTheDocument();
  });
});
