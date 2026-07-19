import { render, screen } from '@testing-library/react';
import TermsPage from '@/app/(templates)/landing/terms/page';

describe('TermsPage', () => {
  it('renders terms sections', () => {
    render(<TermsPage />);
    expect(screen.getAllByRole('heading').length).toBeGreaterThan(0);
  });
});
