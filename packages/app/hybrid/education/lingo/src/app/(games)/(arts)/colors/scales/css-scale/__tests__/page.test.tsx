import { render, screen } from '@testing-library/react';
import CssScalePage from '@/app/(games)/(arts)/colors/scales/css-scale/page';

describe('CssScalePage', () => {
  it('renders the tool page with a back link and heading', () => {
    render(<CssScalePage />);
    expect(
      screen.getByRole('link', { name: '← Back to Color Scales' })
    ).toHaveAttribute('href', '/colors/scales');
    expect(
      screen.getByRole('heading', { name: 'CSS Scale Exporter' })
    ).toBeInTheDocument();
  });
});
