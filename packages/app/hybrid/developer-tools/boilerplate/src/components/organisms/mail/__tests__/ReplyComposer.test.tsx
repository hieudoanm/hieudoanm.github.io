import { fireEvent, render, screen } from '@testing-library/react';
import { ReplyComposer } from '../ReplyComposer';

describe('ReplyComposer', () => {
  it('renders recipient and subject header', () => {
    render(<ReplyComposer recipient="ada@example.com" subject="Re: Plan" />);
    expect(screen.getByText('ada@example.com')).toBeInTheDocument();
    expect(screen.getByText('Re: Plan')).toBeInTheDocument();
  });

  it('renders the quoted context', () => {
    render(<ReplyComposer quoted="Original message…" />);
    expect(screen.getByText('Original message…')).toBeInTheDocument();
  });

  it('fires onSend with the reply body', () => {
    const onSend = jest.fn();
    render(
      <ReplyComposer
        recipient="ada@example.com"
        subject="Re: Plan"
        onSend={onSend}
      />
    );
    fireEvent.change(screen.getByLabelText('Reply body'), {
      target: { value: 'Sounds good.' },
    });
    fireEvent.click(screen.getByText('Send reply'));
    expect(onSend).toHaveBeenCalledWith({
      recipient: 'ada@example.com',
      subject: 'Re: Plan',
      body: 'Sounds good.',
    });
  });

  it('fires onCancel when closed', () => {
    const onCancel = jest.fn();
    render(<ReplyComposer onCancel={onCancel} />);
    fireEvent.click(screen.getByLabelText('Cancel reply'));
    expect(onCancel).toHaveBeenCalled();
  });
});
