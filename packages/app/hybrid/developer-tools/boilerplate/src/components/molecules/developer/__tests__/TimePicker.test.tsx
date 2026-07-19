import { fireEvent, render, screen } from '@testing-library/react';
import { TimePicker } from '../TimePicker';

describe('TimePicker', () => {
  it('displays the current value', () => {
    render(<TimePicker value="09:30" onChange={jest.fn()} />);
    expect(screen.getByRole('button')).toHaveTextContent('09:30');
  });

  it('formats a 12h value', () => {
    render(<TimePicker value="14:30" onChange={jest.fn()} format="12h" />);
    expect(screen.getByRole('button')).toHaveTextContent('02:30 PM');
  });

  it('formats a 12h midnight value', () => {
    render(<TimePicker value="00:30" onChange={jest.fn()} format="12h" />);
    expect(screen.getByRole('button')).toHaveTextContent('12:30 AM');
  });

  it('selects a new time from the list', () => {
    const onChange = jest.fn();
    render(<TimePicker value="09:00" onChange={onChange} />);
    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByRole('option', { name: '09:00' })).toHaveAttribute(
      'aria-selected',
      'true'
    );
    fireEvent.click(screen.getByRole('option', { name: '09:30' }));
    expect(onChange).toHaveBeenCalledWith('09:30');
  });

  it('lists times at the requested step', () => {
    render(<TimePicker value="09:00" onChange={jest.fn()} stepMinutes={15} />);
    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByRole('option', { name: '09:15' })).toBeInTheDocument();
  });

  it('clamps the step to the supported range', () => {
    render(<TimePicker value="09:00" onChange={jest.fn()} stepMinutes={90} />);
    fireEvent.click(screen.getByRole('button'));
    expect(screen.getAllByRole('option')).toHaveLength(24);
  });

  it('clamps a step below the minimum to 1', () => {
    render(<TimePicker value="09:00" onChange={jest.fn()} stepMinutes={0} />);
    fireEvent.click(screen.getByRole('button'));
    expect(screen.getAllByRole('option')).toHaveLength(1440);
  });
});
