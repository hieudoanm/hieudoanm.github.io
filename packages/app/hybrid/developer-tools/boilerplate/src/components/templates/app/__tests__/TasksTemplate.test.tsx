import { fireEvent, render, screen } from '@testing-library/react';
import { TasksTemplate } from '../TasksTemplate';

describe('TasksTemplate', () => {
  it('renders the task list with a done summary', () => {
    render(<TasksTemplate />);
    expect(screen.getByText('Write onboarding docs')).toBeInTheDocument();
    expect(screen.getByText('Fix login bug')).toBeInTheDocument();
    expect(screen.getByText('Deploy staging')).toBeInTheDocument();
    expect(screen.getByText('1 of 3 done')).toBeInTheDocument();
    expect(screen.getByText('Fix login bug')).toHaveClass('line-through');
    expect(screen.getByText('Write onboarding docs')).not.toHaveClass(
      'line-through'
    );
  });

  it('adds a task and falls back to a default title for empty input', () => {
    render(<TasksTemplate />);
    fireEvent.change(screen.getByLabelText('New task'), {
      target: { value: 'Deploy to prod' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Add' }));
    expect(screen.getByText('Deploy to prod')).toBeInTheDocument();
    expect(screen.getByText('1 of 4 done')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Add' }));
    expect(screen.getAllByText('Untitled task').length).toBeGreaterThan(0);
    expect(screen.getByText('1 of 5 done')).toBeInTheDocument();
  });

  it('toggles a task between done and active', () => {
    render(<TasksTemplate />);
    fireEvent.click(
      screen.getByRole('checkbox', { name: 'Toggle Write onboarding docs' })
    );
    expect(screen.getByText('Write onboarding docs')).toHaveClass(
      'line-through'
    );
    expect(screen.getByText('2 of 3 done')).toBeInTheDocument();
    fireEvent.click(
      screen.getByRole('checkbox', { name: 'Toggle Write onboarding docs' })
    );
    expect(screen.getByText('1 of 3 done')).toBeInTheDocument();
  });

  it('filters tasks by status', () => {
    render(<TasksTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Active' }));
    expect(screen.getByText('Write onboarding docs')).toBeInTheDocument();
    expect(screen.queryByText('Fix login bug')).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Done' }));
    expect(screen.getByText('Fix login bug')).toBeInTheDocument();
    expect(screen.queryByText('Write onboarding docs')).not.toBeInTheDocument();
  });

  it('deletes tasks and shows the empty state per filter', () => {
    render(<TasksTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Done' }));
    fireEvent.click(
      screen.getByRole('button', { name: 'Delete Fix login bug' })
    );
    expect(screen.getByText('No tasks')).toBeInTheDocument();
  });
});
