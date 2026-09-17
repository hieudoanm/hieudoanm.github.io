import { render, screen, fireEvent } from '@testing-library/react';
import { SearchBar } from '@/components/gallery/molecules/SearchBar';

describe('SearchBar', () => {
  it('emits changes as the user types', () => {
    const onChange = jest.fn();
    render(<SearchBar value="" onChange={onChange} />);
    fireEvent.change(screen.getByPlaceholderText('Search photos...'), {
      target: { value: 'cat' },
    });
    expect(onChange).toHaveBeenCalledWith('cat');
  });

  it('hides the clear button for an empty value', () => {
    render(<SearchBar value="" onChange={jest.fn()} />);
    expect(screen.queryByLabelText('Clear search')).not.toBeInTheDocument();
  });

  it('clears the value', () => {
    const onChange = jest.fn();
    render(<SearchBar value="cat" onChange={onChange} />);
    fireEvent.click(screen.getByLabelText('Clear search'));
    expect(onChange).toHaveBeenCalledWith('');
  });
});
