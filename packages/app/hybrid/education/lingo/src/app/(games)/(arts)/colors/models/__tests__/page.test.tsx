import { render, screen } from '@testing-library/react';
import ModelsTheoryPage from '@/app/(games)/(arts)/colors/models/page';

describe('ModelsTheoryPage', () => {
  it('renders the theory heading and section headers', () => {
    render(<ModelsTheoryPage />);
    expect(
      screen.getByRole('heading', { name: 'Color Models' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Additive and subtractive' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Perceptual models' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'HEX as compact RGB' })
    ).toBeInTheDocument();
  });

  it('links to the three model tools', () => {
    render(<ModelsTheoryPage />);
    expect(
      screen.getByRole('link', { name: /^Color Converter/ })
    ).toHaveAttribute('href', '/colors/models/converter');
    expect(
      screen.getByRole('link', { name: /^Color Adjuster/ })
    ).toHaveAttribute('href', '/colors/models/adjuster');
    expect(screen.getByRole('link', { name: /^Random Color/ })).toHaveAttribute(
      'href',
      '/colors/models/random'
    );
  });
});
