import { render, screen } from '@testing-library/react';
import DataTablePage from '@/app/(templates)/hr/data-table/page';

describe('DataTablePage', () => {
  it('renders the data table page', () => {
    render(<DataTablePage />);
    expect(
      screen.getByRole('heading', { name: 'Data table' })
    ).toBeInTheDocument();
  });
});
