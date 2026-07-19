import { render, fireEvent, screen } from '@testing-library/react';
import { CalculatorModal } from '..';

jest.mock('@lodashx/ts', () => ({
  convertBase: (num: number) => ({
    from: (_fromBase: number) => ({
      to: (toBase: number) => {
        if (isNaN(num)) return '';
        return Number(num).toString(toBase);
      },
    }),
  }),
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

describe('CalculatorModal', () => {
  const onClose = jest.fn();

  beforeEach(() => {
    onClose.mockClear();
  });

  const renderCalculator = () => {
    const view = render(<CalculatorModal onClose={onClose} />);
    const container = view.container.querySelector(
      '[tabindex="0"]'
    )! as HTMLElement;
    return { ...view, container };
  };

  it('renders modal title', () => {
    render(<CalculatorModal onClose={onClose} />);
    expect(screen.getByText('Calculator')).toBeInTheDocument();
  });

  it('renders basic buttons', () => {
    render(<CalculatorModal onClose={onClose} />);
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('+')).toBeInTheDocument();
    expect(screen.getByText('=')).toBeInTheDocument();
    expect(screen.getByText('C')).toBeInTheDocument();
  });

  it('clicking number appends to expression', () => {
    render(<CalculatorModal onClose={onClose} />);
    fireEvent.click(screen.getByText('1'));
    fireEvent.click(screen.getByText('2'));
    fireEvent.click(screen.getByText('3'));
    const input = screen.getByRole('textbox') as HTMLInputElement;
    expect(input.value).toBe('123');
  });

  it('clicking operator appends to expression', () => {
    render(<CalculatorModal onClose={onClose} />);
    fireEvent.click(screen.getByText('5'));
    fireEvent.click(screen.getByText('+'));
    fireEvent.click(screen.getByText('3'));
    const input = screen.getByRole('textbox') as HTMLInputElement;
    expect(input.value).toBe('5+3');
  });

  it('calculates result on = click', () => {
    render(<CalculatorModal onClose={onClose} />);
    fireEvent.click(screen.getByText('1'));
    fireEvent.click(screen.getByText('+'));
    fireEvent.click(screen.getByText('2'));
    fireEvent.click(screen.getByText('='));
    const input = screen.getByRole('textbox') as HTMLInputElement;
    expect(input.value).toBe('3');
  });

  it('clears expression on C click', () => {
    render(<CalculatorModal onClose={onClose} />);
    fireEvent.click(screen.getByText('5'));
    fireEvent.click(screen.getByText('+'));
    fireEvent.click(screen.getByText('3'));
    fireEvent.click(screen.getByText('C'));
    const input = screen.getByRole('textbox') as HTMLInputElement;
    expect(input.value).toBe('0');
  });

  it('deletes last character on ⌫ click', () => {
    render(<CalculatorModal onClose={onClose} />);
    fireEvent.click(screen.getByText('4'));
    fireEvent.click(screen.getByText('2'));
    fireEvent.click(screen.getByText('⌫'));
    const input = screen.getByRole('textbox') as HTMLInputElement;
    expect(input.value).toBe('4');
  });

  it('shows Error for invalid expression', () => {
    render(<CalculatorModal onClose={onClose} />);
    fireEvent.click(screen.getByText('÷'));
    fireEvent.click(screen.getByRole('button', { name: '0' }));
    fireEvent.click(screen.getByText('='));
    const input = screen.getByRole('textbox') as HTMLInputElement;
    expect(input.value).toBe('Error');
  });

  it('shows scientific buttons by default', () => {
    render(<CalculatorModal onClose={onClose} />);
    expect(screen.getByText('sin(')).toBeInTheDocument();
    expect(screen.getByText('cos(')).toBeInTheDocument();
    expect(screen.getByText('tan(')).toBeInTheDocument();
  });

  it('uses scientific button', () => {
    render(<CalculatorModal onClose={onClose} />);
    fireEvent.click(screen.getByText('π'));
    const input = screen.getByRole('textbox') as HTMLInputElement;
    expect(input.value).toBe('π');
  });

  it('x² button appends ^2', () => {
    render(<CalculatorModal onClose={onClose} />);
    fireEvent.click(screen.getByText('x²'));
    const input = screen.getByRole('textbox') as HTMLInputElement;
    expect(input.value).toBe('^2');
  });

  it('switches between converter categories', () => {
    render(<CalculatorModal onClose={onClose} />);
    fireEvent.click(screen.getByText('Temperature'));
    expect(screen.getByText('Celsius')).toBeInTheDocument();
  });

  it('keyboard Enter triggers calculate', () => {
    const { container } = renderCalculator();
    fireEvent.click(screen.getByText('2'));
    fireEvent.click(screen.getByText('+'));
    fireEvent.click(screen.getByText('3'));
    fireEvent.keyDown(container, { key: 'Enter' });
    const input = screen.getByRole('textbox') as HTMLInputElement;
    expect(input.value).toBe('5');
  });

  it('keyboard Backspace deletes last char', () => {
    const { container } = renderCalculator();
    fireEvent.click(screen.getByText('1'));
    fireEvent.click(screen.getByText('2'));
    fireEvent.keyDown(container, { key: 'Backspace' });
    const input = screen.getByRole('textbox') as HTMLInputElement;
    expect(input.value).toBe('1');
  });

  it('keyboard Delete clears expression', () => {
    const { container } = renderCalculator();
    fireEvent.click(screen.getByText('1'));
    fireEvent.click(screen.getByText('2'));
    fireEvent.keyDown(container, { key: 'Delete' });
    const input = screen.getByRole('textbox') as HTMLInputElement;
    expect(input.value).toBe('0');
  });

  it('keyboard Escape calls onClose', () => {
    const { container } = renderCalculator();
    fireEvent.keyDown(container, { key: 'Escape' });
    expect(onClose).toHaveBeenCalled();
  });

  it('keyboard digit appends to expression', () => {
    const { container } = renderCalculator();
    fireEvent.keyDown(container, { key: '7' });
    const input = screen.getByRole('textbox') as HTMLInputElement;
    expect(input.value).toBe('7');
  });

  it('keyboard operator appends to expression', () => {
    const { container } = renderCalculator();
    fireEvent.keyDown(container, { key: '7' });
    fireEvent.keyDown(container, { key: '+' });
    fireEvent.keyDown(container, { key: '3' });
    const input = screen.getByRole('textbox') as HTMLInputElement;
    expect(input.value).toBe('7+3');
  });

  it('invalid keyboard input is ignored', () => {
    const { container } = renderCalculator();
    fireEvent.keyDown(container, { key: 'a' });
    const input = screen.getByRole('textbox') as HTMLInputElement;
    expect(input.value).toBe('0');
  });
});
