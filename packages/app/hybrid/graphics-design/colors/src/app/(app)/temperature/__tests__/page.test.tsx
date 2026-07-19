import { render, screen } from '@testing-library/react';
import Page from '../page';

jest.mock('next/navigation', () => ({
  usePathname: () => '/temperature/',
}));

describe('ColorTemperaturePage', () => {
  it('renders the page with its heading and description', () => {
    render(<Page />);
    expect(
      screen.getAllByRole('heading', { name: 'Color Temperature' })[0]
    ).toBeInTheDocument();
    expect(
      screen.getByText('Classify warm and cool colors and map Kelvin')
    ).toBeInTheDocument();
  });

  it('renders the active color swatch and classification', () => {
    render(<Page />);
    expect(screen.getByLabelText('Active color swatch')).toBeInTheDocument();
    expect(screen.getByText('Cool')).toBeInTheDocument();
  });

  it('renders the temperature slider and preview', () => {
    render(<Page />);
    expect(
      screen.getByRole('slider', { name: 'Color temperature' })
    ).toBeInTheDocument();
    expect(screen.getByLabelText('Temperature preview')).toBeInTheDocument();
  });
});
