import { render, screen } from '@testing-library/react';
import VersionPage from '@/app/(templates)/landing/version/page';

jest.mock('next/navigation', () => ({
  usePathname: () => '/version',
}));

describe('VersionPage', () => {
  it('renders the current build version segments', () => {
    render(<VersionPage />);
    expect(
      screen.getByText(String(new Date().getFullYear()))
    ).toBeInTheDocument();
  });
});
