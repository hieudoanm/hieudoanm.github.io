import { render, screen } from '@testing-library/react';
import RateList from '../RateList';
import { currencyRates } from '@/data/mock';

describe('RateList', () => {
  it('renders heading', () => {
    render(<RateList rates={currencyRates} />);
    expect(screen.getByText('Exchange Rates')).toBeInTheDocument();
  });

  it('renders all currency rates', () => {
    render(<RateList rates={currencyRates} />);
    expect(screen.getByText('USD')).toBeInTheDocument();
    expect(screen.getByText('EUR')).toBeInTheDocument();
    expect(screen.getByText('GBP')).toBeInTheDocument();
    expect(screen.getByText('JPY')).toBeInTheDocument();
  });

  it('renders rate values', () => {
    render(<RateList rates={currencyRates} />);
    expect(screen.getByText('1.0000')).toBeInTheDocument();
    expect(screen.getByText('0.9200')).toBeInTheDocument();
  });
});
