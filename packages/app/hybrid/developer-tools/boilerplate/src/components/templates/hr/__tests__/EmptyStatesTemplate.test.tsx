import { fireEvent, render, screen } from '@testing-library/react';
import { EmptyStatesTemplate } from '../EmptyStatesTemplate';

describe('EmptyStatesTemplate', () => {
  it('renders a gallery of empty states', () => {
    render(<EmptyStatesTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Empty states' })
    ).toBeInTheDocument();
    expect(screen.getByText('No results found')).toBeInTheDocument();
    expect(screen.getByText('You are all caught up')).toBeInTheDocument();
    expect(screen.getByText('No files yet')).toBeInTheDocument();
    expect(screen.getByText('Your cart is empty')).toBeInTheDocument();
    expect(screen.getByText('No recent activity to show.')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Upload a file' })).toHaveAttribute(
      'href',
      '/upload'
    );
  });

  it('simulates and clears data', () => {
    render(<EmptyStatesTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Simulate data' }));
    expect(screen.getByText('Alice created the Q3 report')).toBeInTheDocument();
    expect(
      screen.queryByText('No recent activity to show.')
    ).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Clear data' }));
    expect(
      screen.queryByText('Alice created the Q3 report')
    ).not.toBeInTheDocument();
    expect(screen.getByText('No recent activity to show.')).toBeInTheDocument();
  });
});
