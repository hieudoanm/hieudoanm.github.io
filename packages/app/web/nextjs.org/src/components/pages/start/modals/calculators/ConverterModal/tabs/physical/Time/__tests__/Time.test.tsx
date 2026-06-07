import { fireEvent, render, screen } from '@testing-library/react';
import { Time } from '../index';

describe('Time', () => {
  it('renders all time unit inputs', () => {
    render(<Time />);
    expect(screen.getByText('milliseconds')).toBeInTheDocument();
    expect(screen.getByText('seconds')).toBeInTheDocument();
    expect(screen.getByText('minutes')).toBeInTheDocument();
    expect(screen.getByText('hours')).toBeInTheDocument();
    expect(screen.getByText('days')).toBeInTheDocument();
    expect(screen.getByText('weeks')).toBeInTheDocument();
    expect(screen.getByText('months')).toBeInTheDocument();
    expect(screen.getByText('years')).toBeInTheDocument();
    expect(screen.getByText('date')).toBeInTheDocument();
  });

  it('converts seconds to milliseconds and minutes', () => {
    render(<Time />);
    const inputs = screen.getAllByRole('textbox') as HTMLInputElement[];
    const secondsInput = inputs.find((i) => i.id === 'seconds')!;
    fireEvent.change(secondsInput, { target: { value: '120' } });
    expect(screen.getByDisplayValue('120000')).toBeInTheDocument();
    expect(screen.getByDisplayValue('2')).toBeInTheDocument();
  });

  it('converts hours to minutes and days', () => {
    render(<Time />);
    const inputs = screen.getAllByRole('textbox') as HTMLInputElement[];
    const hoursInput = inputs.find((i) => i.id === 'hours')!;
    fireEvent.change(hoursInput, { target: { value: '48' } });
    expect(screen.getByDisplayValue('2880')).toBeInTheDocument();
    expect(screen.getByDisplayValue('2')).toBeInTheDocument();
  });

  it('converts milliseconds to seconds', () => {
    render(<Time />);
    const inputs = screen.getAllByRole('textbox') as HTMLInputElement[];
    const msInput = inputs.find((i) => i.id === 'milliseconds')!;
    fireEvent.change(msInput, { target: { value: '5000' } });
    expect(screen.getByDisplayValue('5')).toBeInTheDocument();
  });

  it('resets to 0 on invalid numeric input', () => {
    render(<Time />);
    const inputs = screen.getAllByRole('textbox') as HTMLInputElement[];
    const msInput = inputs.find((i) => i.id === 'milliseconds')!;
    fireEvent.change(msInput, { target: { value: 'abc' } });
    const zeros = screen.getAllByDisplayValue('0');
    expect(zeros.length).toBeGreaterThanOrEqual(8);
  });
});
