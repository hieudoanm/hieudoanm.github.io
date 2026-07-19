import { render, screen } from '@testing-library/react';
import { PublishedDate } from '../PublishedDate';

describe('PublishedDate', () => {
  it('renders iso format when requested', () => {
    render(<PublishedDate date="2024-01-15T10:00:00Z" format="iso" />);
    expect(screen.getByTestId('published-date')).toHaveTextContent(
      '2024-01-15'
    );
  });

  it('renders a date containing the year by default', () => {
    render(<PublishedDate date="2024-01-15T10:00:00Z" />);
    expect(screen.getByTestId('published-date')).toHaveTextContent('2024');
  });

  it('sets the dateTime attribute', () => {
    render(<PublishedDate date="2024-01-15T10:00:00Z" />);
    expect(screen.getByTestId('published-date')).toHaveAttribute(
      'datetime',
      '2024-01-15T10:00:00.000Z'
    );
  });
});
