import { render, screen } from '@testing-library/react';
import { Marquee } from '../Marquee';

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

describe('Marquee', () => {
  it('duplicates the items twice', () => {
    const { container } = render(
      <Marquee
        items={[<span key="1">React</span>, <span key="2">Vue</span>]}
        title="Stack"
      />
    );
    expect(screen.getByRole('heading', { name: 'Stack' })).toBeInTheDocument();
    expect(container.querySelectorAll('.animate-marquee > div')).toHaveLength(
      4
    );
  });
});
