import { render, screen } from '@testing-library/react';
import ScalesTheoryPage from '@/app/(games)/(arts)/colors/scales/page';

describe('ScalesTheoryPage', () => {
  it('renders the theory heading and section headers', () => {
    render(<ScalesTheoryPage />);
    expect(
      screen.getByRole('heading', { name: 'Color Scales' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Shades, tints and tones' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Even steps' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Opacity is blending' })
    ).toBeInTheDocument();
  });

  it('links to the four scale tools', () => {
    render(<ScalesTheoryPage />);
    expect(
      screen.getByRole('link', { name: /^Shades & Tints/ })
    ).toHaveAttribute('href', '/colors/scales/shades-tints');
    expect(
      screen.getByRole('link', { name: /^Tint, Shade & Tone/ })
    ).toHaveAttribute('href', '/colors/scales/tint-shade-tone');
    expect(
      screen.getByRole('link', { name: /^Opacity Overlay/ })
    ).toHaveAttribute('href', '/colors/scales/opacity');
    expect(
      screen.getByRole('link', { name: /^CSS Scale Exporter/ })
    ).toHaveAttribute('href', '/colors/scales/css-scale');
  });
});
