import { fireEvent, render, screen } from '@testing-library/react';
import { ComposeForm } from '../ComposeForm';

describe('ComposeForm', () => {
  it('renders fields with defaults', () => {
    render(
      <ComposeForm defaultTo="a@b.com" defaultSubject="Hi" defaultBody="Body" />
    );
    expect(screen.getByLabelText('To')).toHaveValue('a@b.com');
    expect(screen.getByLabelText('Subject')).toHaveValue('Hi');
    expect(screen.getByLabelText('Message')).toHaveValue('Body');
  });

  it('submits filled values', () => {
    const onSubmit = jest.fn();
    render(<ComposeForm onSubmit={onSubmit} />);
    fireEvent.change(screen.getByLabelText('To'), {
      target: { value: 'x@y.com' },
    });
    fireEvent.change(screen.getByLabelText('Subject'), {
      target: { value: 'Hello' },
    });
    fireEvent.change(screen.getByLabelText('Message'), {
      target: { value: 'Body text' },
    });
    fireEvent.click(screen.getByTestId('compose-send'));
    expect(onSubmit).toHaveBeenCalledWith({
      to: 'x@y.com',
      subject: 'Hello',
      body: 'Body text',
    });
  });

  it('starts with empty fields by default', () => {
    render(<ComposeForm />);
    expect(screen.getByLabelText('To')).toHaveValue('');
    expect(screen.getByLabelText('Subject')).toHaveValue('');
    expect(screen.getByLabelText('Message')).toHaveValue('');
  });
});
