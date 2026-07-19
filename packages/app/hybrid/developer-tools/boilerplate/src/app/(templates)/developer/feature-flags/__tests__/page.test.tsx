import { render, screen } from '@testing-library/react';
import FeatureFlagsPage from '@/app/(templates)/developer/feature-flags/page';

describe('FeatureFlagsPage', () => {
  it('renders the FeatureFlagsPage', () => {
    render(<FeatureFlagsPage />);
    expect(
      screen.getByText('9 flags enabled across environments')
    ).toBeInTheDocument();
  });
});
