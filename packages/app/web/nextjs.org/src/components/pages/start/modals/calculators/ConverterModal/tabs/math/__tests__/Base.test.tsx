jest.mock('@lodashx/ts', () => ({
  convertBase: (num: number) => ({
    from: (_fromBase: number) => ({
      to: (toBase: number) => {
        if (isNaN(num)) return '';
        return Number(num).toString(toBase);
      },
    }),
  }),
  arabicToRoman: jest.fn(),
  romanToArabic: jest.fn(),
  formatCurrency: jest.fn(),
}));

import { fireEvent, render, screen } from '@testing-library/react';
import { Base } from '../Base';

describe('Base', () => {
  it('renders base 2, 8, 10, 16 inputs', () => {
    render(<Base />);
    expect(screen.getByText('Base 2')).toBeInTheDocument();
    expect(screen.getByText('Base 8')).toBeInTheDocument();
    expect(screen.getByText('Base 10')).toBeInTheDocument();
    expect(screen.getByText('Base 16')).toBeInTheDocument();
  });

  it('initializes with 10 in all bases', () => {
    render(<Base />);
    expect(screen.getByDisplayValue('10')).toBeInTheDocument();
    expect(screen.getByDisplayValue('a')).toBeInTheDocument();
    expect(screen.getByDisplayValue('1010')).toBeInTheDocument();
    expect(screen.getByDisplayValue('12')).toBeInTheDocument();
  });

  it('updates all bases when base 10 changes', () => {
    render(<Base />);
    const inputs = screen.getAllByRole('textbox') as HTMLInputElement[];
    const base10Input = inputs.find((i) => i.id === 'base10')!;
    fireEvent.change(base10Input, { target: { value: '255' } });
    expect(screen.getByDisplayValue('255')).toBeInTheDocument();
    expect(screen.getByDisplayValue('ff')).toBeInTheDocument();
    expect(screen.getByDisplayValue('11111111')).toBeInTheDocument();
    expect(screen.getByDisplayValue('377')).toBeInTheDocument();
  });
});
