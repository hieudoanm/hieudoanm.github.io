import { fireEvent, render, screen } from '@testing-library/react';
import { PriceLab } from '../index';

const readout = (id: string): string =>
  screen.getByTestId(id).textContent ?? '';

describe('PriceLab', () => {
  it('renders the dashboard with default readouts', () => {
    render(<PriceLab />);
    expect(screen.getByTestId('price-slider')).toBeInTheDocument();
    expect(screen.getByTestId('a-slider')).toBeInTheDocument();
    expect(readout('equilibrium-price')).toBe('$44.44');
    expect(readout('equilibrium-quantity')).toBe('44');
    expect(readout('effective-price')).toBe('$40');
    expect(readout('gap-value')).toBe('10');
    expect(readout('gap-badge')).toContain('Shortage');
  });

  it('updates readouts when the demand intercept slider moves', () => {
    render(<PriceLab />);
    fireEvent.change(screen.getByTestId('a-slider'), {
      target: { value: '120' },
    });
    expect(readout('equilibrium-price')).toBe('$53.33');
    expect(readout('equilibrium-quantity')).toBe('53');
  });

  it('updates readouts when the supply slope slider moves', () => {
    render(<PriceLab />);
    fireEvent.change(screen.getByTestId('c-slider'), {
      target: { value: '2' },
    });
    expect(readout('equilibrium-price')).toBe('$30.77');
    expect(readout('elasticity-readout')).toContain('0.63');
  });

  it('flags a surplus when the market price is above equilibrium', () => {
    render(<PriceLab />);
    fireEvent.change(screen.getByTestId('price-slider'), {
      target: { value: '60' },
    });
    expect(readout('gap-value')).toBe('-35');
    expect(readout('gap-badge')).toContain('Surplus');
  });

  it('clamps the price up to the floor when a floor is enabled', () => {
    render(<PriceLab />);
    fireEvent.change(screen.getByTestId('price-slider'), {
      target: { value: '10' },
    });
    expect(readout('effective-price')).toBe('$10');
    fireEvent.click(screen.getByTestId('floor-enabled'));
    expect(readout('effective-price')).toBe('$30');
    expect(readout('gap-badge')).toContain('Shortage');
  });

  it('clamps the price down to the ceiling when a ceiling is enabled', () => {
    render(<PriceLab />);
    fireEvent.change(screen.getByTestId('price-slider'), {
      target: { value: '70' },
    });
    fireEvent.click(screen.getByTestId('ceiling-enabled'));
    expect(readout('effective-price')).toBe('$60');
    expect(readout('gap-badge')).toContain('Surplus');
  });

  it('restores defaults on reset', () => {
    render(<PriceLab />);
    fireEvent.change(screen.getByTestId('a-slider'), {
      target: { value: '200' },
    });
    expect(readout('equilibrium-price')).toBe('$88.89');
    fireEvent.click(screen.getByTestId('reset'));
    expect(readout('equilibrium-price')).toBe('$44.44');
    expect(readout('price-slider-value')).toBe('40');
    expect(readout('a-slider-value')).toBe('100');
  });
});
