import { render, screen } from '@testing-library/react';
import NewsletterPage from '@/app/(templates)/blog/newsletter/page';

describe('NewsletterPage', () => {
  it('renders the newsletter page', () => {
    render(<NewsletterPage />);
    expect(screen.getByText('Subscribe to the newsletter')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Subscribe' })
    ).toBeInTheDocument();
  });
});
