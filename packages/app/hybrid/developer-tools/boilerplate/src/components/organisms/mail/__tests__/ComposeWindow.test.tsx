import { fireEvent, render, screen } from '@testing-library/react';
import { ComposeWindow } from '../ComposeWindow';

describe('ComposeWindow', () => {
  it('renders the compose form fields', () => {
    render(<ComposeWindow />);
    expect(screen.getByLabelText('To')).toBeInTheDocument();
    expect(screen.getByLabelText('Cc')).toBeInTheDocument();
    expect(screen.getByLabelText('Subject')).toBeInTheDocument();
    expect(screen.getByLabelText('Message body')).toBeInTheDocument();
  });

  it('fires onSend with the composed values', () => {
    const onSend = jest.fn();
    render(<ComposeWindow onSend={onSend} />);
    fireEvent.change(screen.getByLabelText('To'), {
      target: { value: 'ada@example.com' },
    });
    fireEvent.change(screen.getByLabelText('Subject'), {
      target: { value: 'Quarterly review' },
    });
    fireEvent.change(screen.getByLabelText('Message body'), {
      target: { value: 'Please review.' },
    });
    fireEvent.click(screen.getByText('Send'));
    expect(onSend).toHaveBeenCalledWith({
      to: 'ada@example.com',
      cc: '',
      subject: 'Quarterly review',
      body: 'Please review.',
    });
  });

  it('fires onDiscard when the close button is clicked', () => {
    const onDiscard = jest.fn();
    render(<ComposeWindow onDiscard={onDiscard} />);
    fireEvent.click(screen.getByLabelText('Discard'));
    expect(onDiscard).toHaveBeenCalled();
  });
});
