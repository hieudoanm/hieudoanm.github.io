import { render, screen } from '@testing-library/react';
import ThreadPage from '@/app/(templates)/mail/thread/page';

describe('ThreadPage', () => {
  it('renders the ThreadPage', () => {
    render(<ThreadPage />);
    expect(screen.getByText('3 messages')).toBeInTheDocument();
  });
});
