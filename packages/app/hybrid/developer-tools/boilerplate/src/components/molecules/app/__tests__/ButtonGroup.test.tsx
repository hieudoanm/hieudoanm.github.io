import { fireEvent, render, screen } from '@testing-library/react';
import { ButtonGroup } from '../ButtonGroup';

describe('ButtonGroup', () => {
  const options = [
    { label: 'Day', value: 'day' },
    { label: 'Week', value: 'week' },
    { label: 'Month', value: 'month' },
  ];

  it('renders options with active state', () => {
    render(<ButtonGroup options={options} value="week" onChange={jest.fn()} />);
    expect(screen.getByRole('button', { name: 'Day' })).toHaveAttribute(
      'aria-pressed',
      'false'
    );
    expect(screen.getByRole('button', { name: 'Week' })).toHaveAttribute(
      'aria-pressed',
      'true'
    );
    expect(screen.getByRole('button', { name: 'Week' })).toHaveClass(
      'btn-primary'
    );
  });

  it('calls onChange with selected value', () => {
    const onChange = jest.fn();
    render(<ButtonGroup options={options} value="day" onChange={onChange} />);
    fireEvent.click(screen.getByRole('button', { name: 'Month' }));
    expect(onChange).toHaveBeenCalledWith('month');
  });

  it('applies vertical orientation and disables', () => {
    const { container } = render(
      <ButtonGroup
        options={options}
        value="day"
        onChange={jest.fn()}
        orientation="vertical"
        disabled
      />
    );
    expect(container.querySelector('.join-vertical')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Day' })).toBeDisabled();
  });
});
