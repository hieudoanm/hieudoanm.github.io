import { fireEvent, render, screen } from '@testing-library/react';
import { ScaleStep } from '../ScaleStep';
import { ECR_ITEMS } from '../../utils';

describe('ScaleStep', () => {
  it('reports rating clicks', () => {
    const onChange = jest.fn();
    render(
      <ScaleStep
        items={ECR_ITEMS.slice(0, 12)}
        values={ECR_ITEMS.slice(0, 12).map(() => 0)}
        hint="1 = strongly disagree"
        onChange={onChange}
      />
    );
    fireEvent.click(
      screen.getAllByRole('button').find((b) => b.textContent === '7')!
    );
    expect(onChange).toHaveBeenCalledWith(0, 7);
  });
});
