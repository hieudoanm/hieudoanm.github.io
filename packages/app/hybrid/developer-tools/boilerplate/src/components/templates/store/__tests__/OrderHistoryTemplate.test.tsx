import { render, screen } from '@testing-library/react';
import { OrderHistoryTemplate } from '../OrderHistoryTemplate';

describe('OrderHistoryTemplate', () => {
  it('renders orders with status badges', () => {
    render(<OrderHistoryTemplate />);
    expect(screen.getByText('ORD-2024-3847')).toBeInTheDocument();
    expect(screen.getAllByText('Delivered').length).toBe(3);
    expect(screen.getByText('4 items')).toBeInTheDocument();
    expect(screen.getByText('$746')).toBeInTheDocument();
  });

  it('applies status colors', () => {
    render(<OrderHistoryTemplate />);
    expect(screen.getAllByText('Delivered')[0]).toHaveClass('badge-success');
    expect(screen.getByText('Processing')).toHaveClass('badge-warning');
  });
});
