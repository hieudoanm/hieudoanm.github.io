import { fireEvent, render, screen } from '@testing-library/react';
import { Checklist } from '../Checklist';

describe('Checklist', () => {
  const items = [
    { id: 'a', label: 'Plan', done: false },
    { id: 'b', label: 'Build', done: true },
  ];

  it('renders items with checkboxes', () => {
    render(<Checklist items={items} onToggle={jest.fn()} />);
    expect(screen.getByLabelText('Plan')).toBeInTheDocument();
    expect(screen.getByLabelText('Build')).toBeChecked();
  });

  it('toggles an item', () => {
    const onToggle = jest.fn();
    render(<Checklist items={items} onToggle={onToggle} />);
    fireEvent.click(screen.getByLabelText('Plan'));
    expect(onToggle).toHaveBeenCalledWith('a');
  });
});
