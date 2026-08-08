import { fireEvent, render, screen } from '@testing-library/react';
import { PaginationTemplate } from '../PaginationTemplate';

describe('PaginationTemplate', () => {
  it('renders the first page of records', () => {
    render(<PaginationTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Pagination' })
    ).toBeInTheDocument();
    expect(screen.getByText('Showing 1-5 of 25')).toBeInTheDocument();
    expect(screen.getByText('Record 1')).toBeInTheDocument();
    expect(screen.getByText('Record 5')).toBeInTheDocument();
    expect(screen.queryByText('Record 6')).not.toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Previous page' })
    ).toBeDisabled();
  });

  it('navigates with page number buttons', () => {
    render(<PaginationTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Go to page 2' }));
    expect(screen.getByText('Showing 6-10 of 25')).toBeInTheDocument();
    expect(screen.getByText('Record 6')).toBeInTheDocument();
    expect(screen.queryByText('Record 1')).not.toBeInTheDocument();
  });

  it('navigates with next and previous buttons', () => {
    render(<PaginationTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Next page' }));
    expect(screen.getByText('Showing 6-10 of 25')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Previous page' }));
    expect(screen.getByText('Showing 1-5 of 25')).toBeInTheDocument();
  });

  it('disables next on the last page', () => {
    render(<PaginationTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Go to page 5' }));
    expect(screen.getByText('Showing 21-25 of 25')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Next page' })).toBeDisabled();
  });
});
