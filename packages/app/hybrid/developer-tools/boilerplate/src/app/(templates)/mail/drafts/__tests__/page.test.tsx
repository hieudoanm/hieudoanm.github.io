import { render, screen } from '@testing-library/react';
import DraftsPage from '@/app/(templates)/mail/drafts/page';

describe('DraftsPage', () => {
  it('renders the DraftsPage', () => {
    render(<DraftsPage />);
    expect(screen.getByText('4 drafts')).toBeInTheDocument();
  });
});
