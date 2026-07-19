import { fireEvent, render, screen } from '@testing-library/react';
import { ResultsStep } from '../ResultsStep';
import { GAD_ITEMS } from '../../utils';

describe('ResultsStep', () => {
  it('shows the maximum score and resets', () => {
    const onReset = jest.fn();
    render(
      <ResultsStep responses={GAD_ITEMS.map(() => 3)} onReset={onReset} />
    );
    expect(screen.getByText(/21 \/ 21/)).toBeInTheDocument();
    fireEvent.click(screen.getByText('Start Over'));
    expect(onReset).toHaveBeenCalled();
  });
});
