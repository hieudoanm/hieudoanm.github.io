import { render, screen } from '@testing-library/react';
import HomePage from '../page';

describe('HomePage', () => {
  it('renders heading', () => {
    render(<HomePage />);
    expect(screen.getByText('Countries Games')).toBeInTheDocument();
  });

  it('renders all game cards', () => {
    render(<HomePage />);
    expect(screen.getByText('Country Wordle')).toBeInTheDocument();
    expect(screen.getByText('Country Connections')).toBeInTheDocument();
  });

  it('renders game descriptions', () => {
    render(<HomePage />);
    expect(
      screen.getByText(/Guess the hidden country name/)
    ).toBeInTheDocument();
    expect(screen.getByText(/Group sixteen countries/)).toBeInTheDocument();
  });

  it('renders links to game pages', () => {
    render(<HomePage />);
    expect(screen.getByTestId('open-wordle').closest('a')).toHaveAttribute(
      'href',
      '/wordle'
    );
    expect(screen.getByTestId('open-connections').closest('a')).toHaveAttribute(
      'href',
      '/connections'
    );
  });
});
