import { fireEvent, render, screen } from '@testing-library/react';
import { OptionsStep } from '../OptionsStep';
import { BDI_ITEMS } from '../../utils';

describe('OptionsStep', () => {
  it('reports option clicks by index', () => {
    const onChange = jest.fn();
    render(
      <OptionsStep
        items={BDI_ITEMS}
        selected={BDI_ITEMS.map(() => -1)}
        onChange={onChange}
      />
    );
    fireEvent.click(screen.getAllByRole('button')[0]);
    expect(onChange).toHaveBeenCalledWith(0, 0);
  });
});
