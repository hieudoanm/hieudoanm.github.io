import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FoodRandomizer } from '../index';
import { FOOD_OPTIONS, TOTAL_FOODS } from '@/data';

const advance = () => act(() => jest.advanceTimersByTime(1800));

describe('FoodRandomizer', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders the reel placeholder and spin controls', () => {
    render(<FoodRandomizer />);
    expect(screen.getByTestId('reel-display')).toHaveTextContent('🍽️');
    expect(screen.getByTestId('spin-button')).toBeEnabled();
    expect(screen.getByTestId('stats-line').textContent).toContain(
      `${TOTAL_FOODS} dishes`
    );
    expect(screen.getByTestId('spin-count')).toHaveTextContent('0');
  });

  it('spins, lands on a valid dish and counts the spin', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<FoodRandomizer />);
    await user.click(screen.getByTestId('spin-button'));
    expect(screen.getByTestId('spin-button')).toBeDisabled();
    expect(screen.getAllByText('Rolling…').length).toBeGreaterThan(0);
    advance();
    expect(FOOD_OPTIONS.all).toContain(
      screen.getByTestId('reel-display').textContent
    );
    expect(screen.getByTestId('spin-button')).toBeEnabled();
    expect(screen.getByTestId('spin-count')).toHaveTextContent('1');
  });

  it('spins with the Space key', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<FoodRandomizer />);
    await user.keyboard(' ');
    expect(screen.getByTestId('spin-button')).toBeDisabled();
    advance();
    expect(screen.getByTestId('spin-button')).toBeEnabled();
    expect(screen.getByTestId('spin-count')).toHaveTextContent('1');
  });

  it('locks a cuisine through the select and spins within it', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<FoodRandomizer />);
    await user.click(screen.getByTestId('cuisine-select-trigger'));
    await user.click(screen.getByTitle('Japan'));
    await user.click(screen.getByTestId('spin-button'));
    advance();
    expect(FOOD_OPTIONS.japanese).toContain(
      screen.getByTestId('reel-display').textContent
    );
  });

  it('pre-selects the cuisine from the initial country', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<FoodRandomizer initialCountry="japanese" />);
    expect(screen.getByTestId('cuisine-select-trigger')).toHaveTextContent(
      'Japan'
    );
    await user.click(screen.getByTestId('spin-button'));
    advance();
    expect(FOOD_OPTIONS.japanese).toContain(
      screen.getByTestId('reel-display').textContent
    );
  });

  it('defaults an unknown initial country to All Cuisines', () => {
    render(<FoodRandomizer initialCountry="does-not-exist" />);
    expect(screen.getByTestId('cuisine-select-trigger')).toHaveTextContent(
      'All Cuisines'
    );
  });
});
