import { render, screen } from '@testing-library/react';
import NewsletterSignupPage from '@/app/(templates)/news/newsletter/page';

describe('NewsletterSignupPage', () => {
  it('renders the NewsletterSignupPage', () => {
    render(<NewsletterSignupPage />);
    expect(
      screen.getByRole('textbox', { name: 'Email address' })
    ).toBeInTheDocument();
  });
});
