import { render, screen } from '@testing-library/react';
import KanbanPage from '@/app/(templates)/app/kanban/page';

describe('KanbanPage', () => {
  it('renders the KanbanPage', () => {
    render(<KanbanPage />);
    expect(screen.getByText('Kanban board')).toBeInTheDocument();
  });
});
