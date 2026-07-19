import { fireEvent, render, screen } from '@testing-library/react';
import { MessageIcon } from '../MessageIcon';

describe('MessageIcon', () => {
  it('renders a message button with default label', () => {
    render(<MessageIcon />);
    expect(screen.getByRole('button', { name: 'Message' })).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const onClick = jest.fn();
    render(<MessageIcon onClick={onClick} />);
    fireEvent.click(screen.getByRole('button', { name: 'Message' }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('renders unread indicator when unread', () => {
    render(<MessageIcon unread />);
    expect(
      screen.getByTestId('message-icon').querySelector('.badge-error')
    ).toBeInTheDocument();
  });
});
