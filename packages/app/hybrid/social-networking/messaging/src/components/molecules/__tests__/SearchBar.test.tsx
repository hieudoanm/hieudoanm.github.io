import { render, screen, fireEvent } from '@testing-library/react';
import { SearchBar } from '@/components/molecules/SearchBar';

describe('SearchBar', () => {
  it('is a controlled input that reports changes', () => {
    const onChange = jest.fn();
    render(<SearchBar value="" onChange={onChange} />);
    const input = screen.getByLabelText('Search…');
    fireEvent.change(input, { target: { value: 'alice' } });
    expect(onChange).toHaveBeenCalledWith('alice');
  });

  it('renders the provided value and custom placeholder', () => {
    render(<SearchBar value="abc" onChange={jest.fn()} placeholder="Find…" />);
    expect(screen.getByLabelText('Find…')).toHaveValue('abc');
  });
});
