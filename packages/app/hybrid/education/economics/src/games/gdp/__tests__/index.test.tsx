import { fireEvent, render, screen } from '@testing-library/react';
import { TARGETS } from '../constants';
import { GdpGame } from '../index';

const setTarget = (target: number) => {
  const consumption = Math.min(200, target);
  let remaining = target - consumption;
  const investment = Math.min(120, remaining);
  remaining -= investment;
  const government = Math.min(80, remaining);
  fireEvent.change(screen.getByTestId('consumption'), {
    target: { value: String(consumption) },
  });
  fireEvent.change(screen.getByTestId('investment'), {
    target: { value: String(investment) },
  });
  fireEvent.change(screen.getByTestId('government'), {
    target: { value: String(government) },
  });
  fireEvent.change(screen.getByTestId('net-exports'), {
    target: { value: String(remaining - government) },
  });
};

describe('GdpGame', () => {
  it('renders all sliders and the live GDP output', () => {
    render(<GdpGame />);
    for (const testId of [
      'consumption',
      'investment',
      'government',
      'net-exports',
      'price-index',
    ]) {
      expect(screen.getByTestId(testId)).toBeInTheDocument();
    }
    expect(screen.getByTestId('gdp-output').textContent).toBe('200');
    expect(screen.getByTestId('nominal').textContent).toBe('200');
    expect(screen.getByTestId('real').textContent).toBe('200');
    expect(screen.getByTestId('deflator').textContent).toBe('100');
  });

  it('recalculates nominal, real and deflator as sliders move', () => {
    render(<GdpGame />);
    fireEvent.change(screen.getByTestId('consumption'), {
      target: { value: '150' },
    });
    expect(screen.getByTestId('gdp-output').textContent).toBe('250');
    expect(screen.getByTestId('nominal').textContent).toBe('250');
    expect(screen.getByTestId('real').textContent).toBe('250');
    fireEvent.change(screen.getByTestId('price-index'), {
      target: { value: '200' },
    });
    expect(screen.getByTestId('real').textContent).toBe('125');
    expect(screen.getByTestId('deflator').textContent).toBe('200');
  });

  it('solves a round by hitting the target exactly', () => {
    render(<GdpGame />);
    fireEvent.click(screen.getByRole('button', { name: /Start Quiz/ }));
    setTarget(TARGETS[0]);
    fireEvent.click(screen.getByTestId('check'));
    expect(
      screen.getByRole('heading', { name: 'Round 2 of 6' })
    ).toBeInTheDocument();
    expect(screen.getByText(/Round 1 solved!/)).toBeInTheDocument();
  });

  it('reaches the summary and resets the game', () => {
    render(<GdpGame />);
    fireEvent.click(screen.getByRole('button', { name: /Start Quiz/ }));
    for (const target of TARGETS) {
      setTarget(target);
      fireEvent.click(screen.getByTestId('check'));
    }
    expect(screen.getByTestId('summary')).toBeInTheDocument();
    expect(screen.getByText(/Solved 6 of 6 rounds/)).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('reset'));
    expect(
      screen.getByRole('heading', { name: 'Practice mode' })
    ).toBeInTheDocument();
  });
});
