import { render, screen } from '@testing-library/react';
import { ShowcaseSection } from '../ShowcaseSection';

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

describe('ShowcaseSection', () => {
  const items = [
    { id: '1', title: 'Dashboard', description: 'Overview' },
    { id: '2', title: 'Analytics' },
  ];

  it('renders the title and item titles', () => {
    render(<ShowcaseSection title="Work" items={items} />);
    expect(screen.getByRole('heading', { name: 'Work' })).toBeInTheDocument();
    expect(screen.getAllByText('Dashboard').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Analytics').length).toBeGreaterThan(0);
  });

  it('renders item descriptions', () => {
    render(<ShowcaseSection items={items} />);
    expect(screen.getByText('Overview')).toBeInTheDocument();
  });

  it('renders an image with the item title as alt', () => {
    render(
      <ShowcaseSection
        items={[{ id: '1', title: 'Shot', image: '/shot.png' }]}
      />
    );
    expect(screen.getByRole('img', { name: 'Shot' })).toHaveAttribute(
      'src',
      '/shot.png'
    );
  });
});
