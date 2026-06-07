import { fireEvent, render, screen } from '@testing-library/react';
import { Angle } from '../Angle';

describe('Angle', () => {
  it('renders degrees and radians inputs', () => {
    render(<Angle />);
    expect(screen.getByText('degrees')).toBeInTheDocument();
    expect(screen.getByText('radians')).toBeInTheDocument();
  });

  it('converts degrees to radians', () => {
    render(<Angle />);
    const inputs = screen.getAllByRole('textbox') as HTMLInputElement[];
    const degInput = inputs.find((i) => i.id === 'degrees')!;
    fireEvent.change(degInput, { target: { value: '180' } });
    expect(screen.getByDisplayValue('180')).toBeInTheDocument();
    expect(screen.getByDisplayValue('3.14159')).toBeInTheDocument();
  });

  it('converts radians to degrees', () => {
    render(<Angle />);
    const inputs = screen.getAllByRole('textbox') as HTMLInputElement[];
    const radInput = inputs.find((i) => i.id === 'radians')!;
    fireEvent.change(radInput, { target: { value: '1' } });
    expect(screen.getByDisplayValue('1')).toBeInTheDocument();
    expect(screen.getByDisplayValue('57.29578')).toBeInTheDocument();
  });

  it('resets to 0 on invalid input', () => {
    render(<Angle />);
    const inputs = screen.getAllByRole('textbox') as HTMLInputElement[];
    const degInput = inputs.find((i) => i.id === 'degrees')!;
    fireEvent.change(degInput, { target: { value: 'abc' } });
    const zeros = screen.getAllByDisplayValue('0');
    expect(zeros).toHaveLength(2);
  });
});
