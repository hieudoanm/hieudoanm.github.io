import { fireEvent, render, screen } from '@testing-library/react';
import { MailFilters } from '../MailFilters';

describe('MailFilters', () => {
  const filters = [
    { id: '1', label: 'Newsletter', enabled: true },
    { id: '2', label: 'Promotions', enabled: false },
  ];

  it('renders filters with toggle state', () => {
    render(<MailFilters filters={filters} />);
    expect(screen.getByText('Newsletter')).toBeInTheDocument();
    expect(screen.getByLabelText('Newsletter')).toBeChecked();
    expect(screen.getByLabelText('Promotions')).not.toBeChecked();
  });

  it('fires onToggle when a filter is switched', () => {
    const onToggle = jest.fn();
    render(<MailFilters filters={filters} onToggle={onToggle} />);
    fireEvent.click(screen.getByLabelText('Promotions'));
    expect(onToggle).toHaveBeenCalledWith('2', true);
  });

  it('adds a new filter via onAdd', () => {
    const onAdd = jest.fn();
    render(<MailFilters filters={filters} onAdd={onAdd} />);
    fireEvent.change(screen.getByLabelText('New filter rule'), {
      target: { value: 'Receipts' },
    });
    fireEvent.click(screen.getByText('Add'));
    expect(onAdd).toHaveBeenCalledWith('Receipts');
  });

  it('shows an empty state when no filters exist', () => {
    render(<MailFilters filters={[]} />);
    expect(screen.getByText('No filters configured')).toBeInTheDocument();
  });
});
