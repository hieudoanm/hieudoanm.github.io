import { render, screen } from '@testing-library/react';
import { QuoteSection } from '../QuoteSection';

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

describe('QuoteSection', () => {
  it('renders quote, author, and role', () => {
    render(<QuoteSection quote="Build things" author="Ada" role="Engineer" />);
    expect(screen.getByText('Build things')).toBeInTheDocument();
    expect(screen.getByText('Ada')).toBeInTheDocument();
    expect(screen.getByText('Engineer')).toBeInTheDocument();
  });

  it('renders an avatar node', () => {
    render(
      <QuoteSection
        quote="Build things"
        author="Ada"
        avatar={<span>AV</span>}
      />
    );
    expect(screen.getByText('AV')).toBeInTheDocument();
  });
});
