import { fireEvent, render, screen } from '@testing-library/react';
import { FeedTemplate } from '../FeedTemplate';

describe('FeedTemplate', () => {
  it('renders posts with authors, text and like counts', () => {
    render(<FeedTemplate />);
    expect(screen.getByRole('heading', { name: 'Feed' })).toBeInTheDocument();
    expect(screen.getByText('4 posts')).toBeInTheDocument();
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
    expect(screen.getByText('Alex Chen')).toBeInTheDocument();
    expect(screen.getByText('Like 24')).toBeInTheDocument();
    expect(screen.getByText(/Liked 12/)).toBeInTheDocument();
  });

  it('toggles like on a post', () => {
    render(<FeedTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Like 24' }));
    expect(screen.getByText('Liked 25')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Liked 25' }));
    expect(screen.getByText('Like 24')).toBeInTheDocument();
  });

  it('posts a comment to a specific feed item', () => {
    render(<FeedTemplate />);
    fireEvent.change(
      screen.getByLabelText("Add a comment on Jane Doe's post"),
      { target: { value: 'Looking forward to the update' } }
    );
    fireEvent.click(screen.getAllByRole('button', { name: 'Post' })[0]);
    expect(
      screen.getByText('You: Looking forward to the update')
    ).toBeInTheDocument();
    expect(
      screen.queryByText('You: Already saw the update')
    ).not.toBeInTheDocument();
  });
});
