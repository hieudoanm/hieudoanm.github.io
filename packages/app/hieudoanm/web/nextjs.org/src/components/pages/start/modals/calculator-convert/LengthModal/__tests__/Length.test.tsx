import { fireEvent, render, screen } from '@testing-library/react';
import { Length } from '..';

describe('Length', () => {
  it('renders all length unit inputs', () => {
    render(<Length />);
    expect(screen.getByText('yard')).toBeInTheDocument();
    expect(screen.getByText('foot')).toBeInTheDocument();
    expect(screen.getByText('inch')).toBeInTheDocument();
    expect(screen.getByText('centimeter')).toBeInTheDocument();
    expect(screen.getByText('meter')).toBeInTheDocument();
    expect(screen.getByText('kilometer')).toBeInTheDocument();
  });

  it('converts yards to feet', () => {
    render(<Length />);
    const inputs = screen.getAllByRole('textbox') as HTMLInputElement[];
    const yardInput = inputs.find((i) => i.id === 'yard')!;
    fireEvent.change(yardInput, { target: { value: '5' } });
    expect(screen.getByDisplayValue('5')).toBeInTheDocument();
    expect(screen.getAllByDisplayValue('15')).toHaveLength(1);
  });

  it('converts inches to centimeters', () => {
    render(<Length />);
    const inputs = screen.getAllByRole('textbox') as HTMLInputElement[];
    const inchInput = inputs.find((i) => i.id === 'inch')!;
    fireEvent.change(inchInput, { target: { value: '12' } });
    expect(screen.getByDisplayValue('12')).toBeInTheDocument();
    expect(screen.getAllByDisplayValue('30.48')).toHaveLength(1);
  });

  it('converts kilometers to meters', () => {
    render(<Length />);
    const inputs = screen.getAllByRole('textbox') as HTMLInputElement[];
    const kmInput = inputs.find((i) => i.id === 'kilometer')!;
    fireEvent.change(kmInput, { target: { value: '1' } });
    expect(screen.getByDisplayValue('1')).toBeInTheDocument();
    expect(screen.getAllByDisplayValue('1000')).toHaveLength(1);
  });
});
