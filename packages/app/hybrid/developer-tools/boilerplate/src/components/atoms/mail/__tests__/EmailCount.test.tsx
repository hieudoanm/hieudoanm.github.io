import { render, screen } from '@testing-library/react';
import { EmailCount } from '../EmailCount';

describe('EmailCount', () => {
  it('renders the count with the default label', () => {
    render(<EmailCount count={12} />);
    expect(screen.getByTestId('email-count')).toHaveTextContent('12 emails');
  });

  it('renders a custom label', () => {
    render(<EmailCount count={3} label="new" />);
    expect(screen.getByTestId('email-count')).toHaveTextContent('3 new');
  });

  it('renders zero without crashing', () => {
    render(<EmailCount count={0} />);
    expect(screen.getByTestId('email-count')).toHaveTextContent('0 emails');
  });
});
