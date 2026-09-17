import { render, screen } from '@testing-library/react';

import SlotMachinePage from '@/app/(games)/(stem)/maths/probability/slot-machine/page';

describe('SlotMachinePage', () => {
  it('names the game', () => {
    render(<SlotMachinePage />);

    expect(
      screen.getByRole('heading', { name: 'Slot Machine' })
    ).toBeInTheDocument();
  });

  it('describes what the simulation shows', () => {
    render(<SlotMachinePage />);

    expect(
      screen.getByText('a jackpot built to stay out of reach', { exact: false })
    ).toBeInTheDocument();
  });

  it('links back to the probability topic', () => {
    render(<SlotMachinePage />);

    expect(
      screen.getByRole('link', { name: '← Back to Probability' })
    ).toHaveAttribute('href', '/maths/probability');
  });

  it('mounts the game inside the page', () => {
    render(<SlotMachinePage />);

    expect(screen.getByTestId('slot-spin')).toBeInTheDocument();
  });
});
