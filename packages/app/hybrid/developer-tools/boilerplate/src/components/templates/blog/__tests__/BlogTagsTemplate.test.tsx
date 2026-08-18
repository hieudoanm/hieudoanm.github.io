import { fireEvent, render, screen } from '@testing-library/react';
import { BlogTagsTemplate } from '../BlogTagsTemplate';

describe('BlogTagsTemplate', () => {
  it('renders all tags and posts', () => {
    render(<BlogTagsTemplate />);
    expect(screen.getByRole('heading', { name: 'Tags' })).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'nextjs (9)' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'rust (7)' })
    ).toBeInTheDocument();
    expect(screen.getByText('App router tips')).toBeInTheDocument();
    expect(screen.getByText('Prompt patterns')).toBeInTheDocument();
  });

  it('filters posts when a tag is selected', () => {
    render(<BlogTagsTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'nextjs (9)' }));
    expect(screen.getByText('2 posts tagged nextjs')).toBeInTheDocument();
    expect(screen.getByText('App router tips')).toBeInTheDocument();
    expect(screen.getByText('Server actions')).toBeInTheDocument();
    expect(screen.queryByText('Prompt patterns')).not.toBeInTheDocument();
  });

  it('clears the tag filter', () => {
    render(<BlogTagsTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'nextjs (9)' }));
    fireEvent.click(screen.getByRole('button', { name: 'Clear filter' }));
    expect(screen.getByText('Prompt patterns')).toBeInTheDocument();
    expect(screen.queryByText('Clear filter')).not.toBeInTheDocument();
  });
});
