import { render, screen } from '@testing-library/react';
import Page from '../page';

jest.mock('next/navigation', () => ({
  usePathname: () => '/theme/',
}));

describe('ThemePage', () => {
  it('renders the page with its heading and description', () => {
    render(<Page />);
    expect(
      screen.getByRole('heading', { name: 'Theme Colors' })
    ).toBeInTheDocument();
    expect(
      screen.getByText('Browse the active theme palette roles')
    ).toBeInTheDocument();
  });

  it('renders the theme color role swatches', () => {
    render(<Page />);
    expect(screen.getByText('Primary')).toBeInTheDocument();
    expect(screen.getByText('Secondary')).toBeInTheDocument();
    expect(screen.getByText('Accent')).toBeInTheDocument();
  });

  it('renders the color roles theory note', () => {
    render(<Page />);
    expect(screen.getByText('Color Roles')).toBeInTheDocument();
  });
});
