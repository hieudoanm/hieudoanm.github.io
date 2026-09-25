import { render, screen, fireEvent } from '@testing-library/react';
import { POS_VIEWS, ViewToolbar } from '@/components/pos/molecules/ViewToolbar';

describe('ViewToolbar', () => {
  it('renders a button for every navigable view', () => {
    render(<ViewToolbar onSelect={jest.fn()} />);
    for (const { label } of POS_VIEWS) {
      expect(screen.getByText(label)).toBeInTheDocument();
    }
  });

  it('excludes the sale and payment views from the toolbar', () => {
    expect(POS_VIEWS.map((v) => v.view)).not.toContain('sale');
    expect(POS_VIEWS.map((v) => v.view)).not.toContain('payment');
  });

  it('reports the selected view', () => {
    const onSelect = jest.fn();
    render(<ViewToolbar onSelect={onSelect} />);
    fireEvent.click(screen.getByText('Reports'));
    expect(onSelect).toHaveBeenCalledWith('reports');
  });
});
