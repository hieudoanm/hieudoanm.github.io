import { render, screen } from '@testing-library/react';
import { ProfileCard } from '../ProfileCard';

jest.mock('next/link', () => {
  return ({
    href,
    children,
    ...rest
  }: {
    href: string;
    children: React.ReactNode;
  }) => (
    <a href={href} {...rest}>
      {children}
    </a>
  );
});

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

const { usePathname } = jest.requireMock('next/navigation');

describe('ProfileCard', () => {
  it('renders name, role, bio, badges, and stats', () => {
    render(
      <ProfileCard
        name="Ada Lovelace"
        role="Engineer"
        bio="Writes the future."
        badges={['Fellow', 'Founder']}
        stats={[
          { label: 'Posts', value: '12' },
          { label: 'Following', value: '34' },
          { label: 'Followers', value: '56' },
        ]}
      />
    );
    expect(screen.getByText('Ada Lovelace')).toBeInTheDocument();
    expect(screen.getByText('Engineer')).toBeInTheDocument();
    expect(screen.getByText('Writes the future.')).toBeInTheDocument();
    expect(screen.getByText('Fellow')).toBeInTheDocument();
    expect(screen.getByText('Posts')).toBeInTheDocument();
    expect(screen.getByText('12')).toBeInTheDocument();
  });

  it('renders actions', () => {
    render(<ProfileCard name="Ada" actions={<button>Follow</button>} />);
    expect(screen.getByRole('button', { name: 'Follow' })).toBeInTheDocument();
  });
});
