import { fireEvent, render, screen } from '@testing-library/react';
import { DyadicAdjustmentScale } from '../index';

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
import { DAS_ITEMS } from '../utils';

describe('DyadicAdjustmentScale', () => {
  it('walks through every step to the results screen and back', () => {
    render(<DyadicAdjustmentScale onClose={jest.fn()} />);
    for (let i = 0; i < 25 && !screen.queryByText('Start Over'); i += 1) {
      answerCurrentStep();
      advance();
    }
    expect(screen.getByText('Dyadic Adjustment Score'));
    fireEvent.click(screen.getByText('Start Over'));
    expect(screen.getByText(/Step 1 of/));
  });
});

describe('OptionsStep', () => {
  it('reports option clicks by index', () => {
    const onChange = jest.fn();
    render(
      <OptionsStep
        items={DAS_ITEMS}
        values={DAS_ITEMS.map(() => -1)}
        onChange={onChange}
      />
    );
    fireEvent.click(screen.getAllByRole('button')[0]);
    expect(onChange).toHaveBeenCalledWith(0, DAS_ITEMS[0].options[0].value);
  });
});

describe('ResultsStep', () => {
  it('shows the total score out of 151 and resets', () => {
    const onReset = jest.fn();
    const maxValues = DAS_ITEMS.map(
      (item) => item.options[item.options.length - 1].value
    );
    render(<ResultsStep responses={maxValues} onReset={onReset} />);
    expect(screen.getByText(/\/ 151/)).toBeInTheDocument();
    fireEvent.click(screen.getByText('Start Over'));
    expect(onReset).toHaveBeenCalled();
  });
});
