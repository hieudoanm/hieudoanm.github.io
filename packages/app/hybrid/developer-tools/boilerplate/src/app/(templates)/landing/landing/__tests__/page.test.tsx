import { render, screen } from '@testing-library/react';
import LandingPage from '@/app/(templates)/landing/landing/page';

describe('LandingPage', () => {
  it('renders hero and features', () => {
    render(<LandingPage />);
    expect(
      screen.getAllByText('Modern Next.js Starter').length
    ).toBeGreaterThan(0);
    expect(screen.getByText('Beautiful UI')).toBeInTheDocument();
    expect(screen.getByText('Blazing fast')).toBeInTheDocument();
    expect(screen.getByText('Type safe')).toBeInTheDocument();
  });
});
