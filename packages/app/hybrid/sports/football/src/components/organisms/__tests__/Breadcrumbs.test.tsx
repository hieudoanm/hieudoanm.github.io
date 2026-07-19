import { render, screen, fireEvent } from '@testing-library/react';
import { Breadcrumbs, Crumb } from '../Breadcrumbs';

describe('Breadcrumbs', () => {
  it('renders crumbs as links when href is provided', () => {
    const crumbs: Crumb[] = [{ label: 'Home', href: '/' }];
    render(<Breadcrumbs crumbs={crumbs} />);
    const link = screen.getByText('Home');
    expect(link).toHaveAttribute('href', '/');
  });

  it('renders crumbs as text when no href is provided', () => {
    const crumbs: Crumb[] = [{ label: 'Current' }];
    render(<Breadcrumbs crumbs={crumbs} />);
    expect(screen.getByText('Current')).toBeInTheDocument();
  });

  it('renders a select dropdown when years are provided', () => {
    const crumbs: Crumb[] = [
      {
        label: 'Tournament',
        years: [
          { year: 2020, href: '/2020' },
          { year: 2021, href: '/2021' },
        ],
        href: '/2020',
      },
    ];
    render(<Breadcrumbs crumbs={crumbs} />);
    const select = screen.getByRole('combobox');
    expect(select).toHaveValue('/2020');
    expect(screen.getByText('2020')).toBeInTheDocument();
    expect(screen.getByText('2021')).toBeInTheDocument();
  });

  it('renders a select with years', () => {
    const crumbs: Crumb[] = [
      {
        label: 'Tournament',
        years: [
          { year: 2020, href: '/2020' },
          { year: 2021, href: '/2021' },
        ],
        href: '/2020',
      },
    ];
    render(<Breadcrumbs crumbs={crumbs} />);
    const select = screen.getByRole('combobox');
    expect(select).toBeInTheDocument();
    expect(screen.getByText('2020')).toBeInTheDocument();
    expect(screen.getByText('2021')).toBeInTheDocument();
  });

  it('separates multiple crumbs with slashes', () => {
    const crumbs: Crumb[] = [
      { label: 'Home', href: '/' },
      { label: 'Current' },
    ];
    render(<Breadcrumbs crumbs={crumbs} />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Current')).toBeInTheDocument();
    const separators = screen.getAllByText('/');
    expect(separators).toHaveLength(1);
  });
});
