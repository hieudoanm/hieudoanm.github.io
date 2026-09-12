import { fireEvent, render, screen } from '@testing-library/react';
import { Chemistry } from '../index';

describe('Chemistry', () => {
  it('renders a periodic table with elements and category filters', () => {
    render(<Chemistry />);
    expect(
      screen.getByRole('heading', { name: 'Periodic Table' })
    ).toBeInTheDocument();
    expect(screen.getAllByTitle('Hydrogen').length).toBeGreaterThan(0);
    expect(
      screen.getByRole('button', { name: 'Noble Gas' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Transition Metal' })
    ).toBeInTheDocument();
  });

  it('toggles a category filter on and off', () => {
    render(<Chemistry />);
    const button = screen.getByRole('button', { name: 'Noble Gas' });
    fireEvent.click(button);
    expect(button).toHaveClass('ring-primary');
    fireEvent.click(button);
    expect(button).not.toHaveClass('ring-primary');
  });
});
