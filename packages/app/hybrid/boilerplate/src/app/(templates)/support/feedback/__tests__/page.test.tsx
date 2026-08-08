import { render, screen } from '@testing-library/react';
import FeedbackPage from '@/app/(templates)/support/feedback/page';

describe('FeedbackPage', () => {
  it('renders the FeedbackPage', () => {
    render(<FeedbackPage />);
    expect(screen.getByText('Rating —/5')).toBeInTheDocument();
  });
});
