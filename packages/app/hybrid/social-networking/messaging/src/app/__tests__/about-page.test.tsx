import { render, screen } from '@testing-library/react';
import AboutPage from '@/app/(info)/about/page';

describe('AboutPage', () => {
  it('renders the about content', () => {
    render(<AboutPage />);
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText(/End-to-end style privacy/)).toBeInTheDocument();
    expect(screen.getByText('Phase 1 complete')).toBeInTheDocument();
  });
});
