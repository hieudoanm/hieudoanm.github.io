import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FoodRandomizer } from '../index';
import { FOOD_OPTIONS, TOTAL_FOODS } from '../constants';

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

  it('spins with the Space key but ignores typing targets', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<FoodRandomizer />);
    await user.keyboard(' ');
    expect(screen.getByTestId('spin-button')).toBeDisabled();
    advance();
    expect(screen.getByTestId('spin-button')).toBeEnabled();

    await user.click(screen.getByTestId('cuisine-select-trigger'));
    await user.type(screen.getByLabelText('Search foods'), 's');
    expect(screen.getByLabelText('Search foods')).toHaveValue('s');
    expect(screen.getByTestId('spin-button')).toBeEnabled();
    expect(screen.getByTestId('spin-count')).toHaveTextContent('1');
  });

  it('locks a cuisine through the select and spins within it', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<FoodRandomizer />);
    await user.click(screen.getByTestId('cuisine-select-trigger'));
    await user.click(screen.getByRole('button', { name: /Japan/ }));
    await user.click(screen.getByRole('button', { name: /Sushi/ }));
    await user.click(screen.getByTestId('spin-button'));
    advance();
    expect(screen.getByTestId('reel-display').textContent).toBe('Sushi');
  });

  it('opens the how-to modal and closes it again', async () => {
    jest.useRealTimers();
    const user = userEvent.setup();
    render(<FoodRandomizer />);
    await user.click(screen.getByTestId('how-to-button'));
    expect(screen.getByTestId('how-to-modal')).toBeInTheDocument();
    expect(
      screen.getByText(
        'Hit the spin button or press Space / Enter to roll the reel.'
      )
    ).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Close' }));
    expect(screen.queryByTestId('how-to-modal')).not.toBeInTheDocument();
  });
});
