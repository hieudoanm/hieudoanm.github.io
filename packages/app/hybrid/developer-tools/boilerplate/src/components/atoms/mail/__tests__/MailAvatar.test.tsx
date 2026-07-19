import { render, screen } from '@testing-library/react';
import { MailAvatar } from '../MailAvatar';

describe('MailAvatar', () => {
  it('shows initials when no image is provided', () => {
    render(<MailAvatar name="Jane Doe" />);
    expect(screen.getByTestId('mail-avatar')).toHaveTextContent('JD');
  });

  it('renders the image with an alt text', () => {
    render(<MailAvatar name="Jane Doe" src="/jane.png" />);
    expect(screen.getByRole('img')).toHaveAttribute('alt', 'Jane Doe avatar');
  });

  it('applies the requested size class', () => {
    render(<MailAvatar name="Jane Doe" size="sm" />);
    expect(screen.getByTestId('mail-avatar').firstChild).toHaveClass('h-8');
  });
});
