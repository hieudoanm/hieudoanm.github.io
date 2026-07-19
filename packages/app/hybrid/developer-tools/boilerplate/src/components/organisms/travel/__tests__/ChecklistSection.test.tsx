import { fireEvent, render, screen } from '@testing-library/react';
import { ChecklistSection } from '../ChecklistSection';

const items = [
  { id: 'c1', label: 'Passport', checked: true },
  { id: 'c2', label: 'Power bank', category: 'Electronics' },
];

describe('ChecklistSection', () => {
  it('renders the title and checklist items', () => {
    render(<ChecklistSection items={items} />);
    expect(screen.getByText('Packing checklist')).toBeInTheDocument();
    expect(screen.getByText('Passport')).toBeInTheDocument();
    expect(screen.getByText('Power bank')).toBeInTheDocument();
    expect(screen.getByText('Electronics')).toBeInTheDocument();
  });

  it('shows the completed count', () => {
    render(<ChecklistSection items={items} />);
    expect(screen.getByText('1/2')).toBeInTheDocument();
  });

  it('toggles an item when its checkbox is clicked', () => {
    render(<ChecklistSection items={items} />);
    fireEvent.click(screen.getByLabelText('Check Power bank'));
    expect(screen.getByText('2/2')).toBeInTheDocument();
  });

  it('shows an empty state when there are no items', () => {
    render(<ChecklistSection items={[]} />);
    expect(screen.getByText('Checklist is empty')).toBeInTheDocument();
  });
});
