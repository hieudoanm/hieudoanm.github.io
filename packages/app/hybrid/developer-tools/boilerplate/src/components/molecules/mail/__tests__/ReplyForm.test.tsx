import { fireEvent, render, screen } from '@testing-library/react';
import { ReplyForm } from '../ReplyForm';

describe('ReplyForm', () => {
  it('renders recipient context and textarea', () => {
    render(<ReplyForm to="Alice" subject="Hello" />);
    expect(screen.getByText(/Reply to/)).toBeInTheDocument();
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByLabelText('Reply body')).toBeInTheDocument();
  });

  it('submits the reply body', () => {
    const onSend = jest.fn();
    render(<ReplyForm to="Alice" subject="Hello" onSend={onSend} />);
    fireEvent.change(screen.getByLabelText('Reply body'), {
      target: { value: 'Sounds good' },
    });
    fireEvent.click(screen.getByTestId('reply-send'));
    expect(onSend).toHaveBeenCalledWith('Sounds good');
  });

  it('calls onCancel when cancel clicked', () => {
    const onCancel = jest.fn();
    render(<ReplyForm to="Alice" subject="Hello" onCancel={onCancel} />);
    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));
    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it('omits cancel button when onCancel is missing', () => {
    render(<ReplyForm to="Alice" subject="Hello" />);
    expect(
      screen.queryByRole('button', { name: 'Cancel' })
    ).not.toBeInTheDocument();
  });
});
