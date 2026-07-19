import { render, screen } from '@testing-library/react';
import { DistanceLabel } from '../DistanceLabel';

describe('DistanceLabel', () => {
  it('renders the value with the default unit', () => {
    render(<DistanceLabel value={12} />);
    expect(screen.getByTestId('distance-label')).toHaveTextContent('12 km');
  });

  it('renders a custom unit', () => {
    render(<DistanceLabel value={8} unit="mi" />);
    expect(screen.getByTestId('distance-label')).toHaveTextContent('8 mi');
  });

  it('formats large values with thousands separators', () => {
    render(<DistanceLabel value={1500} />);
    expect(screen.getByTestId('distance-label')).toHaveTextContent('1,500 km');
  });
});
