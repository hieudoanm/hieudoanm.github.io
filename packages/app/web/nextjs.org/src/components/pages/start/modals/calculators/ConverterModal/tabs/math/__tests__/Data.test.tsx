import { fireEvent, render, screen } from '@testing-library/react';
import { Data } from '../Data';

describe('Data', () => {
  it('renders all data unit inputs', () => {
    render(<Data />);
    expect(screen.getByText('bit')).toBeInTheDocument();
    expect(screen.getByText('kilobyte')).toBeInTheDocument();
    expect(screen.getByText('megabyte')).toBeInTheDocument();
    expect(screen.getByText('gigabyte')).toBeInTheDocument();
    expect(screen.getByText('terabyte')).toBeInTheDocument();
  });

  it('initializes with all zeros', () => {
    render(<Data />);
    const zeros = screen.getAllByDisplayValue('0');
    expect(zeros).toHaveLength(5);
  });

  it('converts bits to other units', () => {
    render(<Data />);
    const inputs = screen.getAllByRole('textbox') as HTMLInputElement[];
    const bitInput = inputs.find((i) => i.id === 'bit')!;
    fireEvent.change(bitInput, { target: { value: '8192' } });
    expect(screen.getAllByDisplayValue('8192')).toHaveLength(1);
    expect(screen.getByDisplayValue('1')).toBeInTheDocument();
  });

  it('resets to 0 on invalid input', () => {
    render(<Data />);
    const inputs = screen.getAllByRole('textbox') as HTMLInputElement[];
    const bitInput = inputs.find((i) => i.id === 'bit')!;
    fireEvent.change(bitInput, { target: { value: 'abc' } });
    const zeros = screen.getAllByDisplayValue('0');
    expect(zeros).toHaveLength(5);
  });
});
