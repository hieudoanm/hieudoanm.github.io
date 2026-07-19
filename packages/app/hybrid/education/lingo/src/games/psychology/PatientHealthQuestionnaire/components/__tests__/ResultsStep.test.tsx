import { fireEvent, render, screen } from '@testing-library/react';
import { ResultsStep } from '../ResultsStep';
import { PHQ_ITEMS } from '../../utils';

describe('ResultsStep', () => {
  it('shows the maximum score and resets', () => {
    const onReset = jest.fn();
    render(
      <ResultsStep responses={PHQ_ITEMS.map(() => 3)} onReset={onReset} />
    );
    expect(screen.getByText(/27 \/ 27/)).toBeInTheDocument();
    fireEvent.click(screen.getByText('Start Over'));
    expect(onReset).toHaveBeenCalled();
  });
});
