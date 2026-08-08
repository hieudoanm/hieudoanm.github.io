import { fireEvent, render, screen } from '@testing-library/react';
import { CheckboxGroup } from '../CheckboxGroup';

describe('CheckboxGroup', () => {
  const options = [
    { label: 'Email', value: 'email' },
    { label: 'SMS', value: 'sms' },
    { label: 'Push', value: 'push' },
  ];

  it('checks the selected options', () => {
    render(
      <CheckboxGroup options={options} value={['email']} onChange={jest.fn()} />
    );
    expect(screen.getByRole('checkbox', { name: 'Email' })).toBeChecked();
    expect(screen.getByRole('checkbox', { name: 'SMS' })).not.toBeChecked();
  });

  it('toggles options in and out of the value', () => {
    const onChange = jest.fn();
    render(
      <CheckboxGroup options={options} value={['email']} onChange={onChange} />
    );
    fireEvent.click(screen.getByRole('checkbox', { name: 'SMS' }));
    expect(onChange).toHaveBeenCalledWith(['email', 'sms']);
    fireEvent.click(screen.getByRole('checkbox', { name: 'Email' }));
    expect(onChange).toHaveBeenCalledWith([]);
  });

  it('shows an error', () => {
    render(
      <CheckboxGroup
        options={options}
        value={[]}
        onChange={jest.fn()}
        error="Pick at least one"
      />
    );
    expect(screen.getByText('Pick at least one')).toBeInTheDocument();
  });
});
