import { fireEvent, render, screen } from '@testing-library/react';
import { SuggestionCard } from '../SuggestionCard';

describe('SuggestionCard', () => {
  it('renders the name and default reason', () => {
    render(<SuggestionCard name="Linh Tran" />);
    expect(screen.getByText('Linh Tran')).toBeInTheDocument();
    expect(screen.getByText('Suggested for you')).toBeInTheDocument();
  });

  it('renders the handle when provided', () => {
    render(<SuggestionCard name="Linh Tran" handle="linht" />);
    expect(screen.getByText('@linht')).toBeInTheDocument();
  });

  it('calls onFollow when follow is clicked', () => {
    const onFollow = jest.fn();
    render(<SuggestionCard name="Linh Tran" onFollow={onFollow} />);
    fireEvent.click(screen.getByRole('button', { name: 'Follow' }));
    expect(onFollow).toHaveBeenCalledTimes(1);
  });

  it('renders a dismiss button only when onDismiss is provided', () => {
    const onDismiss = jest.fn();
    const { rerender } = render(<SuggestionCard name="Linh Tran" />);
    expect(
      screen.queryByRole('button', { name: 'Dismiss' })
    ).not.toBeInTheDocument();
    rerender(<SuggestionCard name="Linh Tran" onDismiss={onDismiss} />);
    fireEvent.click(screen.getByRole('button', { name: 'Dismiss' }));
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });
});
