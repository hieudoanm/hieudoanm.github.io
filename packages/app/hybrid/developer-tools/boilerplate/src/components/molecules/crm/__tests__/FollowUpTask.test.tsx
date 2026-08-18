import { fireEvent, render, screen } from '@testing-library/react';
import { FollowUpTask } from '../FollowUpTask';

describe('FollowUpTask', () => {
  it('renders the task, due date and owner', () => {
    render(
      <FollowUpTask
        id="1"
        title="Call Alice"
        dueDate="Aug 10, 2026"
        owner="Jane"
      />
    );
    expect(screen.getByText('Call Alice')).toBeInTheDocument();
    expect(screen.getByText('Due Aug 10, 2026 · Jane')).toBeInTheDocument();
  });

  it('shows the Pending badge initially', () => {
    render(<FollowUpTask id="1" title="Call Alice" dueDate="D" owner="O" />);
    expect(screen.getByText('Pending')).toBeInTheDocument();
    expect(screen.getByText('Pending')).toHaveClass('badge-warning');
  });

  it('toggles completion and fires onChange', () => {
    const onChange = jest.fn();
    render(
      <FollowUpTask
        id="1"
        title="Call Alice"
        dueDate="D"
        owner="O"
        onChange={onChange}
      />
    );
    fireEvent.click(screen.getByLabelText('Mark Call Alice done'));
    expect(onChange).toHaveBeenCalledWith('1', true);
    expect(screen.getByText('Done')).toBeInTheDocument();
    expect(screen.getByText('Done')).toHaveClass('badge-success');
  });

  it('respects the completed initial state', () => {
    render(
      <FollowUpTask id="1" title="Call Alice" dueDate="D" owner="O" completed />
    );
    expect(screen.getByText('Done')).toBeInTheDocument();
    expect(screen.getByLabelText('Mark Call Alice done')).toBeChecked();
  });
});
