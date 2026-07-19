import { fireEvent, render, screen } from '@testing-library/react';
import { Checkbox } from '../Checkbox';

describe('Checkbox', () => {
  it('renders label and checked state', () => {
    render(<Checkbox label="Terms" checked onChange={jest.fn()} />);
    const input = screen.getByRole('checkbox', { name: 'Terms' });
    expect(input).toBeChecked();
  });

  it('calls onChange with next checked value', () => {
    const onChange = jest.fn();
    render(<Checkbox label="Terms" checked={false} onChange={onChange} />);
    fireEvent.click(screen.getByRole('checkbox', { name: 'Terms' }));
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it('applies size classes and disables', () => {
    const { rerender } = render(
      <Checkbox label="Terms" checked onChange={jest.fn()} size="sm" />
    );
    expect(screen.getByRole('checkbox', { name: 'Terms' })).toHaveClass(
      'checkbox-sm'
    );
    rerender(<Checkbox label="Terms" checked disabled onChange={jest.fn()} />);
    expect(screen.getByRole('checkbox', { name: 'Terms' })).toBeDisabled();
  });
});
