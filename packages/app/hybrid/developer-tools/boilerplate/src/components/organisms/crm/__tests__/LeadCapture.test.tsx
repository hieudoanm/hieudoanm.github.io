import { fireEvent, render, screen } from '@testing-library/react';
import { LeadCapture } from '../LeadCapture';

describe('LeadCapture', () => {
  it('renders the form fields', () => {
    render(<LeadCapture />);
    expect(
      screen.getByRole('textbox', { name: 'Lead name' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('textbox', { name: 'Lead email' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('textbox', { name: 'Lead company' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Save lead' })
    ).toBeInTheDocument();
  });

  it('captures a lead and shows confirmation', () => {
    const onCapture = jest.fn();
    render(<LeadCapture onCapture={onCapture} />);
    fireEvent.change(screen.getByRole('textbox', { name: 'Lead name' }), {
      target: { value: 'Jane' },
    });
    fireEvent.change(screen.getByRole('textbox', { name: 'Lead email' }), {
      target: { value: 'jane@acme.com' },
    });
    fireEvent.change(screen.getByRole('textbox', { name: 'Lead company' }), {
      target: { value: 'Acme' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Save lead' }));
    expect(onCapture).toHaveBeenCalledWith({
      name: 'Jane',
      email: 'jane@acme.com',
      company: 'Acme',
    });
    expect(screen.getByTestId('lead-captured')).toBeInTheDocument();
  });

  it('does not capture when name or email is missing', () => {
    const onCapture = jest.fn();
    render(<LeadCapture onCapture={onCapture} />);
    fireEvent.click(screen.getByRole('button', { name: 'Save lead' }));
    expect(onCapture).not.toHaveBeenCalled();
  });
});
