import { render, screen } from '@testing-library/react';
import SentPage from '@/app/(templates)/mail/sent/page';

describe('SentPage', () => {
  it('renders the SentPage', () => {
    render(<SentPage />);
    expect(screen.getByText('5 sent messages')).toBeInTheDocument();
  });
});
