import { render, screen } from '@testing-library/react';
import { TimeZone } from '../TimeZone';

describe('TimeZone', () => {
  it('renders the timezone', () => {
    render(<TimeZone timezone="Asia/Tokyo" />);
    expect(screen.getByTestId('time-zone')).toHaveTextContent('Asia/Tokyo');
  });

  it('renders the city prefix when provided', () => {
    render(<TimeZone timezone="UTC+9" city="Tokyo" />);
    expect(screen.getByTestId('time-zone')).toHaveTextContent('Tokyo · UTC+9');
  });

  it('omits the city prefix when not provided', () => {
    render(<TimeZone timezone="Europe/Paris" />);
    expect(screen.getByTestId('time-zone')).not.toHaveTextContent('·');
  });
});
