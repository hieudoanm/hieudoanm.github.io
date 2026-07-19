import { fireEvent, render, screen } from '@testing-library/react';
import { Radio } from '../Radio';

describe('Radio', () => {
  it('renders radio with label and checked state', () => {
    render(
      <Radio label="Option A" name="group" checked onChange={jest.fn()} />
    );
    const radio = screen.getByRole('radio', { name: 'Option A' });
    expect(radio).toBeChecked();
    expect(radio).toHaveClass('radio-primary');
  });

  it('calls onChange with next value', () => {
    const onChange = jest.fn();
    render(
      <Radio
        label="Option A"
        name="group"
        checked={false}
        onChange={onChange}
      />
    );
    fireEvent.click(screen.getByRole('radio', { name: 'Option A' }));
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it('applies size classes and disables', () => {
    const { rerender } = render(
      <Radio label="A" name="g" checked onChange={jest.fn()} size="sm" />
    );
    expect(screen.getByRole('radio', { name: 'A' })).toHaveClass('radio-sm');
    rerender(
      <Radio
        label="A"
        name="g"
        checked
        disabled
        onChange={jest.fn()}
        size="lg"
      />
    );
    expect(screen.getByRole('radio', { name: 'A' })).toHaveClass('radio-lg');
    expect(screen.getByRole('radio', { name: 'A' })).toBeDisabled();
  });
});
