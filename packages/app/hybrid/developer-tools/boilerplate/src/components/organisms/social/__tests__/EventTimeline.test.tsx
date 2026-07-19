import { render, screen } from '@testing-library/react';
import { EventTimeline } from '../EventTimeline';

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

describe('EventTimeline', () => {
  const items = [
    {
      id: '1',
      title: 'Deployed',
      date: '10 min ago',
      description: 'Production release',
      status: 'success' as const,
    },
    {
      id: '2',
      title: 'Build warning',
      date: '1 hr ago',
      status: 'warning' as const,
    },
  ];

  it('renders title, dates, and descriptions', () => {
    render(<EventTimeline title="Release history" items={items} />);
    expect(screen.getByText('Release history')).toBeInTheDocument();
    expect(screen.getByText('Deployed')).toBeInTheDocument();
    expect(screen.getByText('Production release')).toBeInTheDocument();
    expect(screen.getByText('10 min ago')).toBeInTheDocument();
  });

  it('applies the status dot colour', () => {
    const { container } = render(<EventTimeline items={items} />);
    expect(container.querySelector('.bg-success')).toBeInTheDocument();
    expect(container.querySelector('.bg-warning')).toBeInTheDocument();
  });

  it('renders icons and a neutral dot when provided', () => {
    const { container } = render(
      <EventTimeline
        items={[{ id: '1', title: 'Event', date: 'Now', icon: '🔔' }]}
      />
    );
    expect(screen.getByText('🔔')).toBeInTheDocument();
    expect(
      container.querySelector('.bg-base-content\\/30')
    ).toBeInTheDocument();
  });
});
