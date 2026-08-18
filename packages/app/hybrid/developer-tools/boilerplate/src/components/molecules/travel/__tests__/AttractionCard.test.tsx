import { render, screen } from '@testing-library/react';
import { AttractionCard } from '../AttractionCard';

describe('AttractionCard', () => {
  it('renders name, location and duration', () => {
    render(
      <AttractionCard
        name="Golden Bridge"
        location="Da Nang"
        duration="2h"
        description="Iconic footbridge held by giant hands."
      />
    );
    expect(screen.getByText('Golden Bridge')).toBeInTheDocument();
    expect(screen.getByText('📍 Da Nang · ⏱ 2h')).toBeInTheDocument();
    expect(
      screen.getByText('Iconic footbridge held by giant hands.')
    ).toBeInTheDocument();
  });

  it('shows rating and price when provided', () => {
    render(
      <AttractionCard
        name="Golden Bridge"
        location="Da Nang"
        rating={4.7}
        price={25}
      />
    );
    expect(screen.getByTestId('attraction-rating')).toHaveTextContent('4.7');
    expect(screen.getByTestId('attraction-price')).toHaveTextContent('$25.00');
  });

  it('omits optional fields when not provided', () => {
    render(<AttractionCard name="Golden Bridge" />);
    expect(screen.queryByTestId('attraction-rating')).not.toBeInTheDocument();
    expect(screen.queryByTestId('attraction-price')).not.toBeInTheDocument();
  });
});
