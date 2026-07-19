import { render, screen } from '@testing-library/react';
import { CompareTable } from '../CompareTable';

describe('CompareTable', () => {
  const products = ['Phone A', 'Phone B'];

  it('renders a feature column per product', () => {
    render(<CompareTable products={products} rows={[]} />);
    expect(screen.getByText('Feature')).toBeInTheDocument();
    expect(screen.getByText('Phone A')).toBeInTheDocument();
    expect(screen.getByText('Phone B')).toBeInTheDocument();
  });

  it('renders row labels and values', () => {
    const rows = [
      { label: 'Price', values: [799, 899] },
      { label: 'Battery', values: ['24h', '30h'] },
    ];
    render(<CompareTable products={products} rows={rows} />);
    expect(screen.getByText('Price')).toBeInTheDocument();
    expect(screen.getByText('799')).toBeInTheDocument();
    expect(screen.getByText('899')).toBeInTheDocument();
    expect(screen.getByText('30h')).toBeInTheDocument();
  });

  it('renders an empty table body for empty rows', () => {
    const { container } = render(
      <CompareTable products={products} rows={[]} />
    );
    expect(container.querySelector('tbody')?.children.length).toBe(0);
  });
});
