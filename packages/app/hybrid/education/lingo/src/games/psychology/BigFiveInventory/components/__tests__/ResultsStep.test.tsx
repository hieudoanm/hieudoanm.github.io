import { fireEvent, render, screen } from '@testing-library/react';
import { ResultsStep } from '../ResultsStep';
import { BFI_ITEMS } from '../../utils';

describe('ResultsStep', () => {
  it('shows all five factor means at the midpoint', () => {
    render(
      <ResultsStep responses={BFI_ITEMS.map(() => 3)} onReset={jest.fn()} />
    );
    expect(screen.getAllByText(/3\.00 \/ 5/)).toHaveLength(5);
    fireEvent.click(screen.getByText('Start Over'));
  });
});
