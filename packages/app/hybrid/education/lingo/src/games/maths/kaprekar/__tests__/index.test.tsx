import { fireEvent, render, screen } from '@testing-library/react';
import { Kaprekar } from '../index';

describe('Kaprekar', () => {
  it('renders with the default 6174 constant', () => {
    render(<Kaprekar />);
    const input = screen.getByRole('spinbutton') as HTMLInputElement;
    expect(input.value).toBe('6174');
    expect(
      screen.getByText("Kaprekar's Constant · 4 digits")
    ).toBeInTheDocument();
  });

  it('increments the number with the + button', () => {
    render(<Kaprekar />);
    const input = screen.getByRole('spinbutton') as HTMLInputElement;
    fireEvent.click(screen.getByText('+'));
    expect(input.value).toBe('6175');
  });

  it('decrements the number with the − button', () => {
    render(<Kaprekar />);
    const input = screen.getByRole('spinbutton') as HTMLInputElement;
    fireEvent.click(screen.getAllByText('−')[0]);
    expect(input.value).toBe('6173');
  });

  it('clamps to 100 when decrementing', () => {
    render(<Kaprekar />);
    const input = screen.getByRole('spinbutton');
    fireEvent.change(input, { target: { value: '100' } });
    fireEvent.click(screen.getAllByText('−')[0]);
    expect((input as HTMLInputElement).value).toBe('100');
  });

  it('clamps to 9999 when incrementing', () => {
    render(<Kaprekar />);
    const input = screen.getByRole('spinbutton');
    fireEvent.change(input, { target: { value: '9999' } });
    fireEvent.click(screen.getByText('+'));
    expect((input as HTMLInputElement).value).toBe('9999');
  });

  it('resets to 6174 on Reset click', () => {
    render(<Kaprekar />);
    const input = screen.getByRole('spinbutton');
    fireEvent.change(input, { target: { value: '1234' } });
    fireEvent.click(screen.getByText('Reset'));
    expect((input as HTMLInputElement).value).toBe('6174');
  });

  it('shows the routine for non-constant numbers', () => {
    render(<Kaprekar />);
    const input = screen.getByRole('spinbutton');
    fireEvent.change(input, { target: { value: '3524' } });
    expect(screen.getByText(/5432/)).toBeInTheDocument();
    expect(screen.getByText(/3087/)).toBeInTheDocument();
  });

  it('shows an out of range message for numbers < 100', () => {
    render(<Kaprekar />);
    const input = screen.getByRole('spinbutton');
    fireEvent.change(input, { target: { value: '50' } });
    expect(
      screen.getByText('Enter a number between 100 and 9999')
    ).toBeInTheDocument();
  });

  it('shows an out of range message for numbers > 9999', () => {
    render(<Kaprekar />);
    const input = screen.getByRole('spinbutton');
    fireEvent.change(input, { target: { value: '12345' } });
    expect(
      screen.getByText('Enter a number between 100 and 9999')
    ).toBeInTheDocument();
  });

  it('shows the constant display for 495', () => {
    render(<Kaprekar />);
    const input = screen.getByRole('spinbutton');
    fireEvent.change(input, { target: { value: '495' } });
    expect(screen.getByText('495')).toBeInTheDocument();
    expect(
      screen.getByText("Kaprekar's Constant · 3 digits")
    ).toBeInTheDocument();
  });

  it('increments with the ArrowUp key', () => {
    render(<Kaprekar />);
    const input = screen.getByRole('spinbutton');
    fireEvent.change(input, { target: { value: '3524' } });
    fireEvent.keyDown(window, { key: 'ArrowUp' });
    expect((input as HTMLInputElement).value).toBe('3525');
  });

  it('decrements with the ArrowDown key', () => {
    render(<Kaprekar />);
    const input = screen.getByRole('spinbutton');
    fireEvent.change(input, { target: { value: '3524' } });
    fireEvent.keyDown(window, { key: 'ArrowDown' });
    expect((input as HTMLInputElement).value).toBe('3523');
  });

  it('resets on the Space key', () => {
    render(<Kaprekar />);
    const input = screen.getByRole('spinbutton');
    fireEvent.change(input, { target: { value: '3524' } });
    fireEvent.keyDown(window, { key: ' ' });
    expect((input as HTMLInputElement).value).toBe('6174');
  });

  it('rejects repdigit input', () => {
    render(<Kaprekar />);
    const input = screen.getByRole('spinbutton');
    fireEvent.change(input, { target: { value: '111' } });
    expect(
      screen.getByText('Number must have at least two different digits')
    ).toBeInTheDocument();
  });
});
