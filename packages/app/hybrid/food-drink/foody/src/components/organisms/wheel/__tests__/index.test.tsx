import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  CuisineWheel,
  SETTLE_MS,
  SLICE_ANGLE,
  buildWheelRotation,
} from '../index';
import { CUISINES } from '@/data';

describe('buildWheelRotation', () => {
  it('lands the target sector centered under the top pointer', () => {
    CUISINES.forEach((cuisine, targetIndex) => {
      const { rotation } = buildWheelRotation(targetIndex, 0);
      const mod = ((rotation % 360) + 360) % 360;
      const sliceCenter = targetIndex * SLICE_ANGLE + SLICE_ANGLE / 2;
      expect((sliceCenter + mod) % 360).toBeCloseTo(0);
    });
  });

  it('keeps increasing rotation across consecutive spins', () => {
    let rotation = 0;
    for (let i = 0; i < 5; i += 1) {
      const next = buildWheelRotation(i % CUISINES.length, rotation);
      expect(next.rotation).toBeGreaterThan(rotation);
      rotation = next.rotation;
    }
  });
});

describe('CuisineWheel', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders the wheel, one sector per cuisine, and the spin controls', () => {
    render(<CuisineWheel />);
    expect(screen.getByTestId('cuisine-wheel')).toBeInTheDocument();
    expect(screen.getByTestId('wheel-pointer')).toBeInTheDocument();
    CUISINES.forEach((cuisine) => {
      expect(
        screen.getByTestId(`wheel-sector-${cuisine.value}`)
      ).toBeInTheDocument();
    });
    expect(screen.getByTestId('wheel-spin')).toBeEnabled();
    expect(screen.getByTestId('wheel-result')).toHaveTextContent(
      'Press spin to pick a cuisine'
    );
  });

  it('spins, disables the button while settling, then reveals a cuisine', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<CuisineWheel settlingMs={SETTLE_MS} />);
    await user.click(screen.getByTestId('wheel-spin'));
    expect(screen.getByTestId('wheel-spin')).toBeDisabled();
    expect(screen.getByTestId('wheel-result')).toHaveTextContent(
      'Press spin to pick a cuisine'
    );
    act(() => jest.advanceTimersByTime(SETTLE_MS));
    const result = screen.getByTestId('wheel-result').textContent ?? '';
    expect(
      CUISINES.some((cuisine) => result === `${cuisine.emoji} ${cuisine.label}`)
    ).toBe(true);
    expect(screen.getByTestId('wheel-spin')).toBeEnabled();
  });

  it('links to the matching randomizer country once a cuisine is selected', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<CuisineWheel settlingMs={SETTLE_MS} />);
    expect(screen.queryByTestId('wheel-result-link')).not.toBeInTheDocument();
    await user.click(screen.getByTestId('wheel-spin'));
    act(() => jest.advanceTimersByTime(SETTLE_MS));
    const result = screen.getByTestId('wheel-result').textContent ?? '';
    const cuisine = CUISINES.find(
      (item) => result === `${item.emoji} ${item.label}`
    );
    expect(cuisine).toBeDefined();
    const link = screen.getByTestId('wheel-result-link');
    expect(link.getAttribute('href')).toBe(
      `/randomizer?country=${cuisine!.value}`
    );
    expect(link).toHaveTextContent(`Spin a dish from ${cuisine!.label}`);
  });
});
