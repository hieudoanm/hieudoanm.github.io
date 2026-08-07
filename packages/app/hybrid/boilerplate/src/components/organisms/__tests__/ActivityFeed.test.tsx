import { render, screen } from '@testing-library/react';
import { ActivityFeed } from '../ActivityFeed';

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

describe('ActivityFeed', () => {
  it('renders title, items, and times', () => {
    render(
      <ActivityFeed
        title="Recent activity"
        items={[
          {
            id: '1',
            title: 'Deployed v2',
            description: 'Production build',
            time: '2h ago',
            status: 'success',
          },
        ]}
      />
    );
    expect(screen.getByText('Recent activity')).toBeInTheDocument();
    expect(screen.getByText('Deployed v2')).toBeInTheDocument();
    expect(screen.getByText('Production build')).toBeInTheDocument();
    expect(screen.getByText('2h ago')).toBeInTheDocument();
  });

  it('renders an icon node instead of a status dot', () => {
    const { container } = render(
      <ActivityFeed
        items={[{ id: '1', title: 'Pushed', icon: <span data-testid="ico" /> }]}
      />
    );
    expect(container.querySelector('.bg-success')).not.toBeInTheDocument();
    expect(screen.getByText('Pushed')).toBeInTheDocument();
  });
});
