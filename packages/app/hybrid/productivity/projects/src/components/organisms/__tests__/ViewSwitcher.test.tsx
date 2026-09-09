import { render, screen, fireEvent } from '@testing-library/react';
import { ViewSwitcher } from '@/components/organisms/ViewSwitcher';

describe('ViewSwitcher', () => {
  it('renders all view options with the active one pressed', () => {
    const onChange = jest.fn();
    render(<ViewSwitcher value="kanban" onChange={onChange} />);
    for (const label of ['Kanban', 'List', 'Calendar', 'Timeline', 'Tasks']) {
      expect(screen.getByRole('button', { name: label })).toBeInTheDocument();
    }
    expect(screen.getByRole('button', { name: 'Kanban' })).toHaveAttribute(
      'aria-pressed',
      'true'
    );
    expect(screen.getByRole('button', { name: 'List' })).toHaveAttribute(
      'aria-pressed',
      'false'
    );
  });

  it('calls onChange with the clicked view', () => {
    const onChange = jest.fn();
    render(<ViewSwitcher value="kanban" onChange={onChange} />);
    fireEvent.click(screen.getByRole('button', { name: 'Calendar' }));
    fireEvent.click(screen.getByRole('button', { name: 'List' }));
    expect(onChange).toHaveBeenCalledWith('calendar');
    expect(onChange).toHaveBeenCalledWith('list');
  });
});
