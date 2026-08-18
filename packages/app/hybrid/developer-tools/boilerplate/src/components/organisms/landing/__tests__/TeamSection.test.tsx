import { render, screen } from '@testing-library/react';
import { TeamSection } from '../TeamSection';

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

describe('TeamSection', () => {
  const members = [
    { name: 'Alan Turing', role: 'Founder', bio: 'Math genius.' },
    { name: 'Katherine Johnson' },
  ];

  it('renders title and members', () => {
    render(<TeamSection members={members} title="Leadership" />);
    expect(screen.getByText('Leadership')).toBeInTheDocument();
    expect(screen.getByText('Alan Turing')).toBeInTheDocument();
    expect(screen.getByText('Founder')).toBeInTheDocument();
    expect(screen.getByText('Math genius.')).toBeInTheDocument();
  });

  it('renders member initials', () => {
    render(<TeamSection members={members} />);
    expect(screen.getByText('AL')).toBeInTheDocument();
    expect(screen.getByText('KA')).toBeInTheDocument();
  });
});
