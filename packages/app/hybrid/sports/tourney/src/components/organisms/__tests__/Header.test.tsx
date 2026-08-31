import { render, screen } from '@testing-library/react';
import { Header } from '@/components/organisms/Header';

jest.mock('next/navigation', () => ({
  usePathname: () => '/create',
}));

describe('Header', () => {
  it('renders title with optional subtitle, badges, action, and back link', () => {
    render(
      <Header
        title="My Tourney"
        subtitle="Round 1"
        badges={<span>badge</span>}
        action={<button>Go</button>}
        backHref="/"
      />
    );
    expect(
      screen.getByRole('heading', { name: 'My Tourney' })
    ).toBeInTheDocument();
    expect(screen.getByText('Round 1')).toBeInTheDocument();
    expect(screen.getByText('badge')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Go' })).toBeInTheDocument();
    expect(screen.getByRole('link')).toBeInTheDocument();
  });

  it('omits optional sections when absent', () => {
    render(<Header title="Only title" />);
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
    expect(screen.queryByText('Round 1')).not.toBeInTheDocument();
  });
});
