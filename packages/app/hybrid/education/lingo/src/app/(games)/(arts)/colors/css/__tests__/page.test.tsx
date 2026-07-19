import { render, screen } from '@testing-library/react';
import CssTheoryPage from '@/app/(games)/(arts)/colors/css/page';

describe('CssTheoryPage', () => {
  it('renders the theory heading and section headers', () => {
    render(<CssTheoryPage />);
    expect(
      screen.getByRole('heading', { name: 'Color in CSS' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Gradients' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Palettes and tokens' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Theme roles' })
    ).toBeInTheDocument();
  });

  it('links to the three css tools', () => {
    render(<CssTheoryPage />);
    expect(
      screen.getByRole('link', { name: /^Gradient Builder/ })
    ).toHaveAttribute('href', '/colors/css/gradient');
    expect(
      screen.getByRole('link', { name: /^Palette Generator/ })
    ).toHaveAttribute('href', '/colors/css/palette');
    expect(screen.getByRole('link', { name: /^Theme Colors/ })).toHaveAttribute(
      'href',
      '/colors/css/theme'
    );
  });
});
