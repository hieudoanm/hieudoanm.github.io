import { fireEvent, render, screen } from '@testing-library/react';
import { Temperature } from '..';

describe('Temperature', () => {
  it('renders celsius, fahrenheit, kelvin inputs', () => {
    render(<Temperature />);
    expect(screen.getByText('celsius')).toBeInTheDocument();
    expect(screen.getByText('fahrenheit')).toBeInTheDocument();
    expect(screen.getByText('kelvin')).toBeInTheDocument();
  });

  it('initializes with 0°C, 32°F, 273.15K', () => {
    render(<Temperature />);
    expect(screen.getAllByDisplayValue('0')).toHaveLength(1);
    expect(screen.getByDisplayValue('32')).toBeInTheDocument();
    expect(screen.getByDisplayValue('273.15')).toBeInTheDocument();
  });

  it('converts celsius to fahrenheit and kelvin', () => {
    render(<Temperature />);
    const inputs = screen.getAllByRole('textbox') as HTMLInputElement[];
    const celsiusInput = inputs.find((i) => i.id === 'celsius')!;
    fireEvent.change(celsiusInput, { target: { value: '100' } });
    expect(screen.getByDisplayValue('100')).toBeInTheDocument();
    expect(screen.getByDisplayValue('212')).toBeInTheDocument();
    expect(screen.getByDisplayValue('373.15')).toBeInTheDocument();
  });

  it('converts fahrenheit to celsius and kelvin', () => {
    render(<Temperature />);
    const inputs = screen.getAllByRole('textbox') as HTMLInputElement[];
    const fahrenheitInput = inputs.find((i) => i.id === 'fahrenheit')!;
    fireEvent.change(fahrenheitInput, { target: { value: '212' } });
    expect(screen.getByDisplayValue('100')).toBeInTheDocument();
    expect(screen.getByDisplayValue('212')).toBeInTheDocument();
    expect(screen.getByDisplayValue('373.15')).toBeInTheDocument();
  });

  it('converts kelvin to celsius and fahrenheit', () => {
    render(<Temperature />);
    const inputs = screen.getAllByRole('textbox') as HTMLInputElement[];
    const kelvinInput = inputs.find((i) => i.id === 'kelvin')!;
    fireEvent.change(kelvinInput, { target: { value: '373.15' } });
    expect(screen.getByDisplayValue('100')).toBeInTheDocument();
    expect(screen.getByDisplayValue('212')).toBeInTheDocument();
    expect(screen.getByDisplayValue('373.15')).toBeInTheDocument();
  });

  it('resets to initial on invalid input', () => {
    render(<Temperature />);
    const inputs = screen.getAllByRole('textbox') as HTMLInputElement[];
    const celsiusInput = inputs.find((i) => i.id === 'celsius')!;
    fireEvent.change(celsiusInput, { target: { value: 'abc' } });
    expect(screen.getAllByDisplayValue('0')).toHaveLength(1);
    expect(screen.getByDisplayValue('32')).toBeInTheDocument();
    expect(screen.getByDisplayValue('273.15')).toBeInTheDocument();
  });
});
