import { fireEvent, render, screen } from '@testing-library/react';
import { SearchBar } from '../SearchBar';

describe('SearchBar', () => {
  it('renders search input with value and placeholder', () => {
    render(
      <SearchBar value="term" onChange={jest.fn()} placeholder="Find..." />
    );
    const input = screen.getByRole('searchbox');
    expect(input).toHaveValue('term');
    expect(input).toHaveAttribute('placeholder', 'Find...');
  });

  it('calls onChange on input', () => {
    const onChange = jest.fn();
    render(<SearchBar value="" onChange={onChange} />);
    fireEvent.change(screen.getByRole('searchbox'), {
      target: { value: 'hello' },
    });
    expect(onChange).toHaveBeenCalledWith('hello');
  });

  it('clears value via clear button', () => {
    const onChange = jest.fn();
    render(<SearchBar value="term" onChange={onChange} />);
    fireEvent.click(screen.getByRole('button', { name: 'Clear search' }));
    expect(onChange).toHaveBeenCalledWith('');
  });

  it('hides clear button when empty or disabled', () => {
    const { rerender } = render(<SearchBar value="" onChange={jest.fn()} />);
    expect(
      screen.queryByRole('button', { name: 'Clear search' })
    ).not.toBeInTheDocument();
    rerender(<SearchBar value="x" onChange={jest.fn()} disabled />);
    expect(
      screen.queryByRole('button', { name: 'Clear search' })
    ).not.toBeInTheDocument();
  });

  it('applies size class and disables', () => {
    render(<SearchBar value="" onChange={jest.fn()} size="lg" disabled />);
    const input = screen.getByRole('searchbox');
    expect(input).toHaveClass('input-lg');
    expect(input).toBeDisabled();
  });
});
