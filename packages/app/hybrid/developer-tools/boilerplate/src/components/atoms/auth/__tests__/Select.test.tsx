import { fireEvent, render, screen } from '@testing-library/react';
import { Select } from '../Select';

describe('Select', () => {
  const options = [
    { label: 'Apples', value: 'apples' },
    { label: 'Oranges', value: 'oranges' },
  ];

  it('renders label and options', () => {
    render(
      <Select label="Fruit" value="" onChange={jest.fn()} options={options} />
    );
    expect(screen.getByLabelText('Fruit')).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Apples' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Oranges' })).toBeInTheDocument();
  });

  it('calls onChange with selected value', () => {
    const onChange = jest.fn();
    render(
      <Select
        label="Fruit"
        value="apples"
        onChange={onChange}
        options={options}
      />
    );
    fireEvent.change(screen.getByLabelText('Fruit'), {
      target: { value: 'oranges' },
    });
    expect(onChange).toHaveBeenCalledWith('oranges');
  });

  it('renders placeholder and applies size class', () => {
    const { rerender } = render(
      <Select
        label="Fruit"
        value=""
        onChange={jest.fn()}
        options={options}
        placeholder="Pick one"
      />
    );
    expect(
      screen.getByRole('option', { name: 'Pick one' })
    ).toBeInTheDocument();
    rerender(
      <Select
        label="Fruit"
        value=""
        onChange={jest.fn()}
        options={options}
        size="sm"
      />
    );
    expect(screen.getByLabelText('Fruit')).toHaveClass('select-sm');
  });

  it('disables when disabled', () => {
    render(
      <Select
        label="Fruit"
        value=""
        onChange={jest.fn()}
        options={options}
        disabled
      />
    );
    expect(screen.getByLabelText('Fruit')).toBeDisabled();
  });
});
