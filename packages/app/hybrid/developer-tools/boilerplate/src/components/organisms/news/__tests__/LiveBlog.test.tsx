import { fireEvent, render, screen } from '@testing-library/react';
import { LiveBlog } from '../LiveBlog';

const posts = [
  {
    time: '09:00',
    author: 'Carla Ruiz',
    text: 'Protesters begin gathering downtown.',
  },
  {
    time: '09:12',
    author: 'Dev Patel',
    text: 'Police set up barriers on Main Street.',
  },
];

describe('LiveBlog', () => {
  it('renders initial posts with timestamps and authors', () => {
    render(<LiveBlog posts={posts} />);
    expect(screen.getByText('09:00')).toBeInTheDocument();
    expect(screen.getByText('Carla Ruiz')).toBeInTheDocument();
    expect(
      screen.getByText('Protesters begin gathering downtown.')
    ).toBeInTheDocument();
  });

  it('renders the live badge and title', () => {
    render(<LiveBlog posts={posts} title="City Protests" />);
    expect(screen.getByText('Live')).toBeInTheDocument();
    expect(screen.getByText('City Protests')).toBeInTheDocument();
  });

  it('appends a new post submitted via the form', () => {
    render(<LiveBlog posts={posts} />);
    fireEvent.change(screen.getByRole('textbox', { name: 'Live update' }), {
      target: { value: 'Crowd estimate rises to 5,000.' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Post' }));
    expect(
      screen.getByText('Crowd estimate rises to 5,000.')
    ).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: 'Live update' })).toHaveValue(
      ''
    );
  });

  it('does not append an empty update', () => {
    render(<LiveBlog posts={posts} />);
    fireEvent.click(screen.getByRole('button', { name: 'Post' }));
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
  });
});
