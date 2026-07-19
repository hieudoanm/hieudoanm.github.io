import { fireEvent, render, screen } from '@testing-library/react';
import { ShareButtons } from '../ShareButtons';

describe('ShareButtons', () => {
  it('renders all network buttons and the copy link button', () => {
    render(<ShareButtons url="https://example.com/post" />);
    expect(screen.getByRole('button', { name: 'Twitter' })).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'LinkedIn' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Copy link' })
    ).toBeInTheDocument();
  });

  it('fires onShare with the network name', () => {
    const onShare = jest.fn();
    render(<ShareButtons url="https://example.com/post" onShare={onShare} />);
    fireEvent.click(screen.getByRole('button', { name: 'Facebook' }));
    expect(onShare).toHaveBeenCalledWith('Facebook');
  });

  it('shows copied feedback after clicking copy link', () => {
    const onShare = jest.fn();
    render(<ShareButtons url="https://example.com/post" onShare={onShare} />);
    fireEvent.click(screen.getByRole('button', { name: 'Copy link' }));
    expect(screen.getByText('Copied!')).toBeInTheDocument();
    expect(onShare).toHaveBeenCalledWith('Copy');
  });
});
