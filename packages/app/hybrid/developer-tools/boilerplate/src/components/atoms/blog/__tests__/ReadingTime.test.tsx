import { render, screen } from '@testing-library/react';
import { ReadingTime } from '../ReadingTime';

describe('ReadingTime', () => {
  it('renders minutes as "min read"', () => {
    render(<ReadingTime minutes={5} />);
    expect(screen.getByText('5 min read')).toBeInTheDocument();
  });

  it('renders singular wording for one minute', () => {
    render(<ReadingTime minutes={1} />);
    expect(screen.getByText('1 min read')).toBeInTheDocument();
  });

  it('renders a label prefix when provided', () => {
    render(<ReadingTime minutes={8} label="Estimated" />);
    expect(screen.getByTestId('reading-time')).toHaveTextContent(
      'Estimated: 8 min read'
    );
  });

  it('handles zero minutes', () => {
    render(<ReadingTime minutes={0} />);
    expect(screen.getByText('0 min read')).toBeInTheDocument();
  });
});
