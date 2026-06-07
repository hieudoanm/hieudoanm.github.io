import { fireEvent, render, screen } from '@testing-library/react';
import { Weight } from '../Weight';

describe('Weight', () => {
  it('renders all weight unit inputs', () => {
    render(<Weight />);
    expect(screen.getByText('ton')).toBeInTheDocument();
    expect(screen.getByText('pound')).toBeInTheDocument();
    expect(screen.getByText('ounce')).toBeInTheDocument();
    expect(screen.getByText('kilogram')).toBeInTheDocument();
    expect(screen.getByText('gram')).toBeInTheDocument();
    expect(screen.getByText('milligram')).toBeInTheDocument();
  });

  it('converts tons to pounds', () => {
    render(<Weight />);
    const inputs = screen.getAllByRole('textbox') as HTMLInputElement[];
    const tonInput = inputs.find((i) => i.id === 'ton')!;
    fireEvent.change(tonInput, { target: { value: '2' } });
    expect(screen.getByDisplayValue('2')).toBeInTheDocument();
    expect(screen.getAllByDisplayValue('4000')).toHaveLength(1);
  });

  it('converts kilograms to grams', () => {
    render(<Weight />);
    const inputs = screen.getAllByRole('textbox') as HTMLInputElement[];
    const kgInput = inputs.find((i) => i.id === 'kilogram')!;
    fireEvent.change(kgInput, { target: { value: '1.5' } });
    expect(screen.getByDisplayValue('1.5')).toBeInTheDocument();
    expect(screen.getAllByDisplayValue('1500')).toHaveLength(1);
  });

  it('converts ounces to milligrams', () => {
    render(<Weight />);
    const inputs = screen.getAllByRole('textbox') as HTMLInputElement[];
    const ounceInput = inputs.find((i) => i.id === 'ounce')!;
    fireEvent.change(ounceInput, { target: { value: '1' } });
    expect(screen.getByDisplayValue('1')).toBeInTheDocument();
    expect(screen.getAllByDisplayValue('28349.52')).toHaveLength(1);
  });
});
