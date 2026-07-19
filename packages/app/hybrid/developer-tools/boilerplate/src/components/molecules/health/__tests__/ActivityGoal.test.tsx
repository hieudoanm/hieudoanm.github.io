import { fireEvent, render, screen } from '@testing-library/react';
import { ActivityGoal } from '../ActivityGoal';

describe('ActivityGoal', () => {
  it('renders label, current and target', () => {
    render(
      <ActivityGoal label="Steps" current={8000} target={10000} unit=" steps" />
    );
    expect(screen.getByText('Steps')).toBeInTheDocument();
    expect(screen.getByTestId('goal-current')).toHaveTextContent('8000');
    expect(screen.getByText('Goal 10000 steps')).toBeInTheDocument();
  });

  it('marks goal completed', () => {
    render(
      <ActivityGoal label="Steps" current={12000} target={10000} completed />
    );
    expect(screen.getByText('Completed')).toBeInTheDocument();
  });

  it('renders add button and fires onAdd', () => {
    const onAdd = jest.fn();
    render(
      <ActivityGoal
        label="Water"
        current={6}
        target={8}
        unit="L"
        onAdd={onAdd}
      />
    );
    fireEvent.click(screen.getByRole('button', { name: '+ Add' }));
    expect(onAdd).toHaveBeenCalledWith(1);
  });

  it('does not render add button without handler', () => {
    render(<ActivityGoal label="Steps" current={8000} target={10000} />);
    expect(
      screen.queryByRole('button', { name: '+ Add' })
    ).not.toBeInTheDocument();
  });
});
