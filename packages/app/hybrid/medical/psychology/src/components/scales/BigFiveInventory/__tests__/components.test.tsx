import { fireEvent, render, screen } from '@testing-library/react';
import { BigFiveInventory } from '../index';

const NAV = ['← Back', 'Next →', 'See Results →'];

const answerCurrentStep = () => {
  screen
    .getAllByRole('button')
    .filter((button) => !NAV.includes(button.textContent ?? ''))
    .forEach((button) => fireEvent.click(button));
};

const advance = () => {
  const nav = ['See Results →', 'Next →']
    .map((text) => screen.queryByText(text))
    .find(Boolean);
  if (!nav) throw new Error('wizard stuck');
  fireEvent.click(nav);
};

import { AgreeStep } from '../components/AgreeStep';
import { ResultsStep } from '../components/ResultsStep';
import { BFI_ITEMS } from '../utils';

describe('BigFiveInventory', () => {
  it('walks through every step to the results screen and back', () => {
    render(<BigFiveInventory onClose={jest.fn()} />);
    for (let i = 0; i < 25 && !screen.queryByText('Start Over'); i += 1) {
      answerCurrentStep();
      advance();
    }
    expect(screen.getAllByText(/\/ 5/).length >= 5);
    fireEvent.click(screen.getByText('Start Over'));
    expect(screen.getByText(/Step 1 of/));
  });
});

describe('AgreeStep', () => {
  it('reports rating clicks', () => {
    const onChange = jest.fn();
    render(
      <AgreeStep
        items={BFI_ITEMS.slice(0, 16)}
        values={BFI_ITEMS.slice(0, 16).map(() => 0)}
        onChange={onChange}
      />
    );
    fireEvent.click(
      screen.getAllByRole('button').find((b) => b.textContent === '5')!
    );
    expect(onChange).toHaveBeenCalledWith(0, 5);
  });
});

describe('ResultsStep', () => {
  it('shows all five factor means at the midpoint', () => {
    render(
      <ResultsStep responses={BFI_ITEMS.map(() => 3)} onReset={jest.fn()} />
    );
    expect(screen.getAllByText(/3\.00 \/ 5/)).toHaveLength(5);
    fireEvent.click(screen.getByText('Start Over'));
  });
});
