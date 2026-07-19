import { render, screen } from '@testing-library/react';
import SpamPage from '@/app/(templates)/mail/spam/page';

describe('SpamPage', () => {
  it('renders the SpamPage', () => {
    render(<SpamPage />);
    expect(screen.getByText('4 spam messages')).toBeInTheDocument();
  });
});
