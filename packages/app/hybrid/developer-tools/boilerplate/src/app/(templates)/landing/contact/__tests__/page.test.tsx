import { fireEvent, render, screen } from '@testing-library/react';
import ContactPage from '@/app/(templates)/landing/contact/page';

describe('ContactPage', () => {
  it('renders contact blocks and the form', () => {
    render(<ContactPage />);
    expect(screen.getByText('Get in touch')).toBeInTheDocument();
    expect(screen.getByText('hello@boilerplate.com')).toBeInTheDocument();
    expect(screen.getByText('+1 555-0132')).toBeInTheDocument();
    expect(
      screen.getByRole('textbox', { name: 'Your name' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('textbox', { name: 'Email address' })
    ).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toHaveValue('General');
    expect(
      screen.getByRole('button', { name: 'Send message' })
    ).toBeInTheDocument();
  });

  it('shows an error when fields are empty', () => {
    render(<ContactPage />);
    fireEvent.click(screen.getByRole('button', { name: 'Send message' }));
    expect(screen.getByRole('alert')).toHaveTextContent(
      'Please fill in all fields'
    );
  });

  it('sends the message when valid', () => {
    render(<ContactPage />);
    fireEvent.change(screen.getByRole('textbox', { name: 'Your name' }), {
      target: { value: 'Jane' },
    });
    fireEvent.change(screen.getByRole('textbox', { name: 'Email address' }), {
      target: { value: 'jane@example.com' },
    });
    fireEvent.change(screen.getByRole('textbox', { name: 'Message' }), {
      target: { value: 'Hello!' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Send message' }));
    expect(screen.getByText('Message sent')).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: 'Send message' })
    ).not.toBeInTheDocument();
  });
});
