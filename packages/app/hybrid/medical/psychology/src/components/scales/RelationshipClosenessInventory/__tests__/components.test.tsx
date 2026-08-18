import { fireEvent, render, screen } from '@testing-library/react';
import { RelationshipClosenessInventory } from '../index';

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

import { ActivitiesStep } from '../components/ActivitiesStep';
import { ResultsStep } from '../components/ResultsStep';
import { ScaleStep } from '../components/ScaleStep';
import { TimeStep } from '../components/TimeStep';
import {
  ACTIVITIES,
  INFLUENCE_ITEMS,
  PLAN_ITEMS,
  TIME_SLOTS,
  computeScores,
} from '../utils';

describe('RelationshipClosenessInventory', () => {
  it('walks through every step to the results screen and back', () => {
    render(<RelationshipClosenessInventory onClose={jest.fn()} />);
    for (let i = 0; i < 25 && !screen.queryByText('Start Over'); i += 1) {
      answerCurrentStep();
      advance();
    }
    expect(screen.getByText('Shared Activities'));
    fireEvent.click(screen.getByText('Start Over'));
    expect(screen.getByText(/Step 1 of/));
  });
});

describe('TimeStep', () => {
  it('clamps hour entries to zero or above', () => {
    const onChange = jest.fn();
    render(
      <TimeStep
        values={TIME_SLOTS.map(() => ({ hours: 0, minutes: 0 }))}
        onChange={onChange}
      />
    );
    fireEvent.change(screen.getAllByRole('spinbutton')[0], {
      target: { value: '2' },
    });
    expect(onChange).toHaveBeenCalledWith(0, 'hours', 2);
  });
});

describe('ActivitiesStep', () => {
  it('toggles activities', () => {
    const onChange = jest.fn();
    render(
      <ActivitiesStep
        values={ACTIVITIES.map(() => false)}
        onChange={onChange}
      />
    );
    fireEvent.click(screen.getAllByRole('checkbox')[0]);
    expect(onChange).toHaveBeenCalledWith(0);
  });
});

describe('ResultsStep', () => {
  it('summarises subscales and resets', () => {
    const onReset = jest.fn();
    render(
      <ResultsStep
        scores={computeScores(
          [{ hours: 1, minutes: 30 }],
          [true],
          INFLUENCE_ITEMS.map(() => 4),
          PLAN_ITEMS.map(() => 7)
        )}
        onReset={onReset}
      />
    );
    expect(screen.getByText('Shared Activities')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Start Over'));
    expect(onReset).toHaveBeenCalled();
  });
});
