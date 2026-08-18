import { render, screen } from '@testing-library/react';
import VersionPage from '@/app/(info)/version/page';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
    prefetch: jest.fn(),
  }),
}));

describe('VersionPage', () => {
  it('renders the version template with the current deployment label', () => {
    render(<VersionPage />);
    expect(screen.getByText('Current deployment')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Version' })
    ).toBeInTheDocument();
    expect(screen.getByText('Copy version')).toBeInTheDocument();
  });
});
