import { fireEvent, render, screen } from '@testing-library/react';
import { ReplicatorGame } from '../index';

const pctFrom = (testId: string): number => {
  const text = screen.getByTestId(testId).textContent ?? '';
  return Number(/\d+%/.exec(text)?.[0].replace('%', ''));
};

describe('ReplicatorGame', () => {
  it('renders the default hawk-dove preset with balanced shares', () => {
    render(<ReplicatorGame />);
    expect(screen.getByTestId('generation')).toHaveTextContent('0');
    expect(pctFrom('share-a')).toBe(50);
    expect(pctFrom('share-b')).toBe(50);
    expect(screen.getByTestId('preset-hawk-dove')).toHaveClass(
      'border-primary'
    );
  });

  it('steps one generation and shows updated shares and fitness', () => {
    render(<ReplicatorGame />);
    fireEvent.click(screen.getByTestId('step-1'));
    expect(screen.getByTestId('generation')).toHaveTextContent('1');
    expect(pctFrom('share-a')).toBeGreaterThan(50);
  });

  it('converges hawk share on 2/3 after 100 steps for hawk-dove', () => {
    render(<ReplicatorGame />);
    fireEvent.click(screen.getByTestId('step-100'));
    const hawk = pctFrom('share-a');
    expect(hawk).toBeGreaterThan(65);
    expect(hawk).toBeLessThan(69);
    expect(screen.getByTestId('converged-badge')).toBeInTheDocument();
  });

  it('drives defector share to 1.0 in the prisoner dilemma preset', () => {
    render(<ReplicatorGame />);
    fireEvent.click(screen.getByTestId('preset-prisoner'));
    fireEvent.click(screen.getByTestId('step-100'));
    expect(pctFrom('share-b')).toBeGreaterThanOrEqual(98);
  });

  it('resets the population back to the default start', () => {
    render(<ReplicatorGame />);
    fireEvent.click(screen.getByTestId('step-100'));
    fireEvent.click(screen.getByTestId('reset'));
    expect(screen.getByTestId('generation')).toHaveTextContent('0');
    expect(pctFrom('share-a')).toBe(50);
  });

  it('restarts from a custom initial share set via the slider', () => {
    render(<ReplicatorGame />);
    fireEvent.change(screen.getByTestId('start-slider'), {
      target: { value: '0.55' },
    });
    expect(pctFrom('share-a')).toBe(55);
    fireEvent.click(screen.getByTestId('step-100'));
    expect(pctFrom('share-a')).toBeGreaterThan(60);
  });
});
