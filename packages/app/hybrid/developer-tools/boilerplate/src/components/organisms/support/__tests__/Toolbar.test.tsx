import { render, screen } from '@testing-library/react';
import { Toolbar } from '../Toolbar';

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

describe('Toolbar', () => {
  it('renders title, subtitle, and actions', () => {
    render(
      <Toolbar
        title="Reports"
        subtitle="Monthly summary"
        actions={[
          <button key="1">Export</button>,
          <button key="2">Filter</button>,
        ]}
      />
    );
    expect(
      screen.getByRole('heading', { name: 'Reports' })
    ).toBeInTheDocument();
    expect(screen.getByText('Monthly summary')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Export' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Filter' })).toBeInTheDocument();
  });

  it('renders children', () => {
    render(
      <Toolbar>
        <input aria-label="Query" />
      </Toolbar>
    );
    expect(screen.getByLabelText('Query')).toBeInTheDocument();
  });
});
