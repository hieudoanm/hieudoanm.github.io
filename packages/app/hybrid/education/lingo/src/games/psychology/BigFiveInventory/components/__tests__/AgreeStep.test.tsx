import { fireEvent, render, screen } from '@testing-library/react';
import { AgreeStep } from '../AgreeStep';
import { BFI_ITEMS } from '../../utils';

describe('AgreeStep', () => {
  it('reports rating clicks', () => {
    const onChange = jest.fn();
    render(
      <AgreeStep
        items={BFI_ITEMS.slice(0, 16)}
        values={BFI_ITEMS.slice(0, 16).map(() => 0)}
        onChange={onChange}
      />
    );
    fireEvent.click(
      screen.getAllByRole('button').find((b) => b.textContent === '5')!
    );
    expect(onChange).toHaveBeenCalledWith(0, 5);
  });
});
