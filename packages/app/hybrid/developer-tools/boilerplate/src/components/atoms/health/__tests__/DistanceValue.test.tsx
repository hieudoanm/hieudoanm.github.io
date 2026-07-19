import { render, screen } from '@testing-library/react';
import { DistanceValue } from '../DistanceValue';

describe('DistanceValue', () => {
  it('renders the distance with the default unit', () => {
    render(<DistanceValue distance={5.25} />);
    expect(screen.getByTestId('distance-value')).toHaveTextContent('5.25');
    expect(screen.getByTestId('distance-value')).toHaveTextContent('km');
  });

  it('renders the label text', () => {
    render(<DistanceValue distance={5.25} />);
    expect(screen.getByText('Distance')).toBeInTheDocument();
  });

  it('honors a custom unit', () => {
    render(<DistanceValue distance={3.26} unit="mi" />);
    expect(screen.getByTestId('distance-value')).toHaveTextContent('mi');
  });
});
