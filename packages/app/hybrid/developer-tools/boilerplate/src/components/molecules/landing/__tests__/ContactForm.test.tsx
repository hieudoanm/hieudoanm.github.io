import { fireEvent, render, screen } from '@testing-library/react';
import { ContactForm } from '../ContactForm';

describe('ContactForm', () => {
  it('renders form fields and submit button', () => {
    render(<ContactForm />);
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Message')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Send message' })
    ).toBeInTheDocument();
  });

  it('calls onSubmit with the entered values', () => {
    const onSubmit = jest.fn();
    render(<ContactForm onSubmit={onSubmit} />);
    fireEvent.change(screen.getByLabelText('Name'), {
      target: { value: 'Jane' },
    });
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'jane@acme.io' },
    });
    fireEvent.change(screen.getByLabelText('Message'), {
      target: { value: 'Hello' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Send message' }));
    expect(onSubmit).toHaveBeenCalledWith({
      name: 'Jane',
      email: 'jane@acme.io',
      message: 'Hello',
    });
  });

  it('updates the submit label after sending', () => {
    render(<ContactForm />);
    fireEvent.change(screen.getByLabelText('Name'), {
      target: { value: 'Jane' },
    });
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'jane@acme.io' },
    });
    fireEvent.change(screen.getByLabelText('Message'), {
      target: { value: 'Hello' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Send message' }));
    expect(
      screen.getByRole('button', { name: 'Message sent' })
    ).toBeInTheDocument();
  });

  it('renders a custom title', () => {
    render(<ContactForm title="Get in touch" />);
    expect(screen.getByText('Get in touch')).toBeInTheDocument();
  });
});
