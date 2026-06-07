jest.mock('@lodashx/ts', () => ({
  convertBase: jest.fn(),
  arabicToRoman: (num: number) => {
    if (isNaN(num)) return '';
    const map: [number, string][] = [
      [1000, 'M'],
      [900, 'CM'],
      [500, 'D'],
      [400, 'CD'],
      [100, 'C'],
      [90, 'XC'],
      [50, 'L'],
      [40, 'XL'],
      [10, 'X'],
      [9, 'IX'],
      [5, 'V'],
      [4, 'IV'],
      [1, 'I'],
    ];
    let result = '';
    let n = num;
    for (const [value, symbol] of map) {
      while (n >= value) {
        result += symbol;
        n -= value;
      }
    }
    return result;
  },
  romanToArabic: (roman: string) => {
    const map: Record<string, number> = {
      M: 1000,
      CM: 900,
      D: 500,
      CD: 400,
      C: 100,
      XC: 90,
      L: 50,
      XL: 40,
      X: 10,
      IX: 9,
      V: 5,
      IV: 4,
      I: 1,
    };
    let result = 0;
    let i = 0;
    while (i < roman.length) {
      const two = roman.slice(i, i + 2);
      if (map[two]) {
        result += map[two];
        i += 2;
      } else {
        result += map[roman[i]] || 0;
        i++;
      }
    }
    return String(result);
  },
  formatCurrency: jest.fn(),
}));

import { fireEvent, render, screen } from '@testing-library/react';
import { Roman } from '../Roman';

describe('Roman', () => {
  it('renders arabic and roman inputs', () => {
    render(<Roman />);
    expect(screen.getByText('arabic')).toBeInTheDocument();
    expect(screen.getByText('roman')).toBeInTheDocument();
  });

  it('initializes with 10 and X', () => {
    render(<Roman />);
    expect(screen.getByDisplayValue('10')).toBeInTheDocument();
    expect(screen.getByDisplayValue('X')).toBeInTheDocument();
  });

  it('converts arabic to roman', () => {
    render(<Roman />);
    const inputs = screen.getAllByRole('textbox') as HTMLInputElement[];
    const arabicInput = inputs.find((i) => i.id === 'arabic')!;
    fireEvent.change(arabicInput, { target: { value: '2024' } });
    expect(screen.getByDisplayValue('2024')).toBeInTheDocument();
    expect(screen.getByDisplayValue('MMXXIV')).toBeInTheDocument();
  });

  it('converts roman to arabic', () => {
    render(<Roman />);
    const inputs = screen.getAllByRole('textbox') as HTMLInputElement[];
    const romanInput = inputs.find((i) => i.id === 'roman')!;
    fireEvent.change(romanInput, { target: { value: 'XLII' } });
    expect(screen.getByDisplayValue('XLII')).toBeInTheDocument();
    expect(screen.getByDisplayValue('42')).toBeInTheDocument();
  });
});
