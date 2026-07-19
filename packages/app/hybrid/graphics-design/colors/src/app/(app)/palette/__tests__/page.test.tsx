import { render, screen } from '@testing-library/react';
import Page from '../page';

jest.mock('next/navigation', () => ({
  usePathname: () => '/palette/',
}));

describe('PalettePage', () => {
  it('renders the page with its heading and description', () => {
    render(<Page />);
    expect(
      screen.getByRole('heading', { name: 'Palette Generator' })
    ).toBeInTheDocument();
    expect(
      screen.getByText('Roll a random harmonious color palette')
    ).toBeInTheDocument();
  });

  it('renders the generate button', () => {
    render(<Page />);
    expect(screen.getByLabelText('Generate a new palette')).toBeInTheDocument();
  });

  it('renders the palette description text', () => {
    render(<Page />);
    expect(
      screen.getByText('A random but harmonious five-color palette.')
    ).toBeInTheDocument();
  });
});
