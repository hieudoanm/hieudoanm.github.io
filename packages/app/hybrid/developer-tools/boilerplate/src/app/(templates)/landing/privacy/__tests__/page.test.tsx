import { render, screen } from '@testing-library/react';
import PrivacyPage from '@/app/(templates)/landing/privacy/page';

describe('PrivacyPage', () => {
  it('renders privacy policy sections', () => {
    render(<PrivacyPage />);
    expect(screen.getAllByRole('heading').length).toBeGreaterThan(0);
  });
});
