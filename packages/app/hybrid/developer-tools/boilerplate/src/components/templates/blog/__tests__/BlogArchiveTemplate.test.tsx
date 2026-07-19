import { fireEvent, render, screen } from '@testing-library/react';
import { BlogArchiveTemplate } from '../BlogArchiveTemplate';

describe('BlogArchiveTemplate', () => {
  it('renders featured post, grid, and month archive', () => {
    render(<BlogArchiveTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Blog Archive' })
    ).toBeInTheDocument();
    expect(screen.getByText('8 posts found')).toBeInTheDocument();
    expect(screen.getByText('Building a Design System')).toBeInTheDocument();
    expect(screen.getByText('GraphQL vs REST in 2023')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'January 2024 (3)' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'June 2023 (1)' })
    ).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toHaveValue('all');
  });

  it('filters posts by year', () => {
    render(<BlogArchiveTemplate />);
    fireEvent.change(screen.getByRole('combobox'), {
      target: { value: '2024' },
    });
    expect(screen.getByText('5 posts found')).toBeInTheDocument();
    expect(
      screen.queryByText('GraphQL vs REST in 2023')
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'January 2024 (3)' })
    ).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: 'November 2023 (2)' })
    ).not.toBeInTheDocument();
  });

  it('filters posts by month and toggles back off', () => {
    render(<BlogArchiveTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'March 2024 (2)' }));
    expect(screen.getByText('2 posts found')).toBeInTheDocument();
    expect(
      screen.getByText('A Deep Dive into Server Components')
    ).toBeInTheDocument();
    expect(
      screen.queryByText('Building a Design System')
    ).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'March 2024 (2)' }));
    expect(screen.getByText('8 posts found')).toBeInTheDocument();
  });

  it('shows only the featured card when a month has one post', () => {
    render(<BlogArchiveTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'June 2023 (1)' }));
    expect(screen.getByText('1 post found')).toBeInTheDocument();
    expect(screen.getByText('GraphQL vs REST in 2023')).toBeInTheDocument();
    expect(
      screen.queryByText('Writing CLI Tools in Rust')
    ).not.toBeInTheDocument();
  });

  it('shows empty state when no posts match the filters', () => {
    render(<BlogArchiveTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'January 2024 (3)' }));
    fireEvent.change(screen.getByRole('combobox'), {
      target: { value: '2023' },
    });
    expect(screen.getByText('No posts found')).toBeInTheDocument();
    expect(screen.getByText('0 posts found')).toBeInTheDocument();
  });
});
