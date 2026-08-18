import { fireEvent, render, screen } from '@testing-library/react';
import { BeckDepressionInventory } from '../index';

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

import { OptionsStep } from '../components/OptionsStep';
import { ResultsStep } from '../components/ResultsStep';
import { BDI_ITEMS } from '../utils';

describe('BeckDepressionInventory', () => {
  it('walks through every step to the results screen and back', () => {
    render(<BeckDepressionInventory onClose={jest.fn()} />);
    for (let i = 0; i < 25 && !screen.queryByText('Start Over'); i += 1) {
      answerCurrentStep();
      advance();
    }
    expect(screen.getByText('Depression Severity Score'));
    fireEvent.click(screen.getByText('Start Over'));
    expect(screen.getByText(/Step 1 of/));
  });
});

describe('OptionsStep', () => {
  it('reports option clicks by index', () => {
    const onChange = jest.fn();
    render(
      <OptionsStep
        items={BDI_ITEMS}
        selected={BDI_ITEMS.map(() => -1)}
        onChange={onChange}
      />
    );
    fireEvent.click(screen.getAllByRole('button')[0]);
    expect(onChange).toHaveBeenCalledWith(0, 0);
  });
});

describe('ResultsStep', () => {
  const argmaxSelected = BDI_ITEMS.map(
    (item) =>
      item.options.reduce(
        (best, option, index) =>
          option.value > best.value ? { value: option.value, index } : best,
        { value: -1, index: 0 }
      ).index
  );

  it('shows the total score out of 63', () => {
    render(<ResultsStep selected={argmaxSelected} onReset={jest.fn()} />);
    expect(screen.getByText(/\/ 63/)).toBeInTheDocument();
  });

  it('flags suicidal ideation with a crisis notice', () => {
    const selected = [...argmaxSelected];
    selected[8] = 0;
    selected[8] = 1;
    render(<ResultsStep selected={selected} onReset={jest.fn()} />);
    expect(screen.getByText(/988/)).toBeInTheDocument();
  });
});
