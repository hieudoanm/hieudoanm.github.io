import { render, screen } from '@testing-library/react';
import PerceptionTheoryPage from '@/app/(games)/(arts)/colors/perception/page';

describe('PerceptionTheoryPage', () => {
  it('renders the theory heading and section headers', () => {
    render(<PerceptionTheoryPage />);
    expect(
      screen.getByRole('heading', { name: 'Color & Perception' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Relative luminance' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Color vision deficiency' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Warm and cool' })
    ).toBeInTheDocument();
  });

  it('links to the three perception tools', () => {
    render(<PerceptionTheoryPage />);
    expect(
      screen.getByRole('link', { name: /^Contrast Checker/ })
    ).toHaveAttribute('href', '/colors/perception/contrast');
    expect(
      screen.getByRole('link', { name: /^Color Blindness/ })
    ).toHaveAttribute('href', '/colors/perception/color-blindness');
    expect(
      screen.getByRole('link', { name: /^Color Temperature/ })
    ).toHaveAttribute('href', '/colors/perception/temperature');
  });
});
