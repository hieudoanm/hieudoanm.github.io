import { fireEvent, render, screen } from '@testing-library/react';
import { PasswordField } from '../PasswordField';

describe('PasswordField', () => {
  it('renders a password input with label', () => {
    render(
      <PasswordField label="Password" value="secret" onChange={jest.fn()} />
    );
    const input = screen.getByLabelText('Password');
    expect(input).toHaveAttribute('type', 'password');
    expect(input).toHaveValue('secret');
  });

  it('toggles visibility with the show button', () => {
    render(
      <PasswordField label="Password" value="secret" onChange={jest.fn()} />
    );
    const input = screen.getByLabelText('Password');
    fireEvent.click(screen.getByRole('button', { name: 'Show Password' }));
    expect(input).toHaveAttribute('type', 'text');
    fireEvent.click(screen.getByRole('button', { name: 'Hide Password' }));
    expect(input).toHaveAttribute('type', 'password');
  });

  it('calls onChange on input', () => {
    const onChange = jest.fn();
    render(<PasswordField label="Password" value="" onChange={onChange} />);
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'hunter2' },
    });
    expect(onChange).toHaveBeenCalledWith('hunter2');
  });

  it('shows error and disables toggle', () => {
    render(
      <PasswordField
        label="Password"
        value="x"
        onChange={jest.fn()}
        error="Too short"
        disabled
      />
    );
    expect(screen.getByText('Too short')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Show Password' })
    ).toBeDisabled();
    expect(screen.getByLabelText('Password')).toBeDisabled();
  });
});
