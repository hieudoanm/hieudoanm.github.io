import { render, screen } from '@testing-library/react';
import { HireDate } from '../HireDate';

describe('HireDate', () => {
  it('formats a Date object', () => {
    render(<HireDate date={new Date('2020-01-15T00:00:00Z')} />);
    expect(screen.getByTestId('hire-date')).toHaveTextContent('2020');
  });

  it('formats a date string', () => {
    render(<HireDate date="2021-06-01" />);
    expect(screen.getByTestId('hire-date')).toHaveTextContent('2021');
  });

  it('renders a placeholder for invalid dates', () => {
    render(<HireDate date="not-a-date" />);
    expect(screen.getByTestId('hire-date')).toHaveTextContent('—');
  });

  it('omits the icon when disabled', () => {
    render(<HireDate date="2021-06-01" showIcon={false} />);
    expect(screen.queryByText('📅')).not.toBeInTheDocument();
  });
});
