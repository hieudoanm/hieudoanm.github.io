import { fireEvent, render, screen } from '@testing-library/react';
import { ComposeTemplate } from '../ComposeTemplate';

describe('ComposeTemplate', () => {
  it('renders the compose form', () => {
    render(<ComposeTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Compose' })
    ).toBeInTheDocument();
    expect(screen.getByLabelText('To')).toBeInTheDocument();
    expect(screen.getByLabelText('Subject')).toBeInTheDocument();
    expect(screen.getByLabelText('Body')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Send' })).toBeInTheDocument();
  });

  it('shows an error when submitting without a recipient', () => {
    render(<ComposeTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Send' }));
    expect(screen.getByRole('alert')).toHaveTextContent('Enter a recipient');
    expect(screen.queryByText('Message sent')).not.toBeInTheDocument();
  });

  it('saves a draft as the body is typed', () => {
    render(<ComposeTemplate />);
    fireEvent.change(screen.getByLabelText('Body'), {
      target: { value: 'Hello there' },
    });
    expect(screen.getByText('Draft saved')).toBeInTheDocument();
  });

  it('sends a message with a recipient', () => {
    render(<ComposeTemplate />);
    fireEvent.change(screen.getByLabelText('To'), {
      target: { value: 'ada@acme.com' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Send' }));
    expect(screen.getByText('Message sent')).toBeInTheDocument();
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });
});
