import { render, screen } from '@testing-library/react';
import Page from '../page';

jest.mock('next/navigation', () => ({
  usePathname: () => '/schemes/',
}));

describe('ColorSchemesPage', () => {
  it('renders the page with its heading and description', () => {
    render(<Page />);
    expect(
      screen.getByRole('heading', { name: 'Color Schemes' })
    ).toBeInTheDocument();
    expect(
      screen.getByText('Generate complementary, analogous and triadic sets')
    ).toBeInTheDocument();
  });

  it('renders each scheme section', () => {
    render(<Page />);
    expect(screen.getByText('Complementary')).toBeInTheDocument();
    expect(screen.getByText('Analogous')).toBeInTheDocument();
    expect(screen.getByText('Triadic')).toBeInTheDocument();
    expect(screen.getByText('Monochromatic')).toBeInTheDocument();
  });
});
