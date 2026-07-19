import { fireEvent, render, screen } from '@testing-library/react';
import { ContactTemplate } from '../ContactTemplate';

describe('ContactTemplate', () => {
  it('renders the heading and contact form fields', () => {
    render(<ContactTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Get in touch' })
    ).toBeInTheDocument();
    expect(screen.getByLabelText('Your name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email address')).toBeInTheDocument();
    expect(screen.getByLabelText('Message')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Send message' })
    ).toBeInTheDocument();
  });

  it('shows an error when submitting with empty fields', () => {
    render(<ContactTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Send message' }));
    expect(screen.getByRole('alert')).toHaveTextContent(
      'Please fill in all fields'
    );
  });

  it('submits the form when all required fields are filled', () => {
    render(<ContactTemplate />);
    fireEvent.change(screen.getByLabelText('Your name'), {
      target: { value: 'Ada' },
    });
    fireEvent.change(screen.getByLabelText('Email address'), {
      target: { value: 'ada@example.com' },
    });
    fireEvent.change(screen.getByLabelText('Message'), {
      target: { value: 'Hello there' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Send message' }));
    expect(screen.getByText('Message sent')).toBeInTheDocument();
  });
});
