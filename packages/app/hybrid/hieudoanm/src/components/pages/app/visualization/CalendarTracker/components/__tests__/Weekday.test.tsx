import { render, screen } from '@testing-library/react';
import { Weekday } from '../WeekdayModal';

describe('Weekday', () => {
  const originalInnerWidth = window.innerWidth;

  afterEach(() => {
    Object.defineProperty(window, 'innerWidth', {
      value: originalInnerWidth,
      writable: true,
    });
  });

  it('renders 4 rows of weekdays on desktop', () => {
    Object.defineProperty(window, 'innerWidth', {
      value: 1024,
      writable: true,
    });
    render(<Weekday />);
    const letters = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    const expected = [...letters, ...letters, ...letters, ...letters];
    expected.forEach((letter) => {
      expect(screen.getAllByText(letter).length).toBeGreaterThanOrEqual(1);
    });
  });

  it('renders 3 rows of weekdays on mobile', () => {
    Object.defineProperty(window, 'innerWidth', {
      value: 600,
      writable: true,
    });
    render(<Weekday />);
    const letters = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    const expected = [...letters, ...letters, ...letters];
    expected.forEach((letter) => {
      expect(screen.getAllByText(letter).length).toBeGreaterThanOrEqual(1);
    });
  });

  it('renders correct grid columns for 4 rows', () => {
    Object.defineProperty(window, 'innerWidth', {
      value: 1024,
      writable: true,
    });
    const { container } = render(<Weekday />);
    const grid = container.firstChild as HTMLElement;
    expect(grid).toHaveStyle({
      gridTemplateColumns: 'repeat(28, minmax(0, 1fr))',
    });
  });

  it('renders correct grid columns for 3 rows', () => {
    Object.defineProperty(window, 'innerWidth', {
      value: 600,
      writable: true,
    });
    const { container } = render(<Weekday />);
    const grid = container.firstChild as HTMLElement;
    expect(grid).toHaveStyle({
      gridTemplateColumns: 'repeat(21, minmax(0, 1fr))',
    });
  });
});
