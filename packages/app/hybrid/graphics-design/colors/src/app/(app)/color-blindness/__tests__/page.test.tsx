import { render, screen } from '@testing-library/react';
import Page from '../page';

jest.mock('next/navigation', () => ({
  usePathname: () => '/color-blindness/',
}));

describe('ColorBlindnessPage', () => {
  it('renders the page with its heading and description', () => {
    render(<Page />);
    expect(
      screen.getByRole('heading', { name: 'Color Blindness' })
    ).toBeInTheDocument();
    expect(
      screen.getByText('Simulate protanopia, deuteranopia and tritanopia')
    ).toBeInTheDocument();
  });

  it('renders the original swatch section', () => {
    render(<Page />);
    expect(screen.getByText('Original')).toBeInTheDocument();
  });

  it('renders each color blindness variant', () => {
    render(<Page />);
    expect(screen.getByText('Protanopia (red-blind)')).toBeInTheDocument();
    expect(screen.getByText('Deuteranopia (green-blind)')).toBeInTheDocument();
    expect(screen.getByText('Tritanopia (blue-blind)')).toBeInTheDocument();
  });
});
