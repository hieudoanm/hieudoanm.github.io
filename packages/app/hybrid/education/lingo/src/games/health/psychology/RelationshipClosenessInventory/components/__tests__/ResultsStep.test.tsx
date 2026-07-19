import { fireEvent, render, screen } from '@testing-library/react';
import { ResultsStep } from '../ResultsStep';
import { INFLUENCE_ITEMS, PLAN_ITEMS, computeScores } from '../../utils';

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
