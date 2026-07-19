import { render, screen } from '@testing-library/react';
import { DestinationCard } from '../DestinationCard';

describe('DestinationCard', () => {
  it('renders name, country and price', () => {
    render(
      <DestinationCard name="Ha Long Bay" country="Vietnam" price={299} />
    );
    expect(screen.getByText('Ha Long Bay')).toBeInTheDocument();
    expect(screen.getByText('Vietnam')).toBeInTheDocument();
    expect(screen.getByTestId('destination-price')).toHaveTextContent(
      '$299.00'
    );
  });

  it('shows rating when provided', () => {
    render(
      <DestinationCard name="Ha Long Bay" country="Vietnam" rating={4.8} />
    );
    expect(screen.getByTestId('destination-rating')).toHaveTextContent('4.8');
  });

  it('omits rating and price when not provided', () => {
    render(<DestinationCard name="Ha Long Bay" />);
    expect(screen.queryByTestId('destination-rating')).not.toBeInTheDocument();
    expect(screen.queryByTestId('destination-price')).not.toBeInTheDocument();
  });
});
