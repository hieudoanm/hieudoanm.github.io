import { fireEvent, render, screen } from '@testing-library/react';
import { ChecklistCard } from '../ChecklistCard';

describe('ChecklistCard', () => {
  const items = [
    { id: 'passport', label: 'Passport' },
    { id: 'charger', label: 'Charger' },
  ];

  it('renders the title and item labels', () => {
    render(<ChecklistCard items={items} />);
    expect(screen.getByText('Packing checklist')).toBeInTheDocument();
    expect(screen.getByText('Passport')).toBeInTheDocument();
    expect(screen.getByText('Charger')).toBeInTheDocument();
  });

  it('checks items that are in defaultChecked', () => {
    render(<ChecklistCard items={items} defaultChecked={['passport']} />);
    expect(screen.getByLabelText('Passport')).toBeChecked();
    expect(screen.getByLabelText('Charger')).not.toBeChecked();
  });

  it('toggles an item when clicked', () => {
    render(<ChecklistCard items={items} />);
    const passport = screen.getByLabelText('Passport');
    expect(passport).not.toBeChecked();
    fireEvent.click(passport);
    expect(passport).toBeChecked();
    expect(screen.getByText('Passport')).toHaveClass('line-through');
    fireEvent.click(passport);
    expect(passport).not.toBeChecked();
  });
});
