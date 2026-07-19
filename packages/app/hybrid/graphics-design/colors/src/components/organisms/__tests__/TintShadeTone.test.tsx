import { render, screen } from '@testing-library/react';
import { TintShadeTone } from '../TintShadeTone';

jest.mock('@/hooks/useClipboard', () => ({
  useClipboard: () => ({ copied: null, copy: jest.fn() }),
}));

describe('TintShadeTone', () => {
  it('renders Tints, Shades, and Tones sections', () => {
    render(<TintShadeTone baseColor="#ff0000" />);
    expect(screen.getByText('Tints (add white)')).toBeInTheDocument();
    expect(screen.getByText('Shades (add black)')).toBeInTheDocument();
    expect(screen.getByText('Tones (add gray)')).toBeInTheDocument();
  });

  it('renders swatches inside each section', () => {
    const { container } = render(<TintShadeTone baseColor="#ff0000" />);
    const swatches = container.querySelectorAll('[style*="background-color"]');
    expect(swatches.length).toBe(18);
  });

  it('renders the TheoryNote about Tint, Shade and Tone', () => {
    render(<TintShadeTone baseColor="#ff0000" />);
    expect(screen.getByText('Tint, Shade and Tone')).toBeInTheDocument();
  });

  it('renders the container with data-testid', () => {
    render(<TintShadeTone baseColor="#6366f1" />);
    expect(screen.getByTestId('tint-shade-tone')).toBeInTheDocument();
  });
});
