import { fireEvent, render, screen } from '@testing-library/react';
import { NewsletterSignupTemplate } from '../NewsletterSignupTemplate';

describe('NewsletterSignupTemplate', () => {
  it('renders the signup form', () => {
    render(<NewsletterSignupTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Newsletter' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('textbox', { name: 'Email address' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Subscribe' })
    ).toBeInTheDocument();
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('shows an error for an empty email', () => {
    render(<NewsletterSignupTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Subscribe' }));
    expect(screen.getByRole('alert')).toHaveTextContent(
      'Enter an email address'
    );
  });

  it('shows an error for an email without @', () => {
    render(<NewsletterSignupTemplate />);
    fireEvent.change(screen.getByRole('textbox', { name: 'Email address' }), {
      target: { value: 'not-an-email' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Subscribe' }));
    expect(screen.getByRole('alert')).toHaveTextContent('Enter a valid email');
  });

  it('shows a success message for a valid email', () => {
    render(<NewsletterSignupTemplate />);
    fireEvent.change(screen.getByRole('textbox', { name: 'Email address' }), {
      target: { value: 'reader@example.com' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Subscribe' }));
    expect(screen.getByText('Subscribed')).toBeInTheDocument();
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });
});
