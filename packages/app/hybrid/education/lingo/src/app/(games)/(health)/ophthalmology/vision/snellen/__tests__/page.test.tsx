import { render, screen } from '@testing-library/react';
import SnellenPage from '@/app/(games)/(health)/ophthalmology/vision/snellen/page';

describe('SnellenPage', () => {
  it('renders a fullscreen chart', () => {
    render(<SnellenPage />);
    expect(screen.getByText(/Snellen Visual Acuity/)).toBeInTheDocument();
  });
});
