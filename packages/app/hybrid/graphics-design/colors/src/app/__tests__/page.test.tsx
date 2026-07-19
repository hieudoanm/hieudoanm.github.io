import { render, screen } from '@testing-library/react';
import HomePage from '../page';

describe('HomePage', () => {
  it('renders the title and description', () => {
    render(<HomePage />);
    expect(screen.getByRole('heading', { name: 'Colors' })).toBeInTheDocument();
    expect(
      screen.getByText(
        'A collection of practical tools for picking, tuning and shipping color.'
      )
    ).toBeInTheDocument();
  });

  it('renders a tool card for the Color Converter', () => {
    render(<HomePage />);
    expect(screen.getByTestId('tool-card-converter')).toBeInTheDocument();
    expect(screen.getByText('Color Converter')).toBeInTheDocument();
  });

  it('renders the Theme Colors card', () => {
    render(<HomePage />);
    expect(screen.getByText('Theme Colors')).toBeInTheDocument();
    expect(screen.getByTestId('tool-card-theme')).toBeInTheDocument();
  });

  it('renders links to each tool route', () => {
    render(<HomePage />);
    expect(screen.getByTestId('tool-card-schemes')).toHaveAttribute(
      'href',
      '/schemes'
    );
    expect(screen.getByTestId('tool-card-random')).toHaveAttribute(
      'href',
      '/random'
    );
  });
});
