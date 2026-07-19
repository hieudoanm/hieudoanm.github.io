import { fireEvent, render, screen } from '@testing-library/react';
import { NewsletterSignup } from '../NewsletterSignup';

describe('NewsletterSignup', () => {
  it('renders title, description, and form', () => {
    render(<NewsletterSignup />);
    expect(screen.getByText('Get the daily briefing')).toBeInTheDocument();
    expect(
      screen.getByRole('textbox', { name: 'Email address' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Subscribe' })
    ).toBeInTheDocument();
  });

  it('submits the email and shows a success message', () => {
    const onSubscribe = jest.fn();
    render(<NewsletterSignup onSubscribe={onSubscribe} />);
    fireEvent.change(screen.getByRole('textbox', { name: 'Email address' }), {
      target: { value: 'user@example.com' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Subscribe' }));
    expect(onSubscribe).toHaveBeenCalledWith('user@example.com');
    expect(screen.getByTestId('newsletter-success')).toBeInTheDocument();
  });

  it('does not call onSubscribe with an empty email', () => {
    const onSubscribe = jest.fn();
    render(<NewsletterSignup onSubscribe={onSubscribe} />);
    fireEvent.click(screen.getByRole('button', { name: 'Subscribe' }));
    expect(onSubscribe).not.toHaveBeenCalled();
  });

  it('renders a custom button label', () => {
    render(<NewsletterSignup buttonLabel="Sign me up" />);
    expect(
      screen.getByRole('button', { name: 'Sign me up' })
    ).toBeInTheDocument();
  });
});
