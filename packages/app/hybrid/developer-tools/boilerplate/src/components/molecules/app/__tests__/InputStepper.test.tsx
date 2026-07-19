import { fireEvent, render, screen } from '@testing-library/react';
import { InputStepper } from '../InputStepper';

describe('InputStepper', () => {
  const options = ['Day', 'Week', 'Month'];

  it('shows the current option and its position', () => {
    render(
      <InputStepper
        label="Period"
        options={options}
        value="Week"
        onChange={jest.fn()}
      />
    );
    expect(screen.getByText('Week')).toBeInTheDocument();
    expect(screen.getByText('2 of 3')).toBeInTheDocument();
  });

  it('steps forward and backward', () => {
    const onChange = jest.fn();
    const { rerender } = render(
      <InputStepper
        label="Period"
        options={options}
        value="Day"
        onChange={onChange}
      />
    );
    fireEvent.click(screen.getByRole('button', { name: 'Next Period' }));
    expect(onChange).toHaveBeenCalledWith('Week');
    rerender(
      <InputStepper
        label="Period"
        options={options}
        value="Week"
        onChange={onChange}
      />
    );
    fireEvent.click(screen.getByRole('button', { name: 'Previous Period' }));
    expect(onChange).toHaveBeenLastCalledWith('Day');
  });

  it('disables the previous button at the first step', () => {
    render(
      <InputStepper
        label="Period"
        options={options}
        value="Day"
        onChange={jest.fn()}
      />
    );
    expect(
      screen.getByRole('button', { name: 'Previous Period' })
    ).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Next Period' })).toBeEnabled();
  });

  it('disables the next button at the last step', () => {
    render(
      <InputStepper
        label="Period"
        options={options}
        value="Month"
        onChange={jest.fn()}
      />
    );
    expect(screen.getByRole('button', { name: 'Next Period' })).toBeDisabled();
  });

  it('falls back to the first option when the value is unknown', () => {
    render(
      <InputStepper
        label="Period"
        options={options}
        value="Year"
        onChange={jest.fn()}
      />
    );
    expect(screen.getByText('Day')).toBeInTheDocument();
    expect(screen.getByText('1 of 3')).toBeInTheDocument();
  });
});
