import { fireEvent, render, screen } from '@testing-library/react';
import { ContinentsSort } from '../index';

const placeFirstCard = (container: HTMLElement): void => {
  const card = container.querySelector('[data-testid^="sort-card-"]');
  if (!card) return;
  fireEvent.click(card);
  fireEvent.click(screen.getByTestId('sort-bucket-Africa'));
};

const placedCount = (): number =>
  Number(
    screen.getByText(/Placed:/).textContent?.match(/Placed:\s*(\d+)/)?.[1] ??
      '0'
  );

describe('ContinentsSort', () => {
  it('renders five buckets and a full pool of cards', () => {
    const { container } = render(<ContinentsSort />);
    for (const region of ['Africa', 'Europe', 'Asia', 'Oceania', 'Americas']) {
      expect(screen.getByTestId(`sort-bucket-${region}`)).toBeInTheDocument();
    }
    expect(
      container.querySelectorAll('[data-testid^="sort-card-"]').length
    ).toBeGreaterThan(0);
    expect(placedCount()).toBe(0);
  });

  it('places a card via click-to-select then bucket click', () => {
    const { container } = render(<ContinentsSort />);
    placeFirstCard(container);
    expect(placedCount()).toBe(1);
    expect(screen.getByTestId('sort-message')).toBeInTheDocument();
    expect(screen.queryByTestId('sort-over')).toBeNull();
  });

  it('shows the game-over panel after all cards are placed and resets', () => {
    const { container } = render(<ContinentsSort />);
    for (let round = 0; round < 20; round += 1) {
      if (screen.queryByTestId('sort-over')) break;
      placeFirstCard(container);
    }
    expect(screen.getByTestId('sort-over')).toBeInTheDocument();
    expect(placedCount()).toBeGreaterThan(0);
    fireEvent.click(screen.getByTestId('sort-reset'));
    expect(screen.queryByTestId('sort-over')).toBeNull();
    expect(placedCount()).toBe(0);
  });
});
