import { fireEvent, render, screen } from '@testing-library/react';
import { RadioGroup } from '../RadioGroup';

describe('RadioGroup', () => {
  const options = [
    { label: 'Light', value: 'light' },
    { label: 'Dark', value: 'dark', description: 'Easier on the eyes' },
  ];

  it('renders radios and marks the selected one', () => {
    render(
      <RadioGroup
        name="theme"
        options={options}
        value="dark"
        onChange={jest.fn()}
      />
    );
    expect(screen.getByRole('radio', { name: 'Light' })).not.toBeChecked();
    expect(screen.getByRole('radio', { name: 'Dark' })).toBeChecked();
    expect(screen.getByText('Easier on the eyes')).toBeInTheDocument();
  });

  it('calls onChange with the selected value', () => {
    const onChange = jest.fn();
    render(
      <RadioGroup
        name="theme"
        options={options}
        value="light"
        onChange={onChange}
      />
    );
    fireEvent.click(screen.getByRole('radio', { name: 'Dark' }));
    expect(onChange).toHaveBeenCalledWith('dark');
  });

  it('shows an error', () => {
    render(
      <RadioGroup
        name="theme"
        options={options}
        value=""
        onChange={jest.fn()}
        error="Required"
      />
    );
    expect(screen.getByText('Required')).toBeInTheDocument();
  });
});
