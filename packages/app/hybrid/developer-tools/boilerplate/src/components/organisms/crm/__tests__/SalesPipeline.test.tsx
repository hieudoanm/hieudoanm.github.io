import { render, screen } from '@testing-library/react';
import { SalesPipeline } from '../SalesPipeline';

describe('SalesPipeline', () => {
  it('renders stages with deals and values', () => {
    render(
      <SalesPipeline
        stages={[
          {
            id: 'a',
            name: 'Qualified',
            deals: [{ id: '1', name: 'Acme Corp', value: 5000, owner: 'Jane' }],
          },
        ]}
      />
    );
    expect(screen.getByText('Sales pipeline')).toBeInTheDocument();
    expect(screen.getByText('Qualified')).toBeInTheDocument();
    expect(screen.getByText('Acme Corp')).toBeInTheDocument();
    expect(screen.getByText('$5,000')).toBeInTheDocument();
    expect(screen.getByText('Jane')).toBeInTheDocument();
  });

  it('shows empty state for stages without deals', () => {
    render(
      <SalesPipeline
        stages={[{ id: 'b', name: 'Closed', deals: [] }]}
        title="Pipeline"
      />
    );
    expect(screen.getByText('Pipeline')).toBeInTheDocument();
    expect(screen.getByText('Empty')).toBeInTheDocument();
  });
});
