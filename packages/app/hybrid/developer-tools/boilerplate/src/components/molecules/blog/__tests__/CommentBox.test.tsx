import { fireEvent, render, screen } from '@testing-library/react';
import { CommentBox } from '../CommentBox';

describe('CommentBox', () => {
  it('renders the author and a textarea', () => {
    render(<CommentBox onSubmit={jest.fn()} author="Jane" />);
    expect(screen.getByText('Jane')).toBeInTheDocument();
    expect(screen.getByLabelText('Comment')).toBeInTheDocument();
  });

  it('disables the submit button when empty', () => {
    render(<CommentBox onSubmit={jest.fn()} />);
    expect(screen.getByRole('button', { name: 'Post comment' })).toBeDisabled();
  });

  it('calls onSubmit with trimmed text and clears the input', () => {
    const onSubmit = jest.fn();
    render(<CommentBox onSubmit={onSubmit} />);
    fireEvent.change(screen.getByLabelText('Comment'), {
      target: { value: '  Great post!  ' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Post comment' }));
    expect(onSubmit).toHaveBeenCalledWith('Great post!');
    expect(screen.getByLabelText('Comment')).toHaveValue('');
  });
});
