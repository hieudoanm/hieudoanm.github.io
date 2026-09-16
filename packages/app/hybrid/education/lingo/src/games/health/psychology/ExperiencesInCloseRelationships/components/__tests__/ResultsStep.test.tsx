import { fireEvent, render, screen } from '@testing-library/react';
import { ResultsStep } from '../ResultsStep';
import { ECR_ITEMS } from '../../utils';

describe('ResultsStep', () => {
  it('shows both subscale means at the midpoint and resets', () => {
    const onReset = jest.fn();
    render(
      <ResultsStep responses={ECR_ITEMS.map(() => 4)} onReset={onReset} />
    );
    expect(screen.getByText('Attachment Anxiety')).toBeInTheDocument();
    expect(screen.getByText('Attachment Avoidance')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Start Over'));
    expect(onReset).toHaveBeenCalled();
  });
});
