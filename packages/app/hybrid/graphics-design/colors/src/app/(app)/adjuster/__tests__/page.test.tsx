import { render, screen } from '@testing-library/react';
import Page from '../page';

jest.mock('next/navigation', () => ({
  usePathname: () => '/adjuster/',
}));

describe('AdjusterPage', () => {
  it('renders the page with its heading and description', () => {
    render(<Page />);
    expect(
      screen.getByRole('heading', { name: 'Color Adjuster' })
    ).toBeInTheDocument();
    expect(
      screen.getByText('Tune hue, saturation and lightness of any color')
    ).toBeInTheDocument();
  });

  it('renders the adjusted color preview swatch', () => {
    render(<Page />);
    expect(screen.getByLabelText('Adjusted color preview')).toBeInTheDocument();
  });

  it('renders the hue, saturation and lightness sliders', () => {
    render(<Page />);
    expect(screen.getByLabelText('Hue')).toBeInTheDocument();
    expect(screen.getByLabelText('Saturation')).toBeInTheDocument();
    expect(screen.getByLabelText('Lightness')).toBeInTheDocument();
  });
});
