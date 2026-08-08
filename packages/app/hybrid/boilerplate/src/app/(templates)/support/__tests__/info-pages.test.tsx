import { fireEvent, render, screen } from '@testing-library/react';
import AboutPage from '../about/page';
import ComingSoonPage from '@/app/(templates)/mail/coming-soon/page';
import MaintenancePage from '@/app/(templates)/mail/maintenance/page';
import SearchPage from '../search/page';

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

describe('ComingSoonPage', () => {
  it('renders coming soon content', () => {
    render(<ComingSoonPage />);
    expect(screen.getByText(/coming soon/i)).toBeInTheDocument();
  });
});

describe('MaintenancePage', () => {
  it('renders maintenance notice', () => {
    render(<MaintenancePage />);
    expect(screen.getAllByText(/maintenance/i).length).toBeGreaterThan(0);
  });
});

describe('SearchPage', () => {
  it('renders search and filters results', () => {
    render(<SearchPage />);
    expect(
      screen.getByPlaceholderText('Search pages, settings, and more...')
    ).toBeInTheDocument();
    fireEvent.change(
      screen.getByPlaceholderText('Search pages, settings, and more...'),
      {
        target: { value: 'pricing' },
      }
    );
    expect(screen.getByText('Pricing Plans')).toBeInTheDocument();
  });
});
