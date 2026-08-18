import { fireEvent, render, screen } from '@testing-library/react';
import SupportPage from '@/app/(templates)/store/support/page';
import { SupportTemplate } from '../SupportTemplate';

describe('SupportTemplate', () => {
  it('renders FAQ questions and the contact form', () => {
    render(<SupportTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Support' })
    ).toBeInTheDocument();
    expect(
      screen.getByText('How long does shipping take?')
    ).toBeInTheDocument();
    expect(screen.getByText('What is your return policy?')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Subject')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('Describe your issue')
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Send message' })
    ).toBeInTheDocument();
  });

  it('validates the contact form', () => {
    render(<SupportTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Send message' }));
    expect(
      screen.getByText('Subject and message are required')
    ).toBeInTheDocument();
  });

  it('shows a confirmation after sending a message', () => {
    render(<SupportTemplate />);
    fireEvent.change(screen.getByPlaceholderText('Subject'), {
      target: { value: 'Shipping delay' },
    });
    fireEvent.change(screen.getByPlaceholderText('Describe your issue'), {
      target: { value: 'My order is late.' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Send message' }));
    expect(
      screen.getByText('Message sent, we reply within 24h')
    ).toBeInTheDocument();
  });

  it('toggles the chat panel', () => {
    render(<SupportTemplate />);
    expect(
      screen.queryByText('Hi! How can we help you today?')
    ).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Chat with us' }));
    expect(
      screen.getByText('Hi! How can we help you today?')
    ).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Chat with us' }));
    expect(
      screen.queryByText('Hi! How can we help you today?')
    ).not.toBeInTheDocument();
  });

  it('renders the SupportPage', () => {
    render(<SupportPage />);
    expect(
      screen.getByRole('heading', { name: 'Support' })
    ).toBeInTheDocument();
  });
});
