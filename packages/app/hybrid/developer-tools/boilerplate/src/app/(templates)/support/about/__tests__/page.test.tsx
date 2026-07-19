import { render, screen } from '@testing-library/react';
import AboutPage from '../page';

jest.mock('next/navigation', () => ({
  usePathname: () => '/support/about',
}));

describe('AboutPage', () => {
  it('renders app info and tech stack', () => {
    render(<AboutPage />);
    expect(screen.getByText('TypeScript 6')).toBeInTheDocument();
    expect(screen.getByText('Next.js 16')).toBeInTheDocument();
    expect(screen.getByText('App Router')).toBeInTheDocument();
  });
});
