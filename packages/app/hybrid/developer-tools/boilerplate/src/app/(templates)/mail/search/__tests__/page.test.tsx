import { render, screen } from '@testing-library/react';
import MailSearchPage from '@/app/(templates)/mail/search/page';

describe('MailSearchPage', () => {
  it('renders the MailSearchPage', () => {
    render(<MailSearchPage />);
    expect(screen.getByText('6 results')).toBeInTheDocument();
  });
});
