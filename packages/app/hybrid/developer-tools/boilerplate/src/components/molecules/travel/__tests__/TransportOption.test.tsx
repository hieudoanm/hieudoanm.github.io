import { render, screen } from '@testing-library/react';
import { TransportOption } from '../TransportOption';

describe('TransportOption', () => {
  it('renders type, provider and duration', () => {
    render(
      <TransportOption
        type="train"
        provider="Vietnam Railways"
        duration="2h 30m"
        price={15}
      />
    );
    expect(screen.getByText('train')).toBeInTheDocument();
    expect(screen.getByText('Vietnam Railways')).toBeInTheDocument();
    expect(screen.getByText('2h 30m')).toBeInTheDocument();
  });

  it('renders formatted price', () => {
    render(
      <TransportOption
        type="taxi"
        provider="Grab"
        duration="45m"
        price={12.5}
      />
    );
    expect(screen.getByTestId('transport-price')).toHaveTextContent('$12.50');
  });

  it('shows departure when provided', () => {
    render(
      <TransportOption
        type="bus"
        provider="Futa"
        duration="6h"
        price={20}
        departure="07:00"
      />
    );
    expect(screen.getByText('Futa · Departs 07:00')).toBeInTheDocument();
  });
});
