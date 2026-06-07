import { render, fireEvent, screen } from '@testing-library/react';
import { CalculatorModal } from '../CalculatorModal';

describe('CalculatorModal', () => {
  const onClose = jest.fn();

  beforeEach(() => {
    onClose.mockClear();
  });

  const renderCalculator = () => {
    const view = render(<CalculatorModal onClose={onClose} />);
    const container = view.container.querySelector('[tabindex="0"]')!;
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
    expect(input.value).toBe('');
  });

  it('deletes last character on Delete click', () => {
    render(<CalculatorModal onClose={onClose} />);
    fireEvent.click(screen.getByText('4'));
    fireEvent.click(screen.getByText('2'));
    fireEvent.click(screen.getByText('Delete'));
    const input = screen.getByRole('textbox') as HTMLInputElement;
    expect(input.value).toBe('4');
  });

  it('shows Error for invalid expression', () => {
    render(<CalculatorModal onClose={onClose} />);
    fireEvent.click(screen.getByText('÷'));
    fireEvent.click(screen.getByText('0'));
    fireEvent.click(screen.getByText('='));
    const input = screen.getByRole('textbox') as HTMLInputElement;
    expect(input.value).toBe('Error');
  });

  it('toggles scientific mode', () => {
    render(<CalculatorModal onClose={onClose} />);
    expect(screen.getByText('Scientific Mode')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Scientific Mode'));
    expect(screen.getByText('Basic Mode')).toBeInTheDocument();
    expect(screen.getByText('sin(')).toBeInTheDocument();
    expect(screen.getByText('cos(')).toBeInTheDocument();
    expect(screen.getByText('tan(')).toBeInTheDocument();
  });

  it('uses scientific button', () => {
    render(<CalculatorModal onClose={onClose} />);
    fireEvent.click(screen.getByText('Scientific Mode'));
    fireEvent.click(screen.getByText('π'));
    const input = screen.getByRole('textbox') as HTMLInputElement;
    expect(input.value).toBe('π');
  });

  it('x² button appends ^2', () => {
    render(<CalculatorModal onClose={onClose} />);
    fireEvent.click(screen.getByText('Scientific Mode'));
    fireEvent.click(screen.getByText('x²'));
    const input = screen.getByRole('textbox') as HTMLInputElement;
    expect(input.value).toBe('^2');
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
    expect(input.value).toBe('');
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
    expect(input.value).toBe('');
  });
});
