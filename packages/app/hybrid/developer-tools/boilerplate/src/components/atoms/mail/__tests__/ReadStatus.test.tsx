import { render, screen } from '@testing-library/react';
import { ReadStatus } from '../ReadStatus';

describe('ReadStatus', () => {
  it('renders Unread with emphasised styling', () => {
    render(<ReadStatus read={false} />);
    expect(screen.getByTestId('read-status')).toHaveTextContent('Unread');
    expect(screen.getByTestId('read-status')).toHaveClass('text-base-content');
  });

  it('renders Read with muted styling', () => {
    render(<ReadStatus read />);
    expect(screen.getByTestId('read-status')).toHaveTextContent('Read');
    expect(screen.getByTestId('read-status')).toHaveClass(
      'text-base-content/60'
    );
  });
});
