import { fireEvent, render, screen } from '@testing-library/react';
import { Switch } from '../Switch';

describe('Switch', () => {
  it('renders a switch with label and checked state', () => {
    render(<Switch label="Dark mode" checked onChange={jest.fn()} />);
    const input = screen.getByRole('switch', { name: /Dark mode/ });
    expect(input).toBeChecked();
    expect(input).toHaveClass('toggle-primary');
  });

  it('calls onChange when toggled', () => {
    const onChange = jest.fn();
    render(<Switch label="Dark mode" checked={false} onChange={onChange} />);
    fireEvent.click(screen.getByRole('switch', { name: /Dark mode/ }));
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it('shows description and size class', () => {
    render(
      <Switch
        label="Dark mode"
        checked
        onChange={jest.fn()}
        description="Applies after reload"
        size="sm"
      />
    );
    expect(screen.getByText('Applies after reload')).toBeInTheDocument();
    expect(screen.getByRole('switch')).toHaveClass('toggle-sm');
  });

  it('disables when disabled', () => {
    render(<Switch label="Dark mode" checked disabled onChange={jest.fn()} />);
    expect(screen.getByRole('switch')).toBeDisabled();
  });
});
