import { fireEvent, render, screen } from '@testing-library/react';
import { ResultsStep } from '../ResultsStep';
import { DAS_ITEMS } from '../../utils';

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
