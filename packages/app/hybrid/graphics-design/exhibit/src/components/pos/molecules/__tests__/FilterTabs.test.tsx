import { render, screen, fireEvent } from '@testing-library/react';
import { FilterTabs } from '@/components/pos/molecules/FilterTabs';

const TABS = [
  { key: 'all', label: 'All (2)', activeClass: 'btn-primary' },
  { key: 'low', label: 'Low Stock (1)', activeClass: 'btn-warning' },
];

describe('FilterTabs', () => {
  it('renders every tab label', () => {
    render(<FilterTabs tabs={TABS} active="all" onSelect={jest.fn()} />);
    expect(screen.getByText('All (2)')).toBeInTheDocument();
    expect(screen.getByText('Low Stock (1)')).toBeInTheDocument();
  });

  it('marks the active tab', () => {
    render(<FilterTabs tabs={TABS} active="low" onSelect={jest.fn()} />);
    expect(screen.getByText('Low Stock (1)')).toHaveClass('btn-warning');
    expect(screen.getByText('All (2)')).toHaveClass('btn-ghost');
  });

  it('reports the selected key', () => {
    const onSelect = jest.fn();
    render(<FilterTabs tabs={TABS} active="all" onSelect={onSelect} />);
    fireEvent.click(screen.getByText('Low Stock (1)'));
    expect(onSelect).toHaveBeenCalledWith('low');
  });

  it('applies an extra class to a tab', () => {
    const onSelect = jest.fn();
    render(
      <FilterTabs
        tabs={[{ ...TABS[0], className: 'capitalize' }]}
        active="all"
        onSelect={onSelect}
      />
    );
    expect(screen.getByText('All (2)')).toHaveClass('capitalize');
  });
});
