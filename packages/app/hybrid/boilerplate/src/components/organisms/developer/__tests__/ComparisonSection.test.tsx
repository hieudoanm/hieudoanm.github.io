import { render, screen } from '@testing-library/react';
import { ComparisonSection } from '../ComparisonSection';

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

describe('ComparisonSection', () => {
  const columns = [{ title: 'Basic' }, { title: 'Pro', featured: true }];
  const rows = [{ label: 'Storage', values: ['10 GB', '100 GB'] }];

  it('renders title, description, and column headers', () => {
    render(
      <ComparisonSection
        title="Plans"
        description="Compare"
        columns={columns}
        rows={rows}
      />
    );
    expect(screen.getByRole('heading', { name: 'Plans' })).toBeInTheDocument();
    expect(screen.getByText('Compare')).toBeInTheDocument();
    expect(screen.getByText('Basic')).toBeInTheDocument();
    expect(screen.getByText('Pro')).toBeInTheDocument();
  });

  it('renders row labels and values', () => {
    render(<ComparisonSection columns={columns} rows={rows} />);
    expect(screen.getByText('Storage')).toBeInTheDocument();
    expect(screen.getByText('10 GB')).toBeInTheDocument();
    expect(screen.getByText('100 GB')).toBeInTheDocument();
  });
});
