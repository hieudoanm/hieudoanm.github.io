import { render, screen } from '@testing-library/react';
import { LogosSection } from '../LogosSection';

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

describe('LogosSection', () => {
  it('renders names with the default title', () => {
    render(<LogosSection items={[{ name: 'Acme' }, { name: 'Globex' }]} />);
    expect(screen.getByText('Trusted by teams')).toBeInTheDocument();
    expect(screen.getByText('Acme')).toBeInTheDocument();
    expect(screen.getByText('Globex')).toBeInTheDocument();
  });

  it('applies the column grid class', () => {
    const { container } = render(
      <LogosSection items={[{ name: 'Acme' }]} columns={3} />
    );
    expect(container.querySelector('.grid')).toHaveClass('grid-cols-3');
  });
});
