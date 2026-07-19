import { render, screen } from '@testing-library/react';
import Page from '../page';

jest.mock('next/navigation', () => ({
  usePathname: () => '/tint-shade-tone/',
}));

describe('TintShadeTonePage', () => {
  it('renders the page with its heading and description', () => {
    render(<Page />);
    expect(
      screen.getByRole('heading', { name: 'Tint, Shade & Tone' })
    ).toBeInTheDocument();
    expect(
      screen.getByText('Lighten, darken or mute a color in steps')
    ).toBeInTheDocument();
  });

  it('renders the tint, shade and tone scale sections', () => {
    render(<Page />);
    expect(screen.getByText('Tints (add white)')).toBeInTheDocument();
    expect(screen.getByText('Shades (add black)')).toBeInTheDocument();
    expect(screen.getByText('Tones (add gray)')).toBeInTheDocument();
  });
});
