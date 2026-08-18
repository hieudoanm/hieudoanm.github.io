import { fireEvent, render, screen } from '@testing-library/react';
import { DataTableTemplate } from '../DataTableTemplate';

describe('DataTableTemplate', () => {
  it('renders the table with default sorting and pagination', () => {
    render(<DataTableTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Data table' })
    ).toBeInTheDocument();
    expect(screen.getByText('Alice Smith')).toBeInTheDocument();
    expect(screen.getByText('Cara Lee')).toBeInTheDocument();
    expect(screen.queryByText('Dan Kim')).not.toBeInTheDocument();
    expect(screen.getByText('Page 1 of 3')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Previous page' })
    ).toBeDisabled();
  });

  it('filters rows by search query', () => {
    render(<DataTableTemplate />);
    fireEvent.change(screen.getByLabelText('Search rows'), {
      target: { value: 'Grace' },
    });
    expect(screen.getByText('Grace Tan')).toBeInTheDocument();
    expect(screen.queryByText('Alice Smith')).not.toBeInTheDocument();
    expect(screen.getByText('Page 1 of 1')).toBeInTheDocument();
  });

  it('searches by category', () => {
    render(<DataTableTemplate />);
    fireEvent.change(screen.getByLabelText('Search rows'), {
      target: { value: 'finance' },
    });
    expect(screen.getByText('Alice Smith')).toBeInTheDocument();
    expect(screen.getByText('Frank Wu')).toBeInTheDocument();
  });

  it('shows empty state when nothing matches', () => {
    render(<DataTableTemplate />);
    fireEvent.change(screen.getByLabelText('Search rows'), {
      target: { value: 'zzz' },
    });
    expect(screen.getByText('No rows match')).toBeInTheDocument();
    expect(screen.getByText('Page 1 of 1')).toBeInTheDocument();
  });

  it('toggles name sorting', () => {
    render(<DataTableTemplate />);
    const nameButton = screen.getByRole('button', { name: 'Sort by name' });
    fireEvent.click(nameButton);
    expect(screen.getByText('Hank Vu')).toBeInTheDocument();
    fireEvent.click(nameButton);
    expect(screen.getByText('Alice Smith')).toBeInTheDocument();
  });

  it('sorts by amount', () => {
    render(<DataTableTemplate />);
    const amountButton = screen.getByRole('button', { name: 'Sort by amount' });
    fireEvent.click(amountButton);
    expect(screen.getByText('Eve Chen')).toBeInTheDocument();
    fireEvent.click(amountButton);
    expect(screen.getByText('Grace Tan')).toBeInTheDocument();
  });

  it('paginates through rows', () => {
    render(<DataTableTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Next page' }));
    expect(screen.getByText('Page 2 of 3')).toBeInTheDocument();
    expect(screen.getByText('Dan Kim')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Previous page' }));
    expect(screen.getByText('Page 1 of 3')).toBeInTheDocument();
  });

  it('changes rows per page', () => {
    render(<DataTableTemplate />);
    fireEvent.change(screen.getByLabelText('Rows per page'), {
      target: { value: '5' },
    });
    expect(screen.getByText('Page 1 of 2')).toBeInTheDocument();
    expect(screen.getByText('Eve Chen')).toBeInTheDocument();
    expect(screen.queryByText('Grace Tan')).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Next page' }));
    expect(screen.getByText('Page 2 of 2')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Next page' })).toBeDisabled();
  });

  it('filters by status', () => {
    render(<DataTableTemplate />);
    fireEvent.change(screen.getByLabelText('Filter by status'), {
      target: { value: 'Active' },
    });
    expect(screen.getByText('Alice Smith')).toBeInTheDocument();
    expect(screen.getByText('Eve Chen')).toBeInTheDocument();
    expect(screen.queryByText('Grace Tan')).not.toBeInTheDocument();
    expect(screen.queryByText('Hank Vu')).not.toBeInTheDocument();
    expect(screen.getByText('Page 1 of 2')).toBeInTheDocument();
  });

  it('combines search and status filter', () => {
    render(<DataTableTemplate />);
    fireEvent.change(screen.getByLabelText('Filter by status'), {
      target: { value: 'Active' },
    });
    fireEvent.change(screen.getByLabelText('Search rows'), {
      target: { value: 'Bob' },
    });
    expect(screen.getByText('No rows match')).toBeInTheDocument();
  });

  it('edits a row inline', () => {
    render(<DataTableTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Edit Alice Smith' }));
    const input = screen.getByLabelText('Edit name');
    expect(input).toHaveValue('Alice Smith');
    fireEvent.change(input, { target: { value: 'Alice Kim' } });
    fireEvent.click(screen.getByRole('button', { name: 'Save Alice Smith' }));
    expect(screen.getByText('Alice Kim')).toBeInTheDocument();
    expect(screen.queryByText('Alice Smith')).not.toBeInTheDocument();
  });

  it('cancels an inline edit', () => {
    render(<DataTableTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Edit Alice Smith' }));
    fireEvent.click(screen.getByRole('button', { name: 'Cancel edit' }));
    expect(screen.queryByLabelText('Edit name')).not.toBeInTheDocument();
    expect(screen.getByText('Alice Smith')).toBeInTheDocument();
  });

  it('deletes a row', () => {
    render(<DataTableTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Delete Alice Smith' }));
    expect(screen.queryByText('Alice Smith')).not.toBeInTheDocument();
    expect(screen.getByText('Dan Kim')).toBeInTheDocument();
  });
});
