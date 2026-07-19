import { render, screen, act } from '@testing-library/react';
import { Counter } from '../ChatCounterModal';

jest.useFakeTimers();

describe('Counter', () => {
  it('renders initial counter', () => {
    render(<Counter />);
    expect(screen.getByText('0s')).toBeInTheDocument();
  });

  it('renders first message', () => {
    render(<Counter />);
    expect(screen.getByText('Loading... hang tight!')).toBeInTheDocument();
  });

  it('increments seconds over time', () => {
    render(<Counter />);
    act(() => {
      jest.advanceTimersByTime(3000);
    });
    expect(screen.getByText('3s')).toBeInTheDocument();
  });
});
