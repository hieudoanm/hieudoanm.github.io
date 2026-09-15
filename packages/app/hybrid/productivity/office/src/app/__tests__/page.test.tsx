import { render, screen } from '@testing-library/react';
import HomePage from '@/app/page';

describe('HomePage', () => {
  it('renders the calendar tool card', () => {
    render(<HomePage />);
    expect(screen.getByTestId('tool-card-calendar')).toBeInTheDocument();
  });

  it('links the calendar card to the calendar route', () => {
    render(<HomePage />);
    expect(screen.getByTestId('tool-card-calendar')).toHaveAttribute(
      'href',
      '/calendar'
    );
  });

  it('renders the csv tool card', () => {
    render(<HomePage />);
    expect(screen.getByTestId('tool-card-csv')).toBeInTheDocument();
  });

  it('links the csv card to the csv route', () => {
    render(<HomePage />);
    expect(screen.getByTestId('tool-card-csv')).toHaveAttribute('href', '/csv');
  });

  it('renders the md tool card', () => {
    render(<HomePage />);
    expect(screen.getByTestId('tool-card-md')).toBeInTheDocument();
  });

  it('links the md card to the md route', () => {
    render(<HomePage />);
    expect(screen.getByTestId('tool-card-md')).toHaveAttribute('href', '/md');
  });
});
