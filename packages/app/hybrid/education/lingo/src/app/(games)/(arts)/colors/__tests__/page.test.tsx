import { render, screen } from '@testing-library/react';
import ColorsPage from '@/app/(games)/(arts)/colors/page';

describe('ColorsPage', () => {
  it('renders the hub heading', () => {
    render(<ColorsPage />);
    expect(screen.getByRole('heading', { name: 'Colors' })).toBeInTheDocument();
  });

  it('renders the five theory cards', () => {
    render(<ColorsPage />);
    const models = screen.getByTestId('colors-models');
    expect(models).toHaveTextContent('Color Models');
    expect(models.getAttribute('href')).toContain('/colors/models');

    const harmony = screen.getByTestId('colors-harmony');
    expect(harmony).toHaveTextContent('Color Harmony');
    expect(harmony.getAttribute('href')).toContain('/colors/harmony');

    const perception = screen.getByTestId('colors-perception');
    expect(perception).toHaveTextContent('Color & Perception');
    expect(perception.getAttribute('href')).toContain('/colors/perception');

    const scales = screen.getByTestId('colors-scales');
    expect(scales).toHaveTextContent('Color Scales');
    expect(scales.getAttribute('href')).toContain('/colors/scales');

    const css = screen.getByTestId('colors-css');
    expect(css).toHaveTextContent('Color in CSS');
    expect(css.getAttribute('href')).toContain('/colors/css');
  });
});
