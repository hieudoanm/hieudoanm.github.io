import { render, screen } from '@testing-library/react';
import Page from '../page';

jest.mock('next/navigation', () => ({
  usePathname: () => '/wheel/',
}));

describe('ColorWheelPage', () => {
  it('renders the page with its heading and description', () => {
    render(<Page />);
    expect(
      screen.getAllByRole('heading', { name: 'Color Wheel' })[0]
    ).toBeInTheDocument();
    expect(
      screen.getByText('Explore hues and their harmonic relationships')
    ).toBeInTheDocument();
  });

  it('renders the hue wheel and hue slider', () => {
    render(<Page />);
    expect(screen.getByLabelText('Hue wheel')).toBeInTheDocument();
    expect(screen.getByLabelText('Hue')).toBeInTheDocument();
  });

  it('renders the harmony sections', () => {
    render(<Page />);
    expect(screen.getByText('Complementary')).toBeInTheDocument();
    expect(screen.getByText('Split-complementary')).toBeInTheDocument();
    expect(screen.getByText('Analogous')).toBeInTheDocument();
    expect(screen.getByText('Triadic')).toBeInTheDocument();
  });
});
