import { fireEvent, render, screen } from '@testing-library/react';
import { SearchResults } from '../SearchResults';

const results = [
  { id: '1', from: 'Alice', subject: 'Budget', preview: 'Draft attached' },
];

describe('SearchResults', () => {
  it('renders query summary and results', () => {
    render(<SearchResults query="budget" results={results} />);
    expect(screen.getByText(/1 result for/)).toBeInTheDocument();
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('Budget')).toBeInTheDocument();
  });

  it('shows empty state for no results', () => {
    render(<SearchResults query="budget" results={[]} />);
    expect(screen.getByText(/0 results for/)).toBeInTheDocument();
    expect(
      screen.getByText('No emails match your search.')
    ).toBeInTheDocument();
  });

  it('calls onSelect with the result id', () => {
    const onSelect = jest.fn();
    render(
      <SearchResults query="budget" results={results} onSelect={onSelect} />
    );
    fireEvent.click(screen.getByText('Alice'));
    expect(onSelect).toHaveBeenCalledWith('1');
  });
});
