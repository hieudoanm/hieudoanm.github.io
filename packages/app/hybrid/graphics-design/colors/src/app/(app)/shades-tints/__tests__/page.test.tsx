import { render, screen } from '@testing-library/react';
import Page from '../page';

jest.mock('next/navigation', () => ({
  usePathname: () => '/shades-tints/',
}));

describe('ShadesTintsPage', () => {
  it('renders the page with its heading and description', () => {
    render(<Page />);
    expect(
      screen.getByRole('heading', { name: 'Shades & Tints' })
    ).toBeInTheDocument();
    expect(
      screen.getByText('Build a balanced scale from one color')
    ).toBeInTheDocument();
  });

  it('renders the shade steps slider', () => {
    render(<Page />);
    expect(screen.getByLabelText('Shade steps')).toBeInTheDocument();
  });

  it('renders a base scale label', () => {
    render(<Page />);
    expect(screen.getByText('base')).toBeInTheDocument();
  });
});
