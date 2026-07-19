import { render, screen } from '@testing-library/react';
import { BusinessNews } from '../BusinessNews';

const market = [
  { symbol: 'ACME', name: 'Acme Corp', price: '120.50', change: '+2.10' },
  { symbol: 'ZBX', name: 'Zebra Exchange', price: '48.20', change: '-1.05' },
];

const headlines = [
  { title: 'Rates hold steady', source: 'Wire' },
  { title: 'Retail sales climb', source: 'Report' },
];

describe('BusinessNews', () => {
  it('renders the market table', () => {
    render(<BusinessNews market={market} headlines={headlines} />);
    expect(screen.getByText('ACME')).toBeInTheDocument();
    expect(screen.getByText('120.50')).toBeInTheDocument();
    expect(screen.getByText('+2.10')).toBeInTheDocument();
    expect(screen.getByText('48.20')).toBeInTheDocument();
  });

  it('colors gains and losses differently', () => {
    render(<BusinessNews market={market} headlines={headlines} />);
    expect(screen.getByText('+2.10')).toHaveClass('text-success');
    expect(screen.getByText('-1.05')).toHaveClass('text-error');
  });

  it('renders business headlines', () => {
    render(<BusinessNews market={market} headlines={headlines} />);
    expect(screen.getByText('Rates hold steady')).toBeInTheDocument();
    expect(screen.getByText('Retail sales climb')).toBeInTheDocument();
  });

  it('renders the section title', () => {
    render(
      <BusinessNews market={market} headlines={headlines} title="Finance" />
    );
    expect(screen.getByText('Finance')).toBeInTheDocument();
  });
});
