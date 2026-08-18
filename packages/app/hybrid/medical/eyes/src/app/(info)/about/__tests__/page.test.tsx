import { render, screen } from '@testing-library/react';
import AboutPage from '@/app/(info)/about/page';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
    prefetch: jest.fn(),
  }),
}));

describe('AboutPage', () => {
  it('renders the about template with app details', () => {
    render(<AboutPage />);
    expect(screen.getAllByRole('heading', { name: 'Eyes' })).not.toHaveLength(
      0
    );
    expect(
      screen.getByText('Visual acuity charts for vision screening')
    ).toBeInTheDocument();
    expect(screen.getAllByText('Framework')).toHaveLength(1);
    expect(screen.getByText('Next.js 16')).toBeInTheDocument();
  });
});
