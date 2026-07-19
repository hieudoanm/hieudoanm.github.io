import { render, screen } from '@testing-library/react';
import { NightCount } from '../NightCount';

describe('NightCount', () => {
  it('renders the plural label for multiple nights', () => {
    render(<NightCount count={2} />);
    expect(screen.getByTestId('night-count')).toHaveTextContent('2 nights');
  });

  it('renders the singular label for one night', () => {
    render(<NightCount count={1} />);
    expect(screen.getByTestId('night-count')).toHaveTextContent('1 night');
  });

  it('renders a zero count', () => {
    render(<NightCount count={0} />);
    expect(screen.getByTestId('night-count')).toHaveTextContent('0 nights');
  });
});
