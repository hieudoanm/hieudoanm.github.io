import { fireEvent, render, screen } from '@testing-library/react';
import BlogIndex from '@/app/(templates)/blog/page';

jest.mock('next/navigation', () => ({
  notFound: () => {
    throw new Error('NEXT_NOT_FOUND');
  },
}));

describe('BlogIndex', () => {
  it('renders the list of posts', () => {
    render(<BlogIndex />);
    expect(
      screen.getByText('Getting Started with Modern Web Development')
    ).toBeInTheDocument();
    expect(screen.getByText('Tailwind CSS Best Practices')).toBeInTheDocument();
  });

  it('filters posts by tag', () => {
    render(<BlogIndex />);
    fireEvent.click(screen.getByRole('button', { name: 'Tailwind CSS' }));
    expect(screen.getByText('Tailwind CSS Best Practices')).toBeInTheDocument();
    expect(
      screen.queryByText('Getting Started with Modern Web Development')
    ).not.toBeInTheDocument();
  });

  it('clears the tag filter', () => {
    render(<BlogIndex />);
    fireEvent.click(screen.getByRole('button', { name: 'React' }));
    fireEvent.click(screen.getByRole('button', { name: 'Clear' }));
    expect(
      screen.getByText('Getting Started with Modern Web Development')
    ).toBeInTheDocument();
  });
});
