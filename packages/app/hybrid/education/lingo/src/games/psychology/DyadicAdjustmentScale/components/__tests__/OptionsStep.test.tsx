import { fireEvent, render, screen } from '@testing-library/react';
import { OptionsStep } from '../OptionsStep';
import { DAS_ITEMS } from '../../utils';

describe('OptionsStep', () => {
  it('reports option clicks by index', () => {
    const onChange = jest.fn();
    render(
      <OptionsStep
        items={DAS_ITEMS}
        values={DAS_ITEMS.map(() => -1)}
        onChange={onChange}
      />
    );
    fireEvent.click(screen.getAllByRole('button')[0]);
    expect(onChange).toHaveBeenCalledWith(0, DAS_ITEMS[0].options[0].value);
  });
});
