import { render, screen } from '@testing-library/react';
import { ColorSchemes } from '../ColorSchemes';

jest.mock('@/hooks/useClipboard', () => ({
  useClipboard: () => ({ copied: null, copy: jest.fn() }),
}));

describe('ColorSchemes', () => {
  it('renders all four scheme sections', () => {
    render(<ColorSchemes baseColor="#ff0000" />);
    expect(screen.getByText('Complementary')).toBeInTheDocument();
    expect(screen.getByText('Analogous')).toBeInTheDocument();
    expect(screen.getByText('Triadic')).toBeInTheDocument();
    expect(screen.getByText('Monochromatic')).toBeInTheDocument();
  });

  it('renders the container with data-testid', () => {
    render(<ColorSchemes baseColor="#ff0000" />);
    expect(screen.getByTestId('color-schemes')).toBeInTheDocument();
  });

  it('renders the TheoryNote about Color Harmony', () => {
    render(<ColorSchemes baseColor="#ff0000" />);
    expect(screen.getByText('Color Harmony')).toBeInTheDocument();
  });

  it('renders swatches inside each scheme section', () => {
    const { container } = render(<ColorSchemes baseColor="#ff0000" />);
    const swatches = container.querySelectorAll('[style*="background-color"]');
    expect(swatches.length).toBeGreaterThan(0);
  });
});
