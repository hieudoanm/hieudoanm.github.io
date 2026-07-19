import { fireEvent, render, screen } from '@testing-library/react';
import { NewsletterBanner } from '../NewsletterBanner';

describe('NewsletterBanner', () => {
  it('renders title, description, and form', () => {
    render(<NewsletterBanner />);
    expect(screen.getByText('Join the newsletter')).toBeInTheDocument();
    expect(
      screen.getByRole('textbox', { name: 'Email address' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Subscribe' })
    ).toBeInTheDocument();
  });

  it('subscribes and shows success message', () => {
    const onSubscribe = jest.fn();
    render(<NewsletterBanner onSubscribe={onSubscribe} />);
    fireEvent.change(screen.getByRole('textbox', { name: 'Email address' }), {
      target: { value: 'user@example.com' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Subscribe' }));
    expect(onSubscribe).toHaveBeenCalledWith('user@example.com');
    expect(screen.getByTestId('newsletter-success')).toBeInTheDocument();
  });

  it('does not subscribe with an empty email', () => {
    const onSubscribe = jest.fn();
    render(<NewsletterBanner onSubscribe={onSubscribe} />);
    fireEvent.click(screen.getByRole('button', { name: 'Subscribe' }));
    expect(onSubscribe).not.toHaveBeenCalled();
  });
});
