import { render, screen } from '@testing-library/react';

import PeriodicTablePage from '@/app/(games)/(stem)/chemistry/periodic-table/page';

describe('PeriodicTablePage', () => {
  it('renders the note title', () => {
    render(<PeriodicTablePage />);

    expect(
      screen.getByRole('heading', { level: 1, name: 'Periodic Table' })
    ).toBeInTheDocument();
  });

  it('renders the first section', () => {
    render(<PeriodicTablePage />);

    expect(
      screen.getByRole('heading', {
        level: 2,
        name: 'What the arrangement encodes',
      })
    ).toBeInTheDocument();
  });

  it('renders the subtitle', () => {
    render(<PeriodicTablePage />);

    expect(screen.getByText(/predictive chemistry/)).toBeInTheDocument();
  });

  it('links back to chemistry', () => {
    render(<PeriodicTablePage />);

    expect(
      screen.getByRole('link', { name: '← Back to Chemistry' })
    ).toHaveAttribute('href', '/chemistry');
  });

  it('links to the interactive table', () => {
    render(<PeriodicTablePage />);

    expect(
      screen.getByRole('link', { name: /Interactive Table/ })
    ).toHaveAttribute('href', '/chemistry/periodic-table/interactive');
  });

  it('lists the references', () => {
    render(<PeriodicTablePage />);

    expect(
      screen.getByRole('link', { name: 'Wikipedia: Periodic Table' })
    ).toHaveAttribute('href', 'https://en.wikipedia.org/wiki/Periodic_table');
  });
});
