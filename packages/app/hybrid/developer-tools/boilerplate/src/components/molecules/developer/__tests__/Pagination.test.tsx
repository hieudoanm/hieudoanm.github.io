import { fireEvent, render, screen } from '@testing-library/react';
import { Pagination } from '../Pagination';

describe('Pagination', () => {
  it('renders page buttons with current highlighted', () => {
    render(
      <Pagination current={3} total={5} siblingCount={2} onChange={jest.fn()} />
    );
    expect(screen.getByLabelText('Page 3')).toHaveClass('btn-primary');
    expect(screen.getAllByRole('button', { name: /Page/ })).toHaveLength(5);
  });

  it('calls onChange when a page is selected', () => {
    const onChange = jest.fn();
    render(<Pagination current={3} total={5} onChange={onChange} />);
    fireEvent.click(screen.getByLabelText('Page 5'));
    expect(onChange).toHaveBeenCalledWith(5);
  });

  it('calls onChange on next and previous', () => {
    const onChange = jest.fn();
    render(<Pagination current={3} total={5} onChange={onChange} />);
    fireEvent.click(screen.getByLabelText('Next page'));
    expect(onChange).toHaveBeenCalledWith(4);
    fireEvent.click(screen.getByLabelText('Previous page'));
    expect(onChange).toHaveBeenCalledWith(2);
  });

  it('disables navigation at boundaries', () => {
    const onChange = jest.fn();
    render(<Pagination current={1} total={3} onChange={onChange} />);
    expect(screen.getByLabelText('Previous page')).toBeDisabled();
    fireEvent.click(screen.getByLabelText('Next page'));
    expect(onChange).toHaveBeenCalledWith(2);
  });

  it('collapses to a single page when total is one', () => {
    render(<Pagination current={1} total={1} onChange={jest.fn()} />);
    expect(screen.getAllByRole('button', { name: /Page/ })).toHaveLength(1);
    expect(screen.getByLabelText('Next page')).toBeDisabled();
    expect(screen.getByLabelText('Previous page')).toBeDisabled();
  });

  it('inserts ellipsis for large ranges', () => {
    render(<Pagination current={50} total={100} onChange={jest.fn()} />);
    const disabled = screen.getAllByRole('button', { name: '…' });
    expect(disabled.length).toBeGreaterThan(0);
  });

  it('does not call onChange when clicking current page', () => {
    const onChange = jest.fn();
    render(<Pagination current={2} total={5} onChange={onChange} />);
    fireEvent.click(screen.getByLabelText('Page 2'));
    expect(onChange).not.toHaveBeenCalled();
  });
});
