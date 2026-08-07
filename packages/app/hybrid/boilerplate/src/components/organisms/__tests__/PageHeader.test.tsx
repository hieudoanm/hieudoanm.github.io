import { render, screen } from '@testing-library/react';
import { PageHeader } from '../PageHeader';

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

describe('PageHeader', () => {
  it('renders title, description, and eyebrow', () => {
    render(
      <PageHeader
        title="Settings"
        description="Manage your account"
        eyebrow="Account"
      />
    );
    expect(
      screen.getByRole('heading', { name: 'Settings' })
    ).toBeInTheDocument();
    expect(screen.getByText('Manage your account')).toBeInTheDocument();
    expect(screen.getByText('Account')).toBeInTheDocument();
  });

  it('renders actions', () => {
    render(<PageHeader title="Settings" actions={<button>Save</button>} />);
    expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument();
  });
});
