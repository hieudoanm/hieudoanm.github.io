import { render, screen } from '@testing-library/react';
import ContrastPage from '@/app/(games)/(arts)/colors/perception/contrast/page';

describe('ContrastPage', () => {
  it('renders the tool page with a back link and heading', () => {
    render(<ContrastPage />);
    expect(
      screen.getByRole('link', { name: '← Back to Color & Perception' })
    ).toHaveAttribute('href', '/colors/perception');
    expect(
      screen.getByRole('heading', { name: 'Contrast Checker' })
    ).toBeInTheDocument();
  });
});
