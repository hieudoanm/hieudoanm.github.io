import { render, screen } from '@testing-library/react';
import HarmonyTheoryPage from '@/app/(games)/(arts)/colors/harmony/page';

describe('HarmonyTheoryPage', () => {
  it('renders the theory heading and section headers', () => {
    render(<HarmonyTheoryPage />);
    expect(
      screen.getByRole('heading', { name: 'Color Harmony' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'The color wheel' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Harmonic sets' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Mixing color' })
    ).toBeInTheDocument();
  });

  it('links to the three harmony tools', () => {
    render(<HarmonyTheoryPage />);
    expect(screen.getByRole('link', { name: /^Color Wheel/ })).toHaveAttribute(
      'href',
      '/colors/harmony/wheel'
    );
    expect(
      screen.getByRole('link', { name: /^Color Schemes/ })
    ).toHaveAttribute('href', '/colors/harmony/schemes');
    expect(screen.getByRole('link', { name: /^Color Mixer/ })).toHaveAttribute(
      'href',
      '/colors/harmony/mixer'
    );
  });
});
