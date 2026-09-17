import { render, screen, fireEvent } from '@testing-library/react';
import { useState } from 'react';
import { SearchField } from '@/components/pos/molecules/SearchField';

const Harness = () => {
  const [value, setValue] = useState('');
  return (
    <SearchField
      value={value}
      onChange={setValue}
      placeholder="Search by ID or item..."
    />
  );
};

describe('SearchField', () => {
  it('renders the placeholder', () => {
    render(<Harness />);
    expect(
      screen.getByPlaceholderText('Search by ID or item...')
    ).toBeInTheDocument();
  });

  it('reports typed input', () => {
    render(<Harness />);
    const input = screen.getByPlaceholderText('Search by ID or item...');
    fireEvent.change(input, { target: { value: 'Tea' } });
    expect(input).toHaveValue('Tea');
  });

  it('hides the clear button while empty', () => {
    render(<Harness />);
    expect(screen.queryByLabelText('Clear search')).not.toBeInTheDocument();
  });

  it('clears the value when the clear button is pressed', () => {
    render(<Harness />);
    const input = screen.getByPlaceholderText('Search by ID or item...');
    fireEvent.change(input, { target: { value: 'Tea' } });
    fireEvent.click(screen.getByLabelText('Clear search'));
    expect(input).toHaveValue('');
  });
});
