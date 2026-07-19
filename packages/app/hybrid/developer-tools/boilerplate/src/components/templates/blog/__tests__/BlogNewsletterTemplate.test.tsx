import { fireEvent, render, screen } from '@testing-library/react';
import { BlogNewsletterTemplate } from '../BlogNewsletterTemplate';

describe('BlogNewsletterTemplate', () => {
  it('renders the subscribe form', () => {
    render(<BlogNewsletterTemplate />);
    expect(screen.getByText('Subscribe to the newsletter')).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: 'Email' })).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Subscribe' })
    ).toBeInTheDocument();
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('shows an error for an empty email', () => {
    render(<BlogNewsletterTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Subscribe' }));
    expect(screen.getByRole('alert')).toHaveTextContent('Enter a valid email');
  });

  it('shows an error for an invalid email', () => {
    render(<BlogNewsletterTemplate />);
    fireEvent.change(screen.getByRole('textbox', { name: 'Email' }), {
      target: { value: 'not-an-email' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Subscribe' }));
    expect(screen.getByRole('alert')).toHaveTextContent('Enter a valid email');
  });

  it('shows the success panel after subscribing', () => {
    render(<BlogNewsletterTemplate />);
    fireEvent.change(screen.getByRole('textbox', { name: 'Email' }), {
      target: { value: 'jane@example.com' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Subscribe' }));
    expect(screen.getByText("You're subscribed!")).toBeInTheDocument();
    expect(screen.getByText('jane@example.com')).toBeInTheDocument();
    expect(screen.getByText('Manage preferences')).toBeInTheDocument();
    expect(
      screen.getByText('Newsletter frequency: Weekly')
    ).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toHaveValue('Weekly');
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
  });

  it('updates the frequency preference', () => {
    render(<BlogNewsletterTemplate />);
    fireEvent.change(screen.getByRole('textbox', { name: 'Email' }), {
      target: { value: 'jane@example.com' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Subscribe' }));
    fireEvent.change(screen.getByRole('combobox'), {
      target: { value: 'Daily' },
    });
    expect(screen.getByText('Newsletter frequency: Daily')).toBeInTheDocument();
  });

  it('returns to the form after unsubscribing', () => {
    render(<BlogNewsletterTemplate />);
    fireEvent.change(screen.getByRole('textbox', { name: 'Email' }), {
      target: { value: 'jane@example.com' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Subscribe' }));
    fireEvent.click(screen.getByRole('button', { name: 'Unsubscribe' }));
    expect(screen.getByText('Subscribe to the newsletter')).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: 'Email' })).toHaveValue('');
  });
});
