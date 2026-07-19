import { fireEvent, render, screen } from '@testing-library/react';
import { ShareRow } from '../ShareRow';

describe('ShareRow', () => {
  it('renders the share count', () => {
    render(<ShareRow shares={7} />);
    expect(screen.getByText('7 shares')).toBeInTheDocument();
  });

  it('renders all action buttons', () => {
    render(<ShareRow />);
    expect(screen.getByRole('button', { name: 'Share' })).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Copy link' })
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Message' })).toBeInTheDocument();
  });

  it('fires onShare when share is clicked', () => {
    const onShare = jest.fn();
    render(<ShareRow onShare={onShare} />);
    fireEvent.click(screen.getByRole('button', { name: 'Share' }));
    expect(onShare).toHaveBeenCalledTimes(1);
  });

  it('fires onCopy and onMessage when clicked', () => {
    const onCopy = jest.fn();
    const onMessage = jest.fn();
    render(<ShareRow onCopy={onCopy} onMessage={onMessage} />);
    fireEvent.click(screen.getByRole('button', { name: 'Copy link' }));
    fireEvent.click(screen.getByRole('button', { name: 'Message' }));
    expect(onCopy).toHaveBeenCalledTimes(1);
    expect(onMessage).toHaveBeenCalledTimes(1);
  });
});
