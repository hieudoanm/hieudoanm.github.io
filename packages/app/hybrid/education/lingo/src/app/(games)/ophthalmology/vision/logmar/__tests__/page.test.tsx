import { render, screen } from '@testing-library/react';
import LogMARPage from '@/app/(games)/ophthalmology/vision/logmar/page';

describe('LogMARPage', () => {
  it('renders a fullscreen chart', () => {
    render(<LogMARPage />);
    expect(screen.getByText(/LogMAR Visual Acuity/)).toBeInTheDocument();
  });
});
