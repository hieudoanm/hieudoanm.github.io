import { render, screen } from '@testing-library/react';
import TasksPage from '@/app/(templates)/app/tasks/page';

describe('TasksPage', () => {
  it('renders the TasksPage', () => {
    render(<TasksPage />);
    expect(screen.getByText('1 of 3 done')).toBeInTheDocument();
  });
});
