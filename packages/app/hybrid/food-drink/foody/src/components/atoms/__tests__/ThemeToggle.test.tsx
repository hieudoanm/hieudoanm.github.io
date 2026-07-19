import { fireEvent, render, screen } from '@testing-library/react';
import { ThemeToggle } from '../ThemeToggle';

describe('ThemeToggle', () => {
  it('switches between light and dark themes', () => {
    render(<ThemeToggle />);
    const button = screen.getByLabelText('Toggle theme');
    expect(document.documentElement.dataset.theme).toBe('foody-light');
    fireEvent.click(button);
    expect(document.documentElement.dataset.theme).toBe('foody-dark');
    fireEvent.click(button);
    expect(document.documentElement.dataset.theme).toBe('foody-light');
  });
});
