import { fireEvent, render, screen } from '@testing-library/react';
import { Kaprekar } from '../KaprekarModal';

describe('Kaprekar', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should render with default 6174 constant', () => {
    const { container } = render(<Kaprekar onClose={jest.fn()} />);
    expect(container).toMatchSnapshot();
    expect(screen.getByText('6174')).toBeInTheDocument();
  });

  it('should increment number with + button', () => {
    render(<Kaprekar onClose={jest.fn()} />);
    const input = screen.getByRole('spinbutton') as HTMLInputElement;
    expect(input.value).toBe('6174');
    fireEvent.click(screen.getByText('+'));
    expect(input.value).toBe('6175');
  });

  it('should decrement number with - button', () => {
    render(<Kaprekar onClose={jest.fn()} />);
    const input = screen.getByRole('spinbutton') as HTMLInputElement;
    fireEvent.click(screen.getAllByText('−')[0]);
    expect(input.value).toBe('6173');
  });

  it('should not go below 100 when decrementing', () => {
    render(<Kaprekar onClose={jest.fn()} />);
    const input = screen.getByRole('spinbutton');
    fireEvent.change(input, { target: { value: '100' } });
    fireEvent.click(screen.getAllByText('−')[0]);
    expect((input as HTMLInputElement).value).toBe('100');
  });

  it('should not go above 9999 when incrementing', () => {
    render(<Kaprekar onClose={jest.fn()} />);
    const input = screen.getByRole('spinbutton');
    fireEvent.change(input, { target: { value: '9999' } });
    fireEvent.click(screen.getByText('+'));
    expect((input as HTMLInputElement).value).toBe('9999');
  });

  it('should reset to 6174 on reset button click', () => {
    render(<Kaprekar onClose={jest.fn()} />);
    const input = screen.getByRole('spinbutton');
    fireEvent.change(input, { target: { value: '1234' } });
    fireEvent.click(screen.getByText('Reset'));
    expect((input as HTMLInputElement).value).toBe('6174');
  });

  it('should show routine for non-constant numbers', () => {
    render(<Kaprekar onClose={jest.fn()} />);
    const input = screen.getByRole('spinbutton');
    fireEvent.change(input, { target: { value: '3524' } });
    expect(screen.getByText(/5432/)).toBeInTheDocument();
    expect(screen.getByText(/3087/)).toBeInTheDocument();
  });

  it('should show out of range message for numbers < 100', () => {
    render(<Kaprekar onClose={jest.fn()} />);
    const input = screen.getByRole('spinbutton');
    fireEvent.change(input, { target: { value: '50' } });
    expect(
      screen.getByText('Enter a number between 100 and 9999')
    ).toBeInTheDocument();
  });

  it('should show out of range message for numbers > 9999', () => {
    render(<Kaprekar onClose={jest.fn()} />);
    const input = screen.getByRole('spinbutton');
    fireEvent.change(input, { target: { value: '12345' } });
    expect(
      screen.getByText('Enter a number between 100 and 9999')
    ).toBeInTheDocument();
  });

  it('should show constant display for 495', () => {
    render(<Kaprekar onClose={jest.fn()} />);
    const input = screen.getByRole('spinbutton');
    fireEvent.change(input, { target: { value: '495' } });
    expect(screen.getByText('495')).toBeInTheDocument();
    expect(screen.getByText(/3 digits/)).toBeInTheDocument();
  });

  it('should respond to ArrowUp key', () => {
    render(<Kaprekar onClose={jest.fn()} />);
    const container = screen.getByText(/Kaprekar's Routine/);
    const input = screen.getByRole('spinbutton');
    fireEvent.change(input, { target: { value: '3524' } });
    fireEvent.keyDown(window, { key: 'ArrowUp' });
    expect((input as HTMLInputElement).value).toBe('3525');
  });

  it('should respond to ArrowDown key', () => {
    render(<Kaprekar onClose={jest.fn()} />);
    const input = screen.getByRole('spinbutton');
    fireEvent.change(input, { target: { value: '3524' } });
    fireEvent.keyDown(window, { key: 'ArrowDown' });
    expect((input as HTMLInputElement).value).toBe('3523');
  });

  it('should reset on Space key', () => {
    render(<Kaprekar onClose={jest.fn()} />);
    const input = screen.getByRole('spinbutton');
    fireEvent.change(input, { target: { value: '3524' } });
    fireEvent.keyDown(window, { key: ' ' });
    expect((input as HTMLInputElement).value).toBe('6174');
  });

  it('should show ignored digits message for repdigit 111', () => {
    render(<Kaprekar onClose={jest.fn()} />);
    const input = screen.getByRole('spinbutton');
    fireEvent.change(input, { target: { value: '111' } });
    expect(
      screen.getByText('Number must have at least two different digits')
    ).toBeInTheDocument();
  });
});
