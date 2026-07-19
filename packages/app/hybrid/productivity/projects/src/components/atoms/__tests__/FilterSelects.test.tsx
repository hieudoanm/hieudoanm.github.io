import { render, screen, fireEvent } from '@testing-library/react';
import { DueFilterSelect } from '@/components/atoms/DueFilterSelect';
import { PriorityFilterSelect } from '@/components/atoms/PriorityFilterSelect';

describe('DueFilterSelect', () => {
  it('renders all due date options and reports changes', () => {
    const onChange = jest.fn();
    render(<DueFilterSelect value="all" onChange={onChange} />);
    expect(screen.getByLabelText('Due date filter')).toHaveValue('all');
    fireEvent.change(screen.getByLabelText('Due date filter'), {
      target: { value: 'overdue' },
    });
    expect(onChange).toHaveBeenCalledWith('overdue');
  });
});

describe('PriorityFilterSelect', () => {
  it('renders all priority options and reports changes', () => {
    const onChange = jest.fn();
    render(<PriorityFilterSelect value="all" onChange={onChange} />);
    expect(screen.getByLabelText('Priority filter')).toHaveValue('all');
    fireEvent.change(screen.getByLabelText('Priority filter'), {
      target: { value: 'urgent' },
    });
    expect(onChange).toHaveBeenCalledWith('urgent');
  });
});
