import { render, screen } from '@testing-library/react';
import MessagesPage from '@/app/(templates)/social/messages/page';

describe('MessagesPage', () => {
  it('renders the messages page', () => {
    render(<MessagesPage />);
    expect(
      screen.getByRole('heading', { name: 'Messages' })
    ).toBeInTheDocument();
  });
});
