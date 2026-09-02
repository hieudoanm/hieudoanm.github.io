import { render, screen } from '@testing-library/react';
import Header from '../Header';

describe('Header', () => {
  it('links home and shows the Menu brand', () => {
    render(<Header />);
    const home = screen.getByLabelText('Home');
    expect(home.getAttribute('href')).toBe('/');
    expect(screen.getByRole('link', { name: /menu/i })).toBeInTheDocument();
  });
});