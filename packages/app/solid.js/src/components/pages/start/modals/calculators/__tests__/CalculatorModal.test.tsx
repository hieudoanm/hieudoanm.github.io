import { render, screen, fireEvent } from '@solidjs/testing-library';
import { CalculatorModal } from '../CalculatorModal';

describe('CalculatorModal', () => {
  it('renders the display input', () => {
    render(() => <CalculatorModal onClose={() => {}} />);
    expect(screen.getByPlaceholderText('0')).toBeInTheDocument();
  });

  it('renders number buttons', () => {
    render(() => <CalculatorModal onClose={() => {}} />);
    expect(screen.getByText('7')).toBeInTheDocument();
    expect(screen.getByText('8')).toBeInTheDocument();
    expect(screen.getByText('9')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('6')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('renders operator buttons', () => {
    render(() => <CalculatorModal onClose={() => {}} />);
    expect(screen.getByText('÷')).toBeInTheDocument();
    expect(screen.getByText('×')).toBeInTheDocument();
    expect(screen.getByText('-')).toBeInTheDocument();
    expect(screen.getByText('+')).toBeInTheDocument();
  });

  it('renders Delete, C, and = buttons', () => {
    render(() => <CalculatorModal onClose={() => {}} />);
    expect(screen.getByText('Delete')).toBeInTheDocument();
    expect(screen.getByText('C')).toBeInTheDocument();
    expect(screen.getByText('=')).toBeInTheDocument();
  });

  it('toggles scientific mode', () => {
    render(() => <CalculatorModal onClose={() => {}} />);
    const modeBtn = screen.getByText('Scientific Mode');
    fireEvent.click(modeBtn);
    expect(screen.getByText('Basic Mode')).toBeInTheDocument();
  });

  it('displays calculation result', () => {
    render(() => <CalculatorModal onClose={() => {}} />);
    fireEvent.click(screen.getByText('2'));
    fireEvent.click(screen.getByText('+'));
    fireEvent.click(screen.getByText('3'));
    fireEvent.click(screen.getByText('='));
    const input = screen.getByPlaceholderText('0') as HTMLInputElement;
    expect(input.value).toBe('5');
  });

  it('clears expression with C button', () => {
    render(() => <CalculatorModal onClose={() => {}} />);
    fireEvent.click(screen.getByText('2'));
    fireEvent.click(screen.getByText('C'));
    const input = screen.getByPlaceholderText('0') as HTMLInputElement;
    expect(input.value).toBe('');
  });
});
