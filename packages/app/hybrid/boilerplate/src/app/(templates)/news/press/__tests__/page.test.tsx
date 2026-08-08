import { render, screen } from '@testing-library/react';
import PressReleasesPage from '@/app/(templates)/news/press/page';

describe('PressReleasesPage', () => {
  it('renders the PressReleasesPage', () => {
    render(<PressReleasesPage />);
    expect(screen.getByText('5 press releases')).toBeInTheDocument();
  });
});
