import { render, screen } from '@testing-library/react';
import { Diff } from '../Diff';

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

describe('Diff', () => {
  it('renders before, after, and a resizer', () => {
    const { container } = render(
      <Diff
        before={<img src="/a.png" alt="Before" />}
        after={<img src="/b.png" alt="After" />}
      />
    );
    expect(screen.getByAltText('Before')).toBeInTheDocument();
    expect(screen.getByAltText('After')).toBeInTheDocument();
    expect(container.querySelector('.diff-resizer')).toBeInTheDocument();
  });

  it('applies an aspect class', () => {
    const { container } = render(
      <Diff before="A" after="B" aspectClass="aspect-square" />
    );
    expect(container.querySelector('.diff')).toHaveClass('aspect-square');
  });
});
