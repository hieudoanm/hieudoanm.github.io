import { fireEvent, render, screen } from '@testing-library/react';
import { AllocationTemplate } from '../AllocationTemplate';

describe('AllocationTemplate', () => {
  it('renders the allocation breakdown and total', () => {
    render(<AllocationTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Allocation' })
    ).toBeInTheDocument();
    expect(screen.getByText('5 asset classes')).toBeInTheDocument();
    expect(screen.getByText('100% allocated')).toBeInTheDocument();
    expect(screen.getByText('$61,656')).toBeInTheDocument();
    expect(screen.getByText('Real Estate')).toBeInTheDocument();
  });

  it('shows details for a selected asset', () => {
    render(<AllocationTemplate />);
    expect(screen.getByText('Details for Stocks')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Real Estate'));
    expect(screen.getByText('Details for Real Estate')).toBeInTheDocument();
  });
});
