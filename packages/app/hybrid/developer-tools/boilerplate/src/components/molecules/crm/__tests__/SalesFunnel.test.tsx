import { render, screen } from '@testing-library/react';
import { SalesFunnel } from '../SalesFunnel';

const stages = [
  { label: 'Leads', count: 100 },
  { label: 'Qualified', count: 60 },
  { label: 'Won', count: 20 },
];

describe('SalesFunnel', () => {
  it('renders each stage label and count', () => {
    render(<SalesFunnel stages={stages} />);
    expect(screen.getByText('Leads')).toBeInTheDocument();
    expect(screen.getByText('Qualified')).toBeInTheDocument();
    expect(screen.getByText('Won')).toBeInTheDocument();
    expect(screen.getByText('20')).toBeInTheDocument();
  });

  it('scales the leading stage to full width', () => {
    const { container } = render(<SalesFunnel stages={stages} />);
    const bars = container.querySelectorAll('[data-testid="sales-funnel"] div');
    const leadBar = Array.from(container.querySelectorAll('div')).find(
      (div) => div.style.width === '100%'
    );
    expect(leadBar).toBeDefined();
  });

  it('handles empty stages gracefully', () => {
    render(<SalesFunnel stages={[]} />);
    expect(screen.getByText('Sales funnel')).toBeInTheDocument();
  });
});
