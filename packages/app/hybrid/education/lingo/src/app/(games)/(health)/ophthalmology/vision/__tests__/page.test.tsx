import { render, screen } from '@testing-library/react';
import VisionTheoryPage from '@/app/(games)/(health)/ophthalmology/vision/page';

describe('VisionTheoryPage', () => {
  it('renders the theory heading and section headers', () => {
    render(<VisionTheoryPage />);
    expect(
      screen.getByRole('heading', { name: 'Vision Theory' })
    ).toBeInTheDocument();
    expect(screen.getByText('How the eye focuses')).toBeInTheDocument();
    expect(screen.getByText('What is visual acuity?')).toBeInTheDocument();
  });

  it('links to the three acuity charts', () => {
    render(<VisionTheoryPage />);
    expect(
      screen.getByRole('link', { name: /^Snellen Chart/ })
    ).toHaveAttribute('href', '/ophthalmology/vision/snellen');
    expect(screen.getByRole('link', { name: /^LogMAR Chart/ })).toHaveAttribute(
      'href',
      '/ophthalmology/vision/logmar'
    );
    expect(
      screen.getByRole('link', { name: /^Tumbling E Chart/ })
    ).toHaveAttribute('href', '/ophthalmology/vision/tumbling-e');
  });
});
