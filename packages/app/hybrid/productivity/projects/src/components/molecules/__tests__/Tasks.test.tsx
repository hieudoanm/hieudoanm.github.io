import { render, screen, fireEvent } from '@testing-library/react';
import { TaskInput } from '@/components/molecules/TaskInput';
import { TaskItem } from '@/components/molecules/TaskItem';
import type { Task } from '@/types';

const task = (): Task => ({
  id: 'task-1',
  userId: 'mem-1',
  text: 'Ship it',
  completed: false,
  createdAt: 1,
  updatedAt: 2,
});

describe('TaskInput', () => {
  it('renders an input and add button', () => {
    render(<TaskInput value="" onChange={() => {}} onAdd={() => {}} />);
    expect(screen.getByLabelText('New task')).toBeInTheDocument();
    expect(screen.getByLabelText('Add task')).toBeDisabled();
  });

  it('disables the add button until text is entered', () => {
    render(<TaskInput value="a" onChange={() => {}} onAdd={() => {}} />);
    expect(screen.getByLabelText('Add task')).toBeEnabled();
  });

  it('calls onChange while typing and onAdd on Enter', () => {
    const onChange = jest.fn();
    const onAdd = jest.fn();
    render(<TaskInput value="" onChange={onChange} onAdd={onAdd} />);
    fireEvent.change(screen.getByLabelText('New task'), {
      target: { value: 'x' },
    });
    expect(onChange).toHaveBeenCalledWith('x');
    fireEvent.keyDown(screen.getByLabelText('New task'), { key: 'Enter' });
    expect(onAdd).toHaveBeenCalled();
  });
});

describe('TaskItem', () => {
  it('renders the task text with toggle and delete controls', () => {
    render(<TaskItem task={task()} onToggle={() => {}} onDelete={() => {}} />);
    expect(screen.getByText('Ship it')).toBeInTheDocument();
    expect(screen.getByLabelText('Toggle Ship it')).toBeInTheDocument();
    expect(screen.getByLabelText('Delete Ship it')).toBeInTheDocument();
  });

  it('calls onToggle and onDelete', () => {
    const onToggle = jest.fn();
    const onDelete = jest.fn();
    render(<TaskItem task={task()} onToggle={onToggle} onDelete={onDelete} />);
    fireEvent.click(screen.getByLabelText('Toggle Ship it'));
    fireEvent.click(screen.getByLabelText('Delete Ship it'));
    expect(onToggle).toHaveBeenCalledWith(task());
    expect(onDelete).toHaveBeenCalledWith('task-1');
  });

  it('strikes through completed tasks', () => {
    render(
      <TaskItem
        task={{ ...task(), completed: true }}
        onToggle={() => {}}
        onDelete={() => {}}
      />
    );
    expect(screen.getByText('Ship it')).toHaveClass('line-through');
  });
});
